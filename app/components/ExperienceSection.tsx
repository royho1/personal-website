"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import FadeInSection from "./FadeInSection";
import {
  duration,
  experiences,
  shortDate,
  type ExperienceEntry,
} from "../lib/experience";

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

/** Card padding-top (p-6) + half of 52px logo, so the marker sits on the title row. */
const MARKER_TOP = "calc(1.5rem + 26px)";

function LogoMark({
  entry,
  size,
  rounded,
  className = "",
  boxClassName,
}: {
  entry: ExperienceEntry;
  size: number;
  rounded: string;
  className?: string;
  /** Responsive box size. Overrides the fixed `size` box when set. */
  boxClassName?: string;
}) {
  if (!entry.logoSrc) return null;

  const image = (
    <Image
      src={entry.logoSrc}
      alt={`${entry.company} logo`}
      width={size}
      height={size}
      className={`${entry.logoOnWhite ? "object-contain" : "object-cover"} h-full w-full`}
    />
  );
  const boxStyle = boxClassName ? undefined : { width: size, height: size };
  const box = boxClassName ?? "";

  if (entry.logoOnWhite) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center border border-slate-200 bg-white p-1.5 dark:border-slate-600 ${rounded} ${box} ${className}`}
        style={boxStyle}
      >
        {image}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 overflow-hidden ${rounded} ${box} ${className}`}
      style={boxStyle}
    >
      {image}
    </span>
  );
}

function formatLocation(location?: string): string | undefined {
  return location?.replace(/\s*\|\s*/g, " · ");
}

function DateMeta({
  dates,
  span,
}: {
  dates: { start: string; end: string };
  span: string | null;
}) {
  const isPresent = dates.end === "Present";

  return (
    <div className="flex shrink-0 flex-col items-end gap-1.5">
      <p className="whitespace-nowrap text-[15px] font-semibold text-slate-900 dark:text-slate-100">
        {dates.start} – {dates.end}
      </p>
      {isPresent ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-[13px] font-semibold text-sky-800 dark:bg-sky-950 dark:text-sky-300">
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full bg-sky-600 dark:bg-sky-400"
          />
          Current
        </span>
      ) : span ? (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[13px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {span}
        </span>
      ) : null}
    </div>
  );
}

function MobileDateRow({
  dates,
  span,
}: {
  dates: { start: string; end: string };
  span: string | null;
}) {
  const isPresent = dates.end === "Present";

  return (
    <div className="mt-3 flex max-w-full flex-wrap items-center gap-2 md:hidden">
      <p className="whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">
        {dates.start} – {dates.end}
      </p>
      {isPresent ? (
        <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800 dark:bg-sky-950 dark:text-sky-300">
          <span
            aria-hidden
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600 dark:bg-sky-400"
          />
          Current
        </span>
      ) : span ? (
        <span className="inline-flex shrink-0 whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          {span}
        </span>
      ) : null}
    </div>
  );
}

