"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";
import { Clock, Mail, MapPin } from "lucide-react";
import type { MouseEvent } from "react";
import { fireConfettiFromElement } from "../lib/confetti";
import AtlasDog from "./AtlasDog";
import StatusBadge from "./StatusBadge";

const profileImageSrc = "/picture.jpeg";
const profileImageWidth = 799;
const profileImageHeight = 1123;

const primaryCtaClassName =
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-sky-600 px-7 py-3 text-base font-medium text-white shadow-sm shadow-sky-600/25 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-sky-700 hover:shadow-md hover:shadow-sky-600/30 dark:bg-sky-500 dark:shadow-sky-950/40 dark:hover:bg-sky-400";

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

function AvailabilityBadge() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let the browser handle the smooth #contact scroll via the anchor; we
    // just layer on the confetti burst from the badge's own position.
    fireConfettiFromElement(event.currentTarget);
  };

  return (
    <motion.a
      variants={itemVariants}
      href="#contact"
      onClick={handleClick}
      aria-label="Available for opportunities — jump to contact"
      className="self-center translate-y-1.5"
    >
      <StatusBadge className="cursor-pointer transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100 hover:shadow-md hover:shadow-emerald-900/10 dark:hover:border-emerald-400/70 dark:hover:bg-emerald-500/20">
        Available for opportunities
      </StatusBadge>
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
              UC Davis Graduate | B.S. Statistical Data Science, Minor in Computer Science
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
            className="max-w-lg rounded-lg border-l-4 border-sky-600 bg-sky-50/95 px-4 py-3.5 shadow-sm shadow-sky-900/5 ring-1 ring-sky-200/70 dark:border-sky-400 dark:bg-slate-800/90 dark:shadow-black/20 dark:ring-slate-600/50"
          >
            <p className="text-sm font-medium leading-relaxed text-slate-900 md:text-base dark:text-slate-100">
              <Clock
                className="inline-block h-[1em] w-[1em] align-[-0.125em] mr-1.5 text-current"
                strokeWidth={2}
                aria-hidden
              />
              Currently looking for Analyst or Engineering roles in the Bay
              Area while finishing a first-authored AI research paper and
              building side projects.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="max-w-lg space-y-2 text-base text-slate-500 md:text-lg dark:text-slate-400"
          >
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              <Mail
                className="h-[1em] w-[1em] shrink-0 text-current"
                strokeWidth={2}
                aria-hidden
              />
              <span className="text-slate-400 dark:text-slate-500">Email:</span>{" "}
              <a
                href="mailto:royho.career@gmail.com"
                className="cursor-pointer text-sky-600 underline underline-offset-2 transition-colors hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
              >
                royho.career@gmail.com
              </a>
            </p>
            <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              <MapPin
                className="h-[1em] w-[1em] shrink-0 text-current"
                strokeWidth={2}
                aria-hidden
              />
              <span className="text-slate-400 dark:text-slate-500">Location:</span>{" "}
              <span className="text-slate-600 dark:text-slate-300">
                San Francisco, CA
              </span>
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
              <FaLinkedin className="h-7 w-7 text-[#0A66C2]" aria-hidden />
            </a>
            <a
              href="https://github.com/royho1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-800 dark:text-slate-400 dark:hover:text-sky-300"
            >
              <FaGithub className="h-7 w-7 text-[#181717] dark:text-white" aria-hidden />
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex w-full flex-col items-start gap-8 pt-1"
          >
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className={primaryCtaClassName}>
                View Projects
              </a>
              <a href="#resume" className={primaryCtaClassName}>
                Resume
              </a>
            </div>
            <Link
              href="/ask"
              aria-label="Ask Atlas"
              className="group inline-flex items-center gap-2.5 text-sky-800 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:text-sky-950 dark:text-sky-300 dark:hover:text-sky-100"
            >
              <span className="shrink-0 transition-transform duration-200 ease-out group-hover:scale-110">
                <AtlasDog size={68} />
              </span>
              <span className="font-handwriting -rotate-2 text-2xl leading-none tracking-wide md:text-[1.7rem]">
                Ask Atlas!
              </span>
            </Link>
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
