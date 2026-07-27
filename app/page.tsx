"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import resumeData from "./resume-data.json";
import resumeHotspots from "./resume-hotspots.json";

type Theme =
  | "about"
  | "education"
  | "scholarship"
  | "leadership"
  | "lab"
  | "naval"
  | "teaching"
  | "code"
  | "political"
  | "research"
  | "civic";

type Fact = {
  label: string;
  value: string;
};

type Attachment =
  | {
      kind: "quote";
      quote: string;
      attribution?: string;
    }
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      kind: "video";
      src: string;
      title: string;
    }
  | {
      kind: "embed";
      src: string;
      title: string;
    };

type EntityProfile = {
  id: string;
  theme: Theme;
  eyebrow: string;
  title: string;
  peek: string;
  overview: string;
  facts: Fact[];
  points?: string[];
  tags?: string[];
  attachments?: Attachment[];
};

type ResumeRole = {
  slug: string;
  group: "experience" | "volunteer";
  theme: Theme;
  company: string;
  role: string;
  location?: string;
  interactiveLocation?: boolean;
  dates: string;
  resumeFocus?: string;
  peek: string;
  overview: string;
  facts: Fact[];
  tags: string[];
  resumeBullets: string[];
};

type PeekState = {
  profile: EntityProfile;
  left: number;
  top: number;
  side: "left" | "right";
};

