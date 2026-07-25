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
  company: string;
  role: string;
  location: string;
  dates: string;
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

const experiences: Experience[] = [
  {
    slug: "booz-allen",
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
      "Collaborated with FamilySearch executive leadership to deploy several in-house tuned anomaly detection algorithms in Python, analyzing over 200k submissions of unstructured, participant-submitted information for quality assurance",
      "Developed dashboards using Plotly and Streamlit that cross-referenced firm-owned content repositories with public records using text vectorization in Python, improving research capabilities for the Wilford Woodruff Papers Foundation",
    ],
  },
  {
    slug: "wpa",
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

function transitionName(name: string): CSSProperties {
  return { viewTransitionName: name } as CSSProperties;
}

function slugFromHash() {
  if (typeof window === "undefined") return null;
  const slug = window.location.hash.replace(/^#work\//, "");
  return experiences.some((experience) => experience.slug === slug)
    ? slug
    : null;
}

export default function Home() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const changeView = useCallback((slug: string | null) => {
    const update = () => flushSync(() => setSelectedSlug(slug));

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
      if (slug === selectedSlug) return;
      window.history.pushState({ work: slug }, "", `#work/${slug}`);
      changeView(slug);
    },
    [changeView, selectedSlug],
  );

  const closeExperience = useCallback(() => {
    if (slugFromHash()) {
      window.history.back();
    } else {
      changeView(null);
    }
  }, [changeView]);

  useEffect(() => {
    const initialSlug = slugFromHash();
    // Hydrate direct hash links only after the browser owns the URL.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initialSlug) setSelectedSlug(initialSlug);

    const handlePopState = () => changeView(slugFromHash());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && slugFromHash()) {
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
    if (selectedSlug) {
      window.setTimeout(() => titleRef.current?.focus(), 250);
    }
  }, [selectedSlug]);

  const selected = experiences.find(
    (experience) => experience.slug === selectedSlug,
  );

  if (selected) {
    return (
      <CaseStudy
        experience={selected}
        onClose={closeExperience}
        onSelect={openExperience}
        titleRef={titleRef}
      />
    );
  }

  return <Resume onSelect={openExperience} />;
}

function Resume({
  onSelect,
}: {
  onSelect: (slug: string) => void;
}) {
  return (
    <main className="pdf-viewer">
      <nav className="pdf-toolbar" aria-label="Résumé document controls">
        <div className="pdf-file">
          <span className="pdf-file-icon" aria-hidden="true">
            PDF
          </span>
          <span className="pdf-file-copy">
            <strong>alan-averett-resume.pdf</strong>
            <small>Click a blue employer to open its project story</small>
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
            <h1 id="resume-name">Alan J Averett</h1>
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
                <h3>{education.school}</h3>
                <p>{education.degree}</p>
              </div>
              <div className="pdf-align-right">
                <p>Rexburg, ID</p>
                <p>{education.dates}</p>
              </div>
            </div>
            <p className="pdf-achievement">
              <span aria-hidden="true">•</span>
              <strong>Achievements:</strong> {education.note}
            </p>
          </section>

          <section className="pdf-section pdf-experience-section" aria-labelledby="experience">
            <h2 id="experience">Experience</h2>
            <div className="pdf-experience-list">
              {experiences.map((experience) => (
                <article className="pdf-experience" key={experience.slug}>
                  <button
                    className="pdf-role-trigger"
                    type="button"
                    onClick={() => onSelect(experience.slug)}
                    aria-label={`Open the project story for ${experience.role} at ${experience.company}`}
                    title={`Open the ${experience.company} project story`}
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
              ))}
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

          <footer className="pdf-page-footer">
            Interactive document · Blue employer names open the work behind the résumé
          </footer>
        </article>
      </div>
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
    <main className="case-stage" style={theme}>
      <div className="case-grid-bg" aria-hidden="true" />
      <header className="case-topbar">
        <button className="back-button" type="button" onClick={onClose}>
          <span aria-hidden="true">←</span>
          Back to résumé
          <kbd>Esc</kbd>
        </button>
        <span className="case-counter">
          {String(
            experiences.findIndex((item) => item.slug === experience.slug) + 1,
          ).padStart(2, "0")}{" "}
          / {String(experiences.length).padStart(2, "0")}
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

          <div className="signal-card" aria-label="Data signal illustration">
            <div className="signal-card-head">
              <span>Signal / output</span>
              <span>Live narrative</span>
            </div>
            <div className="signal-field" aria-hidden="true">
              {Array.from({ length: 48 }, (_, index) => (
                <span
                  key={index}
                  style={
                    {
                      "--height": `${18 + ((index * 31) % 76)}%`,
                      "--delay": `${(index % 12) * -0.12}s`,
                    } as CSSProperties
                  }
                />
              ))}
              <div className="signal-line" />
              <div className="signal-orbit signal-orbit-one" />
              <div className="signal-orbit signal-orbit-two" />
            </div>
            <div className="signal-caption">
              <span className="signal-dot" />
              <p>
                Raw complexity
                <strong>→</strong>
                Useful decision
              </p>
            </div>
          </div>

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
            {experiences.map((item, index) => (
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
