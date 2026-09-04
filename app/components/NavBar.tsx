"use client";

import { useEffect, useId, useRef, useState, Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import {
  FILTERS,
  emitProjectsFilter,
  getProjectsFilter,
  subscribeToProjectsFilter,
  type Filter,
} from "./projectsFilterBus";

/** Inline desktop nav needs ~1024px; keep the hamburger until then. */
const DESKTOP_NAV_MQ = "(min-width: 1024px)";

const navLinks = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Resume", href: "/#resume", id: "resume" },
  { label: "Hobbies", href: "/#hobbies", id: "hobbies" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

/** Shared base classes for the top-level nav link text so the Projects
 * trigger lines up perfectly with the sibling anchors. */
function navLinkClasses(isActive: boolean) {
  return `relative inline-block origin-center cursor-pointer font-medium transition-all duration-200 ease-out hover:scale-105 hover:font-bold hover:text-sky-900 dark:hover:text-sky-200 ${
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
  useEffect(() => {
    setActiveFilter(getProjectsFilter());
    return subscribeToProjectsFilter(setActiveFilter);
  }, []);

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
          href="/#projects"
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
          className="inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:text-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:text-slate-400 dark:hover:text-sky-200"
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
                      href="/#projects"
                      role="menuitem"
                      onClick={() => chooseFilter(option)}
                      className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
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

function DesktopNavLinks({
  activeId,
  pathname,
}: {
  activeId: string;
  pathname: string;
}) {
  return (
    <ul className="hidden items-center justify-end gap-6 text-sm text-slate-600 lg:flex lg:gap-8 dark:text-slate-300">
      {navLinks.map((link) => {
        const isActive = activeId === link.id;
        const item =
          link.id === "projects" ? (
            <ProjectsNavItem key={link.href} isActive={isActive} />
          ) : (
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

        if (link.id === "about") {
          const isAskActive = pathname === "/ask";
          return (
            <Fragment key={link.href}>
              {item}
              <li>
                <Link
                  href="/ask"
                  aria-current={isAskActive ? "page" : undefined}
                  className={navLinkClasses(isAskActive)}
                >
                  Ask Atlas
                  <ActiveUnderline isActive={isAskActive} />
                </Link>
              </li>
            </Fragment>
          );
        }

        return item;
      })}
    </ul>
  );
}

function MobileNavPanel({
  open,
  onClose,
  activeId,
  pathname,
  panelId,
}: {
  open: boolean;
  onClose: () => void;
  activeId: string;
  pathname: string;
  panelId: string;
}) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setActiveFilter(getProjectsFilter());
    return subscribeToProjectsFilter(setActiveFilter);
  }, []);

  useEffect(() => {
    if (!open) {
      setFiltersOpen(false);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const chooseFilter = (filter: Filter) => {
    emitProjectsFilter(filter);
    onClose();
  };

  const mobileLinkClass = (isActive: boolean) =>
    `flex w-full items-center rounded-lg px-3 py-3 text-base font-medium transition-colors ${
      isActive
        ? "bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-200"
        : "text-slate-700 hover:bg-sky-50 hover:text-sky-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-sky-200"
    }`;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            key="mobile-nav-backdrop"
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-[1px] lg:hidden dark:bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />
          <motion.div
            key="mobile-nav-panel"
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-x-0 top-[calc(env(safe-area-inset-top,0px)+3.75rem)] z-[70] max-h-[min(80vh,calc(100dvh-4.5rem))] overflow-y-auto border-b border-sky-200/80 bg-sky-50/98 px-4 py-3 shadow-lg shadow-sky-900/10 backdrop-blur-md lg:hidden dark:border-slate-800 dark:bg-slate-950/98 dark:shadow-black/40"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;

                if (link.id === "about") {
                  const isAskActive = pathname === "/ask";
                  return (
                    <Fragment key={link.href}>
                      <li>
                        <a
                          href={link.href}
                          aria-current={isActive ? "page" : undefined}
                          className={mobileLinkClass(isActive)}
                          onClick={onClose}
                        >
                          {link.label}
                        </a>
                      </li>
                      <li>
                        <Link
                          href="/ask"
                          aria-current={isAskActive ? "page" : undefined}
                          className={mobileLinkClass(isAskActive)}
                          onClick={onClose}
                        >
                          Ask Atlas
                        </Link>
                      </li>
                    </Fragment>
                  );
                }

                if (link.id === "projects") {
                  return (
                    <li key={link.href} className="flex flex-col gap-1">
                      <div className="flex items-stretch gap-1">
                        <a
                          href="/#projects"
                          aria-current={isActive ? "page" : undefined}
                          className={`${mobileLinkClass(isActive)} flex-1`}
                          onClick={() => {
                            emitProjectsFilter("All");
                            onClose();
                          }}
                        >
                          Projects
                        </a>
                        <button
                          type="button"
                          onClick={() => setFiltersOpen((v) => !v)}
                          aria-expanded={filtersOpen}
                          aria-controls={`${panelId}-project-filters`}
                          aria-label={
                            filtersOpen
                              ? "Hide project filters"
                              : "Show project filters"
                          }
                          className="inline-flex w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-sky-50 hover:text-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-200"
                        >
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${
                              filtersOpen ? "rotate-180" : "rotate-0"
                            }`}
                            aria-hidden
                          />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {filtersOpen && (
                          <motion.ul
                            id={`${panelId}-project-filters`}
                            key="mobile-project-filters"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="overflow-hidden pl-2"
                            role="menu"
                            aria-label="Project filters"
                          >
                            {FILTERS.map((option) => {
                              const isSelected = activeFilter === option;
                              return (
                                <li key={option} role="none">
                                  <a
                                    href="/#projects"
                                    role="menuitem"
                                    onClick={() => chooseFilter(option)}
                                    className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
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
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                }

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={mobileLinkClass(isActive)}
                      onClick={onClose}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function NavBar() {
  const [activeId, setActiveId] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const mobilePanelId = useId();

  useEffect(() => {
    const sections = navLinks
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) {
      setActiveId("");
      return;
    }

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
  }, [pathname]);

  // Close the mobile menu on route change (e.g. Ask Atlas).
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // If the menu is open and the viewport grows into the desktop nav range,
  // close it so body scroll lock + hidden panel cannot strand the page.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(DESKTOP_NAV_MQ);
    const handleChange = () => {
      if (mq.matches) setMobileOpen(false);
    };
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-sky-200/80 bg-sky-50/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4 md:gap-8 md:px-8 md:py-5"
        aria-label="Primary"
      >
        <a
          href="/"
          className="cursor-pointer text-base font-semibold tracking-tight text-sky-950 dark:text-sky-100"
        >
          Roy Ho
        </a>
        <div className="flex items-center justify-end gap-3 lg:gap-8">
          <DesktopNavLinks activeId={activeId} pathname={pathname} />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-sky-200 bg-white/80 text-sky-900 shadow-sm shadow-sky-900/10 transition-colors hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 lg:hidden dark:border-slate-700 dark:bg-slate-800/80 dark:text-sky-200 dark:hover:bg-slate-700"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls={mobilePanelId}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden strokeWidth={2} />
            ) : (
              <Menu className="h-5 w-5" aria-hidden strokeWidth={2} />
            )}
          </button>
        </div>
      </nav>

      <MobileNavPanel
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeId={activeId}
        pathname={pathname}
        panelId={mobilePanelId}
      />
    </header>
  );
}
