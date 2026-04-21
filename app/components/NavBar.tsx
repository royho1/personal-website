"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
  { label: "Resume", href: "#resume", id: "resume" },
  { label: "Hobbies", href: "#hobbies", id: "hobbies" },
] as const;

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
    <header className="sticky top-0 z-50 border-b border-sky-200/80 bg-sky-50/90 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between gap-8 px-6 py-5 md:px-8"
        aria-label="Primary"
      >
        <a
          href="#"
          className="text-base font-semibold tracking-tight text-sky-950"
        >
          Roy Ho
        </a>
        <ul className="flex flex-wrap items-center justify-end gap-6 text-sm text-slate-600 md:gap-8">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative inline-block origin-center font-medium transition-all duration-200 ease-out hover:scale-105 hover:font-bold hover:text-sky-900 ${
                    isActive
                      ? "font-semibold text-sky-900"
                      : "text-slate-600"
                  }`}
                >
                  {link.label}
                  <span
                    className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full bg-sky-700 transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