const roles: ResumeRole[] = [
  {
    slug: "booz-allen",
    group: "experience",
    theme: "naval",
    company: "Booz Allen Hamilton",
    role: "Data Scientist II (Senior Consultant)",
    location: "Salt Lake City, UT",
    dates: "May 2024 - Present",
    peek:
      "Aircraft-carrier readiness, naval time-series data, and mission-critical dashboards.",
    overview:
      "I own the path from raw naval time-series data to dependable, decision-ready products—building the pipelines, models, and dashboards that help teams understand readiness.",
    facts: [
      { label: "Stakeholders", value: "~76" },
      { label: "Delivery", value: "CI/CD" },
      { label: "Clearance", value: "Active Secret" },
    ],
    tags: [
      "Databricks",
      "Spark SQL",
      "PySpark",
      "QlikSense",
      "Predictive maintenance",
    ],
    resumeBullets: [
      "Led end-to-end ETL processes for multi-source naval time-series data, implementing a medallion architecture in Databricks and orchestrating data pipelines using Spark SQL, PySpark (Python), and Databricks Jobs/Workflows",
      "Built, delivered, and maintained robust, KPI-driven, mission-critical dashboards in QlikSense compliant with QPAS technical standards to ~76 stakeholders across several naval commands to inform about fleet-wide warfighting readiness",
      "Developed time-series predictive maintenance pipelines, enabling the estimation of average time-to-failure for ship parts",
      "Operated in Scrum and Agile development cycles for CI/CD on client deliverables, Active Secret Clearance",
    ],
  },
  {
    slug: "mountainland",
    group: "experience",
    theme: "teaching",
    company: "Mountainland Technical College",
    role: "Adjunct Faculty Instructor; Part-time",
    location: "Lehi, UT",
    dates: "Jul 2025 - Present",
    peek:
      "Competency-based analytics instruction across the complete data lifecycle.",
    overview:
      "I translate industry practice into approachable instruction, helping students move from raw data to an explanation people can act on.",
    facts: [
      { label: "Course", value: "Data Technology" },
      { label: "Coverage", value: "Full lifecycle" },
      { label: "Format", value: "Part-time" },
    ],
    tags: [
      "Excel",
      "Python",
      "R",
      "SQL",
      "Power BI",
      "Tableau",
    ],
    resumeBullets: [
      "Delivered competency-based analytics instruction using Excel, Python (Pandas, Scikit-learn), R (Tidyverse), SQL, Power BI, and Tableau, covering the full data lifecycle from acquisition to visualization for the MTECH Data Technology course",
      "Developed and refined curriculum to align with industry practices with use of student performance evaluation",
    ],
  },
  {
    slug: "corecodec",
    group: "experience",
    theme: "code",
    company: "Corecodec",
    role: "Data Engineer Intern",
    location: "San Antonio, TX",
    dates: "Dec 2023 - Apr 2024",
    peek:
      "Python, Selenium, and automated evidence pipelines for copyright analysis.",
    overview:
      "I automated the collection and transformation of large-scale unstructured app data so copyright-review teams could surface actionable infringement patterns.",
    facts: [
      { label: "Extraction", value: "Python + Selenium" },
      { label: "Transform", value: "Pandas" },
      { label: "Delivery", value: "Excel reports" },
    ],
    tags: ["Python", "Selenium", "Pandas", "openpyxl", "ETL"],
    resumeBullets: [
      "Designed ETL pipeline architecture using Python and Selenium to regularly extract large-scale unstructured data from app repositories for copyright infringement analysis",
      "Built Pandas-based transformation workflows and automated Excel reports using openpyxl to surface actionable infringement patterns",
    ],
  },
  {
    slug: "wpa",
    group: "experience",
    theme: "political",
    company: "WPA Intelligence",
    role: "Machine Learning Intern",
    location: "SE Washington, DC",
    dates: "Jul 2022 - Nov 2022",
    peek:
      "Voter modeling, civic campaigns, and GIS features across 100 million records.",
    overview:
      "I analyzed national-scale civic data and engineered geographic features that improved how future models understood voter behavior across multiple levels of place.",
    facts: [
      { label: "Records", value: "100M" },
      { label: "Granularities", value: "12" },
      { label: "Model lift", value: "1–3%" },
    ],
    tags: ["SQL", "R", "tidyverse", "GIS", "US Census Bureau", "sf"],
    resumeBullets: [
      "Analyzed and visualized voter demographic trends using SQL and R’s tidyverse to create digestible reports for hundreds of civic campaigns, training and deploying machine learning models to predict ideological disposition and voter turnout,",
      "Improved accuracy and AUC of all future ML models by 1-3% by feature engineering GIS data to classify over 100 million voter records into 12 population density granularities using US Census Bureau’s geographic spatial data and R’s sf library",
    ],
  },
  {
    slug: "rbdc",
    group: "volunteer",
    theme: "research",
    company: "Research & Business Development Center",
    role: "Data Consulting Intern",
    location: "Idaho Falls, ID",
    interactiveLocation: false,
    dates: "Sep 2023 - Dec 2023",
    peek:
      "Anomaly detection and research workflows across 200,000 submissions.",
    overview:
      "Working with FamilySearch leadership, I helped turn participant-submitted information into an anomaly-detection and research workflow.",
    facts: [
      { label: "Submissions", value: "200k" },
      { label: "Analysis", value: "Python" },
      { label: "Interface", value: "Plotly + Streamlit" },
    ],
    tags: [
      "Python",
      "Anomaly detection",
      "Plotly",
      "Streamlit",
      "Text vectorization",
    ],
    resumeBullets: [
      "Collaborated with FamilySearch executive leadership to deploy several in-house tuned anomaly detection algorithms in Python, analyzing over 200k submissions of unstructured, participant-submitted information for quality assurance; developed dashboards using Plotly and Streamlit that cross-referenced firm-owned content repositories with public records using text vectorization in Python, improving research capabilities for the Wilford Woodruff Papers Foundation",
    ],
  },
  {
    slug: "civic-database",
    group: "volunteer",
    theme: "civic",
    company: "County-Level Civic Engagement Organization",
    role: "Database Administrator",
    location: "Saratoga Springs, UT",
    interactiveLocation: false,
    dates: "May 2026 - Present",
    peek:
      "Constituent records, data integrity, access controls, and Neon CRM.",
    overview:
      "I administer the organization’s CRM foundation so constituent and contribution data stays clean, protected, and useful.",
    facts: [
      { label: "Platform", value: "Neon CRM" },
      { label: "Focus", value: "Data quality" },
      { label: "Protection", value: "Access controls" },
    ],
    tags: [
      "Neon CRM",
      "Constituent records",
      "Deduplication",
      "Data quality",
      "Access controls",
    ],
    resumeBullets: [
      "Administered Neon CRM, maintaining constituent records, user access, data integrity, and system configuration.",
      "Imported, cleaned, deduplicated, and standardized contact and contribution data.",
      "Protected sensitive information through access controls and data-quality practices.",
    ],
  },
];

