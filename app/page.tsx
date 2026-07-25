"use client";

import {
  type CSSProperties,
  type MouseEvent,
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
    role: "Data Scientist II · Senior Consultant",
    location: "Salt Lake City, UT",
    dates: "May 2024 — Present",
    eyebrow: "Fleet intelligence · Data systems",
    headline: "Turning fragmented signals into fleet-ready decisions.",
    summary:
      "I own the path from raw naval time-series data to dependable, decision-ready products—building the pipelines, models, and dashboards that help teams understand readiness.",
    accent: "#ff6a3d",
    accentSoft: "#ffd8c9",
    metrics: [
      { value: "76+", label: "stakeholders served" },
      { value: "E2E", label: "pipeline ownership" },
      { value: "24/7", label: "mission-critical context" },
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
    pipeline: ["Sources", "Bronze", "Silver", "Models", "Qlik"],
    tools: [
      "PySpark",
      "Spark SQL",
      "Python",
      "Databricks",
      "QlikSense",
      "CI/CD",
    ],
    resumeBullets: [
      "Led multi-source naval ETL and medallion architecture in Databricks.",
      "Delivered KPI dashboards for 76+ stakeholders across naval commands.",
      "Developed predictive-maintenance estimates for ship-part failure.",
    ],
  },
  {
    slug: "mountainland",
    company: "Mountainland Technical College",
    role: "Adjunct Faculty Instructor · Part-time",
    location: "Lehi, UT",
    dates: "Jul 2025 — Present",
    eyebrow: "Teaching · Curriculum design",
    headline: "Teaching the whole data lifecycle—not just the tools.",
    summary:
      "I translate industry practice into approachable, competency-based instruction, helping students move from raw data to an explanation people can act on.",
    accent: "#8c7bff",
    accentSoft: "#ded8ff",
    metrics: [
      { value: "7+", label: "core tools taught" },
      { value: "E2E", label: "data lifecycle" },
      { value: "1:1", label: "practice to feedback" },
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
    pipeline: ["Acquire", "Clean", "Analyze", "Model", "Explain"],
    tools: ["Excel", "Python", "R", "SQL", "Power BI", "Tableau", "Scikit-learn"],
    resumeBullets: [
      "Deliver competency-based analytics instruction across the data lifecycle.",
      "Teach Excel, Python, R, SQL, Power BI, Tableau, and modeling workflows.",
      "Refine curriculum using student performance and industry practice.",
    ],
  },
  {
    slug: "corecodec",
    company: "Corecodec",
    role: "Data Engineer Intern",
    location: "San Antonio, TX",
    dates: "Dec 2023 — Apr 2024",
    eyebrow: "Automation · Evidence pipelines",
    headline: "Building an evidence engine for hard-to-see patterns.",
    summary:
      "I automated the collection and transformation of large-scale unstructured app data so copyright-review teams could surface actionable infringement patterns.",
    accent: "#25c2a0",
    accentSoft: "#bcefe4",
    metrics: [
      { value: "Auto", label: "repeatable extraction" },
      { value: "Pandas", label: "transformation layer" },
      { value: "XLSX", label: "decision output" },
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
    pipeline: ["Apps", "Selenium", "Python", "Pandas", "Reports"],
    tools: ["Python", "Selenium", "Pandas", "openpyxl", "Excel"],
    resumeBullets: [
      "Designed an automated Python and Selenium extraction architecture.",
      "Processed large-scale unstructured app-repository data.",
      "Built Pandas transformations and automated Excel reports.",
    ],
  },
  {
    slug: "rbdc",
    company: "Research & Business Development Center",
    role: "Data Consulting Intern",
    location: "Idaho Falls, ID",
    dates: "Sep 2023 — Dec 2023",
    eyebrow: "Anomaly detection · Research",
    headline: "Finding quality signals inside 200,000 human stories.",
    summary:
      "Working with FamilySearch leadership, I helped turn a large body of participant-submitted information into an anomaly-detection and research workflow.",
    accent: "#e4b23c",
    accentSoft: "#f8e6af",
    metrics: [
      { value: "200k+", label: "submissions analyzed" },
      { value: "2", label: "interactive apps" },
      { value: "NLP", label: "text research layer" },
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
    pipeline: ["Stories", "Vectors", "Anomalies", "Review", "Research"],
    tools: ["Python", "Plotly", "Streamlit", "NLP", "Vectorization"],
    resumeBullets: [
      "Analyzed 200k+ unstructured submissions with anomaly-detection models.",
      "Built Plotly and Streamlit quality-assurance dashboards.",
      "Developed vectorized text-search research capabilities.",
    ],
  },
  {
    slug: "wpa",
    company: "WPA Intelligence",
    role: "Machine Learning Intern",
    location: "SE Washington, DC",
    dates: "Jul 2022 — Nov 2022",
    eyebrow: "Geospatial ML · Civic analytics",
    headline: "Adding geographic context to 100 million voter records.",
    summary:
      "I analyzed national-scale civic data and engineered geographic features that improved how future models understood voter behavior across multiple levels of place.",
    accent: "#4ba6ff",
    accentSoft: "#c9e4ff",
    metrics: [
      { value: "100M+", label: "voter records" },
      { value: "12", label: "spatial levels" },
      { value: "1–3%", label: "accuracy & AUC lift" },
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
    pipeline: ["Records", "Census GIS", "12 Levels", "Models", "Reports"],
    tools: ["R", "SQL", "sf", "Tidyverse", "GIS", "Machine Learning"],
    resumeBullets: [
      "Analyzed and visualized demographic trends across civic campaigns.",
      "Engineered GIS features for more than 100 million voter records.",
      "Improved future model accuracy and AUC by 1–3%.",
    ],
  },
];

const education = {
  school: "Brigham Young University—Idaho",
  degree: "B.Sc. Data Science, Statistics",
  dates: "Apr 2020 — Dec 2023",
  note: "President, Data Science Society · Chief Lab Manager",
};

const skillGroups = [
  {
    label: "Languages",
    items: "Python, R, SQL, Spark SQL",
  },
  {
    label: "Data systems",
    items: "Databricks, Spark, Azure, Docker",
  },
  {
    label: "Visualization",
    items: "QlikSense, Plotly, Power BI, Tableau",
  },
  {
    label: "Modeling",
    items: "Scikit-learn, TensorFlow, XGBoost, spaCy",
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
    <main className="resume-stage">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <nav className="utility-bar" aria-label="Résumé actions">
        <a className="brand-lockup" href="#" aria-label="Alan Averett, home">
          <span className="brand-mark">AJ</span>
          <span>
            <strong>Alan Averett</strong>
            <small>Interactive résumé</small>
          </span>
        </a>
        <p className="explore-hint">
          <span className="hint-pulse" aria-hidden="true" />
          Select a role to go beneath the bullet points
        </p>
        <a
          className="download-link"
          href="/alan-averett-resume.pdf"
          target="_blank"
          rel="noreferrer"
        >
          PDF
          <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <article className="resume-paper" aria-labelledby="resume-name">
        <header className="resume-header">
          <p className="resume-kicker">Data scientist · Builder · Educator</p>
          <div className="resume-name-row">
            <h1 id="resume-name">Alan J. Averett</h1>
            <p>
              I build data systems that make complex signals useful—from naval
              readiness to classrooms and national-scale civic data.
            </p>
          </div>
          <div className="contact-row">
            <a href="mailto:ajaverett0@gmail.com">ajaverett0@gmail.com</a>
            <a href="tel:+18328564666">832.856.4666</a>
            <a
              href="https://www.linkedin.com/in/ajaverett"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <span>Salt Lake City, UT</span>
          </div>
        </header>

        <div className="resume-grid">
          <section className="experience-section" aria-labelledby="experience">
            <div className="section-heading">
              <h2 id="experience">Experience</h2>
              <span>05 selected roles</span>
            </div>
            <div className="experience-list">
              {experiences.map((experience, index) => (
                <button
                  className="experience-row"
                  key={experience.slug}
                  type="button"
                  onClick={() => onSelect(experience.slug)}
                  aria-label={`Explore ${experience.role} at ${experience.company}`}
                  style={
                    {
                      "--role-accent": experience.accent,
                      "--role-accent-soft": experience.accentSoft,
                    } as CSSProperties
                  }
                >
                  <span className="experience-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="experience-main">
                    <span
                      className="experience-company"
                      style={transitionName(`company-${experience.slug}`)}
                    >
                      {experience.company}
                    </span>
                    <span className="experience-role">{experience.role}</span>
                    <span className="experience-bullet">
                      {experience.resumeBullets[0]}
                    </span>
                  </span>
                  <span className="experience-meta">
                    <span style={transitionName(`dates-${experience.slug}`)}>
                      {experience.dates}
                    </span>
                    <span>{experience.location}</span>
                    <span className="open-label">
                      Open story <b aria-hidden="true">↗</b>
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <aside className="resume-sidebar">
            <section aria-labelledby="education">
              <div className="section-heading">
                <h2 id="education">Education</h2>
              </div>
              <h3>{education.school}</h3>
              <p>{education.degree}</p>
              <p className="muted">{education.dates}</p>
              <p className="sidebar-note">{education.note}</p>
            </section>

            <section aria-labelledby="skills">
              <div className="section-heading">
                <h2 id="skills">Toolbox</h2>
              </div>
              <div className="skills-list">
                {skillGroups.map((group) => (
                  <div key={group.label}>
                    <h3>{group.label}</h3>
                    <p>{group.items}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="resume-footnote" aria-label="Résumé note">
              <span className="footnote-mark">*</span>
              <p>
                The concise version is here. The interesting version is one
                click deeper.
              </p>
            </section>
          </aside>
        </div>
      </article>

      <p className="stage-caption">
        Designed as a résumé. Built to be explored.
      </p>
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
            <p className="case-eyebrow">{experience.eyebrow}</p>
            <h1
              ref={titleRef}
              tabIndex={-1}
              style={transitionName(`company-${experience.slug}`)}
            >
              {experience.company}
            </h1>
            <p className="case-role">{experience.role}</p>
            <h2>{experience.headline}</h2>
            <p className="case-summary">{experience.summary}</p>
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
          <p>Selected signals—not vanity metrics.</p>
        </section>

        <section className="story-section" aria-labelledby="story-heading">
          <div className="story-intro">
            <p>Under the bullet points</p>
            <h2 id="story-heading">How the work moved.</h2>
          </div>
          <div className="chapter-list">
            {experience.chapters.map((chapter) => (
              <article className="chapter" key={chapter.number}>
                <div className="chapter-number">{chapter.number}</div>
                <p className="chapter-label">{chapter.label}</p>
                <h3>{chapter.title}</h3>
                <p className="chapter-copy">{chapter.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="system-section" aria-labelledby="system-heading">
          <div className="system-copy">
            <p>System view</p>
            <h2 id="system-heading">From input to impact.</h2>
            <p>
              The architecture changes by role. The pattern stays consistent:
              understand the signal, build the path, make the result legible.
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
