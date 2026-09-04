"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ChartColumn,
  Clapperboard,
  HeartPulse,
  MapPin,
  Network,
  Scale,
  Sparkles,
  Star,
  TrendingUp,
  Wine,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import DrowsyEyeIcon from "./DrowsyEyeIcon";
import FadeInSection from "./FadeInSection";
import ProjectModal, { type ProjectModalData } from "./ProjectModal";
import StatusBadge from "./StatusBadge";
import {
  FILTERS,
  emitProjectsFilter,
  subscribeToProjectsFilter,
  type Filter,
  type Tag,
} from "./projectsFilterBus";
import {
  JOB_MARKET_ANALYTICS_DASHBOARD_MEDIA,
  PROJECT_IMAGE_FILES,
  SF_RESTAURANT_SAFETY_MAP_MEDIA,
  projectMedia,
  type ProjectMediaSlide,
} from "../lib/projectImages";

type FeaturedProjectIconVariant = "eye" | "bars" | "heart" | "mapPin";

type AdditionalProjectIconVariant =
  | "sparkles"
  | "heart"
  | "wine"
  | "trending"
  | "chart"
  | "clapperboard"
  | "network"
  | "scale";

type ProjectMediaFields = {
  imageSrc?: string;
  imageAlt?: string;
  demoHref?: string;
  /** Modal-only screenshots; card front always uses the icon fallback. */
  media?: ProjectMediaSlide[];
  liveDemo?: "drowsy-driver";
};

type FeaturedProject = ProjectMediaFields & {
  title: string;
  description: string;
  tech: string;
  githubHref: string;
  iconVariant: FeaturedProjectIconVariant;
  gradient: string;
  award?: string;
  tags: Tag[];
};

type AdditionalProject = ProjectMediaFields & {
  name: string;
  description: string;
  tech: string;
  tags: Tag[];
  githubHref?: string;
  status?: string;
  iconVariant: AdditionalProjectIconVariant;
  gradient: string;
};

const featuredProjects: FeaturedProject[] = [
  {
    title: "SF Restaurant Safety Map",
    description:
      "Full-stack map of 20,000+ health inspections across 7,700+ San Francisco restaurants from the DataSF feed, with a Python ETL pipeline into SQLite, a Flask REST API, and a React + Mapbox frontend for search, filters, and inspection details.",
    tech: "Python, SQL, Flask, React, Mapbox, ETL, Docker, SQLite",
    githubHref: "https://github.com/royho1/sf-restaurant-safety-map",
    iconVariant: "mapPin",
    gradient:
      "from-teal-100 via-white to-cyan-100 dark:from-teal-900 dark:via-teal-950 dark:to-cyan-900",
    tags: ["Python", "SQL", "Data Visualization"],
    media: SF_RESTAURANT_SAFETY_MAP_MEDIA,
  },
  {
    title: "Job Market Analytics Dashboard",
    description:
      "Group capstone dashboard analyzing 23,000+ job posting records, deduplicated to 6,800+ unique postings from 2,300+ companies. Owned the JobSpy and Selenium scrapers and a TF-IDF resume matching engine.",
    tech: "Python, Flask, scikit-learn, TF-IDF, Selenium, JobSpy",
    githubHref: "https://github.com/royho1/job-market-analysis-dashboard",
    iconVariant: "bars",
    gradient:
      "from-emerald-100 via-white to-sky-100 dark:from-emerald-900 dark:via-emerald-950 dark:to-sky-900",
    tags: ["Python", "NLP", "Data Visualization", "Machine Learning"],
    media: JOB_MARKET_ANALYTICS_DASHBOARD_MEDIA,
  },
  {
    title: "Drowsy Driver Detection",
    description:
      "Built a real-time drowsiness detection system using dlib facial landmarks and Eye Aspect Ratio thresholding, with an OpenCV pipeline and a pygame audio alert. Open this card to try a browser version of the same EAR alert loop.",
    tech: "Python, OpenCV, dlib, scipy, pygame",
    githubHref: "https://github.com/royho1/drowsy-driver-detection",
    iconVariant: "eye",
    gradient:
      "from-sky-100 via-white to-cyan-100 dark:from-sky-900 dark:via-sky-950 dark:to-cyan-900",
    award: "Award Winner: Best Execution",
    tags: ["Python", "Machine Learning"],
    liveDemo: "drowsy-driver",
  },
];