const staticProfiles: EntityProfile[] = [
  {
    id: "alan",
    theme: "about",
    eyebrow: "About me",
    title: "AJ Averett",
    peek:
      "Data scientist, engineer, instructor, and the person behind this very serious résumé.",
    overview:
      "My résumé spans naval time-series data, analytics instruction, data engineering, anomaly detection, machine learning, and civic database administration.",
    facts: [
      { label: "Current role", value: "Data Scientist II" },
      { label: "Degree", value: "B.Sc. Data Science" },
      { label: "Clearance", value: "Active Secret" },
    ],
    tags: ["Data science", "Data engineering", "Machine learning", "Teaching"],
  },
  {
    id: "byui",
    theme: "education",
    eyebrow: "Education",
    title: "Brigham Young University–Idaho",
    peek: "B.Sc. Data Science, Statistics · Rexburg, Idaho.",
    overview:
      "The education entry on the résumé, including degree, dates, and listed achievements.",
    facts: [
      { label: "Location", value: "Rexburg, ID" },
      { label: "Dates", value: "Apr 2020 – Dec 2023" },
      { label: "Degree", value: "B.Sc. Data Science, Statistics" },
    ],
    points: [
      "Soc of Hispanic Professional Engineer Scholarship",
      "President of Data Science Society",
      "Chief Lab Manager",
    ],
    tags: ["Data science", "Statistics", "Student leadership"],
  },
  {
    id: "rexburg",
    theme: "education",
    eyebrow: "Education location",
    title: "Rexburg, ID",
    peek: "The setting for my BYU–Idaho education.",
    overview:
      "Rexburg, Idaho is the location attached to the Brigham Young University–Idaho entry on the résumé.",
    facts: [
      { label: "Institution", value: "BYU–Idaho" },
      { label: "Degree", value: "B.Sc. Data Science" },
      { label: "Dates", value: "2020–2023" },
    ],
    tags: ["Education", "Idaho"],
  },
  {
    id: "subject",
    theme: "education",
    eyebrow: "Field of study",
    title: "Data Science, Statistics",
    peek: "The degree subject behind the technical work on this résumé.",
    overview:
      "My B.Sc. combines data science and statistics, the academic foundation referenced throughout the experience and skills sections.",
    facts: [
      { label: "Degree", value: "Bachelor of Science" },
      { label: "Institution", value: "BYU–Idaho" },
      { label: "Completed", value: "Dec 2023" },
    ],
    tags: ["Python", "R", "Statistics", "Machine learning"],
  },
  {
    id: "scholarship",
    theme: "scholarship",
    eyebrow: "Achievement",
    title: "Soc of Hispanic Professional Engineer Scholarship",
    peek: "A scholarship listed among my BYU–Idaho achievements.",
    overview:
      "This scholarship appears in the Achievements line of the education section and can later hold award imagery, documentation, or a personal note.",
    facts: [
      { label: "Type", value: "Scholarship" },
      { label: "Section", value: "Education" },
      { label: "Status", value: "Résumé achievement" },
    ],
    tags: ["Scholarship", "Engineering", "Recognition"],
  },
  {
    id: "data-society",
    theme: "leadership",
    eyebrow: "Leadership",
    title: "President of Data Science Society",
    peek: "Student leadership inside BYU–Idaho’s data science community.",
    overview:
      "This leadership role appears in the Achievements line of the education section and is ready for event photos, quotes, or additional context.",
    facts: [
      { label: "Role", value: "President" },
      { label: "Organization", value: "Data Science Society" },
      { label: "Section", value: "Education" },
    ],
    tags: ["Leadership", "Data science", "Community"],
  },
  {
    id: "lab-manager",
    theme: "lab",
    eyebrow: "Leadership",
    title: "Chief Lab Manager",
    peek: "A hands-on leadership role listed among my education achievements.",
    overview:
      "Chief Lab Manager is listed in the education achievements and can later expand with lab details, photographs, or supporting material.",
    facts: [
      { label: "Role", value: "Chief Lab Manager" },
      { label: "Section", value: "Education" },
      { label: "Status", value: "Résumé achievement" },
    ],
    tags: ["Leadership", "Lab operations", "Education"],
  },
];

const roleProfiles: EntityProfile[] = roles.flatMap((role) => {
  const companyProfile: EntityProfile = {
    id: `company-${role.slug}`,
    theme: role.theme,
    eyebrow: role.role,
    title: role.company,
    peek: role.peek,
    overview: role.overview,
    facts: [
      ...(role.location
        ? [{ label: "Location", value: role.location }]
        : []),
      { label: "Timeline", value: role.dates },
      ...role.facts.slice(0, 1),
    ],
    points: role.resumeBullets,
    tags: role.tags,
  };

  if (!role.location || role.interactiveLocation === false) {
    return [companyProfile];
  }

  const locationProfile: EntityProfile = {
    id: `location-${role.slug}`,
    theme: role.theme,
    eyebrow: "Résumé location",
    title: role.location,
    peek: `${role.company} · ${role.role}`,
    overview: `${role.location} is the location attached to my ${role.role} entry at ${role.company}.`,
    facts: [
      { label: "Organization", value: role.company },
      { label: "Role", value: role.role },
      { label: "Timeline", value: role.dates },
    ],
    points: role.resumeBullets,
    tags: [role.location, ...role.tags.slice(0, 4)],
  };

  return [companyProfile, locationProfile];
});

