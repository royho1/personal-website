/**
 * Canonical work experience for the Experience section.
 * Featured entries drive the role-first timeline; non-featured appear under
 * "Leadership & other roles". Array order is the display order (explicit; not date-sorted).
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
 * Display order (index 0 first):
 * 1. XLR8 AI
 * 2. JAIKE
 * 3. Legarza Sports and More - Director
 * 4. TechSprint Innovators
 * 5. Legarza Sports and More - Coach
 * 6. The AI Collective
 * 7. Hollister Co.
 * 8. Youth Leadership Institute
 *
 * Featured timeline keeps this relative order among `featured: true` entries.
 */
export const experiences: ExperienceEntry[] = [
  {
    id: "xlr8",
    company: "XLR8 AI",
    dates: "November 2026 – Present",
    location: "San Francisco, CA | On-site | Full-time",
    title: "AI Search Strategist",
    logoSrc: "/experience/XLR8.jpg",
    current: true,
    featured: true,
    bullets: [
      "Working on Generative Engine Optimization (GEO) at an early-stage AI startup in San Francisco, focused on how LLMs retrieve, interpret, and cite sources.",
    ],
  },
  {
    id: "jaike",
    company: "JAIKE",
    companyDetail: "Journal of Artificial Intelligence and Knowledge Engineering",
    dates: "January 2025 – Present",
    location: "Remote | Part-time",
    title: "AI Researcher",
    logoSrc: "/experience/JAIKE.png",
    featured: true,
    bullets: [
      "First-authored a 30-page, 36-source review with Dr. Biren (Brian) Prasad as co-author, introducing a two-axis framework for LLM agent autonomy and oversight, plus a cost model pricing oversight against productivity gains; revise-and-resubmit with publication recommended.",
      "Conducted research on LLM-based automation covering API-driven system design, agent orchestration frameworks, retrieval-augmented generation (RAG), and a consolidated threat model spanning prompt injection, data leakage, and unintended action execution.",
      "Served as a peer reviewer for JAIKE, evaluating submissions on retrieval methods in large language models, reasoning performance in extended tasks, and large-scale model architectures for methodological rigor and evaluation quality.",
    ],
  },
  {
    id: "legarza-director",
    company: "Legarza Sports and More",
    dates: "June 2026 – August 2026",
    location: "San Francisco, CA | Full-time, On-site",
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
    location: "Davis, CA",
    title: "Head of Data Engineering",
    logoSrc: "/experience/TechSprint.png",
    logoOnWhite: true,
    featured: true,
    bullets: [
      "Engineered and automated a daily ETL data pipeline (Python, yfinance, Alpaca API) running on a Raspberry Pi to filter equities, generate structured CSV outputs, and deliver real-time investment signals via Discord webhook.",
      "Built a multi-factor stock screening model using fundamental, technical, and NLP-based sentiment features (FinBERT).",
      "Developed and evaluated a supervised classification model in scikit-learn to predict price appreciation, performing feature selection, model tuning, and performance validation on historical market data.",
    ],
  },
  {
    id: "legarza-coach",
    company: "Legarza Sports and More",
    dates: "June 2025 – August 2025",
    location: "San Francisco, CA | Full-time, On-site",
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
    company: "The AI Collective",
    dates: "September 2024 – April 2025",
    location: "Davis, CA",
    title: "Software Developer",
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
    title: "Brand Representative",
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

const MONTH_ABBR: Record<string, string> = {
  january: "Jan",
  february: "Feb",
  march: "Mar",
  april: "Apr",
  may: "May",
  june: "Jun",
  july: "Jul",
  august: "Aug",
  september: "Sep",
  october: "Oct",
  november: "Nov",
  december: "Dec",
};

const MONTH_INDEX: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

function shortenDatePart(part: string): string {
  const trimmed = part.trim();
  if (/^present$/i.test(trimmed)) return "Present";
  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return trimmed;
  const abbr = MONTH_ABBR[match[1].toLowerCase()];
  return abbr ? `${abbr} ${match[2]}` : trimmed;
}

/** Split "November 2026 – Present" into abbreviated { start, end }. */
export function shortDate(dates: string): { start: string; end: string } {
  const [rawStart = "", rawEnd = ""] = dates.split("–");
  return {
    start: shortenDatePart(rawStart),
    end: shortenDatePart(rawEnd),
  };
}

function parseMonthYear(
  part: string,
  now: Date,
): { year: number; month: number } | null {
  const trimmed = part.trim();
  if (/^present$/i.test(trimmed)) {
    return { year: now.getFullYear(), month: now.getMonth() };
  }
  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (!match) return null;
  const month = MONTH_INDEX[match[1].toLowerCase()];
  if (month === undefined) return null;
  return { year: Number(match[2]), month };
}

/**
 * Inclusive month span from start to end ("Present" = current month).
 * Returns null when under 1 month. Formats as "8 mo", "1 yr", or "1 yr 7 mo".
 */
export function duration(dates: string): string | null {
  const [rawStart = "", rawEnd = ""] = dates.split("–");
  const now = new Date();
  const start = parseMonthYear(rawStart, now);
  const end = parseMonthYear(rawEnd, now);
  if (!start || !end) return null;

  const months = (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (months < 1) return null;

  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (years === 0) return `${rem} mo`;
  if (rem === 0) return `${years} yr`;
  return `${years} yr ${rem} mo`;
}
