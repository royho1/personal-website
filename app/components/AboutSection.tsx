"use client";

import { motion, type Variants } from "framer-motion";
import type { ComponentType, SVGProps } from "react";
import {
  FaBrain,
  FaChartLine,
  FaDatabase,
  FaFileExcel,
} from "react-icons/fa";
import { IoLogoTableau } from "react-icons/io5";
import {
  SiDocker,
  SiFlask,
  SiGit,
  SiPandas,
  SiPython,
  SiPytorch,
  SiR,
  SiReact,
  SiScikitlearn,
} from "react-icons/si";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

/** Power BI brand mark — not bundled in react-icons@5.6.0 (no SiPowerbi). */
function SiPowerBiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M4 20V4h3.5v16H4zm5.25-4V8h3.5v8h-3.5zm5.25-3V11h3.5v6h-3.5zm5.25-2V13H23v5h-3.25z" />
    </svg>
  );
}

const skillsWithIcons: { name: string; Icon: IconType; color: string }[] = [
  { name: "Python", Icon: SiPython, color: "text-[#3776AB]" },
  { name: "SQL", Icon: FaDatabase, color: "text-sky-700" },
  { name: "Tableau", Icon: IoLogoTableau, color: "text-[#E97627]" },
  { name: "Power BI", Icon: SiPowerBiIcon, color: "text-[#F2C811]" },
  { name: "Excel", Icon: FaFileExcel, color: "text-[#217346]" },
  { name: "R", Icon: SiR, color: "text-[#276DC3]" },
  { name: "Pandas", Icon: SiPandas, color: "text-[#150458]" },
  { name: "Scikit-learn", Icon: SiScikitlearn, color: "text-[#F7931E]" },
  { name: "Docker", Icon: SiDocker, color: "text-[#2496ED]" },
  { name: "Git", Icon: SiGit, color: "text-[#F05032]" },
  { name: "Flask", Icon: SiFlask, color: "text-slate-800 dark:text-slate-200" },
  { name: "React", Icon: SiReact, color: "text-[#61DAFB]" },
  { name: "PyTorch", Icon: SiPytorch, color: "text-[#EE4C2C]" },
  { name: "Data Visualization", Icon: FaChartLine, color: "text-sky-700" },
  { name: "Machine Learning", Icon: FaBrain, color: "text-sky-700" },
];

const stats = [
  { label: "Projects", value: "13+" },
  { label: "Core Tools", value: `${skillsWithIcons.length}+` },
  { label: "Page AI Research Paper", value: "29" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-sky-200/80 bg-sky-100 dark:border-slate-800 dark:bg-slate-900"
      aria-labelledby="about-heading"
    >
      <motion.div
        className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          id="about-heading"
          variants={itemVariants}
          className="mx-auto block w-max max-w-full cursor-default text-center text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl dark:text-sky-100"
        >
          About
        </motion.h2>

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.1fr_minmax(0,1fr)] lg:gap-16">
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="space-y-6 text-base leading-relaxed text-slate-900 md:text-lg dark:text-slate-200"
            >
              <p>
                Hi, my name is Roy Ho, and I am a recent UC Davis graduate with
                a Bachelor&apos;s degree in{" "}
                <span className="font-semibold text-sky-800 dark:text-sky-300">
                  Statistical Data Science
                </span>{" "}
                and a minor in{" "}
                <span className="font-semibold text-sky-800 dark:text-sky-300">
                  Computer Science
                </span>
                .
              </p>
              <p>
                I&apos;m interested in building data-driven solutions using
                Python, R, SQL, and Excel, with a focus on{" "}
                <span className="font-semibold text-sky-800 dark:text-sky-300">
                  machine learning
                </span>
                . I&apos;m currently pursuing roles in{" "}
                <span className="font-semibold text-sky-800 dark:text-sky-300">
                  data analytics
                </span>{" "}
                and{" "}
                <span className="font-semibold text-sky-800 dark:text-sky-300">
                  data engineering
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-sky-200 bg-white p-5 shadow-sm shadow-sky-200/30 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/30"
            >
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-sm dark:text-slate-400">
                Education
              </h3>
              <p className="mt-3 text-base font-semibold text-sky-950 dark:text-sky-100">
                University of California, Davis
              </p>
              <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                B.S. Statistical Data Science, Minor in Computer Science
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                September 2022 to March 2026
              </p>
              <p className="mt-4 border-t border-sky-100 pt-4 text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:text-slate-300">
                <span className="font-semibold text-sky-900 dark:text-sky-200">
                  Certification:
                </span>{" "}
                NVIDIA, Fundamentals of Deep Learning, October 2025
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 sm:gap-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-sky-200 bg-white p-4 text-center shadow-sm shadow-sky-200/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-sky-300/30 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/30 dark:hover:shadow-black/50"
                >
                  <div className="text-2xl font-bold text-sky-900 md:text-3xl dark:text-sky-200">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[0.7rem] font-medium uppercase tracking-wide text-sky-800 sm:text-xs dark:text-sky-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-sm dark:text-slate-400">
              Core Skills
            </h3>
            <ul className="grid grid-cols-2 gap-3" aria-label="Skills">
              {skillsWithIcons.map(({ name, Icon, color }) => (
                <li key={name}>
                  <span className="flex cursor-default items-center gap-3 rounded-xl border border-sky-200 bg-white px-4 py-3 text-sm font-medium text-sky-900 shadow-sm shadow-sky-200/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-sky-300 hover:bg-sky-50 hover:shadow-md hover:shadow-sky-300/30 dark:border-slate-700 dark:bg-slate-800/70 dark:text-sky-100 dark:shadow-black/30 dark:hover:border-slate-600 dark:hover:bg-slate-700/70 dark:hover:shadow-black/50">
                    <Icon className={`h-5 w-5 shrink-0 ${color}`} aria-hidden />
                    <span className="truncate">{name}</span>
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
