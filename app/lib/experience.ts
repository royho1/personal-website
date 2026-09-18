/**
 * Canonical work experience for the Experience section.
 * Featured Experience filters to `featured: true`; Full Timeline shows all.
 * Array order is the Full Timeline display order (explicit; not date-sorted).
 */

export type ExperienceEntry = {
  id: string;
  company: string;
  /** Optional subtitle under the company name (e.g. full org name). */
  companyDetail?: string;
  dates?: string;
  /** Optional location / work arrangement line under the role title. */
  location?: string;
  title?: string;
  bullets: string[];
  logoSrc?: string;
  /** White padding behind logo (used by TechSprint). */
  logoOnWhite?: boolean;
  /** Emphasized timeline dot (current / top technical role). */
  current?: boolean;
  featured: boolean;
};

/**
 * Full Timeline order (index 0 first):
 * 1. JAIKE
 * 2. Legarza Sports and More - Director
 * 3. TechSprint Innovators
 * 4. Legarza Sports and More - Coach
 * 5. AI Student Collective
 * 6. Hollister Co.
 * 7. Youth Leadership Institute
 *
 * Featured view keeps this relative order among `featured: true` entries.
 */
export const experiences: ExperienceEntry[] = [
  {
    id: "jaike",
    company: "JAIKE",
    companyDetail: "Journal of Artificial Intelligence and Knowledge Engineering",
    dates: "January 2025 – Present",
    title: "Artificial Intelligence Researcher",
    logoSrc: "/experience/JAIKE.png",
    current: true,
    featured: true,
    bullets: [
      "Conducted research on LLM-based automation covering API-driven system design, agent orchestration frameworks, retrieval-augmented generation (RAG), and a consolidated threat model spanning prompt injection, data leakage, and unintended action execution.",
      "First-authored a 30-page, 36-source review with Dr. Biren (Brian) Prasad as co-author, introducing a two-axis framework for LLM agent autonomy and oversight, plus a cost model pricing oversight against productivity gains; revise-and-resubmit with publication recommended.",
      "Served as a peer reviewer for JAIKE, evaluating submissions on retrieval methods in large language models, reasoning performance in extended tasks, and large-scale model architectures for methodological rigor and evaluation quality.",
    ],
  },
  {
    id: "legarza-director",
    company: "Legarza Sports and More",
    dates: "June 2026 – August 2026",
    location: "San Francisco, CA | On-site",
    title: "Director",
    logoSrc: "/experience/Legarza.jpg",
    featured: false,
    bullets: [
      "Returned to Legarza Sports and More in 2026 in an expanded leadership role, overseeing daily camp operations and a team of coaches.",
      "Managed program logistics and scheduling to maintain a safe, organized experience for campers and families.",
      "Mentored coaching staff on camper engagement, safety protocols, and activity leadership across multiple sports groups.",
    ],
  },
  {
    id: "techsprint",
    company: "TechSprint Innovators",
    dates: "March 2024 – September 2025",
    title: "Head of Data Engineering",
    logoSrc: "/experience/TechSprint.png",
    logoOnWhite: true,
    featured: true,
    bullets: [
      "Built a multi-factor stock screening model using fundamental, technical, and NLP-based sentiment features (FinBERT).",
      "Developed and evaluated a supervised classification model in scikit-learn to predict price appreciation, performing feature selection, model tuning, and performance validation on historical market data.",
      "Engineered and automated a daily ETL data pipeline (Python, yfinance, Alpaca API) running on a Raspberry Pi to filter equities, generate structured CSV outputs, and deliver real-time investment signals via Discord webhook.",
    ],
  },
  {
    id: "legarza-coach",
    company: "Legarza Sports and More",
    dates: "June 2025 – August 2025",
    location: "San Francisco, CA | Part-time, On-site",
    title: "Coach",
    logoSrc: "/experience/Legarza.jpg",
    featured: false,
    bullets: [
      "Coached and mentored groups of 15-20 children ages 6-12 across basketball, soccer, football, and other team-oriented activities.",
      "Adapted activities and communication in fast-paced camp settings to maintain camper safety, engagement, confidence, and inclusion.",
    ],
  },
  {
    id: "aisc",
    company: "AISC",
    companyDetail: "AI Student Collective",
    dates: "September 2024 – April 2025",
    title: "General Member",
    logoSrc: "/experience/AISC.jpg",
    featured: true,
    bullets: [
      "Built machine learning models for stroke risk prediction and real-time drowsy driver detection within structured project cycles.",
      "Performed data preprocessing, feature engineering, model development, evaluation, and project presentations.",
      "Worked within quarter-long sprint cycles with defined milestones, code reviews, and final project demos, following structured machine learning development workflows from ideation to deployment.",
    ],
  },
  {
    id: "hollister",
    company: "Hollister Co.",
    dates: "June 2023 – September 2023",
    location: "San Francisco, CA | Full-time, On-site",
    title: "Hollister Brand Representative",
    logoSrc: "/experience/Hollister.png",
    featured: false,
    bullets: [
      "Assisted customers with product selection, purchases, returns, and register transactions while supporting store sales goals.",
      "Maintained merchandise displays and inventory through stocking, replenishment, organization, and ongoing store upkeep.",
    ],
  },
  {
    id: "yli",
    company: "Youth Leadership Institute",
    dates: "August 2018 – June 2022",
    location: "San Francisco, CA | Internship, On-site",
    title: "Program Officer",
    logoSrc: "/experience/YLI.png",
    featured: false,
    bullets: [
      "Managed the distribution of over $70,000 in San Francisco public funds annually among youth groups developing projects addressing social justice issues.",
      "Worked with funded groups on financially sustainable projects spanning academic improvement, athletics, and rehabilitation programs that reached more than 8,000 youth citywide.",
      "Compiled project, financial, demographic, and impact data into reports presented to a board of officers while supporting school outreach and brand marketing campaigns.",
    ],
  },
];

export type ExperienceView = "featured" | "full";

export function experiencesForView(view: ExperienceView): ExperienceEntry[] {
  if (view === "featured") {
    return experiences.filter((entry) => entry.featured);
  }
  return experiences;
}