const profiles = Object.fromEntries(
  [...staticProfiles, ...roleProfiles].map((profile) => [profile.id, profile]),
) as Record<string, EntityProfile>;

const experienceRoles = roles.filter((role) => role.group === "experience");
const volunteerRoles = roles.filter((role) => role.group === "volunteer");

const skillGroups = [
  {
    label: "Python/R",
    items:
      "pandas, PySpark, numpy, polars, sklearn, TensorFlow/Keras, xgboost, statsmodels, spaCy, selenium, tidyverse",
  },
  {
    label: "Visualization",
    items:
      "ggplot2, matplotlib, seaborn, plotly, altair, Streamlit, QlikSense, R Shiny, Power BI, Tableau, Mermaid",
  },
  {
    label: "Other Technical Skills",
    items:
      "SQL, Spark SQL, Excel, Quarto, LaTeX, regex, Agile Workflow (Scrum), Confluence",
  },
  {
    label: "Development",
    items: "Databricks, Jupyter, Spark, Git, GitHub, Docker, Azure",
  },
];

const themeMarks: Record<Theme, string[]> = {
  about: ["AJ", "✦", "DATA"],
  education: ["BOOK", "01", "✎"],
  scholarship: ["★", "AWARD", "✦"],
  leadership: ["LEAD", "↑", "TEAM"],
  lab: ["LAB", "◎", "OPS"],
  naval: ["CVN", "RADAR", "F/A-18"],
  teaching: ["BOOK", "CLASS", "✎"],
  code: ["</>", "01", "{ }"],
  political: ["VOTE", "51%", "POLL"],
  research: ["200k", "Aa", "⌕"],
  civic: ["CRM", "DB", "✓"],
};

function calculatePeekPosition(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const peekWidth = Math.min(360, window.innerWidth - 24);
  const peekHeight = 220;
  const gap = 18;
  const margin = 12;
  const fitsRight = rect.right + gap + peekWidth <= window.innerWidth - margin;
  const side: PeekState["side"] = fitsRight ? "right" : "left";
  const rawLeft = fitsRight
    ? rect.right + gap
    : rect.left - peekWidth - gap;
  const left = Math.max(
    margin,
    Math.min(rawLeft, window.innerWidth - peekWidth - margin),
  );
  const rawTop = rect.top + rect.height / 2 - peekHeight / 2;
  const top = Math.max(
    margin,
    Math.min(rawTop, window.innerHeight - peekHeight - margin),
  );

  return { left, top, side };
}

