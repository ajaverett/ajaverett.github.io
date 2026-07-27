"""Generate the canonical one-page resume, preview image metadata, and hotspots.

The website displays a rendered page instead of asking mobile browsers to
typeset a transformed miniature document. Interactive links embedded in this
PDF become normalized hotspot rectangles consumed by the React UI.
"""

from __future__ import annotations

import json
from pathlib import Path
from xml.sax.saxutils import escape

import pypdfium2 as pdfium
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    KeepTogether,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "app" / "resume-data.json"
PUBLIC_DIR = ROOT / "public"
FONT_DIR = PUBLIC_DIR / "fonts"
PDF_PATH = PUBLIC_DIR / "aj-averett-resume.pdf"
PREVIEW_PATH = PUBLIC_DIR / "resume-page.png"
HOTSPOT_PATH = ROOT / "app" / "resume-hotspots.json"

PAGE_WIDTH, PAGE_HEIGHT = LETTER
LEFT_MARGIN = 39
RIGHT_MARGIN = 39
TOP_MARGIN = 27
BOTTOM_MARGIN = 25
CONTENT_WIDTH = PAGE_WIDTH - LEFT_MARGIN - RIGHT_MARGIN

REGULAR = "STIXTwoText"
BOLD = "STIXTwoText-Bold"
BLUE = colors.HexColor("#0000EE")


def profile_link(profile_id: str, label: str, color: str | None = None) -> str:
    color_attr = f' color="{color}"' if color else ""
    return (
        f'<a href="profile://{escape(profile_id)}"{color_attr}>'
        f"{escape(label)}</a>"
    )


def section_heading(label: str, style: ParagraphStyle) -> Table:
    heading = Paragraph(escape(label.upper()), style)
    table = Table([[heading]], colWidths=[CONTENT_WIDTH], rowHeights=None)
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2),
                ("LINEBELOW", (0, 0), (-1, -1), 0.6, colors.black),
            ]
        )
    )
    return table


