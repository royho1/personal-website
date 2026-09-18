"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import FadeInSection from "./FadeInSection";
import {
  experiencesForView,
  type ExperienceEntry,
  type ExperienceView,
} from "../lib/experience";

const VIEWS: { id: ExperienceView; label: string }[] = [
  { id: "featured", label: "Featured Experience" },
  { id: "full", label: "Full Timeline" },
];

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

function ExperienceCard({
  entry,
  isLast,
  reduceMotion,
}: {
  entry: ExperienceEntry;
  isLast: boolean;
  reduceMotion: boolean | null;
}) {
  const showBody = Boolean(entry.title) || entry.bullets.length > 0;
  const logo = entry.logoSrc ? (
    <Image
      src={entry.logoSrc}
      alt=""
      width={240}
      height={60}
      className="h-[60px] w-auto max-w-[min(240px,42vw)] shrink-0 object-contain max-sm:h-10"
    />
  ) : null;

  return (
    <motion.li
      layout={!reduceMotion}
      variants={reduceMotion ? undefined : itemVariants}
      className="relative pl-[calc(8px+2.5rem)] max-sm:pl-[calc(8px+1.5rem)]"
    >
      <article className="rounded-xl border border-sky-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow] duration-150 hover:border-sky-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-slate-500">
        <div
          className={`relative flex h-[100px] items-center gap-5 bg-sky-50 px-6 max-sm:h-auto max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:py-4 dark:bg-sky-950/40 ${
            showBody
              ? "rounded-t-xl border-b border-sky-200 dark:border-slate-700"
              : "rounded-xl"
          }`}
        >
          <span
            aria-hidden
            className={
              entry.current
                ? "absolute left-[calc(-2.5rem)] top-1/2 z-10 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-sky-600 bg-white max-sm:left-[calc(-1.5rem)] dark:border-sky-500 dark:bg-slate-900"
                : "absolute left-[calc(-2.5rem)] top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-600 max-sm:left-[calc(-1.5rem)] dark:bg-sky-500"
            }
          />
          <span
            aria-hidden
            className={
              isLast
                ? "absolute left-[calc(-2.5rem)] top-1/2 z-[1] w-0.5 -translate-x-1/2 bg-sky-100 max-sm:left-[calc(-1.5rem)] dark:bg-slate-900"
                : "absolute left-[calc(-2.5rem)] top-1/2 z-0 w-0.5 -translate-x-1/2 bg-sky-200 max-sm:left-[calc(-1.5rem)] dark:bg-slate-700"
            }
            style={{ bottom: "calc(-100vh)" }}
          />
          <div className="flex min-w-0 flex-1 items-center gap-5 max-sm:gap-3">
            {logo ? (
              entry.logoOnWhite ? (
                <span className="inline-flex shrink-0 rounded bg-white p-2">
                  {logo}
                </span>
              ) : (
                logo
              )
            ) : null}
            <div className="min-w-0">
              <h3 className="text-[20px] font-medium tracking-tight text-slate-900 dark:text-sky-100">
                {entry.company}
              </h3>
              {entry.companyDetail ? (
                <p className="text-[13px] leading-snug text-slate-500 dark:text-slate-400">
                  {entry.companyDetail}
                </p>
              ) : null}
            </div>
          </div>
          {entry.dates ? (
            <p className="shrink-0 text-right text-[12px] font-medium uppercase tracking-[0.05em] text-sky-600 max-sm:text-left dark:text-sky-400">
              {entry.dates}
            </p>
          ) : null}
        </div>
        {showBody ? (
          <div className="rounded-b-xl p-6">
            {entry.title ? (
              <h4
                className={`text-[15px] font-medium tracking-tight text-slate-900 dark:text-slate-100 ${
                  entry.location
                    ? "mb-1"
                    : entry.bullets.length > 0
                      ? "mb-3.5"
                      : ""
                }`}
              >
                {entry.title}
              </h4>
            ) : null}
            {entry.location ? (
              <p
                className={`text-[13px] leading-snug text-slate-500 dark:text-slate-400 ${
                  entry.bullets.length > 0 ? "mb-3.5" : ""
                }`}
              >
                {entry.location}
              </p>
            ) : null}
            {entry.bullets.length > 0 ? (
              <ul className="list-disc space-y-2 pl-[1.15em] text-[14px] leading-[1.6] text-slate-900 marker:text-slate-900 dark:text-slate-300 dark:marker:text-slate-500">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </article>
    </motion.li>
  );
}

export default function ExperienceSection() {
  const [view, setView] = useState<ExperienceView>("featured");
  const reduceMotion = useReducedMotion();
  const visible = useMemo(() => experiencesForView(view), [view]);

  return (
    <FadeInSection
      as="section"
      id="experience"
      className="border-t border-sky-200/80 bg-sky-100 dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-[820px] px-6 py-14 md:px-8 md:py-28">
        <h2
          id="experience-heading"
          className="mx-auto block w-max max-w-full cursor-default text-center text-[28px] font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold dark:text-sky-100"
        >
          Experience
        </h2>

        <div
          role="tablist"
          aria-label="Experience view"
          className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-2 sm:gap-2.5"
        >
          {VIEWS.map((option) => {
            const isActive = option.id === view;
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                id={`experience-tab-${option.id}`}
                aria-selected={isActive}
                aria-controls="experience-timeline"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setView(option.id)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
                    return;
                  }
                  event.preventDefault();
                  const currentIndex = VIEWS.findIndex((v) => v.id === view);
                  const delta = event.key === "ArrowRight" ? 1 : -1;
                  const next =
                    VIEWS[(currentIndex + delta + VIEWS.length) % VIEWS.length];
                  setView(next.id);
                  queueMicrotask(() => {
                    document
                      .getElementById(`experience-tab-${next.id}`)
                      ?.focus();
                  });
                }}
                className={`min-h-9 cursor-pointer rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200 ease-out sm:py-1.5 sm:text-sm ${
                  isActive
                    ? "border-sky-600 bg-sky-600 text-white shadow-sm shadow-sky-600/30 hover:-translate-y-0.5 hover:bg-sky-700 dark:border-sky-400 dark:bg-sky-500 dark:shadow-sky-950/40 dark:hover:bg-sky-400"
                    : "border-sky-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-900 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700 dark:hover:text-sky-200"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ol
            key={view}
            id="experience-timeline"
            role="tabpanel"
            aria-labelledby={`experience-tab-${view}`}
            className="relative mt-10 space-y-8 overflow-hidden"
            variants={reduceMotion ? undefined : listVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            exit={reduceMotion ? undefined : "exit"}
          >
            {visible.map((entry: ExperienceEntry, index) => (
              <ExperienceCard
                key={entry.id}
                entry={entry}
                isLast={index === visible.length - 1}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </FadeInSection>
  );
}
