"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";
import type { MouseEvent } from "react";

const profileImageSrc = "/picture.jpeg";
const profileImageWidth = 799;
const profileImageHeight = 1123;

const tagline =
  "I build data-driven solutions using Python, SQL, R, Excel, and Machine Learning.";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

/**
 * Rough moment (ms) the tagline becomes visible so the typewriter
 * can start shortly after it slides in. Matches the container
 * delayChildren + staggerChildren * taglineIndex (0.1 + 0.15 * 3 = 0.55s),
 * with a small cushion so the typing begins once the line is readable.
 */
const TAGLINE_TYPE_DELAY_MS = 700;
const TYPE_INTERVAL_MS = 32;
const CURSOR_BLINK_MS = 500;
const CURSOR_LINGER_MS = 3500;

function Typewriter({ text }: { text: string }) {
  const [count, setCount] = useState(0);
  const [cursorActive, setCursorActive] = useState(true);
  const [cursorOn, setCursorOn] = useState(true);
  const textRef = useRef(text);
  textRef.current = text;

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const startId = setTimeout(() => {
      intervalId = setInterval(() => {
        setCount((prev) => {
          if (prev >= textRef.current.length) {
            if (intervalId) clearInterval(intervalId);
            return prev;
          }
          return prev + 1;
        });
      }, TYPE_INTERVAL_MS);
    }, TAGLINE_TYPE_DELAY_MS);

    return () => {
      clearTimeout(startId);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (count < text.length) return;
    const hideId = setTimeout(() => setCursorActive(false), CURSOR_LINGER_MS);
    return () => clearTimeout(hideId);
  }, [count, text.length]);

  useEffect(() => {
    if (!cursorActive) {
      setCursorOn(false);
      return;
    }
    const blinkId = setInterval(
      () => setCursorOn((on) => !on),
      CURSOR_BLINK_MS,
    );
    return () => clearInterval(blinkId);
  }, [cursorActive]);

  return (
    <span aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-sky-800 align-middle transition-opacity duration-150 dark:bg-sky-300"
        style={{ opacity: cursorActive && cursorOn ? 1 : 0 }}
      />
    </span>
  );
}

/**
 * Small celebratory burst fired from a specific point on the page. Imported
 * lazily so `canvas-confetti` (which touches the DOM at module load) is
 * never pulled in during server rendering.
 */
async function fireConfettiFrom(originX: number, originY: number) {
  const mod = await import("canvas-confetti");
  const confetti = mod.default;
  const defaults = {
    origin: { x: originX, y: originY },
    spread: 70,
    ticks: 200,
    gravity: 0.9,
    scalar: 0.9,
    colors: ["#38bdf8", "#0ea5e9", "#22c55e", "#fde047", "#f472b6"],
  };

  // Two quick bursts so the celebration feels a bit more alive.
  confetti({ ...defaults, particleCount: 90, startVelocity: 55 });
  confetti({
    ...defaults,
    particleCount: 50,
    startVelocity: 35,
    spread: 110,
    scalar: 0.75,
  });
}

function AvailabilityBadge() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle the smooth #contact scroll via the anchor; we
    // just layer on the confetti burst from the badge's own position.
    const rect = event.currentTarget.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;
    void fireConfettiFrom(originX, originY);
  };

  return (
    <motion.a
      variants={itemVariants}
      href="#contact"
      onClick={handleClick}
      aria-label="Available for opportunities — jump to contact"
      className="inline-flex translate-y-1.5 cursor-pointer items-center gap-2 self-center rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-[13px] font-medium leading-none text-emerald-700 shadow-sm shadow-emerald-900/10 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-900/10 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300 dark:shadow-emerald-950/40 dark:hover:border-emerald-400/70 dark:hover:bg-emerald-500/20"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      Available for opportunities
    </motion.a>
  );
}