def two_column(rows: list[list[Paragraph]], widths: tuple[float, float]) -> Table:
    table = Table(rows, colWidths=list(widths), hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return table


def build_pdf(data: dict) -> None:
    pdfmetrics.registerFont(TTFont(REGULAR, FONT_DIR / "stix-two-text-regular.ttf"))
    pdfmetrics.registerFont(TTFont(BOLD, FONT_DIR / "stix-two-text-bold.ttf"))
    pdfmetrics.registerFontFamily(
        "STIXTwoTextFamily",
        normal=REGULAR,
        bold=BOLD,
        italic=REGULAR,
        boldItalic=BOLD,
    )

    name_style = ParagraphStyle(
        "Name",
        fontName=BOLD,
        fontSize=27,
        leading=28,
        alignment=TA_CENTER,
        spaceAfter=4,
    )
    contact_style = ParagraphStyle(
        "Contact",
        fontName=REGULAR,
        fontSize=8.6,
        leading=9.5,
        alignment=TA_CENTER,
    )
    section_style = ParagraphStyle(
        "Section",
        fontName=BOLD,
        fontSize=11.2,
        leading=12,
    )
    company_style = ParagraphStyle(
        "Company",
        fontName=BOLD,
        fontSize=10.4,
        leading=11.3,
        textColor=BLUE,
    )
    body_style = ParagraphStyle(
        "Body",
        fontName=REGULAR,
        fontSize=9.4,
        leading=11,
    )
    right_style = ParagraphStyle(
        "Right",
        parent=body_style,
        alignment=TA_RIGHT,
        fontSize=9,
        leading=10.6,
    )
    achievement_style = ParagraphStyle(
        "Achievement",
        parent=body_style,
        leftIndent=13,
        firstLineIndent=-8,
        spaceBefore=1.8,
    )
    bullet_style = ParagraphStyle(
        "Bullet",
        parent=body_style,
        leftIndent=13,
        firstLineIndent=-8,
        bulletIndent=0,
        spaceBefore=0,
        spaceAfter=0,
    )
    skill_style = ParagraphStyle(
        "Skill",
        parent=body_style,
        leftIndent=8,
        firstLineIndent=-8,
        bulletIndent=0,
    )

    document = SimpleDocTemplate(
        str(PDF_PATH),
        pagesize=LETTER,
        leftMargin=LEFT_MARGIN,
        rightMargin=RIGHT_MARGIN,
        topMargin=TOP_MARGIN,
        bottomMargin=BOTTOM_MARGIN,
        title="AJ Averett Resume",
        author="AJ Averett",
        creator="AJ Averett interactive resume",
        pageCompression=1,
    )

    story = []
    header = data["header"]
    story.append(
        Paragraph(profile_link("alan", header["name"]), name_style)
    )
    contact = (
        f'{escape(header["phone"])} &nbsp;|&nbsp; '
        f'{escape(header["email"])} &nbsp;|&nbsp; '
        f'{escape(header["linkedin"])} &nbsp;|&nbsp; '
        f'{escape(header["website"])}'
    )
    story.append(Paragraph(contact, contact_style))
    story.append(Spacer(1, 15))

    education = data["education"]
    story.append(section_heading("Education", section_style))
    story.append(Spacer(1, 1.6))
    school = Paragraph(
        profile_link("byui", education["school"], "#0000EE"),
        company_style,
    )
    location = Paragraph(
        profile_link("rexburg", education["location"]),
        right_style,
    )
    degree = Paragraph(
        f'{escape(education["degree"])} '
        f'{profile_link("subject", education["subject"])}',
        body_style,
    )
    dates = Paragraph(escape(education["dates"]), right_style)
    story.append(
        two_column(
            [[school, location], [degree, dates]],
            (CONTENT_WIDTH * 0.73, CONTENT_WIDTH * 0.27),
        )
    )
    achievements = ", ".join(
        profile_link(item["profileId"], item["label"])
        for item in education["achievements"]
    )
    story.append(
        Paragraph(
            f"<bullet>&bull;</bullet><b>Achievements:</b> {achievements}",
            achievement_style,
        )
    )
    story.append(Spacer(1, 10))

    for group, label in (("experience", "Experience"), ("volunteer", "Volunteer")):
        story.append(section_heading(label, section_style))
        story.append(Spacer(1, 1.6))

        group_roles = [role for role in data["roles"] if role["group"] == group]
        for index, role in enumerate(group_roles):
            company_id = f'company-{role["slug"]}'
            location_id = f'location-{role["slug"]}'
            company = Paragraph(
                profile_link(company_id, role["company"], "#0000EE"),
                company_style,
            )
            if role.get("interactiveLocation", True):
                location_copy = profile_link(location_id, role["location"])
            else:
                location_copy = escape(role["location"])
            location = Paragraph(location_copy, right_style)
            role_title = Paragraph(escape(role["role"]), body_style)
            role_dates = Paragraph(escape(role["dates"]), right_style)
            heading = two_column(
                [[company, location], [role_title, role_dates]],
                (CONTENT_WIDTH * 0.73, CONTENT_WIDTH * 0.27),
            )

            bullets = [
                Paragraph(
                    f"<bullet>&bull;</bullet>{escape(bullet)}",
                    bullet_style,
                )
                for bullet in role["resumeBullets"]
            ]
            entry = [heading, Spacer(1, 1.2), *bullets]
            story.append(KeepTogether(entry))

            if index != len(group_roles) - 1:
                story.append(Spacer(1, 10 if group == "experience" else 8))

        story.append(Spacer(1, 10 if group == "experience" else 8))

    story.append(section_heading("Skills", section_style))
    story.append(Spacer(1, 1.8))
    for skill in data["skillGroups"]:
        story.append(
            Paragraph(
                f'<bullet>&bull;</bullet><b>{escape(skill["label"])}:</b> '
                f'{escape(skill["items"])}',
                skill_style,
            )
        )

    document.build(story)


def extract_hotspots() -> None:
    reader = PdfReader(PDF_PATH)
    if len(reader.pages) != 1:
        raise RuntimeError(f"Expected one PDF page, generated {len(reader.pages)}")

    page = reader.pages[0]
    annotations = page.get("/Annots", [])
    hotspots = []
    counters: dict[str, int] = {}

    for annotation_ref in annotations:
        annotation = annotation_ref.get_object()
        action = annotation.get("/A")
        if not action:
            continue
        uri = str(action.get("/URI", ""))
        if not uri.startswith("profile://"):
            continue

        profile_id = uri.removeprefix("profile://")
        x1, y1, x2, y2 = [float(value) for value in annotation["/Rect"]]
        counters[profile_id] = counters.get(profile_id, 0) + 1
        hotspots.append(
            {
                "id": f'{profile_id}-{counters[profile_id]}',
                "profileId": profile_id,
                "x": round(x1 / PAGE_WIDTH * 100, 5),
                "y": round((PAGE_HEIGHT - y2) / PAGE_HEIGHT * 100, 5),
                "width": round((x2 - x1) / PAGE_WIDTH * 100, 5),
                "height": round((y2 - y1) / PAGE_HEIGHT * 100, 5),
            }
        )

    hotspots.sort(key=lambda item: (item["y"], item["x"]))
    HOTSPOT_PATH.write_text(
        json.dumps(hotspots, indent=2) + "\n",
        encoding="utf-8",
    )


def render_preview() -> None:
    document = pdfium.PdfDocument(str(PDF_PATH))
    if len(document) != 1:
        raise RuntimeError(f"Expected one PDF page, generated {len(document)}")

    page = document[0]
    bitmap = page.render(scale=204 / 72)
    image = bitmap.to_pil()
    image.save(PREVIEW_PATH, format="PNG", optimize=True)
    page.close()
    document.close()

    if image.size != (1734, 2244):
        raise RuntimeError(f"Unexpected preview dimensions: {image.size}")


def main() -> None:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    build_pdf(data)
    extract_hotspots()
    render_preview()
    print(f"Generated {PDF_PATH.relative_to(ROOT)}")
    print(f"Generated {PREVIEW_PATH.relative_to(ROOT)}")
    print(f"Generated {HOTSPOT_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
