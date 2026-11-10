"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { emitProjectsFilter } from "./projectsFilterBus";
import {
  FEATURED_PROJECT_NAV_ITEMS,
  emitProjectsFocus,
  getProjectsFocus,
  subscribeToProjectsFocus,
  type ProjectNavId,
} from "./projectsFocusBus";

/** Inline desktop nav needs ~1024px; keep the hamburger until then. */
const DESKTOP_NAV_MQ = "(min-width: 1024px)";

/** Portfolio size shown beside View All Projects (no extra data fetch). */
const PROJECTS_COUNT_LABEL = "13+";

const navLinks = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Hobbies", href: "/#hobbies", id: "hobbies" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

const RESUME_HREF = "/#resume";
const ASK_ATLAS_HREF = "/ask";

/** Sections the scroll-spy watches. Hero and Resume have no center link but
 * still need to clear the active state when they are in view. */
const OBSERVED_SECTION_IDS = ["hero", ...navLinks.map(({ id }) => id), "resume"];

const FOCUS_RING =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:focus-visible:outline-sky-400";

/** Shared base classes for the top-level nav link text so the Projects
 * trigger lines up perfectly with the sibling anchors. */
function navLinkClasses(isActive: boolean) {
  return `relative inline-block cursor-pointer rounded-sm text-base font-medium transition-colors duration-200 ease-out hover:text-[#0F2A47] dark:hover:text-white ${FOCUS_RING} ${
    isActive
      ? "text-[#0F2A47] dark:text-white"
      : "text-[#48607A] dark:text-slate-300"
  }`;
}

const PILL_BASE = `inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-[18px] text-[15px] font-semibold transition-colors duration-200 ${FOCUS_RING}`;

const ASK_ATLAS_PILL = `${PILL_BASE} border border-[#C9D6E4] bg-transparent text-[#0F2A47] hover:border-[#0F2A47] dark:border-slate-600 dark:text-slate-100 dark:hover:border-slate-300`;

const RESUME_PILL = `${PILL_BASE} bg-[#0F2A47] text-white hover:bg-[#1A3B5E] dark:bg-slate-100 dark:text-[#0F2A47] dark:hover:bg-white`;

function ActiveUnderline({ isActive }: { isActive: boolean }) {
  return (
    <span
      className={`pointer-events-none absolute -bottom-1.5 left-0 h-[2px] w-full origin-left rounded-full bg-[#0F2A47] transition-transform duration-300 ease-out dark:bg-white ${
        isActive ? "scale-x-100" : "scale-x-0"
      }`}
      aria-hidden
    />
  );
}

function chooseProjectsNavTarget(focusId: ProjectNavId | null) {
  // Reset skill filters so the target featured card is always visible.
  emitProjectsFilter("All");
  emitProjectsFocus(focusId);
}

/**
 * The "Projects" nav entry: the label still links to #projects, but now it
 * also exposes a dropdown of featured projects. The dropdown opens on hover
 * (desktop) and via the adjacent chevron button (touch). Choosing any
 * option resets the skill filter to All, records the focus target, and
 * scrolls to that project card (or the section for View All Projects).
 */