const additionalProjects: AdditionalProject[] = [
  {
    name: "Solstice",
    description:
      "Sneaker resale analytics tool that identifies shoes from photos, grades condition, and tracks resale market prices over time. Currently in design and early build.",
    tech: "Python, FastAPI, PostgreSQL, React, TypeScript",
    tags: ["Python", "SQL", "Machine Learning"],
    status: "In Progress",
    iconVariant: "sparkles",
    gradient:
      "from-violet-100 via-white to-sky-100 dark:from-violet-900 dark:via-violet-950 dark:to-sky-900",
    ...projectMedia(
      PROJECT_IMAGE_FILES.solstice,
      "Preview of the Solstice sneaker analytics concept",
    ),
  },
  {
    name: "Heart Stroke Risk Prediction",
    description:
      "Machine learning model to predict stroke risk from healthcare data, with preprocessing, training, and an interactive Streamlit app.",
    tech: "Python, scikit-learn, Streamlit",
    tags: ["Python", "Machine Learning"],
    githubHref: "https://github.com/royho1/heart-stroke-risk-prediction",
    iconVariant: "heart",
    gradient:
      "from-rose-100 via-white to-orange-100 dark:from-rose-900 dark:via-rose-950 dark:to-orange-900",
    ...projectMedia(
      PROJECT_IMAGE_FILES.heartStrokeRiskPrediction,
      "Screenshot of the heart stroke risk Streamlit app",
    ),
  },
  {
    name: "Portuguese Wine Type and Quality Prediction",
    description:
      "Classified red vs. white wines at 98.3% accuracy and predicted quality ratings using logistic regression, LDA, MANOVA, and PCA on chemical properties.",
    tech: "Python, scikit-learn, PCA",
    tags: ["Python", "Machine Learning"],
    githubHref: "https://github.com/royho1/wine-quality-classification",
    iconVariant: "wine",
    gradient:
      "from-purple-100 via-white to-rose-100 dark:from-purple-900 dark:via-purple-950 dark:to-rose-900",
    ...projectMedia(
      PROJECT_IMAGE_FILES.wineQualityClassification,
      "Chart from the Portuguese wine classification project",
    ),
  },
  {
    name: "Stock Trading Algorithm",
    description:
      "Built a multi-factor stock screening model with NLP sentiment analysis (FinBERT), supervised classification, and an automated daily ETL pipeline delivering real-time investment signals.",
    tech: "Python, scikit-learn, NLP, ETL",
    tags: ["Python", "NLP", "Machine Learning"],
    iconVariant: "trending",
    gradient:
      "from-emerald-100 via-white to-lime-100 dark:from-emerald-900 dark:via-emerald-950 dark:to-lime-900",
    ...projectMedia(
      PROJECT_IMAGE_FILES.stockTradingAlgorithm,
      "Chart from the stock trading algorithm project",
    ),
  },
  {
    name: "NBA Player Performance Prediction",
    description:
      "Predicted 5th-season NBA player performance using regression and classification models on historical stats and draft data.",
    tech: "Python, Random Forest, Gradient Boosting",
    tags: ["Python", "Machine Learning"],
    githubHref: "https://github.com/royho1/nba-player-prediction",
    iconVariant: "chart",
    gradient:
      "from-orange-100 via-white to-amber-100 dark:from-orange-900 dark:via-orange-950 dark:to-amber-900",
    ...projectMedia(
      PROJECT_IMAGE_FILES.nbaPlayerPrediction,
      "Model results from the NBA player performance project",
    ),
  },
  {
    name: "Analyzing Movie Reviews Across Genres",
    description:
      "Compared IMDb audience reviews against professional critic reviews across five genres. Built the critic rating extraction pipeline and fit a RoBERTa sentiment classifier that outperformed the VADER baseline.",
    tech: "Python, Selenium, VADER, RoBERTa",
    tags: ["Python", "NLP", "Machine Learning", "Data Visualization"],
    githubHref: "https://github.com/royho1/movie-reviews-analysis",
    iconVariant: "clapperboard",
    gradient:
      "from-slate-100 via-white to-sky-100 dark:from-slate-800 dark:via-slate-900 dark:to-sky-900",
    ...projectMedia(
      PROJECT_IMAGE_FILES.movieReviewsAnalysis,
      "Visualization from the movie reviews analysis project",
    ),
  },
  {
    name: "Drake Time Series Analysis",
    description:
      "Forecasted Drake's popularity trends using 14 years of Google Trends data with ARMA and ARIMA models.",
    tech: "R, forecast, ggplot2",
    tags: ["R", "Data Visualization"],
    githubHref: "https://github.com/royho1/drake-time-series-project",
    iconVariant: "trending",
    gradient:
      "from-sky-100 via-white to-indigo-100 dark:from-sky-900 dark:via-sky-950 dark:to-indigo-900",
    ...projectMedia(
      PROJECT_IMAGE_FILES.drakeTimeSeries,
      "Forecast plot from the Drake time series analysis",
    ),
  },
  {
    name: "NBA Player Salary Analysis",
    description:
      "Analyzed the relationship between player performance metrics and salary structures using regression and clustering.",
    tech: "R, tidyverse, ggplot2",
    tags: ["R", "Data Visualization", "Machine Learning"],
    githubHref: "https://github.com/royho1/nba-salary-analysis",
    iconVariant: "chart",
    gradient:
      "from-amber-100 via-white to-orange-100 dark:from-amber-900 dark:via-amber-950 dark:to-orange-900",
    ...projectMedia(
      PROJECT_IMAGE_FILES.nbaSalaryAnalysis,
      "ggplot output from the NBA salary analysis",
    ),
  },
  {
    name: "Socioeconomic Predictors of Crime Rates",
    description:
      "Modeled the relationship between poverty, unemployment, and crime rates using multiple linear regression and model selection.",
    tech: "R, ANOVA, AIC/BIC",
    tags: ["R", "Data Visualization"],
    githubHref:
      "https://github.com/royho1/socioeconomic-predictors-of-crime-rates",
    iconVariant: "scale",
    gradient:
      "from-stone-100 via-white to-sky-100 dark:from-stone-800 dark:via-stone-900 dark:to-sky-900",
    ...projectMedia(
      PROJECT_IMAGE_FILES.socioeconomicCrimeRates,
      "Regression plot from the socioeconomic crime rates project",
    ),
  },
  {
    name: "Graph-Based Shortest Path Analysis (Six Degrees of Kevin Bacon)",
    description:
      "Built a graph traversal algorithm to compute degrees of separation between actors through shared movie appearances.",
    tech: "Python, BFS, Graph Algorithms",
    tags: ["Python"],
    githubHref: "https://github.com/royho1/six-degrees-kevin-bacon",
    iconVariant: "network",
    gradient:
      "from-cyan-100 via-white to-teal-100 dark:from-cyan-900 dark:via-cyan-950 dark:to-teal-900",
    ...projectMedia(
      PROJECT_IMAGE_FILES.sixDegreesKevinBacon,
      "Graph traversal output from the Kevin Bacon project",
    ),
  },
];

