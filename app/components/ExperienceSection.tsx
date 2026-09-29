"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type MarkerState = "future" | "done" | "active";

const MARKER_STATE_CLASS: Record<MarkerState, string> = {
  future: "bg-white dark:bg-slate-900",
  done: "bg-sky-600 dark:bg-sky-500",
  active:
    "scale-125 bg-sky-600 shadow-[0_0_0_4px_rgba(2,132,199,0.18)] dark:bg-sky-500 dark:shadow-[0_0_0_4px_rgba(14,165,233,0.22)]",
};

/** Viewport height fraction used as the "reading line" for progress and active card. */
const ANCHOR = 0.48;

function ExperienceCard({
  entry,
  markerState,
  markerRef,
  cardRef,
  reduceMotion,
}: {
  entry: ExperienceEntry;
  markerState: MarkerState;
  markerRef: (el: HTMLSpanElement | null) => void;
  cardRef: (el: HTMLElement | null) => void;
  reduceMotion: boolean | null;
}) {
  const isActive = markerState === "active";
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
      <article
        ref={cardRef}
        className={`rounded-xl border bg-white transition-[border-color,box-shadow] duration-300 ease-out hover:border-sky-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] motion-reduce:transition-none dark:bg-slate-800/70 dark:hover:border-slate-500 ${
          isActive
            ? "border-sky-300 shadow-[0_4px_14px_rgba(2,132,199,0.10)] dark:border-sky-800"
            : "border-sky-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:border-slate-700"
        }`}
      >
        <div
          className={`relative flex h-[100px] items-center gap-5 bg-sky-50 px-6 max-sm:h-auto max-sm:flex-col max-sm:items-start max-sm:gap-2 max-sm:py-4 dark:bg-sky-950/40 ${
            showBody
              ? "rounded-t-xl border-b border-sky-200 dark:border-slate-700"
              : "rounded-xl"
          }`}
        >
          <span
            ref={markerRef}
            aria-hidden
            className={`absolute left-[calc(-2.5rem)] top-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-600 transition-all duration-300 ease-out motion-reduce:transition-none max-sm:left-[calc(-1.5rem)] dark:border-sky-500 ${MARKER_STATE_CLASS[markerState]}`}
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
  const [timeline, setTimeline] = useState({ active: 0, filledThrough: 0 });
  const [timelineEl, setTimelineEl] = useState<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLSpanElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const count = visible.length;
    let frame = 0;

    const update = () => {
      frame = 0;
      const wrapper = timelineEl;
      const track = trackRef.current;
      const progressEl = progressRef.current;
      const markers = markerRefs.current.slice(0, count);
      const cards = cardRefs.current.slice(0, count);
      if (!wrapper || !track || !progressEl || count === 0) return;
      if (markers.some((m) => !m) || cards.some((c) => !c)) return;

      const base = wrapper.getBoundingClientRect().top;
      const anchorY = window.innerHeight * ANCHOR;
      const centers = markers.map((m) => {
        const r = m!.getBoundingClientRect();
        return r.top + r.height / 2 - base;
      });
      const start = centers[0];
      const length = Math.max(centers[count - 1] - start, 0);
      const progress = Math.min(Math.max(anchorY - base - start, 0), length);

      track.style.top = progressEl.style.top = `${start}px`;
      track.style.height = progressEl.style.height = `${length}px`;
      progressEl.style.transform = `scaleY(${length > 0 ? progress / length : 0})`;

      let active = 0;
      let best = Infinity;
      cards.forEach((card, i) => {
        const r = card!.getBoundingClientRect();
        const distance = Math.abs(r.top + r.height / 2 - anchorY);
        if (distance < best) {
          best = distance;
          active = i;
        }
      });

      let reached = 0;
      centers.forEach((c, i) => {
        if (c - start <= progress + 0.5) reached = i;
      });
      const filledThrough = Math.max(active, reached);

      setTimeline((prev) =>
        prev.active === active && prev.filledThrough === filledThrough
          ? prev
          : { active, filledThrough },
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    if (!timelineEl) return;
    schedule();
    // Re-measure once the card entrance animation has settled.
    const settle = window.setTimeout(schedule, 350);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(timelineEl);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver.disconnect();
    };
  }, [visible, timelineEl]);

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
          <motion.div
            key={view}
            ref={setTimelineEl}
            id="experience-timeline"
            role="tabpanel"
            aria-labelledby={`experience-tab-${view}`}
            className="relative mt-10"
            variants={reduceMotion ? undefined : listVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            exit={reduceMotion ? undefined : "exit"}
          >
            <span
              ref={trackRef}
              aria-hidden
              className="absolute left-2 w-0.5 -translate-x-1/2 rounded-full bg-sky-200 dark:bg-slate-700"
            />
            <span
              ref={progressRef}
              aria-hidden
              className="absolute left-2 w-0.5 origin-top -translate-x-1/2 rounded-full bg-sky-600 will-change-transform dark:bg-sky-500"
              style={{ transform: "scaleY(0)" }}
            />
            <ol className="relative space-y-8">
              {visible.map((entry: ExperienceEntry, index) => (
                <ExperienceCard
                  key={entry.id}
                  entry={entry}
                  markerState={
                    index === timeline.active
                      ? "active"
                      : index <= timeline.filledThrough
                        ? "done"
                        : "future"
                  }
                  markerRef={(el) => {
                    markerRefs.current[index] = el;
                  }}
                  cardRef={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  reduceMotion={reduceMotion}
                />
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>
      </div>
    </FadeInSection>
  );
}