function ProjectsNavItem({ isActive }: { isActive: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFocus, setActiveFocus] = useState<ProjectNavId | null>(null);
  const containerRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setActiveFocus(getProjectsFocus());
    return subscribeToProjectsFocus(setActiveFocus);
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

  const chooseTarget = (focusId: ProjectNavId) => {
    chooseProjectsNavTarget(focusId);
    setIsOpen(false);
  };

  const featuredItemClass = (isSelected: boolean) =>
    `flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-normal transition-colors ${
      isSelected
        ? "bg-sky-100 font-semibold text-sky-900 dark:bg-sky-500/15 dark:text-sky-200"
        : "text-slate-600 hover:bg-sky-50 hover:text-sky-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-200"
    }`;

  const viewAllClass = (isSelected: boolean) =>
    `flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
      isSelected
        ? "bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-200"
        : "text-slate-500 hover:bg-sky-50 hover:text-sky-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-sky-200"
    }`;

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
          onClick={() => chooseProjectsNavTarget(null)}
          className={navLinkClasses(isActive)}
        >
          Projects
          <ActiveUnderline isActive={isActive} />
        </a>
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? "Hide project list" : "Show project list"}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          className={`inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-[#48607A] transition-colors hover:text-[#0F2A47] dark:text-slate-400 dark:hover:text-white ${FOCUS_RING}`}
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
            aria-label="Featured projects"
          >
            <ul className="min-w-[18rem] overflow-hidden rounded-xl border border-sky-200 bg-white p-1 shadow-lg shadow-sky-900/10 ring-1 ring-sky-200/80 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/40 dark:ring-slate-700/60">
              <li role="presentation" className="px-3 pb-1.5 pt-2">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Featured Projects
                </span>
              </li>
              {FEATURED_PROJECT_NAV_ITEMS.map((item) => {
                const isSelected = activeFocus === item.id;
                return (
                  <li key={item.id} role="none">
                    <a
                      href={`/#${item.id}`}
                      role="menuitem"
                      onClick={() => chooseTarget(item.id)}
                      className={featuredItemClass(isSelected)}
                    >
                      <span>{item.label}</span>
                      {isSelected && (
                        <span
                          className="ml-3 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-600 dark:bg-sky-300"
                          aria-hidden
                        />
                      )}
                    </a>
                  </li>
                );
              })}
              <li
                role="separator"
                className="mx-3 my-1.5 border-t border-sky-200/90 dark:border-slate-600"
                aria-hidden
              />
              <li role="none">
                <a
                  href="/#projects"
                  role="menuitem"
                  onClick={() => chooseTarget("projects")}
                  className={viewAllClass(activeFocus === "projects")}
                >
                  View all {PROJECTS_COUNT_LABEL} projects
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function DesktopNavLinks({ activeId }: { activeId: string }) {
  return (
    <ul className="hidden items-center gap-9 lg:flex">
      {navLinks.map((link) => {
        const isActive = activeId === link.id;
        return link.id === "projects" ? (
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
  const [activeFocus, setActiveFocus] = useState<ProjectNavId | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setActiveFocus(getProjectsFocus());
    return subscribeToProjectsFocus(setActiveFocus);
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

  const chooseTarget = (focusId: ProjectNavId) => {
    chooseProjectsNavTarget(focusId);
    onClose();
  };

  const mobileLinkClass = (isActive: boolean) =>
    `flex min-h-12 w-full items-center rounded-lg px-3 py-3 text-base font-medium transition-colors ${FOCUS_RING} ${
      isActive
        ? "bg-[#EEF3F8] text-[#0F2A47] dark:bg-slate-800 dark:text-white"
        : "text-[#48607A] hover:bg-[#F4F7FA] hover:text-[#0F2A47] dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white"
    }`;

  const mobileSubLinkClass = (isSelected: boolean, emphasis: boolean) =>
    `flex min-h-11 cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${FOCUS_RING} ${
      emphasis ? "font-bold" : "font-normal"
    } ${
      isSelected
        ? "bg-[#EEF3F8] font-semibold text-[#0F2A47] dark:bg-slate-800 dark:text-white"
        : "text-[#48607A] hover:bg-[#F4F7FA] hover:text-[#0F2A47] dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white"
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
            className="fixed inset-x-0 top-[calc(env(safe-area-inset-top,0px)+4rem)] z-[70] max-h-[min(80vh,calc(100dvh-4.5rem))] overflow-y-auto border-b border-[#E3EAF2] bg-white px-4 py-3 shadow-lg shadow-[#0F2A47]/10 dark:border-slate-800 dark:bg-background dark:shadow-black/40"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;

                if (link.id === "projects") {
                  return (
                    <li key={link.href} className="flex flex-col gap-1">
                      <div className="flex items-stretch gap-1">
                        <a
                          href="/#projects"
                          aria-current={isActive ? "page" : undefined}
                          className={`${mobileLinkClass(isActive)} flex-1`}
                          onClick={() => {
                            chooseProjectsNavTarget(null);
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
                              ? "Hide project list"
                              : "Show project list"
                          }
                          className={`inline-flex min-h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#48607A] transition-colors hover:bg-[#F4F7FA] hover:text-[#0F2A47] dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-white ${FOCUS_RING}`}
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
                            aria-label="Featured projects"
                          >
                            <li role="presentation" className="px-3 pb-1 pt-2">
                              <span className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                Featured Projects
                              </span>
                            </li>
                            {FEATURED_PROJECT_NAV_ITEMS.map((item) => {
                              const isSelected = activeFocus === item.id;
                              return (
                                <li key={item.id} role="none">
                                  <a
                                    href={`/#${item.id}`}
                                    role="menuitem"
                                    onClick={() => chooseTarget(item.id)}
                                    className={mobileSubLinkClass(
                                      isSelected,
                                      false,
                                    )}
                                  >
                                    <span>{item.label}</span>
                                    {isSelected && (
                                      <span
                                        className="ml-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F2A47] dark:bg-white"
                                        aria-hidden
                                      />
                                    )}
                                  </a>
                                </li>
                              );
                            })}
                            <li
                              role="separator"
                              className="mx-3 my-1.5 border-t border-sky-200/90 dark:border-slate-600"
                              aria-hidden
                            />
                            <li role="none">
                              <a
                                href="/#projects"
                                role="menuitem"
                                onClick={() => chooseTarget("projects")}
                                className={mobileSubLinkClass(
                                  activeFocus === "projects",
                                  true,
                                )}
                              >
                                View all {PROJECTS_COUNT_LABEL} projects
                              </a>
                            </li>
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
              <li>
                <Link
                  href={ASK_ATLAS_HREF}
                  aria-current={pathname === ASK_ATLAS_HREF ? "page" : undefined}
                  className={mobileLinkClass(pathname === ASK_ATLAS_HREF)}
                  onClick={onClose}
                >
                  Ask Atlas
                </Link>
              </li>
            </ul>
            <div className="mt-2 flex min-h-12 items-center justify-between border-t border-[#E3EAF2] px-3 pt-3 dark:border-slate-800">
              <span className="text-base font-medium text-[#48607A] dark:text-slate-300">
                Theme
              </span>
              <ThemeToggle size="lg" />
            </div>
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
    const sections = OBSERVED_SECTION_IDS
      .map((id) => document.getElementById(id))
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
    <header className="sticky top-0 z-50 w-full border-b border-[#E3EAF2] bg-white dark:border-slate-800 dark:bg-background">
      <nav
        className="flex h-16 w-full items-center justify-between gap-4 px-6 lg:h-[88px] xl:px-24"
        aria-label="Primary"
      >
        <a
          href="/#hero"
          className={`inline-flex min-h-11 shrink-0 items-center rounded-sm text-xl font-bold tracking-[-0.01em] text-[#0F2A47] no-underline hover:no-underline dark:text-slate-100 ${FOCUS_RING}`}
        >
          Roy Ho
        </a>

        <DesktopNavLinks activeId={activeId} />

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden lg:flex">
            <Link
              href={ASK_ATLAS_HREF}
              aria-current={pathname === ASK_ATLAS_HREF ? "page" : undefined}
              className={ASK_ATLAS_PILL}
            >
              Ask Atlas
            </Link>
          </div>
          <a
            href={RESUME_HREF}
            aria-current={activeId === "resume" ? "page" : undefined}
            className={RESUME_PILL}
          >
            Resume
          </a>
          <div className="hidden lg:flex">
            <ThemeToggle />
          </div>
          <button
            type="button"
            className={`inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#C9D6E4] text-[#0F2A47] transition-colors hover:bg-[#F4F7FA] lg:hidden dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 ${FOCUS_RING}`}
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