function MapPinDropIcon({ className = "h-14 w-14" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  const pin = (
    <MapPin
      className={`${className} text-emerald-500 dark:text-emerald-400`}
      strokeWidth={1.75}
      aria-hidden
    />
  );

  if (prefersReducedMotion) {
    return pin;
  }

  return (
    <motion.div
      aria-hidden
      animate={{ y: [0, 0, -7, 0] }}
      transition={{
        duration: 2.2,
        times: [0, 0.72, 0.86, 1],
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      {pin}
    </motion.div>
  );
}

function FeaturedProjectIcon({
  variant,
  size = "lg",
}: {
  variant: FeaturedProjectIconVariant;
  size?: "sm" | "lg";
}) {
  const iconClass = size === "lg" ? "h-14 w-14" : "h-9 w-9";

  if (variant === "bars") {
    return (
      <div
        className={`flex items-end justify-center gap-1 text-sky-600 dark:text-sky-400 ${
          size === "lg" ? "h-14 w-14" : "h-9 w-9"
        }`}
        aria-hidden
      >
        <span
          className={`origin-bottom rounded-sm bg-current animate-bar-grow-1 ${
            size === "lg" ? "h-6 w-3" : "h-4 w-2"
          }`}
        />
        <span
          className={`origin-bottom rounded-sm bg-current animate-bar-grow-2 ${
            size === "lg" ? "h-12 w-3" : "h-8 w-2"
          }`}
        />
        <span
          className={`origin-bottom rounded-sm bg-current animate-bar-grow-3 ${
            size === "lg" ? "h-9 w-3" : "h-6 w-2"
          }`}
        />
      </div>
    );
  }

  if (variant === "heart") {
    return (
      <HeartPulse
        className={`${iconClass} origin-center text-rose-600 animate-heartbeat dark:text-rose-400`}
        strokeWidth={1.75}
        aria-hidden
      />
    );
  }

  if (variant === "mapPin") {
    return <MapPinDropIcon className={iconClass} />;
  }

  return <DrowsyEyeIcon />;
}

function AdditionalProjectIcon({
  variant,
  size = "sm",
}: {
  variant: AdditionalProjectIconVariant;
  size?: "sm" | "lg";
}) {
  const iconClass = size === "lg" ? "h-14 w-14" : "h-9 w-9";
  const stroke = 1.75;

  switch (variant) {
    case "sparkles":
      return (
        <Sparkles
          className={`${iconClass} text-violet-500 dark:text-violet-400`}
          strokeWidth={stroke}
          aria-hidden
        />
      );
    case "heart":
      return (
        <HeartPulse
          className={`${iconClass} origin-center text-rose-600 animate-heartbeat dark:text-rose-400`}
          strokeWidth={stroke}
          aria-hidden
        />
      );
    case "wine":
      return (
        <Wine
          className={`${iconClass} text-purple-600 dark:text-purple-400`}
          strokeWidth={stroke}
          aria-hidden
        />
      );
    case "trending":
      return (
        <TrendingUp
          className={`${iconClass} text-emerald-600 dark:text-emerald-400`}
          strokeWidth={stroke}
          aria-hidden
        />
      );
    case "chart":
      return (
        <ChartColumn
          className={`${iconClass} text-amber-600 dark:text-amber-400`}
          strokeWidth={stroke}
          aria-hidden
        />
      );
    case "clapperboard":
      return (
        <Clapperboard
          className={`${iconClass} text-slate-600 dark:text-slate-300`}
          strokeWidth={stroke}
          aria-hidden
        />
      );
    case "network":
      return (
        <Network
          className={`${iconClass} text-cyan-600 dark:text-cyan-400`}
          strokeWidth={stroke}
          aria-hidden
        />
      );
    case "scale":
      return (
        <Scale
          className={`${iconClass} text-stone-600 dark:text-stone-300`}
          strokeWidth={stroke}
          aria-hidden
        />
      );
    default:
      return null;
  }
}

function ProjectCardMedia({
  gradient,
  fallback,
  size,
}: {
  gradient: string;
  fallback: ReactNode;
  size: "featured" | "additional";
}) {
  const heightClass = size === "featured" ? "h-44" : "h-28";

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${heightClass}`}
    >
      {fallback}
    </div>
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

function projectMatches(tags: readonly Tag[], filter: Filter): boolean {
  if (filter === "All") return true;
  return tags.includes(filter);
}

type GalleryItem = {
  id: string;
  modal: ProjectModalData;
  fallback: ReactNode;
};

function featuredToGalleryItem(project: FeaturedProject): GalleryItem {
  return {
    id: project.title,
    modal: {
      title: project.title,
      description: project.description,
      tech: project.tech,
      githubHref: project.githubHref,
      demoHref: project.demoHref,
      imageSrc: project.imageSrc,
      imageAlt: project.imageAlt,
      media: project.media,
      liveDemo: project.liveDemo,
      award: project.award,
    },
    fallback: <FeaturedProjectIcon variant={project.iconVariant} size="lg" />,
  };
}

function additionalToGalleryItem(project: AdditionalProject): GalleryItem {
  return {
    id: project.name,
    modal: {
      title: project.name,
      description: project.description,
      tech: project.tech,
      githubHref: project.githubHref,
      demoHref: project.demoHref,
      imageSrc: project.imageSrc,
      imageAlt: project.imageAlt,
      media: project.media,
      liveDemo: project.liveDemo,
      status: project.status,
    },
    fallback: (
      <AdditionalProjectIcon variant={project.iconVariant} size="lg" />
    ),
  };
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Mirror external filter requests (e.g. from the NavBar dropdown) into
  // local state so this section and any other dispatcher stay in sync.
  useEffect(() => subscribeToProjectsFilter(setFilter), []);

  const closeModal = useCallback(() => setSelectedIndex(null), []);

  const applyFilter = (next: Filter) => {
    setFilter(next);
    emitProjectsFilter(next);
    setSelectedIndex(null);
  };

  const visibleFeatured = useMemo(
    () => featuredProjects.filter((p) => projectMatches(p.tags, filter)),
    [filter],
  );
  const visibleAdditional = useMemo(
    () => additionalProjects.filter((p) => projectMatches(p.tags, filter)),
    [filter],
  );

  const gallery = useMemo<GalleryItem[]>(
    () => [
      ...visibleFeatured.map(featuredToGalleryItem),
      ...visibleAdditional.map(additionalToGalleryItem),
    ],
    [visibleFeatured, visibleAdditional],
  );

  const selected =
    selectedIndex != null ? (gallery[selectedIndex] ?? null) : null;

  const showPrev = useCallback(() => {
    setSelectedIndex((index) => {
      if (index == null || gallery.length === 0) return index;
      return (index - 1 + gallery.length) % gallery.length;
    });
  }, [gallery.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((index) => {
      if (index == null || gallery.length === 0) return index;
      return (index + 1) % gallery.length;
    });
  }, [gallery.length]);

  const hasAnyResults =
    visibleFeatured.length > 0 || visibleAdditional.length > 0;

  return (
    <>
    <FadeInSection
      as="section"
      id="projects"
      className="border-t border-sky-200/80 bg-white dark:border-slate-800 dark:bg-slate-950"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
        <div className="flex items-center justify-center gap-3">
          <h2
            id="projects-heading"
            className="cursor-default text-center text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl dark:text-sky-100"
          >
            Featured Projects
          </h2>
          <a
            href="https://github.com/royho1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Roy Ho GitHub profile"
            className="cursor-pointer text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-900 dark:text-slate-400 dark:hover:text-sky-300"
          >
            <FaGithub className="h-7 w-7 text-[#181717] dark:text-white" aria-hidden />
          </a>
        </div>

        <div
          role="tablist"
          aria-label="Filter projects by topic"
          className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {FILTERS.map((option) => {
            const isActive = option === filter;
            return (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-pressed={isActive}
                onClick={() => applyFilter(option)}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ease-out sm:text-sm ${
                  isActive
                    ? "border-sky-600 bg-sky-600 text-white shadow-sm shadow-sky-600/30 hover:-translate-y-0.5 hover:bg-sky-700 dark:border-sky-400 dark:bg-sky-500 dark:shadow-sky-950/40 dark:hover:bg-sky-400"
                    : "border-sky-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-sky-200"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleFeatured.map((project) => {
              const fallback = (
                <FeaturedProjectIcon variant={project.iconVariant} size="lg" />
              );
              const galleryIndex = gallery.findIndex(
                (item) => item.id === project.title,
              );

              return (
                <motion.button
                  key={project.title}
                  type="button"
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => {
                    if (galleryIndex < 0) return;
                    setSelectedIndex(galleryIndex);
                  }}
                  aria-label={`Open ${project.title} details`}
                  className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-sky-200 bg-white p-0 text-left font-inherit shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-[transform,border-color,box-shadow] duration-150 hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/40 dark:ring-slate-700/50 dark:hover:border-slate-500 dark:hover:shadow-black/60"
                >
                  {project.award && (
                    <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50/95 px-2 py-0.5 text-[10px] font-semibold text-amber-800 shadow-sm shadow-amber-900/10 backdrop-blur-sm dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-200">
                      <Star
                        className="h-3 w-3 fill-amber-400 text-amber-500"
                        aria-hidden
                      />
                      {project.award}
                    </span>
                  )}

                  <ProjectCardMedia
                    gradient={project.gradient}
                    fallback={fallback}
                    size="featured"
                  />

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-sky-950 dark:text-sky-100">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {project.description}
                    </p>
                    <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                      {project.tech}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-sky-700 transition-colors group-hover:text-sky-900 dark:text-sky-300 dark:group-hover:text-sky-200">
                      View project
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-16">
          <div className="flex items-center justify-center gap-3">
            <h3 className="cursor-default text-center text-xl font-semibold tracking-tight text-sky-950 md:text-2xl dark:text-sky-100">
              Additional Projects
            </h3>
            <a
              href="https://github.com/royho1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Roy Ho GitHub profile"
              className="cursor-pointer text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-900 dark:text-slate-400 dark:hover:text-sky-300"
            >
              <FaGithub className="h-6 w-6 text-[#181717] dark:text-white" aria-hidden />
            </a>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visibleAdditional.map((project) => {
                const fallback = (
                  <AdditionalProjectIcon
                    variant={project.iconVariant}
                    size="sm"
                  />
                );
                const galleryIndex = gallery.findIndex(
                  (item) => item.id === project.name,
                );

                return (
                  <motion.button
                    key={project.name}
                    type="button"
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => {
                    if (galleryIndex < 0) return;
                    setSelectedIndex(galleryIndex);
                  }}
                    aria-label={`Open ${project.name} details`}
                    className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-sky-200 bg-sky-50/90 p-0 text-left font-inherit shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-[transform,border-color,box-shadow] duration-150 hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/40 dark:ring-slate-700/50 dark:hover:border-slate-500"
                  >
                    {project.status && (
                      <StatusBadge className="absolute bottom-3 right-3 z-10">
                        {project.status}
                      </StatusBadge>
                    )}

                    <ProjectCardMedia
                      gradient={project.gradient}
                      fallback={fallback}
                      size="additional"
                    />

                    <div className="flex flex-1 flex-col p-4">
                      <h4 className="text-sm font-semibold leading-snug text-sky-950 dark:text-sky-100">
                        {project.name}
                      </h4>
                      <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {project.description}
                      </p>
                      <p className="mt-3 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {project.tech}
                      </p>
                      <div className="mt-3 flex min-h-[1.25rem] items-center">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-sky-700 transition-colors group-hover:text-sky-900 dark:text-sky-300 dark:group-hover:text-sky-200">
                          View project
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {!hasAnyResults && (
          <p className="mt-10 text-center text-sm text-slate-500 dark:text-slate-400">
            No projects match this filter yet.
          </p>
        )}
      </div>
    </FadeInSection>

    <ProjectModal
      project={selected?.modal ?? null}
      onClose={closeModal}
      fallback={selected?.fallback ?? null}
      onPrev={showPrev}
      onNext={showNext}
      position={selectedIndex != null ? selectedIndex + 1 : undefined}
      total={gallery.length}
    />
    </>
  );
}
