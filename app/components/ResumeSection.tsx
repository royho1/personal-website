"use client";

import FadeInSection from "./FadeInSection";

const resumePdfPath = "/Roy_Ho_Resume.pdf";

const primaryResumeBtn =
  "relative z-10 inline-flex w-full items-center justify-center whitespace-nowrap rounded-lg bg-sky-600 px-7 py-3 text-base font-medium text-white shadow-sm shadow-sky-600/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-[0_10px_36px_-8px_rgb(14_165_233/0.38),0_4px_20px_-6px_rgb(56_189_248/0.22)] sm:w-auto dark:bg-sky-500 dark:shadow-sky-950/40 dark:hover:bg-sky-400 dark:hover:shadow-[0_12px_44px_-6px_rgb(56_189_248/0.42),0_6px_28px_-4px_rgb(125_211_252/0.2)]";

const secondaryResumeBtn =
  "inline-flex w-full items-center justify-center whitespace-nowrap rounded-lg border border-sky-300 bg-white/90 px-7 py-3 text-base font-medium text-sky-950 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-sky-50 hover:shadow-md hover:shadow-sky-300/30 sm:w-auto dark:border-slate-700 dark:bg-slate-900/70 dark:text-sky-200 dark:hover:bg-slate-800";

type ResumeSectionProps = {
  /** Use `h1` on the dedicated `/resume` route; `h2` on the homepage. */
  titleElement?: "h1" | "h2";
};

export default function ResumeSection({
  titleElement = "h2",
}: ResumeSectionProps) {
  const Title = titleElement;

  return (
    <FadeInSection
      as="section"
      id="resume"
      className="border-t border-sky-200/80 bg-white dark:border-slate-800 dark:bg-slate-950"
      aria-labelledby="resume-heading"
    >
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:px-8 md:py-28">
        <Title
          id="resume-heading"
          className="inline-block w-max max-w-full cursor-default text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl dark:text-sky-100"
        >
          Resume
        </Title>
        <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
          View or download a PDF of my experience, education, and skills.
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-md flex-col items-center gap-4 sm:max-w-none sm:flex-row sm:justify-center sm:gap-5">
          <span className="group relative inline-flex w-full justify-center sm:w-auto">
            <span
              aria-hidden
              className="resume-cta-glow-breathe pointer-events-none absolute -inset-4 z-0 rounded-xl bg-sky-400/45 blur-2xl transition-transform duration-300 ease-out will-change-[opacity,transform] group-hover:scale-110 dark:bg-sky-400/55"
            />
            <a
              href={resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume PDF in a new tab"
              className={primaryResumeBtn}
            >
              View Resume
            </a>
          </span>
          <a href={resumePdfPath} download className={secondaryResumeBtn}>
            Download Resume
          </a>
        </div>

        <div className="mt-12 w-full">
          <p className="mb-4 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
            Preview
          </p>
          <div className="overflow-hidden rounded-xl border border-sky-200 bg-sky-100/50 shadow-sm ring-1 ring-sky-300/25 dark:border-slate-700 dark:bg-slate-800/50 dark:ring-slate-700/50">
            <iframe
              title="Roy Ho resume PDF preview"
              src={resumePdfPath}
              className="h-[min(85vh,56rem)] w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
