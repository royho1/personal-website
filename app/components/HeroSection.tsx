"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail, FiMapPin } from "react-icons/fi";

const profileImageSrc = "/roy-ho-headshot.jpg";
const EMAIL = "royho.career@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/royho1/";
const GITHUB_URL = "https://github.com/royho1";
const XLR8_URL = "https://www.tryxlr8.ai";
const JAIKE_URL = "https://ijaike.org/";

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-accent";

const BUTTON_BASE = `inline-flex h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-[10px] px-7 text-lg font-semibold transition-colors duration-200 sm:w-auto ${FOCUS_RING}`;

const ROLE_LINK = `rounded-sm font-medium text-hero-accent underline decoration-transparent underline-offset-4 transition-[color,text-decoration-color] duration-150 hover:decoration-current focus-visible:decoration-current ${FOCUS_RING}`;

const FOOTER_LINK = `inline-flex min-h-11 items-center gap-2 rounded-sm text-hero-text transition-colors hover:text-hero-accent ${FOCUS_RING}`;

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="flex min-h-[calc(100svh-4rem)] flex-col overflow-x-clip bg-hero-bg font-display lg:min-h-[calc(60vh+200px)]"
    >
      {/* Desktop spare height splits 1:2 above/below so the hero sits high
          under the nav instead of dead center. The section min-height is
          tuned to the 524px photo so the top gap stays the same at every
          viewport height while the bottom gap stays modest. */}
      <div aria-hidden="true" className="hidden lg:block lg:flex-[1]" />
      <div className="hero-container flex flex-1 flex-col items-start gap-12 py-12 lg:flex-none lg:flex-row lg:items-center lg:gap-16 lg:pb-4 lg:pt-8 xl:gap-24">
        {/* Percent offsets keep the accent block's peek proportional when the
            404x524 wrapper scales down on smaller screens. */}
        <div className="relative isolate aspect-[404/524] w-[min(300px,100%)] shrink-0 lg:h-[524px] lg:w-[404px]">
          <div
            aria-hidden="true"
            className="hero-photo-glow pointer-events-none absolute -inset-[60px] z-0"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 top-[4.58%] z-[1] h-[95.42%] w-[94.06%] rounded-[20px] bg-hero-accent"
          />
          <div className="absolute left-[5.94%] top-0 z-[2] h-[95.42%] w-[94.06%] overflow-hidden rounded-[20px] shadow-[0_24px_60px_-12px_rgba(8,47,73,0.35)]">
            <Image
              src={profileImageSrc}
              alt="Portrait of Roy Ho"
              fill
              priority
              sizes="(min-width: 1024px) 380px, 280px"
              className="object-cover object-[50%_20%]"
            />
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full min-w-0 flex-1 flex-col gap-7"
        >
          <motion.p
            variants={itemVariants}
            className="flex items-center gap-3 text-[15px] font-semibold uppercase tracking-[0.08em] text-hero-muted"
          >
            <span aria-hidden className="h-0.5 w-8 shrink-0 bg-hero-muted" />
            Data Science &amp; AI · San Francisco
          </motion.p>

          <motion.h1
            variants={itemVariants}
            id="hero-heading"
            className="-ml-[0.041em] text-[52px] font-extrabold leading-[0.92] tracking-[-0.045em] text-hero-text sm:text-[64px] lg:text-[104px]"
          >
            Roy Ho
          </motion.h1>

          <motion.ul
            variants={itemVariants}
            className="flex flex-col gap-1.5 text-xl font-medium leading-snug text-hero-text-2 lg:text-2xl"
          >
            <li className="flex items-start gap-2.5">
              <span className="flex h-[1lh] shrink-0 items-center">
                <span aria-hidden="true" className="status-dot" />
              </span>
              <span>
                AI Search Strategist at{" "}
                <a
                  href={XLR8_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ROLE_LINK}
                >
                  XLR8 AI
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="flex h-[1lh] shrink-0 items-center">
                <span aria-hidden="true" className="status-dot" />
              </span>
              <span>
                Part-time AI Researcher at{" "}
                <a
                  href={JAIKE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ROLE_LINK}
                >
                  JAIKE
                </a>
              </span>
            </li>
          </motion.ul>

          <motion.p
            variants={itemVariants}
            className="max-w-[60ch] text-xl leading-normal text-hero-text-2"
          >
            Building at the intersection of software engineering, data science,
            and AI, finding and developing technical solutions to real problems.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-1 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <a
              href="#projects"
              className={`${BUTTON_BASE} bg-hero-accent text-white hover:opacity-90 dark:text-hero-bg`}
            >
              View projects
              <ArrowRight className="h-5 w-5" strokeWidth={2.25} aria-hidden />
            </a>
            <a
              href="#contact"
              className={`${BUTTON_BASE} border-[1.5px] border-hero-text bg-transparent text-hero-text hover:bg-hero-accent-tint`}
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>
      </div>
      <div aria-hidden="true" className="hidden lg:block lg:flex-[2]" />

      <div className="border-t border-hero-border">
        <div className="hero-container flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-4 text-base sm:min-h-20">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 font-medium">
            <li>
              <a href={`mailto:${EMAIL}`} className={FOOTER_LINK}>
                <FiMail size={20} aria-hidden="true" className="shrink-0" />
                {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK}
              >
                <FaLinkedin
                  size={22}
                  aria-hidden="true"
                  className="shrink-0 text-[#0A66C2]"
                />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK}
              >
                <FaGithub
                  size={22}
                  aria-hidden="true"
                  className="shrink-0 text-hero-text"
                />
                GitHub
              </a>
            </li>
          </ul>
          <p className="inline-flex items-center gap-2 text-hero-muted">
            <FiMapPin size={18} aria-hidden="true" className="shrink-0" />
            San Francisco, CA
          </p>
        </div>
      </div>
    </section>
  );
}