function ExperienceCard({
  entry,
  isFirst,
  isLast,
  reduceMotion,
}: {
  entry: ExperienceEntry;
  isFirst: boolean;
  isLast: boolean;
  reduceMotion: boolean | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const dates = entry.dates ? shortDate(entry.dates) : null;
  const span = entry.dates ? duration(entry.dates) : null;
  const location = formatLocation(entry.location);
  const isPresent = dates?.end === "Present";
  const extraCount = Math.max(entry.bullets.length - 2, 0);

  const companyLabel = `${entry.company}${
    entry.companyDetail ? ` (${entry.companyDetail})` : ""
  }`;

  return (
    <motion.li
      variants={reduceMotion ? undefined : itemVariants}
      className="relative min-w-0 md:grid md:grid-cols-[32px_1fr]"
    >
      {/* Rail column. Hidden below md so cards can use the full container. */}
      <div className="relative hidden justify-center md:flex">
        {!isFirst ? (
          <span
            aria-hidden
            className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-sky-200 dark:bg-slate-700"
            style={{ height: MARKER_TOP }}
          />
        ) : null}
        {!isLast ? (
          <span
            aria-hidden
            className="absolute left-1/2 bottom-[-2rem] w-0.5 -translate-x-1/2 bg-sky-200 dark:bg-slate-700"
            style={{ top: MARKER_TOP }}
          />
        ) : null}
        <span
          aria-hidden
          className={`absolute left-1/2 z-10 hidden h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full md:block ${
            isPresent
              ? "bg-sky-600 ring-4 ring-sky-100 dark:bg-sky-500 dark:ring-sky-950"
              : "border-2 border-sky-600 bg-white dark:border-sky-500 dark:bg-slate-900"
          }`}
          style={{ top: MARKER_TOP }}
        />
      </div>

      {/* Card column. min-w-0 lets the grid track shrink below the date row's min-content. */}
      <article className="group w-full min-w-0 break-words rounded-2xl border border-sky-100 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)] hover:-translate-y-1 hover:border-sky-300 hover:shadow-[0_14px_32px_-12px_rgb(2_132_199/0.28)] motion-reduce:transition-[border-color,box-shadow] motion-reduce:hover:translate-y-0 md:px-7 md:py-6 dark:border-slate-700 dark:bg-slate-800/70 dark:hover:border-slate-500 dark:hover:shadow-[0_14px_36px_-12px_rgb(0_0_0/0.65)]">
        <div className="flex items-start gap-3 md:gap-4">
          <LogoMark
            entry={entry}
            size={52}
            rounded="rounded-lg md:rounded-xl"
            boxClassName="h-10 w-10 md:h-[52px] md:w-[52px]"
            className="transition-transform duration-300 ease-[cubic-bezier(0.34,1.3,0.64,1)] group-hover:scale-105 motion-reduce:group-hover:scale-100"
          />
          <div className="min-w-0 flex-1 break-words">
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1 break-words">
                {entry.title ? (
                  <h3 className="text-lg font-semibold leading-snug text-slate-900 md:text-[20px] md:leading-normal md:tracking-tight dark:text-slate-100">
                    {entry.title}
                  </h3>
                ) : null}
                <p className="break-words text-sm font-medium text-slate-900 md:hidden dark:text-slate-100">
                  {companyLabel}
                </p>
                {location ? (
                  <p className="break-words text-sm text-slate-600 md:hidden dark:text-slate-400">
                    {location}
                  </p>
                ) : null}
                <p className="hidden text-[14px] text-slate-600 md:block dark:text-slate-400">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {companyLabel}
                  </span>
                  {location ? ` · ${location}` : ""}
                </p>
              </div>
              {dates ? (
                <div className="hidden md:block">
                  <DateMeta dates={dates} span={span} />
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {dates ? <MobileDateRow dates={dates} span={span} /> : null}

        {entry.bullets.length > 0 ? (
          <div className="mt-4">
            <ul className="list-disc space-y-2 pl-4 text-[15px] leading-relaxed text-slate-700 marker:text-slate-500 md:pl-[1.15em] md:leading-[1.6] dark:text-slate-300 dark:marker:text-slate-500">
              {entry.bullets.map((bullet, index) => (
                <li
                  key={bullet}
                  className={
                    index >= 2 && !expanded
                      ? "hidden md:list-item"
                      : "list-item break-words"
                  }
                >
                  {bullet}
                </li>
              ))}
            </ul>
            {extraCount > 0 ? (
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setExpanded((value) => !value)}
                className="mt-1 flex min-h-11 w-full cursor-pointer items-center justify-start py-2 text-left text-[13px] font-semibold text-sky-700 md:hidden dark:text-sky-400"
              >
                {expanded ? "Show less" : `+ ${extraCount} more`}
              </button>
            ) : null}
          </div>
        ) : null}
      </article>
    </motion.li>
  );
}

function OtherRoles({ entries }: { entries: ExperienceEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <div className="mt-12 md:pl-8">
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-slate-500">
        Leadership & other roles
      </p>
      <div className="overflow-hidden rounded-2xl border border-sky-100 bg-white dark:border-slate-700 dark:bg-slate-800/70">
        <ul className="divide-y divide-slate-100 dark:divide-slate-700">
          {entries.map((entry, index) => {
            const dates = entry.dates ? shortDate(entry.dates) : null;
            const isFirst = index === 0;
            const isLast = index === entries.length - 1;
            return (
              <li
                key={entry.id}
                className={`grid min-w-0 grid-cols-[40px_1fr] items-center gap-4 px-5 py-4 transition-colors duration-200 hover:bg-sky-50/70 sm:grid-cols-[40px_1fr_auto] dark:hover:bg-slate-700/40 ${
                  isFirst ? "rounded-t-2xl" : ""
                } ${isLast ? "rounded-b-2xl" : ""}`}
              >
                <LogoMark entry={entry} size={40} rounded="rounded-lg" />
                <div className="min-w-0 break-words text-[15px] text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {entry.title}
                  </span>
                  {` · ${entry.company}`}
                  {dates ? (
                    <p className="mt-1 text-[13px] text-slate-500 sm:hidden">
                      {dates.start} – {dates.end}
                    </p>
                  ) : null}
                </div>
                {dates ? (
                  <p className="hidden shrink-0 text-[13px] text-slate-500 sm:block">
                    {dates.start} – {dates.end}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const reduceMotion = useReducedMotion();
  const featured = useMemo(
    () => experiences.filter((entry) => entry.featured),
    [],
  );
  const otherRoles = useMemo(
    () => experiences.filter((entry) => !entry.featured),
    [],
  );

  return (
    <FadeInSection
      as="section"
      id="experience"
      className="border-t border-sky-200/80 bg-sky-100 dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-[1040px] px-6 py-14 md:px-8 md:py-28">
        <h2
          id="experience-heading"
          className="mx-auto block w-max max-w-full cursor-default text-center text-[28px] font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold dark:text-sky-100"
        >
          Experience
        </h2>

        <motion.div
          id="experience-timeline"
          className="relative mt-10"
          variants={reduceMotion ? undefined : listVariants}
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
        >
          <ol className="relative min-w-0 space-y-4 md:space-y-8">
            {featured.map((entry: ExperienceEntry, index) => (
              <ExperienceCard
                key={entry.id}
                entry={entry}
                isFirst={index === 0}
                isLast={index === featured.length - 1}
                reduceMotion={reduceMotion}
              />
            ))}
          </ol>
        </motion.div>

        <OtherRoles entries={otherRoles} />
      </div>
    </FadeInSection>
  );
}