export default function Home() {
  const [peek, setPeek] = useState<PeekState | null>(null);
  const [expanded, setExpanded] = useState<EntityProfile | null>(null);
  const dialogTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const hidePeek = () => {
      if (!expanded) setPeek(null);
    };
    window.addEventListener("scroll", hidePeek, true);
    window.addEventListener("resize", hidePeek);
    return () => {
      window.removeEventListener("scroll", hidePeek, true);
      window.removeEventListener("resize", hidePeek);
    };
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => dialogTitleRef.current?.focus(), 80);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(null);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expanded]);

  const showPeek = (profile: EntityProfile, element: HTMLElement) => {
    setPeek({ profile, ...calculatePeekPosition(element) });
  };

  const runSurfaceTransition = (
    update: () => void,
    onFinished?: () => void,
  ) => {
    if (
      "startViewTransition" in document &&
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const transition = document.startViewTransition(() =>
        flushSync(update),
      );
      if (onFinished) {
        transition.finished.finally(onFinished);
      }
      return;
    }

    flushSync(update);
    onFinished?.();
  };

  const openProfile = (profile: EntityProfile, element: HTMLElement) => {
    const expand = () =>
      runSurfaceTransition(() => setExpanded(profile));

    if (peek?.profile.id === profile.id) {
      expand();
      return;
    }

    flushSync(() => {
      setPeek({ profile, ...calculatePeekPosition(element) });
    });
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(expand);
    });
  };

  const closeProfile = () => {
    const canReturnToPeek =
      !!expanded && peek?.profile.id === expanded.id;

    if (canReturnToPeek) {
      runSurfaceTransition(
        () => setExpanded(null),
        () => setPeek(null),
      );
      return;
    }

    runSurfaceTransition(() => {
      setExpanded(null);
      setPeek(null);
    });
  };

  return (
    <main
      className={`pdf-viewer${peek ? " pdf-viewer--peeking" : ""}${
        expanded ? " pdf-viewer--expanded" : ""
      }`}
    >
      <nav className="pdf-toolbar" aria-label="Résumé document controls">
        <div className="pdf-file">
          <span className="pdf-file-icon" aria-hidden="true">
            PDF
          </span>
          <span className="pdf-file-copy">
            <strong>aj-averett-resume.pdf</strong>
            <small>Hover a highlighted entity for a peek · click to expand</small>
          </span>
        </div>
        <span className="pdf-page-count" aria-label="Page 1 of 1">
          1 / 1
        </span>
        <button
          className="pdf-download"
          type="button"
          onClick={() => window.print()}
          aria-label="Print or save the résumé as a PDF"
        >
          <span>Download</span>
          <b aria-hidden="true">Ctrl+P</b>
        </button>
      </nav>

      <div className="pdf-canvas">
        <div className="pdf-page-frame">
          <Image
            className="pdf-page-image"
            src="/resume-page.png"
            width={1734}
            height={2244}
            priority
            alt="AJ Averett's one-page resume"
          />
          <div className="pdf-hotspot-layer" aria-label="Interactive resume details">
            {resumeHotspots.map((hotspot) => (
              <EntityHotspot
                key={hotspot.id}
                hotspot={hotspot}
                activeId={peek?.profile.id}
                expandedId={expanded?.id}
                onPeek={showPeek}
                onLeave={() => setPeek(null)}
                onExpand={openProfile}
              />
            ))}
          </div>
          <article
            className="pdf-page pdf-page--legacy"
            aria-labelledby="resume-name"
            aria-hidden="true"
          >
            <div className="pdf-page-content">
          <header className="pdf-header">
            <h1 id="resume-name">
              <EntityTrigger
                profileId="alan"
                className="entity-name"
                activeId={peek?.profile.id}
                expandedId={expanded?.id}
                onPeek={showPeek}
                onLeave={() => setPeek(null)}
                onExpand={openProfile}
              >
                AJ Averett
              </EntityTrigger>
            </h1>
            <p className="pdf-contact">
              <a href="tel:+18328564666">832.856.4666</a>
              <span aria-hidden="true">|</span>
              <a href="mailto:ajaverett0@gmail.com">ajaverett0@gmail.com</a>
              <span aria-hidden="true">|</span>
              <a
                href="https://www.linkedin.com/in/ajaverett"
                target="_blank"
                rel="noreferrer"
              >
                linkedin.com/in/ajaverett
              </a>
              <span aria-hidden="true">|</span>
              <a href="https://ajaverett.github.io">ajaverett.github.io</a>
            </p>
          </header>

          <section className="pdf-section" aria-labelledby="education">
            <h2 id="education">Education</h2>
            <div className="pdf-two-column">
              <div>
                <h3>
                  <EntityTrigger
                    profileId="byui"
                    className="entity-school"
                    activeId={peek?.profile.id}
                    expandedId={expanded?.id}
                    onPeek={showPeek}
                    onLeave={() => setPeek(null)}
                    onExpand={openProfile}
                  >
                    Brigham Young University–Idaho
                  </EntityTrigger>
                </h3>
                <p>
                  B.Sc.{" "}
                  <EntityTrigger
                    profileId="subject"
                    activeId={peek?.profile.id}
                    expandedId={expanded?.id}
                    onPeek={showPeek}
                    onLeave={() => setPeek(null)}
                    onExpand={openProfile}
                  >
                    Data Science, Statistics
                  </EntityTrigger>
                </p>
              </div>
              <div className="pdf-align-right">
                <p>
                  <EntityTrigger
                    profileId="rexburg"
                    className="entity-location"
                    activeId={peek?.profile.id}
                    expandedId={expanded?.id}
                    onPeek={showPeek}
                    onLeave={() => setPeek(null)}
                    onExpand={openProfile}
                  >
                    Rexburg, ID
                  </EntityTrigger>
                </p>
                <p>Apr 2020 - Dec 2023</p>
              </div>
            </div>
            <p className="pdf-achievement">
              <span aria-hidden="true">•</span>
              <strong>Achievements:</strong>
              <span className="achievement-list">
                <EntityTrigger
                  profileId="scholarship"
                  activeId={peek?.profile.id}
                  expandedId={expanded?.id}
                  onPeek={showPeek}
                  onLeave={() => setPeek(null)}
                  onExpand={openProfile}
                >
                  Soc of Hispanic Professional Engineer Scholarship
                </EntityTrigger>
                <span>, </span>
                <EntityTrigger
                  profileId="data-society"
                  activeId={peek?.profile.id}
                  expandedId={expanded?.id}
                  onPeek={showPeek}
                  onLeave={() => setPeek(null)}
                  onExpand={openProfile}
                >
                  President of Data Science Society
                </EntityTrigger>
                <span>, </span>
                <EntityTrigger
                  profileId="lab-manager"
                  activeId={peek?.profile.id}
                  expandedId={expanded?.id}
                  onPeek={showPeek}
                  onLeave={() => setPeek(null)}
                  onExpand={openProfile}
                >
                  Chief Lab Manager
                </EntityTrigger>
              </span>
            </p>
          </section>

          <ResumeGroup
            id="experience"
            label="Experience"
            roles={experienceRoles}
            activeId={peek?.profile.id}
            expandedId={expanded?.id}
            onPeek={showPeek}
            onLeave={() => setPeek(null)}
            onExpand={openProfile}
          />

          <ResumeGroup
            id="volunteer"
            label="Volunteer"
            roles={volunteerRoles}
            activeId={peek?.profile.id}
            expandedId={expanded?.id}
            onPeek={showPeek}
            onLeave={() => setPeek(null)}
            onExpand={openProfile}
          />

          <section
            className="pdf-section pdf-skills-section"
            aria-labelledby="skills"
          >
            <h2 id="skills">Skills</h2>
            <ul>
              {skillGroups.map((group) => (
                <li key={group.label}>
                  <strong>{group.label}:</strong> {group.items}
                </li>
              ))}
            </ul>
          </section>
            </div>
          </article>
        </div>
        <AccessibleResume />
      </div>

      {peek && !expanded && <PeekCard peek={peek} />}
      {expanded && (
        <DetailCanvas
          profile={expanded}
          titleRef={dialogTitleRef}
          onClose={closeProfile}
        />
      )}
    </main>
  );
}

