"use client";

import Image from "next/image";
import Link from "next/link";
import { FaChevronDown, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";
import { Clock, Mail, MapPin } from "lucide-react";
import AtlasDog from "./AtlasDog";

const profileImageSrc = "/picture.jpeg";
const profileImageWidth = 799;
const profileImageHeight = 1123;

const primaryCtaClassName =
  "inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-sky-600 px-5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
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
      className="bg-white dark:bg-slate-950"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto flex max-w-[1120px] flex-col items-center gap-10 px-6 pb-8 pt-12 md:flex-row md:items-center md:gap-16 md:px-8 md:pb-10 md:pt-16 lg:pt-20">
        <div className="w-full max-w-[380px] shrink-0">
          <div className="relative mx-auto w-full max-w-[380px] md:mx-0">
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
                className="block h-auto w-full"
                sizes="380px"
                priority
              />
            </div>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex w-full min-w-0 flex-1 flex-col gap-7"
        >
          {/* Zone 1 — Identity */}
          <motion.div variants={itemVariants} className="flex flex-col gap-5">
            <h1
              id="hero-heading"
              className="text-4xl font-bold leading-none tracking-tight text-sky-950 md:text-5xl lg:text-6xl dark:text-sky-100"
            >
              Roy Ho
            </h1>
            <p className="text-[17px] leading-snug text-sky-800/90 dark:text-sky-300">
              UC Davis Graduate | B.S. Statistical Data Science, Minor in
              Computer Science
            </p>
          </motion.div>

          {/* Zone 2 — Status */}
          <motion.div
            variants={itemVariants}
            className="max-w-[36rem] rounded-lg border-l-4 border-sky-600 bg-sky-50/95 px-4 py-3 shadow-sm shadow-sky-900/5 ring-1 ring-sky-200/70 dark:border-sky-400 dark:bg-slate-800/90 dark:shadow-black/20 dark:ring-slate-600/50"
          >
            <p className="text-[15px] font-medium leading-snug text-slate-900 dark:text-slate-100">
              <Clock
                className="mr-2 inline-block h-[1em] w-[1em] align-[-0.125em] text-sky-700 dark:text-sky-300"
                strokeWidth={2}
                aria-hidden
              />
              Currently looking for Analyst or Engineering roles while
              finishing a first-authored AI research paper and building side
              projects.
            </p>
          </motion.div>

          {/* Zone 3 — Contact + socials */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-y-3"
          >
            <div className="flex flex-col gap-1.5 text-sm">
              <p className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                <Mail
                  className="h-3.5 w-3.5 shrink-0 text-slate-500 dark:text-slate-400"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-slate-400 dark:text-slate-500">Email:</span>
                <a
                  href="mailto:royho.career@gmail.com"
                  className="text-sky-600 underline underline-offset-2 transition-colors hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
                >
                  royho.career@gmail.com
                </a>
              </p>
              <p className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                <MapPin
                  className="h-3.5 w-3.5 shrink-0 text-slate-500 dark:text-slate-400"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-slate-400 dark:text-slate-500">
                  Location:
                </span>
                <span className="text-slate-800 dark:text-slate-200">
                  San Francisco, CA
                </span>
              </p>
            </div>

            <span
              aria-hidden
              className="ml-6 mr-6 hidden h-10 w-px shrink-0 self-center bg-sky-200 sm:inline-block dark:bg-slate-600"
            />

            <div className="flex items-center gap-3 sm:ml-0">
              <a
                href="https://www.linkedin.com/in/royho1/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex cursor-pointer transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <FaLinkedin className="h-7 w-7 text-[#0A66C2]" aria-hidden />
              </a>
              <a
                href="https://github.com/royho1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex cursor-pointer transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
              >
                <FaGithub
                  className="h-7 w-7 text-[#181717] dark:text-white"
                  aria-hidden
                />
              </a>
            </div>
          </motion.div>

          {/* Zone 4 — Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <div className="flex flex-wrap items-center gap-2.5">
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
              className="group inline-flex cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 text-sky-700 transition-all duration-200 ease-out hover:scale-105 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:text-sky-300"
            >
              <AtlasDog size={44} className="shrink-0" />
              <span className="font-handwriting -rotate-2 text-2xl leading-none tracking-wide text-sky-700 dark:text-sky-300">
                Ask Atlas!
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="flex justify-center pb-6 pt-10 md:pb-8 md:pt-14">
        <a
          href="#about"
          aria-label="Scroll to explore"
          className="group flex cursor-pointer flex-col items-center gap-2 text-slate-500 transition-colors hover:text-sky-800 dark:text-slate-400 dark:hover:text-sky-300"
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
