"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";

type Metric = {
  value: string;
  label: string;
};

type Experience = {
  slug: string;
  group: "experience" | "volunteer";
  effect: OrganicEffect;
  company: string;
  role: string;
  location: string;
  dates: string;
  resumeFocus?: string;
  eyebrow: string;
  headline: string;
  summary: string;
  accent: string;
  accentSoft: string;
  metrics: Metric[];
  chapters: {
    number: string;
    label: string;
    title: string;
    copy: string;
  }[];
  pipeline: string[];
  tools: string[];
  resumeBullets: string[];
};

type InfoSlug = "about" | "education" | "scholarship";

type DetailRoute =
  | { kind: "work"; slug: string }
  | { kind: "info"; slug: InfoSlug }
  | null;

type InfoDetail = {
  slug: InfoSlug;
  hash: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  accent: string;
  accentSoft: string;
  flag: string;
  effect: OrganicEffect;
  facts: { label: string; value: string }[];
  tags: string[];
};

type OrganicEffect =
  | "about"
  | "naval"
  | "books"
  | "code"
  | "research"
  | "political"
  | "crm"
  | "graduation"
  | "scholarship";

type HoverPreviewContent = {
  id: string;
  eyebrow: string;
  title: string;
  copy: string;
  accent: string;
  flag: string;
  effect: OrganicEffect;
};