function EntityHotspot({
  hotspot,
  activeId,
  expandedId,
  onPeek,
  onLeave,
  onExpand,
}: {
  hotspot: (typeof resumeHotspots)[number];
  activeId?: string;
  expandedId?: string;
  onPeek: (profile: EntityProfile, element: HTMLElement) => void;
  onLeave: () => void;
  onExpand: (profile: EntityProfile, element: HTMLElement) => void;
}) {
  const profile = profiles[hotspot.profileId];
  if (!profile) return null;

  const cropX =
    hotspot.x === 0
      ? 0
      : (hotspot.x / (100 - hotspot.width)) * 100;
  const cropY =
    hotspot.y === 0
      ? 0
      : (hotspot.y / (100 - hotspot.height)) * 100;
  const style = {
    left: `${hotspot.x}%`,
    top: `${hotspot.y}%`,
    width: `${hotspot.width}%`,
    height: `${hotspot.height}%`,
    "--hotspot-crop-size": `${10000 / hotspot.width}% ${
      10000 / hotspot.height
    }%`,
    "--hotspot-crop-position": `${cropX}% ${cropY}%`,
  } as CSSProperties;

  return (
    <button
      className={`entity-hotspot${
        activeId === profile.id ? " entity-hotspot--active" : ""
      }`}
      type="button"
      style={style}
      data-theme={profile.theme}
      data-profile-id={profile.id}
      aria-haspopup="dialog"
      aria-expanded={expandedId === profile.id}
      aria-label={`Explore ${profile.title}`}
      onMouseEnter={(event) => onPeek(profile, event.currentTarget)}
      onMouseLeave={onLeave}
      onFocus={(event) => onPeek(profile, event.currentTarget)}
      onBlur={onLeave}
      onClick={(event) => onExpand(profile, event.currentTarget)}
    />
  );
}

