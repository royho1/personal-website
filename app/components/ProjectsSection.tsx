"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HeartPulse, MapPin, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import DrowsyEyeIcon from "./DrowsyEyeIcon";
import FadeInSection from "./FadeInSection";
import {
  FILTERS,
  emitProjectsFilter,
  subscribeToProjectsFilter,
  type Filter,
  type Tag,
} from "./projectsFilterBus";

type FeaturedProjectIconVariant = "eye" | "bars" | "heart" | "mapPin";

type FeaturedProject = {
  title: string;
  description: string;
  tech: string;
  githubHref: string;
  iconVariant: FeaturedProjectIconVariant;
  gradient: string;
  award?: string;
  tags: Tag[];
};

const featuredProjects: FeaturedProject[] = [
  {
    title: "SF Restaurant Safety Map",
    description:
      "Built an interactive map of 5,500+ San Francisco restaurant health inspections using public DataSF data, an ETL pipeline into a SQLite schema, a Flask REST API, and a React + Mapbox frontend for search, filters, and inspection details.",
    tech: "Python, SQL, Flask, React, Mapbox, ETL",
    githubHref: "https://github.com/royho1/sf-restaurant-safety-map",
    iconVariant: "mapPin",
    gradient: "from-teal-100 via-white to-cyan-100",
    tags: ["Python", "SQL", "Data Visualization"],
  },
  {
    title: "Job Analytics Dashboard",
    description:
      "Built a dashboard to analyze job market trends, including salaries, skills, and geographic differences across roles.",
    tech: "Python, Data Visualization",
    githubHref: "https://github.com/royho1/job-market-analysis-dashboard",
    iconVariant: "bars",
    gradient: "from-emerald-100 via-white to-sky-100",
    tags: ["Python", "NLP", "Data Visualization", "Machine Learning"],
  },
  {
    title: "Drowsy Driver Detection",
    description:
      "Built a real-time drowsiness detection system using computer vision techniques and a CNN model trained on eye-state data.",
    tech: "Python, OpenCV, CNN",
    githubHref: "https://github.com/royho1/drowsy-driver-detection",
    iconVariant: "eye",
    gradient: "from-sky-100 via-white to-cyan-100",
    award: "Award Winner: Best Execution",
    tags: ["Python", "Machine Learning"],
  },
];

type AdditionalProject = {
  name: string;
  description: string;
  tech: string;
  tags: Tag[];
  githubHref?: string;
};

const additionalProjects: AdditionalProject[] = [
  {
    name: "Heart Stroke Risk Prediction",
    description:
      "Machine learning model to predict stroke risk from healthcare data, with preprocessing, training, and an interactive Streamlit app.",
    tech: "Python, scikit-learn, Streamlit",
    tags: ["Python", "Machine Learning"],
    githubHref: "https://github.com/royho1/heart-stroke-risk-prediction",
  },
  {
    name: "Portuguese Wine Type and Quality Prediction",
    description:
      "Classified red vs. white wines and predicted quality ratings using logistic regression, LDA, and PCA on chemical properties.",
    tech: "Python, scikit-learn, PCA",
    tags: ["Python", "Machine Learning"],
    githubHref: "https://github.com/royho1/wine-quality-classification",
  },
  {
    name: "Stock Trading Algorithm",
    description:
      "Built a multi-factor stock screening model with NLP sentiment analysis (FinBERT), supervised classification, and an automated daily ETL pipeline delivering real-time investment signals.",
    tech: "Python, scikit-learn, NLP, ETL",
    tags: ["Python", "NLP", "Machine Learning"],
  },
  {
    name: "NBA Player Performance Prediction",
    description:
      "Predicted 5th-season NBA player performance using regression and classification models on historical stats and draft data.",
    tech: "Python, Random Forest, Gradient Boosting",
    tags: ["Python", "Machine Learning"],
    githubHref: "https://github.com/royho1/nba-player-prediction",
  },
  {
    name: "Analyzing Movie Reviews Across Genres",
    description:
      "Scraped and compared IMDb audience reviews with professional critic reviews using sentiment analysis and NLP models.",
    tech: "Python, Selenium, VADER, RoBERTa",
    tags: ["Python", "NLP", "Machine Learning", "Data Visualization"],
    githubHref: "https://github.com/royho1/movie-reviews-analysis",
  },
  {
    name: "Drake Time Series Analysis",
    description:
      "Forecasted Drake's popularity trends using 14 years of Google Trends data with ARMA and ARIMA models.",
    tech: "R, forecast, ggplot2",
    tags: ["R", "Data Visualization"],
    githubHref: "https://github.com/royho1/drake-time-series-project",
  },
  {
    name: "NBA Player Salary Analysis",
    description:
      "Analyzed the relationship between player performance metrics and salary structures using regression and clustering.",
    tech: "R, tidyverse, ggplot2",
    tags: ["R", "Data Visualization", "Machine Learning"],
    githubHref: "https://github.com/royho1/nba-salary-analysis",
  },
  {
    name: "Socioeconomic Predictors of Crime Rates",
    description:
      "Modeled the relationship between poverty, unemployment, and crime rates using multiple linear regression and model selection.",
    tech: "R, ANOVA, AIC/BIC",
    tags: ["R", "Data Visualization"],
    githubHref:
      "https://github.com/royho1/socioeconomic-predictors-of-crime-rates",
  },
  {
    name: "Graph-Based Shortest Path Analysis (Six Degrees of Kevin Bacon)",
    description:
      "Built a graph traversal algorithm to compute degrees of separation between actors through shared movie appearances.",
    tech: "Python, BFS, Graph Algorithms",
    tags: ["Python"],
    githubHref: "https://github.com/royho1/six-degrees-kevin-bacon",
  },
];

