"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import {
  FILTERS,
  emitProjectsFilter,
  subscribeToProjectsFilter,
  type Filter,
} from "./projectsFilterBus";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
  { label: "Resume", href: "#resume", id: "resume" },
  { label: "Hobbies", href: "#hobbies", id: "hobbies" },
] as const;

/** Shared base classes for the top-level nav link text so the Projects
 * trigger lines up perfectly with the sibling anchors. */
function navLinkClasses(isActive: boolean) {
  return `relative inline-block origin-center font-medium transition-all duration-200 ease-out hover:scale-105 hover:font-bold hover:text-sky-900 dark:hover:text-sky-200 ${
    isActive
      ? "font-semibold text-sky-900 dark:text-sky-200"
      : "text-slate-600 dark:text-slate-300"
  }`;
}

function ActiveUnderline({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full bg-sky-700 transition-transform duration-300 ease-out dark:bg-sky-300 ${
        isActive ? "scale-x-100" : "scale-x-0"
      }`}
      aria-hidden
    />
  );
}

/**
 * The "Projects" nav entry: the label still links to #projects, but now it
 * also exposes a dropdown of filter options. The dropdown opens on hover
 * (desktop) and via the adjacent chevron button (touch). Choosing any
 * option dispatches a shared filter event that the ProjectsSection picks
 * up, then the browser handles the smooth hash-scroll.
 */
function ProjectsNavItem({ isActive }: { isActive: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const containerRef = useRef<HTMLLIElement>(null);

  // Keep the dropdown's highlighted option in sync with the
  // ProjectsSection, regardless of which surface changed the filter.
  useEffect(() => subscribeToProjectsFilter(setActiveFilter), []);

  // Close when focus/pointer moves outside (covers taps elsewhere on
  // touch devices, which don't fire mouseleave).
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const chooseFilter = (filter: Filter) => {
    emitProjectsFilter(filter);
    setIsOpen(false);
  };

  return (
    <li
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center gap-1">
        <a
          href="#projects"
          aria-current={isActive ? "page" : undefined}
          onClick={() => emitProjectsFilter("All")}
          className={navLinkClasses(isActive)}
        >
          Projects
          <ActiveUnderline isActive={isActive} />
        </a>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Hide project filters" : "Show project filters"}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition-colors hover:text-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:text-slate-400 dark:hover:text-sky-200"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="projects-dropdown"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            // Transparent pt-2 bridges the gap between the nav item and
            // the visible menu so the cursor can travel between them
            // without triggering mouseleave.
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2"
            role="menu"
            aria-label="Project filters"
          >
            <ul className="min-w-[12rem] overflow-hidden rounded-xl border border-sky-200 bg-white/95 p-1 shadow-lg shadow-sky-900/10 ring-1 ring-sky-200/80 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 dark:shadow-black/40 dark:ring-slate-700/60">
              {FILTERS.map((option) => {
                const isSelected = activeFilter === option;
                return (
                  <li key={option} role="none">
                    <a
                      href="#projects"
                      role="menuitem"
                      onClick={() => chooseFilter(option)}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                        isSelected
                          ? "bg-sky-100 font-semibold text-sky-900 dark:bg-sky-500/15 dark:text-sky-200"
                          : "text-slate-600 hover:bg-sky-50 hover:text-sky-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-200"
                      }`}
                    >
                      <span>{option}</span>
                      {isSelected && (
                        <span
                          className="ml-3 h-1.5 w-1.5 rounded-full bg-sky-600 dark:bg-sky-300"
                          aria-hidden
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function NavBar() {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio,
          );
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-sky-200/80 bg-sky-50/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between gap-8 px-6 py-5 md:px-8"
        aria-label="Primary"
      >
        <a
          href="#"
          className="text-base font-semibold tracking-tight text-sky-950 dark:text-sky-100"
        >
          Roy Ho
        </a>
        <div className="flex flex-wrap items-center justify-end gap-6 md:gap-8">
          <ul className="flex flex-wrap items-center justify-end gap-6 text-sm text-slate-600 md:gap-8 dark:text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              if (link.id === "projects") {
                return (
                  <ProjectsNavItem key={link.href} isActive={isActive} />
                );
              }
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={navLinkClasses(isActive)}
                  >
                    {link.label}
                    <ActiveUnderline isActive={isActive} />
                  </a>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