export default function HeroSection() {
  return (
    <section
      className="bg-white dark:bg-slate-950"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-14 px-6 pb-8 pt-16 md:grid-cols-2 md:gap-16 md:px-8 md:pb-10 md:pt-24 lg:gap-20 lg:pt-32">
        <div className="flex justify-center md:justify-start">
          <div className="relative w-full max-w-[26.5rem]">
            {/* Soft static halo behind the photo. Sits below the photo via
             * DOM order (painted first) and blurs outwards so only the
             * edges catch the light. */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[1.75rem] bg-sky-400 opacity-20 blur-2xl dark:bg-sky-500 dark:opacity-25"
            />
            <div className="group relative overflow-hidden rounded-2xl bg-sky-200/80 shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-slate-800/60 dark:shadow-black/40 dark:ring-slate-700">
              <Image
                src={profileImageSrc}
                alt="Roy Ho"
                width={profileImageWidth}
                height={profileImageHeight}
                className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
                sizes="(max-width: 768px) 100vw, 424px"
                priority
              />
            </div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8"
        >
          <div className="space-y-3 md:space-y-4">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 leading-none">
              <motion.h1
                id="hero-heading"
                variants={itemVariants}
                className="text-4xl font-bold leading-none tracking-tight text-sky-950 md:text-5xl lg:text-6xl dark:text-sky-100"
              >
                Roy Ho
              </motion.h1>
              <AvailabilityBadge />
            </div>
            <motion.p
              variants={itemVariants}
              className="text-lg text-sky-800/90 md:text-xl dark:text-sky-300"
            >
              UC Davis Graduate
            </motion.p>
          </div>

          <motion.p
            variants={itemVariants}
            className="min-h-[3.25rem] max-w-lg text-base leading-relaxed text-slate-600 md:min-h-[3.75rem] md:text-lg dark:text-slate-300"
          >
            <Typewriter text={tagline} />
          </motion.p>

          <motion.div
            variants={itemVariants}
            aria-hidden
            className="max-w-lg border-t border-sky-300 dark:border-slate-700"
          />

          <motion.p
            variants={itemVariants}
            className="max-w-lg text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-300"
          >
            <span className="font-semibold text-sky-950 dark:text-sky-100">Currently:</span>{" "}
            Seeking full-time Data Analyst / Data Engineer roles while
            building an SF Restaurant Safety Map.
          </motion.p>

          <motion.div
            variants={itemVariants}
            aria-hidden
            className="max-w-lg border-t border-sky-300 dark:border-slate-700"
          />

          <motion.div
            variants={itemVariants}
            className="max-w-lg space-y-2 text-base text-slate-500 md:text-lg dark:text-slate-400"
          >
            <p>
              <span className="text-slate-400 dark:text-slate-500">Email: </span>
              <a
                href="mailto:royho.career@gmail.com"
                className="text-slate-500 transition-colors hover:text-sky-800 dark:text-slate-300 dark:hover:text-sky-300"
              >
                royho.career@gmail.com
              </a>
            </p>
            <p>
              <span className="text-slate-400 dark:text-slate-500">Phone: </span>
              <a
                href="tel:+14157418955"
                className="text-slate-500 transition-colors hover:text-sky-800 dark:text-slate-300 dark:hover:text-sky-300"
              >
                415-741-8955
              </a>
            </p>
            <p>
              <span className="text-slate-400 dark:text-slate-500">Location: </span>
              <span className="dark:text-slate-300">Davis, CA | San Francisco, CA</span>
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-9">
            <a
              href="https://www.linkedin.com/in/royho1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-800 dark:text-slate-400 dark:hover:text-sky-300"
            >
              <FaLinkedin className="h-7 w-7" aria-hidden />
            </a>
            <a
              href="https://github.com/royho1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-800 dark:text-slate-400 dark:hover:text-sky-300"
            >
              <FaGithub className="h-7 w-7" aria-hidden />
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-nowrap gap-4 pt-1"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-sky-600 px-7 py-3 text-base font-medium text-white shadow-sm shadow-sky-600/25 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-sky-700 hover:shadow-md hover:shadow-sky-600/30 dark:bg-sky-500 dark:shadow-sky-950/40 dark:hover:bg-sky-400"
            >
              View Projects
            </a>
            <a
              href="#experience"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-sky-600 px-7 py-3 text-base font-medium text-white shadow-sm shadow-sky-600/25 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-sky-700 hover:shadow-md hover:shadow-sky-600/30 dark:bg-sky-500 dark:shadow-sky-950/40 dark:hover:bg-sky-400"
            >
              View Experience
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-sky-300 bg-white/90 px-7 py-3 text-base font-medium text-sky-950 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-sky-50 hover:shadow-md hover:shadow-sky-300/30 dark:border-slate-700 dark:bg-slate-900/70 dark:text-sky-200 dark:hover:bg-slate-800"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex justify-center pb-6 pt-10 md:pb-8 md:pt-16">
        <a
          href="#about"
          aria-label="Scroll to explore"
          className="group flex flex-col items-center gap-2 text-slate-500 transition-colors hover:text-sky-800 dark:text-slate-400 dark:hover:text-sky-300"
        >
          <span className="flex animate-bounce flex-col items-center gap-2 [animation-duration:1.8s]">
            <span className="text-xs font-medium uppercase tracking-[0.2em] md:text-sm">
              Scroll to explore
            </span>
            <FaChevronDown className="h-5 w-5" aria-hidden />
          </span>
        </a>
      </div>
    </section>
  );
}