function AccessibleResume() {
  const { header, education, skillGroups } = resumeData;

  return (
    <article className="resume-accessible">
      <h1>{header.name}</h1>
      <p>
        {header.phone} | {header.email} | {header.linkedin} | {header.website}
      </p>
      <section>
        <h2>Education</h2>
        <h3>{education.school}</h3>
        <p>
          {education.degree} {education.subject} | {education.location} |{" "}
          {education.dates}
        </p>
        <p>
          Achievements:{" "}
          {education.achievements.map((achievement) => achievement.label).join(", ")}
        </p>
      </section>
      {(["experience", "volunteer"] as const).map((group) => (
        <section key={group}>
          <h2>{group === "experience" ? "Experience" : "Volunteer"}</h2>
          {resumeData.roles
            .filter((role) => role.group === group)
            .map((role) => (
              <div key={role.slug}>
                <h3>{role.company}</h3>
                <p>
                  {role.role} | {role.location} | {role.dates}
                </p>
                <ul>
                  {role.resumeBullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
        </section>
      ))}
      <section>
        <h2>Skills</h2>
        <ul>
          {skillGroups.map((group) => (
            <li key={group.label}>
              <strong>{group.label}:</strong> {group.items}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function EntityTrigger({
  profileId,
  className = "",
  activeId,
  expandedId,
  onPeek,
  onLeave,
  onExpand,
  children,
}: {
  profileId: string;
  className?: string;
  activeId?: string;
  expandedId?: string;
  onPeek: (profile: EntityProfile, element: HTMLElement) => void;
  onLeave: () => void;
  onExpand: (profile: EntityProfile, element: HTMLElement) => void;
  children: ReactNode;
}) {
  const profile = profiles[profileId];
  const isActive = activeId === profileId;

  return (
    <button
      className={`entity-trigger ${className}${
        isActive ? " entity-trigger--active" : ""
      }`}
      type="button"
      data-theme={profile.theme}
      aria-haspopup="dialog"
      aria-expanded={expandedId === profileId}
      aria-label={`Explore ${profile.title}`}
      onMouseEnter={(event) => onPeek(profile, event.currentTarget)}
      onMouseLeave={onLeave}
      onFocus={(event) => onPeek(profile, event.currentTarget)}
      onBlur={onLeave}
      onClick={(event) => onExpand(profile, event.currentTarget)}
    >
      <span className="entity-trigger__label">{children}</span>
    </button>
  );
}

function ResumeGroup({
  id,
  label,
  roles: groupRoles,
  activeId,
  expandedId,
  onPeek,
  onLeave,
  onExpand,
}: {
  id: string;
  label: string;
  roles: ResumeRole[];
  activeId?: string;
  expandedId?: string;
  onPeek: (profile: EntityProfile, element: HTMLElement) => void;
  onLeave: () => void;
  onExpand: (profile: EntityProfile, element: HTMLElement) => void;
}) {
  return (
    <section
      className={`pdf-section pdf-role-section pdf-${id}-section`}
      aria-labelledby={id}
    >
      <h2 id={id}>{label}</h2>
      <div className="pdf-role-list">
        {groupRoles.map((role) => (
          <article className="pdf-role-entry" key={role.slug}>
            <div className="pdf-role-heading">
              <EntityTrigger
                profileId={`company-${role.slug}`}
                className="entity-company"
                activeId={activeId}
                expandedId={expandedId}
                onPeek={onPeek}
                onLeave={onLeave}
                onExpand={onExpand}
              >
                {role.company}
              </EntityTrigger>
              {role.location &&
                (role.interactiveLocation === false ? (
                  <span className="pdf-location">{role.location}</span>
                ) : (
                  <EntityTrigger
                    profileId={`location-${role.slug}`}
                    className="entity-location pdf-location"
                    activeId={activeId}
                    expandedId={expandedId}
                    onPeek={onPeek}
                    onLeave={onLeave}
                    onExpand={onExpand}
                  >
                    {role.location}
                  </EntityTrigger>
                ))}
              <span className="pdf-role-title">{role.role}</span>
              <span className="pdf-dates">{role.dates}</span>
            </div>
            {role.resumeFocus && (
              <p className="pdf-role-focus">
                <strong>{role.resumeFocus}:</strong>
              </p>
            )}
            <ul>
              {role.resumeBullets.map((bullet) => (
                <li key={bullet}>
                  <span className="pdf-list-bullet" aria-hidden="true">
                    •
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function PeekCard({ peek }: { peek: PeekState }) {
  const marks = themeMarks[peek.profile.theme];
  const style = {
    "--peek-left": `${peek.left}px`,
    "--peek-top": `${peek.top}px`,
  } as CSSProperties;

  return (
    <>
      <div className="peek-scrim" aria-hidden="true" />
      <aside
        className="peek-card"
        data-theme={peek.profile.theme}
        data-side={peek.side}
        style={style}
        aria-hidden="true"
      >
        <div className="peek-marks">
          {marks.map((mark, index) => (
            <span key={`${mark}-${index}`}>{mark}</span>
          ))}
        </div>
        <p className="peek-eyebrow">{peek.profile.eyebrow}</p>
        <strong>{peek.profile.title}</strong>
        <p className="peek-copy">{peek.profile.peek}</p>
        <small>
          Click the text to expand <b>↗</b>
        </small>
      </aside>
    </>
  );
}

function DetailCanvas({
  profile,
  titleRef,
  onClose,
}: {
  profile: EntityProfile;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  onClose: () => void;
}) {
  return (
    <div
      className="detail-layer"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="detail-canvas"
        data-theme={profile.theme}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
      >
        <button
          className="detail-close"
          type="button"
          onClick={onClose}
          aria-label="Close expanded detail"
        >
          <span aria-hidden="true">×</span>
          Close <kbd>Esc</kbd>
        </button>

        <header className="detail-header">
          <div className="detail-marks" aria-hidden="true">
            {themeMarks[profile.theme].map((mark, index) => (
              <span key={`${mark}-${index}`}>{mark}</span>
            ))}
          </div>
          <p>{profile.eyebrow}</p>
          <h2 id="detail-title" ref={titleRef} tabIndex={-1}>
            {profile.title}
          </h2>
          <p className="detail-lead">{profile.peek}</p>
        </header>

        <div className="detail-facts" aria-label="Key details">
          {profile.facts.map((fact, index) => (
            <article key={fact.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <small>{fact.label}</small>
              <strong>{fact.value}</strong>
            </article>
          ))}
        </div>

        <div className="detail-body">
          <section className="detail-overview">
            <p className="detail-section-label">Add-on context</p>
            <h3>The story behind the line.</h3>
            <p>{profile.overview}</p>
            {profile.points && profile.points.length > 0 && (
              <ul>
                {profile.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            {profile.tags && (
              <div className="detail-tags" aria-label="Related topics">
                {profile.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            )}
          </section>

          <section className="attachment-board" aria-label="Attached media">
            <div className="attachment-heading">
              <p className="detail-section-label">Expandable canvas</p>
              <span>Media-ready</span>
            </div>
            {profile.attachments && profile.attachments.length > 0 ? (
              <div className="attachment-list">
                {profile.attachments.map((attachment, index) => (
                  <AttachmentRenderer
                    attachment={attachment}
                    key={`${attachment.kind}-${index}`}
                  />
                ))}
              </div>
            ) : (
              <div className="attachment-empty">
                <div className="attachment-types" aria-hidden="true">
                  <span>Image</span>
                  <span>Video</span>
                  <span>Quote</span>
                  <span>Embed</span>
                </div>
                <strong>Ready for the good stuff.</strong>
                <p>
                  This space can hold project screenshots, short videos,
                  testimonials, documents, or embedded interactive work without
                  creating another page.
                </p>
              </div>
            )}
          </section>
        </div>
      </section>
    </div>
  );
}

function AttachmentRenderer({ attachment }: { attachment: Attachment }) {
  if (attachment.kind === "quote") {
    return (
      <figure className="attachment attachment-quote">
        <blockquote>“{attachment.quote}”</blockquote>
        {attachment.attribution && (
          <figcaption>{attachment.attribution}</figcaption>
        )}
      </figure>
    );
  }

  if (attachment.kind === "image") {
    return (
      <figure className="attachment attachment-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={attachment.src} alt={attachment.alt} />
        {attachment.caption && <figcaption>{attachment.caption}</figcaption>}
      </figure>
    );
  }

  if (attachment.kind === "video") {
    return (
      <figure className="attachment attachment-video">
        <video controls preload="metadata" src={attachment.src}>
          <track kind="captions" />
        </video>
        <figcaption>{attachment.title}</figcaption>
      </figure>
    );
  }

  return (
    <iframe
      className="attachment attachment-embed"
      src={attachment.src}
      title={attachment.title}
      loading="lazy"
      allowFullScreen
    />
  );
}