const experiences: Experience[] = [
  {
    slug: "booz-allen",
    group: "experience",
    effect: "naval",
    company: "Booz Allen Hamilton",
    role: "Data Scientist II (Senior Consultant)",
    location: "Salt Lake City, UT",
    dates: "May 2024 - Present",
    eyebrow: "Fleet intelligence · Data systems",
    headline: "Turning fragmented signals into fleet-ready decisions.",
    summary:
      "I own the path from raw naval time-series data to dependable, decision-ready products—building the pipelines, models, and dashboards that help teams understand readiness.",
    accent: "#ff6a3d",
    accentSoft: "#ffd8c9",
    metrics: [
      { value: "~76", label: "stakeholders" },
      { value: "CI/CD", label: "client deliverables" },
      { value: "Active", label: "Secret Clearance" },
    ],
    chapters: [
      {
        number: "01",
        label: "The signal",
        title: "Many sources. One operational picture.",
        copy: "Naval readiness depends on time-series data arriving from different systems, at different levels of quality. I designed the path that turns that messy input into a trusted analytical foundation.",
      },
      {
        number: "02",
        label: "The system",
        title: "A medallion architecture built to last.",
        copy: "Using Spark SQL, PySpark, Python, and Databricks Jobs, I orchestrated layered pipelines with clear quality boundaries, repeatable transformations, and maintainable workflows.",
      },
      {
        number: "03",
        label: "The decision",
        title: "Readiness made visible.",
        copy: "I delivered KPI-driven QlikSense dashboards and predictive-maintenance estimates that help fleet stakeholders understand risk and act on average time-to-failure signals.",
      },
    ],
    pipeline: ["Multi-source data", "Databricks", "Spark SQL", "QlikSense", "CI/CD"],
    tools: [
      "Databricks",
      "Spark SQL",
      "PySpark (Python)",
      "Databricks Jobs/Workflows",
      "QlikSense",
      "CI/CD",
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
    effect: "books",
    company: "Mountainland Technical College",
    role: "Adjunct Faculty Instructor; Part-time",
    location: "Lehi, UT",
    dates: "Jul 2025 - Present",
    eyebrow: "Teaching · Curriculum design",
    headline: "Teaching the whole data lifecycle—not just the tools.",
    summary:
      "I translate industry practice into approachable, competency-based instruction, helping students move from raw data to an explanation people can act on.",
    accent: "#8c7bff",
    accentSoft: "#ded8ff",
    metrics: [
      { value: "MTECH", label: "Data Technology course" },
      { value: "Full", label: "data lifecycle" },
      { value: "02", label: "résumé bullets" },
    ],
    chapters: [
      {
        number: "01",
        label: "The goal",
        title: "Make technical confidence repeatable.",
        copy: "Students need more than syntax. I structure coursework around authentic analytical decisions so each competency connects to a reason, an audience, and a deliverable.",
      },
      {
        number: "02",
        label: "The curriculum",
        title: "One lifecycle, many tools.",
        copy: "The course moves through acquisition, cleaning, analysis, modeling, and visualization using Excel, Python, R, SQL, Power BI, and Tableau.",
      },
      {
        number: "03",
        label: "The feedback loop",
        title: "Curriculum that learns, too.",
        copy: "I use student performance to refine the material, aligning exercises and evaluation with the habits learners will need in real data teams.",
      },
    ],
    pipeline: ["Acquisition", "Python / R", "SQL", "Power BI", "Visualization"],
    tools: [
      "Excel",
      "Python",
      "Pandas",
      "Scikit-learn",
      "R",
      "Tidyverse",
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
    effect: "code",
    company: "Corecodec",
    role: "Data Engineer Intern",
    location: "San Antonio, TX",
    dates: "Dec 2023 - Apr 2024",
    eyebrow: "Automation · Evidence pipelines",
    headline: "Building an evidence engine for hard-to-see patterns.",
    summary:
      "I automated the collection and transformation of large-scale unstructured app data so copyright-review teams could surface actionable infringement patterns.",
    accent: "#25c2a0",
    accentSoft: "#bcefe4",
    metrics: [
      { value: "Python", label: "with Selenium" },
      { value: "Pandas", label: "transformation workflows" },
      { value: "openpyxl", label: "Excel reports" },
    ],
    chapters: [
      {
        number: "01",
        label: "The source",
        title: "Unstructured evidence at app-store scale.",
        copy: "The useful signals lived inside large repositories of inconsistent app information. Manual collection would have made broad analysis slow and brittle.",
      },
      {
        number: "02",
        label: "The engine",
        title: "A repeatable Python and Selenium pipeline.",
        copy: "I designed extraction workflows that gathered the source data on a regular cadence, then organized and normalized it for downstream analysis.",
      },
      {
        number: "03",
        label: "The output",
        title: "Patterns delivered where teams worked.",
        copy: "Pandas transformations and automated openpyxl reporting converted raw records into practical Excel outputs for copyright-infringement review.",
      },
    ],
    pipeline: ["App repositories", "Python", "Selenium", "Pandas", "Excel reports"],
    tools: ["Python", "Selenium", "Pandas", "Excel", "openpyxl"],
    resumeBullets: [
      "Designed ETL pipeline architecture using Python and Selenium to regularly extract large-scale unstructured data from app repositories for copyright infringement analysis",
      "Built Pandas-based transformation workflows and automated Excel reports using openpyxl to surface actionable infringement patterns",
    ],
  },
  {
    slug: "rbdc",
    group: "volunteer",
    effect: "research",
    company: "Research & Business Development Center",
    role: "Data Consulting Intern",
    location: "Idaho Falls, ID",
    dates: "Sep 2023 - Dec 2023",
    eyebrow: "Anomaly detection · Research",
    headline: "Finding quality signals inside 200,000 human stories.",
    summary:
      "Working with FamilySearch leadership, I helped turn a large body of participant-submitted information into an anomaly-detection and research workflow.",
    accent: "#e4b23c",
    accentSoft: "#f8e6af",
    metrics: [
      { value: "200k", label: "submissions" },
      { value: "Python", label: "anomaly detection" },
      { value: "Plotly", label: "with Streamlit" },
    ],
    chapters: [
      {
        number: "01",
        label: "The corpus",
        title: "Quality assurance beyond spot checks.",
        copy: "More than 200,000 unstructured submissions made it difficult to identify unusual patterns through manual review alone.",
      },
      {
        number: "02",
        label: "The models",
        title: "In-house anomaly detection, tuned to context.",
        copy: "I collaborated with the client and the research team to deploy Python algorithms that surfaced records worth a closer look.",
      },
      {
        number: "03",
        label: "The research surface",
        title: "From model output to explorable evidence.",
        copy: "Plotly and Streamlit dashboards cross-referenced first-party content, while vectorized text search opened a new research path for the Wildford Woodruff Papers Foundation.",
      },
    ],
    pipeline: ["Submissions", "Python", "Anomaly detection", "Plotly / Streamlit", "Public records"],
    tools: ["Python", "Plotly", "Streamlit", "text vectorization"],
    resumeBullets: [
      "Collaborated with FamilySearch executive leadership to deploy several in-house tuned anomaly detection algorithms in Python, analyzing over 200k submissions of unstructured, participant-submitted information for quality assurance; developed dashboards using Plotly and Streamlit that cross-referenced firm-owned content repositories with public records using text vectorization in Python, improving research capabilities for the Wilford Woodruff Papers Foundation",
    ],
  },
  {
    slug: "wpa",
    group: "experience",
    effect: "political",
    company: "WPA Intelligence",
    role: "Machine Learning Intern",
    location: "SE Washington, DC",
    dates: "Jul 2022 - Nov 2022",
    eyebrow: "Geospatial ML · Civic analytics",
    headline: "Adding geographic context to 100 million voter records.",
    summary:
      "I analyzed national-scale civic data and engineered geographic features that improved how future models understood voter behavior across multiple levels of place.",
    accent: "#4ba6ff",
    accentSoft: "#c9e4ff",
    metrics: [
      { value: "100M", label: "voter records" },
      { value: "12", label: "population density granularities" },
      { value: "1-3%", label: "accuracy and AUC" },
    ],
    chapters: [
      {
        number: "01",
        label: "The scale",
        title: "A national dataset with local behavior.",
        copy: "Voter patterns change with place. I explored more than 100 million records using SQL and R to make demographic and campaign trends easier to understand.",
      },
      {
        number: "02",
        label: "The features",
        title: "Twelve geographic lenses.",
        copy: "I engineered GIS-derived features from U.S. Census Bureau spatial data, classifying voter records into twelve levels of population density.",
      },
      {
        number: "03",
        label: "The lift",
        title: "Context that improved every future model.",
        copy: "The spatial features improved accuracy and AUC by 1–3%, becoming reusable inputs for models of ideological disposition and turnout.",
      },
    ],
    pipeline: ["Voter records", "SQL / R", "GIS data", "12 granularities", "ML models"],
    tools: ["SQL", "R", "tidyverse", "GIS", "US Census Bureau", "sf"],
    resumeBullets: [
      "Analyzed and visualized voter demographic trends using SQL and R’s tidyverse to create digestible reports for hundreds of civic campaigns, training and deploying machine learning models to predict ideological disposition and voter turnout,",
      "Improved accuracy and AUC of all future ML models by 1-3% by feature engineering GIS data to classify over 100 million voter records into 12 population density granularities using US Census Bureau’s geographic spatial data and R’s sf library",
    ],
  },
  {
    slug: "civic-database",
    group: "volunteer",
    effect: "crm",
    company: "County-Level Civic Engagement Organization",
    role: "Database Administrator",
    location: "Saratoga Springs, UT",
    dates: "May 2026 - Present",
    resumeFocus: "Neon CRM",
    eyebrow: "Civic data · CRM administration",
    headline: "Keeping civic engagement data clean, secure, and usable.",
    summary:
      "Administered Neon CRM, maintaining constituent records, user access, data integrity, and system configuration.",
    accent: "#ff5c8a",
    accentSoft: "#ffd6e5",
    metrics: [
      { value: "Neon", label: "CRM administration" },
      { value: "Clean", label: "standardized records" },
      { value: "Access", label: "sensitive information" },
    ],
    chapters: [
      {
        number: "01",
        label: "Administration",
        title: "Constituent data kept dependable.",
        copy: "Administered Neon CRM, maintaining constituent records, user access, data integrity, and system configuration.",
      },
      {
        number: "02",
        label: "Data quality",
        title: "Imported information made consistent.",
        copy: "Imported, cleaned, deduplicated, and standardized contact and contribution data.",
      },
      {
        number: "03",
        label: "Protection",
        title: "Sensitive information handled carefully.",
        copy: "Protected sensitive information through access controls and data-quality practices.",
      },
    ],
    pipeline: ["Import", "Clean", "Deduplicate", "Standardize", "Protect"],
    tools: [
      "Neon CRM",
      "Constituent records",
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

const education = {
  school: "Brigham Young University–Idaho",
  degree: "B.Sc. Data Science, Statistics",
  dates: "Apr 2020 - Dec 2023",
  note: "Soc of Hispanic Professional Engineer Scholarship, President of Data Science Society, Chief Lab Manager",
};

const skillGroups = [
  {
    label: "Python/R",
    items: "pandas, PySpark, numpy, polars, sklearn, TensorFlow/Keras, xgboost, statsmodels, spaCy, selenium, tidyverse",
  },
  {
    label: "Visualization",
    items: "ggplot2, matplotlib, seaborn, plotly, altair, Streamlit, QlikSense, R Shiny, Power BI, Tableau, Mermaid",
  },
  {
    label: "Other Technical Skills",
    items: "SQL, Spark SQL, Excel, Quarto, LaTeX, regex, Agile Workflow (Scrum), Confluence",
  },
  {
    label: "Development",
    items: "Databricks, Jupyter, Spark, Git, GitHub, Docker, Azure",
  },
];

const infoDetails: Record<InfoSlug, InfoDetail> = {
  about: {
    slug: "about",
    hash: "#about",
    eyebrow: "About me",
    title: "Alan J Averett",
    subtitle: "Data Scientist II (Senior Consultant)",
    summary:
      "My résumé spans naval time-series data, analytics instruction, data engineering, anomaly detection, and machine learning.",
    accent: "#ff6a3d",
    accentSoft: "#ffd8c9",
    flag: "AJ",
    effect: "about",
    facts: [
      { label: "Current role", value: "Booz Allen Hamilton" },
      { label: "Education", value: "B.Sc. Data Science, Statistics" },
      { label: "Based near", value: "Salt Lake City, UT" },
    ],
    tags: ["Python", "R", "SQL", "Spark", "Databricks", "Machine Learning"],
  },
  education: {
    slug: "education",
    hash: "#education/byu-idaho",
    eyebrow: "Education",
    title: "Brigham Young University–Idaho",
    subtitle: "B.Sc. Data Science, Statistics",
    summary:
      "Brigham Young University–Idaho · Rexburg, ID · Apr 2020 - Dec 2023",
    accent: "#8c7bff",
    accentSoft: "#ded8ff",
    flag: "BYU-I",
    effect: "graduation",
    facts: [
      { label: "Location", value: "Rexburg, ID" },
      { label: "Dates", value: "Apr 2020 - Dec 2023" },
      {
        label: "Activities",
        value: "President of Data Science Society, Chief Lab Manager",
      },
    ],
    tags: ["Data Science", "Statistics", "Data Science Society", "Lab Manager"],
  },
  scholarship: {
    slug: "scholarship",
    hash: "#recognition/shpe-scholarship",
    eyebrow: "Recognition",
    title: "Soc of Hispanic Professional Engineer Scholarship",
    subtitle: "Education achievement",
    summary:
      "Listed among the achievements earned while completing a B.Sc. in Data Science, Statistics at Brigham Young University–Idaho.",
    accent: "#e4b23c",
    accentSoft: "#f8e6af",
    flag: "★",
    effect: "scholarship",
    facts: [
      {
        label: "Achievement",
        value: "Soc of Hispanic Professional Engineer Scholarship",
      },
      { label: "School", value: "Brigham Young University–Idaho" },
      { label: "Degree", value: "B.Sc. Data Science, Statistics" },
    ],
    tags: ["Scholarship", "Data Science", "Statistics", "Achievement"],
  },
};

const experienceRoles = experiences.filter(
  (experience) => experience.group === "experience",
);
const volunteerRoles = experiences.filter(
  (experience) => experience.group === "volunteer",
);
const resumeRoles = [...experienceRoles, ...volunteerRoles];

const experiencePreviewCopy: Record<string, string> = {
  "booz-allen":
    "Aircraft-carrier readiness · naval time-series data · mission-critical dashboards",
  mountainland:
    "Full data lifecycle · MTECH Data Technology course · student performance evaluation",
  corecodec:
    "Python and Selenium · copyright infringement analysis · automated Excel reports",
  rbdc:
    "200k submissions · anomaly detection · Plotly and Streamlit dashboards",
  wpa: "Voter modeling · hundreds of civic campaigns · 100 million voter records",
  "civic-database":
    "Neon CRM · constituent records · data integrity · access controls",
};

function experiencePreview(experience: Experience): HoverPreviewContent {
  return {
    id: `work-${experience.slug}`,
    eyebrow: experience.role,
    title: experience.company,
    copy: experiencePreviewCopy[experience.slug],
    accent: experience.accent,
    flag: String(
      resumeRoles.findIndex((item) => item.slug === experience.slug) + 1,
    ).padStart(2, "0"),
    effect: experience.effect,
  };
}

function infoPreview(detail: InfoDetail): HoverPreviewContent {
  return {
    id: `info-${detail.slug}`,
    eyebrow: detail.eyebrow,
    title: detail.title,
    copy: detail.summary,
    accent: detail.accent,
    flag: detail.flag,
    effect: detail.effect,
  };
}

function transitionName(name: string): CSSProperties {
  return { viewTransitionName: name } as CSSProperties;
}

function routeFromHash(): DetailRoute {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash;
  const workSlug = hash.replace(/^#work\//, "");

  if (experiences.some((experience) => experience.slug === workSlug)) {
    return { kind: "work", slug: workSlug };
  }

  const detail = Object.values(infoDetails).find((item) => item.hash === hash);
  return detail ? { kind: "info", slug: detail.slug } : null;
}

export default function Home() {
  const [activeRoute, setActiveRoute] = useState<DetailRoute>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const changeView = useCallback((route: DetailRoute) => {
    const update = () => flushSync(() => setActiveRoute(route));

    if (
      "startViewTransition" in document &&
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.startViewTransition(update);
    } else {
      update();
    }
  }, []);

  const openExperience = useCallback(
    (slug: string) => {
      if (activeRoute?.kind === "work" && slug === activeRoute.slug) return;
      window.history.pushState({ work: slug }, "", `#work/${slug}`);
      changeView({ kind: "work", slug });
    },
    [activeRoute, changeView],
  );

  const openInfo = useCallback(
    (slug: InfoSlug) => {
      if (activeRoute?.kind === "info" && slug === activeRoute.slug) return;
      const detail = infoDetails[slug];
      window.history.pushState({ info: slug }, "", detail.hash);
      changeView({ kind: "info", slug });
    },
    [activeRoute, changeView],
  );

  const closeDetail = useCallback(() => {
    if (routeFromHash()) {
      window.history.back();
    } else {
      changeView(null);
    }
  }, [changeView]);

  useEffect(() => {
    const initialRoute = routeFromHash();
    // Hydrate direct hash links only after the browser owns the URL.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initialRoute) setActiveRoute(initialRoute);

    const handlePopState = () => changeView(routeFromHash());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && routeFromHash()) {
        window.history.back();
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changeView]);

  useEffect(() => {
    if (activeRoute) {
      window.setTimeout(() => titleRef.current?.focus(), 250);
    }
  }, [activeRoute]);

  const selected =
    activeRoute?.kind === "work"
      ? experiences.find((experience) => experience.slug === activeRoute.slug)
      : null;

  if (selected) {
    return (
      <CaseStudy
        experience={selected}
        onClose={closeDetail}
        onSelect={openExperience}
        titleRef={titleRef}
      />
    );
  }

  if (activeRoute?.kind === "info") {
    return (
      <InfoStory
        detail={infoDetails[activeRoute.slug]}
        onClose={closeDetail}
        titleRef={titleRef}
      />
    );
  }

  return <Resume onSelect={openExperience} onOpenInfo={openInfo} />;
}

function Resume({
  onSelect,
  onOpenInfo,
}: {
  onSelect: (slug: string) => void;
  onOpenInfo: (slug: InfoSlug) => void;
}) {
  const [hoverPreview, setHoverPreview] =
    useState<HoverPreviewContent | null>(null);

  const previewProps = (preview: HoverPreviewContent) => {
    const show = () => setHoverPreview(preview);

    const hide = () =>
      setHoverPreview((current) => (current?.id === preview.id ? null : current));

    return {
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
    };
  };

  const aboutPreview: HoverPreviewContent = {
    id: "about",
    eyebrow: "About me",
    title: "Alan J Averett",
    copy: "A quick introduction beyond the résumé.",
    accent: infoDetails.about.accent,
    flag: infoDetails.about.flag,
    effect: "about",
  };

  const educationPreview: HoverPreviewContent = {
    id: "education",
    eyebrow: "Education",
    title: education.school,
    copy: `${education.degree} · ${education.dates}`,
    accent: infoDetails.education.accent,
    flag: infoDetails.education.flag,
    effect: "graduation",
  };

  const scholarshipPreview: HoverPreviewContent = {
    id: "scholarship",
    eyebrow: "Recognition",
    title: "Soc of Hispanic Professional Engineer Scholarship",
    copy: "Open the achievement note.",
    accent: infoDetails.scholarship.accent,
    flag: infoDetails.scholarship.flag,
    effect: "scholarship",
  };

  const renderResumeRole = (experience: Experience) => (
    <article className="pdf-experience" key={experience.slug}>
      <button
        className="pdf-role-trigger"
        type="button"
        onClick={() => {
          setHoverPreview(null);
          onSelect(experience.slug);
        }}
        aria-label={`Open the project story for ${experience.role} at ${experience.company}`}
        title={`Open the ${experience.company} project story`}
        {...previewProps(experiencePreview(experience))}
      >
        <span
          className="pdf-company"
          style={transitionName(`company-${experience.slug}`)}
        >
          {experience.company}
        </span>
        <span className="pdf-location">{experience.location}</span>
        <span className="pdf-role">{experience.role}</span>
        <span
          className="pdf-dates"
          style={transitionName(`dates-${experience.slug}`)}
        >
          {experience.dates}
        </span>
        <span className="pdf-open-cue" aria-hidden="true">
          Open story ↗
        </span>
      </button>
      {experience.resumeFocus && (
        <p className="pdf-role-focus">
          <strong>{experience.resumeFocus}:</strong>
        </p>
      )}
      <ul>
        {experience.resumeBullets.map((bullet) => (
          <li key={bullet}>
            <span className="pdf-list-bullet" aria-hidden="true">
              •
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );

  return (
    <main
      className={`pdf-viewer${hoverPreview ? " pdf-viewer--previewing" : ""}`}
    >
      <nav className="pdf-toolbar" aria-label="Résumé document controls">
        <div className="pdf-file">
          <span className="pdf-file-icon" aria-hidden="true">
            PDF
          </span>
          <span className="pdf-file-copy">
            <strong>alan-averett-resume.pdf</strong>
            <small>Hover a blue name and watch the page come alive</small>
          </span>
        </div>
        <span className="pdf-page-count" aria-label="Page 1 of 1">
          1 / 1
        </span>
        <a
          className="pdf-download"
          href="/alan-averett-resume.pdf"
          target="_blank"
          rel="noreferrer"
          aria-label="Open the original résumé PDF"
        >
          <span>Original PDF</span>
          <b aria-hidden="true">↗</b>
        </a>
      </nav>

      <div className="pdf-canvas">
        <article className="pdf-page" aria-labelledby="resume-name">
          <header className="pdf-header">
            <h1 id="resume-name">
              <button
                className="pdf-inline-trigger pdf-name-trigger"
                type="button"
                onClick={() => {
                  setHoverPreview(null);
                  onOpenInfo("about");
                }}
                title="Open About Alan J Averett"
                {...previewProps(aboutPreview)}
              >
                Alan J Averett
              </button>
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
                  <button
                    className="pdf-inline-trigger pdf-education-trigger"
                    type="button"
                    onClick={() => {
                      setHoverPreview(null);
                      onOpenInfo("education");
                    }}
                    title={`Open education details for ${education.school}`}
                    {...previewProps(educationPreview)}
                  >
                    {education.school}
                  </button>
                </h3>
                <p>{education.degree}</p>
              </div>
              <div className="pdf-align-right">
                <p>Rexburg, ID</p>
                <p>{education.dates}</p>
              </div>
            </div>
            <p className="pdf-achievement">
              <span aria-hidden="true">•</span>
              <strong>Achievements:</strong>
              <span>
                <button
                  className="pdf-inline-trigger pdf-achievement-trigger"
                  type="button"
                  onClick={() => {
                    setHoverPreview(null);
                    onOpenInfo("scholarship");
                  }}
                  title="Open scholarship details"
                  {...previewProps(scholarshipPreview)}
                >
                  Soc of Hispanic Professional Engineer Scholarship
                </button>
                , President of Data Science Society, Chief Lab Manager
              </span>
            </p>
          </section>

          <section className="pdf-section pdf-experience-section" aria-labelledby="experience">
            <h2 id="experience">Experience</h2>
            <div className="pdf-experience-list">
              {experienceRoles.map(renderResumeRole)}
            </div>
          </section>

          <section className="pdf-section pdf-volunteer-section" aria-labelledby="volunteer">
            <h2 id="volunteer">Volunteer</h2>
            <div className="pdf-experience-list">
              {volunteerRoles.map(renderResumeRole)}
            </div>
          </section>

          <section className="pdf-section pdf-skills-section" aria-labelledby="skills">
            <h2 id="skills">Skills</h2>
            <ul>
              {skillGroups.map((group) => (
                <li key={group.label}>
                  <strong>{group.label}:</strong> {group.items}
                </li>
              ))}
            </ul>
          </section>

        </article>
      </div>
      {hoverPreview && <ImmersivePreview preview={hoverPreview} />}
    </main>
  );
}

const organicParticles: Record<OrganicEffect, string[]> = {
  about: ["✨", "🧭", "⛵", "☀️", "🌊", "✦"],
  naval: ["CVN", "⚓", "F/A-18", "RADAR", "◆", "〰"],
  books: ["📕", "📗", "📘", "📙", "✏️", "📓"],
  code: ["</>", "{ }", "01", "⌁", "⚙", "✦"],
  research: ["🔎", "📄", "Aa", "✦", "⌕", "•••"],
  political: ["VOTE", "51%", "POLL", "✓", "R", "D"],
  crm: ["CRM", "DB", "ID", "✓", "↻", "◎"],
  graduation: ["🎓", "📚", "✏️", "📘", "✦", "🎓"],
  scholarship: ["⭐", "🏅", "✦", "🎉", "★", "✨"],
};

function ThemeWorld({
  preview,
  context = "preview",
}: {
  preview: HoverPreviewContent;
  context?: "preview" | "case";
}) {
  const particles = Array.from(
    { length: 12 },
    (_, index) => organicParticles[preview.effect][index % 6],
  );

  return (
    <div
      className={`immersive-world immersive-preview--${preview.effect}${
        context === "case" ? " case-theme-world" : ""
      }`}
      style={
        {
          "--preview-accent": preview.accent,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <div className="immersive-glow" />
      <div className="immersive-marquee">
        <span>
          {preview.title} · {preview.title} ·
        </span>
      </div>
      <div className="immersive-route" />
      <div className="immersive-particles">
        {particles.map((particle, index) => (
          <span
            key={`${particle}-${index}`}
            style={
              {
                "--particle-index": index,
                "--particle-x": `${((index * 37) % 94) + 3}%`,
                "--particle-y": `${((index * 53) % 78) + 8}%`,
                "--particle-size": `${26 + ((index * 11) % 26)}px`,
              } as CSSProperties
            }
          >
            {particle}
          </span>
        ))}
      </div>
      <div className="immersive-copy">
        <div className="immersive-kicker">
          <span>{preview.flag}</span>
          <p>{preview.eyebrow}</p>
        </div>
        <strong>{preview.title}</strong>
        <p>{preview.copy}</p>
        <small>
          {context === "preview"
            ? "Click or press Enter to explore"
            : "The hover world, opened"}{" "}
          <b>{context === "preview" ? "↗" : "↓"}</b>
        </small>
      </div>
      <span className="immersive-corner-mark">{preview.flag}</span>
    </div>
  );
}

function ImmersivePreview({ preview }: { preview: HoverPreviewContent }) {
  return (
    <div
      className={`immersive-preview immersive-preview--${preview.effect}`}
      style={{ "--preview-accent": preview.accent } as CSSProperties}
      aria-hidden="true"
    >
      <ThemeWorld preview={preview} />
    </div>
  );
}

function InfoStory({
  detail,
  onClose,
  titleRef,
}: {
  detail: InfoDetail;
  onClose: () => void;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const theme = {
    "--accent": detail.accent,
    "--accent-soft": detail.accentSoft,
  } as CSSProperties;

  return (
    <main
      className={`case-stage info-stage case-stage--${detail.effect}`}
      style={theme}
    >
      <div className="case-grid-bg" aria-hidden="true" />
      <header className="case-topbar">
        <button className="back-button" type="button" onClick={onClose}>
          <span aria-hidden="true">←</span>
          Back to résumé
          <kbd>Esc</kbd>
        </button>
        <span className="case-counter">Interactive profile</span>
        <a className="case-contact" href="mailto:ajaverett0@gmail.com">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <article className="info-shell">
        <section className="info-hero">
          <div className="info-hero-copy">
            <p className="case-eyebrow">{detail.eyebrow}</p>
            <h1 ref={titleRef} tabIndex={-1}>
              {detail.title}
            </h1>
            <h2>{detail.subtitle}</h2>
            <p>{detail.summary}</p>
          </div>
          <ThemeWorld preview={infoPreview(detail)} context="case" />
        </section>

        <section className="info-facts" aria-label={`${detail.title} details`}>
          {detail.facts.map((fact, index) => (
            <article key={fact.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{fact.label}</p>
              <strong>{fact.value}</strong>
            </article>
          ))}
        </section>

        <section className="info-tags" aria-label="Related topics">
          <p>Related to this résumé</p>
          <div>
            {detail.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>

        <footer className="info-footer">
          <p>Return to the document and keep exploring.</p>
          <button className="return-button" type="button" onClick={onClose}>
            Back to résumé <span aria-hidden="true">↗</span>
          </button>
        </footer>
      </article>
    </main>
  );
}

function CaseStudy({
  experience,
  onClose,
  onSelect,
  titleRef,
}: {
  experience: Experience;
  onClose: () => void;
  onSelect: (slug: string) => void;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const theme = {
    "--accent": experience.accent,
    "--accent-soft": experience.accentSoft,
  } as CSSProperties;

  return (
    <main
      className={`case-stage case-stage--${experience.effect}`}
      style={theme}
    >
      <div className="case-grid-bg" aria-hidden="true" />
      <header className="case-topbar">
        <button className="back-button" type="button" onClick={onClose}>
          <span aria-hidden="true">←</span>
          Back to résumé
          <kbd>Esc</kbd>
        </button>
        <span className="case-counter">
          {String(
            resumeRoles.findIndex((item) => item.slug === experience.slug) + 1,
          ).padStart(2, "0")}{" "}
          / {String(resumeRoles.length).padStart(2, "0")}
        </span>
        <a className="case-contact" href="mailto:ajaverett0@gmail.com">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <article className="case-shell">
        <section className="case-hero">
          <div className="case-hero-copy">
            <p className="case-eyebrow">Original résumé wording</p>
            <h1
              ref={titleRef}
              tabIndex={-1}
              style={transitionName(`company-${experience.slug}`)}
            >
              {experience.company}
            </h1>
            <h2>{experience.role}</h2>
            <p className="case-summary">{experience.resumeBullets[0]}</p>
          </div>

          <ThemeWorld preview={experiencePreview(experience)} context="case" />

          <div className="case-meta">
            <div>
              <span>Location</span>
              <strong>{experience.location}</strong>
            </div>
            <div>
              <span>Timeline</span>
              <strong style={transitionName(`dates-${experience.slug}`)}>
                {experience.dates}
              </strong>
            </div>
          </div>
        </section>

        <section className="metric-band" aria-label="Key impact">
          {experience.metrics.map((metric) => (
            <div key={metric.label} className="metric">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
          <p>Context from the original résumé.</p>
        </section>

        <section className="story-section" aria-labelledby="story-heading">
          <div className="story-intro">
            <p>Source of truth</p>
            <h2 id="story-heading">Original résumé wording.</h2>
          </div>
          <div className="chapter-list">
            {experience.resumeBullets.map((bullet, index) => (
              <article className="chapter chapter--resume" key={bullet}>
                <div className="chapter-number">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <p className="chapter-label">Résumé bullet</p>
                <p className="chapter-copy chapter-bullet-copy">
                  <span aria-hidden="true">•</span>
                  <span>{bullet}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="system-section" aria-labelledby="system-heading">
          <div className="system-copy">
            <p>Tools and workflow</p>
            <h2 id="system-heading">Referenced in the résumé.</h2>
            <p>
              This view organizes the technologies and workflow terms used in
              the original résumé.
            </p>
            <div className="tool-list" aria-label="Tools used">
              {experience.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>
          <div className="pipeline" aria-label="Project workflow">
            {experience.pipeline.map((step, index) => (
              <div className="pipeline-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < experience.pipeline.length - 1 && (
                  <i aria-hidden="true">→</i>
                )}
              </div>
            ))}
          </div>
        </section>

        <footer className="case-footer">
          <div>
            <span>Explore another role</span>
            <strong>The career index</strong>
          </div>
          <div className="career-index" aria-label="Career navigation">
            {resumeRoles.map((item, index) => (
              <button
                type="button"
                key={item.slug}
                onClick={() => onSelect(item.slug)}
                aria-pressed={item.slug === experience.slug}
                style={
                  {
                    "--item-accent": item.accent,
                  } as CSSProperties
                }
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.company}</strong>
              </button>
            ))}
          </div>
          <button className="return-button" type="button" onClick={onClose}>
            Return to résumé <span aria-hidden="true">↗</span>
          </button>
        </footer>
      </article>
    </main>
  );
}