function MapPinDropIcon() {
  const prefersReducedMotion = useReducedMotion();

  const pin = (
    <MapPin
      className="h-14 w-14 text-emerald-500 dark:text-emerald-400"
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

function AnimatedProjectIcon({
  variant,
}: {
  variant: FeaturedProjectIconVariant;
}) {
  if (variant === "bars") {
    return (
      <div
        className="flex h-14 w-14 items-end justify-center gap-1 text-sky-600 dark:text-sky-400"
        aria-hidden
      >
        <span className="h-6 w-3 origin-bottom rounded-sm bg-current animate-bar-grow-1" />
        <span className="h-12 w-3 origin-bottom rounded-sm bg-current animate-bar-grow-2" />
        <span className="h-9 w-3 origin-bottom rounded-sm bg-current animate-bar-grow-3" />
      </div>
    );
  }

  if (variant === "heart") {
    return (
      <HeartPulse
        className="h-14 w-14 origin-center text-rose-600 animate-heartbeat dark:text-rose-400"
        strokeWidth={1.75}
        aria-hidden
      />
    );
  }

  if (variant === "mapPin") {
    return <MapPinDropIcon />;
  }

  return <DrowsyEyeIcon />;
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

export default function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("All");

  // Mirror external filter requests (e.g. from the NavBar dropdown) into
  // local state so this section and any other dispatcher stay in sync.
  useEffect(() => subscribeToProjectsFilter(setFilter), []);

  const applyFilter = (next: Filter) => {
    setFilter(next);
    emitProjectsFilter(next);
  };

  const visibleFeatured = useMemo(
    () => featuredProjects.filter((p) => projectMatches(p.tags, filter)),
    [filter],
  );
  const visibleAdditional = useMemo(
    () => additionalProjects.filter((p) => projectMatches(p.tags, filter)),
    [filter],
  );

  const hasAnyResults =
    visibleFeatured.length > 0 || visibleAdditional.length > 0;

  return (
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
            className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-900 dark:text-slate-400 dark:hover:text-sky-300"
          >
            <FaGithub className="h-7 w-7" aria-hidden />
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
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ease-out sm:text-sm ${
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
            {visibleFeatured.map((project) => (
              <motion.a
                key={project.title}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                href={project.githubHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-sky-200 bg-white text-left shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/40 dark:ring-slate-700/50 dark:hover:shadow-black/60"
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

                <div
                  className={`flex h-28 w-full items-center justify-center bg-gradient-to-br ${project.gradient} dark:opacity-95`}
                >
                  <AnimatedProjectIcon variant={project.iconVariant} />
                </div>

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
                  <span className="mt-5 inline-flex text-sm font-medium text-sky-700 underline decoration-sky-300 underline-offset-4 transition-colors group-hover:text-sky-900 group-hover:decoration-sky-600 dark:text-sky-300 dark:decoration-sky-700 dark:group-hover:text-sky-200 dark:group-hover:decoration-sky-400">
                    GitHub
                  </span>
                </div>
              </motion.a>
            ))}
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
              className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-900 dark:text-slate-400 dark:hover:text-sky-300"
            >
              <FaGithub className="h-6 w-6" aria-hidden />
            </a>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visibleAdditional.map((project) => {
                const additionalCardClassName =
                  "group relative flex h-full flex-col overflow-hidden rounded-lg border border-sky-200 bg-sky-50/90 shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/40 dark:ring-slate-700/50";
                const cardContent = (
                  <>
                    <div className="flex min-h-10 w-full flex-col justify-center bg-gradient-to-br from-sky-100 via-white to-cyan-100 px-4 py-2 dark:from-slate-800 dark:via-slate-900 dark:to-sky-950">
                      <h4 className="text-sm font-semibold leading-snug text-sky-950 dark:text-sky-100">
                        {project.name}
                      </h4>
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <p className="flex-1 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                        {project.description}
                      </p>
                      <p className="mt-3 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        {project.tech}
                      </p>
                      {project.githubHref && (
                        <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium text-sky-700 transition-colors group-hover:text-sky-900 dark:text-sky-300 dark:group-hover:text-sky-200">
                          <FaGithub className="h-3.5 w-3.5" aria-hidden />
                          View on GitHub
                        </span>
                      )}
                    </div>
                  </>
                );

                if (project.githubHref) {
                  return (
                    <motion.a
                      key={project.name}
                      layout
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      href={project.githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.name} on GitHub`}
                      className={`${additionalCardClassName} block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500`}
                    >
                      {cardContent}
                    </motion.a>
                  );
                }

                return (
                  <motion.article
                    key={project.name}
                    layout
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={additionalCardClassName}
                  >
                    {cardContent}
                  </motion.article>
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
  );
}
