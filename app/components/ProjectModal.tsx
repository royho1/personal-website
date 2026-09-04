"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { ProjectMediaSlide } from "../lib/projectImages";

export type ProjectModalData = {
  title: string;
  description: string;
  tech: string;
  githubHref?: string;
  demoHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  media?: ProjectMediaSlide[];
  award?: string;
  status?: string;
};

type ProjectModalProps = {
  project: ProjectModalData | null;
  onClose: () => void;
  /** Fallback media rendered when the screenshot is missing or fails to load. */
  fallback: ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  /** 1-based index into the current gallery, for "3 / 13" style labels. */
  position?: number;
  total?: number;
};

export default function ProjectModal({
  project,
  onClose,
  fallback,
  onPrev,
  onNext,
  position,
  total,
}: ProjectModalProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const open = project !== null;
  const media = project?.media ?? [];
  const hasMediaCarousel = media.length > 1;
  const [mediaIndex, setMediaIndex] = useState(0);
  /** 1 = next/right, -1 = previous/left — drives slide enter/exit direction. */
  const [slideDirection, setSlideDirection] = useState(1);
  const canNavigateProjects =
    typeof onPrev === "function" &&
    typeof onNext === "function" &&
    (total ?? 0) > 1;

  const goToMedia = useCallback((nextIndex: number, direction: 1 | -1) => {
    setSlideDirection(direction);
    setMediaIndex(nextIndex);
  }, []);

  const showPrevMedia = useCallback(() => {
    if (media.length === 0) return;
    goToMedia((mediaIndex - 1 + media.length) % media.length, -1);
  }, [goToMedia, media.length, mediaIndex]);

  const showNextMedia = useCallback(() => {
    if (media.length === 0) return;
    goToMedia((mediaIndex + 1) % media.length, 1);
  }, [goToMedia, media.length, mediaIndex]);

  const onCloseRef = useRef(onClose);
  const onPrevRef = useRef(onPrev);
  const onNextRef = useRef(onNext);
  const showPrevMediaRef = useRef(showPrevMedia);
  const showNextMediaRef = useRef(showNextMedia);
  const hasMediaCarouselRef = useRef(hasMediaCarousel);
  const canNavigateProjectsRef = useRef(canNavigateProjects);

  onCloseRef.current = onClose;
  onPrevRef.current = onPrev;
  onNextRef.current = onNext;
  showPrevMediaRef.current = showPrevMedia;
  showNextMediaRef.current = showNextMedia;
  hasMediaCarouselRef.current = hasMediaCarousel;
  canNavigateProjectsRef.current = canNavigateProjects;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMediaIndex(0);
    setSlideDirection(1);
  }, [project?.title]);

  // Lock scroll and move focus into the dialog only when it opens/closes.
  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus?.();
      previouslyFocusedRef.current = null;
    };
  }, [open]);

  // Keyboard handling uses refs so media slide changes do not rebind listeners
  // or steal focus back to the close button.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
        return;
      }

      const isLeft = event.key === "ArrowLeft";
      const isRight = event.key === "ArrowRight";
      if (!isLeft && !isRight) return;

      // Shift+arrows always move between projects when available.
      if (event.shiftKey && canNavigateProjectsRef.current) {
        event.preventDefault();
        if (isLeft) onPrevRef.current?.();
        else onNextRef.current?.();
        return;
      }

      if (hasMediaCarouselRef.current) {
        event.preventDefault();
        if (isLeft) showPrevMediaRef.current();
        else showNextMediaRef.current();
        return;
      }

      if (canNavigateProjectsRef.current) {
        event.preventDefault();
        if (isLeft) onPrevRef.current?.();
        else onNextRef.current?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const navButtonClassName =
    "absolute top-1/2 z-20 inline-flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-sky-200/90 bg-white/90 text-slate-700 shadow-sm backdrop-blur-sm transition-colors hover:border-sky-400 hover:bg-sky-100 hover:text-sky-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-500 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:bg-slate-800 dark:hover:text-sky-100 sm:h-10 sm:w-10";

  const chromeButtonClassName =
    "inline-flex cursor-pointer items-center justify-center rounded-lg border border-sky-200 bg-white text-slate-600 transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-500 dark:hover:bg-slate-700 dark:hover:text-sky-100";

  const footerButtonClassName =
    "inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-700";

  const linkChipClassName =
    "inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-sky-200 bg-white px-3 py-1.5 text-xs font-medium text-sky-900 transition-colors hover:border-sky-300 hover:bg-sky-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-600 dark:bg-slate-800 dark:text-sky-100 dark:hover:border-slate-500 dark:hover:bg-slate-700";

  const activeSlide =
    media[mediaIndex] ??
    (project?.imageSrc
      ? {
          src: project.imageSrc,
          title: project.imageAlt ?? project.title,
          description: "",
        }
      : null);

  const showMediaNav = hasMediaCarousel;
  const counterLabel = hasMediaCarousel
    ? `${mediaIndex + 1} / ${media.length}`
    : null;

  const slideVariants = {
    enter: (direction: number) => ({
      x: 28 * direction,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: -28 * direction,
      opacity: 0,
    }),
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-4"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close project details"
            className="absolute inset-0 cursor-pointer bg-slate-950/55 backdrop-blur-[2px] dark:bg-black/70"
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-sky-200 bg-white shadow-xl shadow-sky-950/20 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/50"
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Sticky header */}
            <header className="shrink-0 border-b border-sky-100 px-4 py-3 dark:border-slate-700 sm:px-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2
                      id={titleId}
                      className="text-base font-medium tracking-tight text-sky-950 dark:text-sky-100"
                    >
                      {project.title}
                    </h2>
                    {(project.award || project.status) && (
                      <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[10px] font-semibold text-sky-800 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200">
                        {project.award ?? project.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-snug text-slate-500 dark:text-slate-400">
                    {project.tech}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 self-end sm:self-start">
                  {project.demoHref && (
                    <a
                      href={project.demoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkChipClassName}
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      Live Demo
                    </a>
                  )}
                  {project.githubHref && (
                    <a
                      href={project.githubHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkChipClassName}
                    >
                      <FaGithub className="h-3.5 w-3.5" aria-hidden />
                      View on GitHub
                    </a>
                  )}
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className={`${chromeButtonClassName} h-8 w-8`}
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            </header>

            {/* Image */}
            <div className="relative max-h-[35vh] w-full shrink min-h-0 overflow-hidden bg-sky-50 dark:bg-slate-800 sm:max-h-[45vh]">
              <div className="relative aspect-[16/10] max-h-[35vh] w-full sm:max-h-[45vh]">
                <AnimatePresence
                  mode="wait"
                  initial={false}
                  custom={slideDirection}
                >
                  <motion.div
                    key={activeSlide?.src ?? project.title}
                    className="absolute inset-0"
                    custom={slideDirection}
                    variants={slideVariants}
                    initial={prefersReducedMotion ? false : "enter"}
                    animate="center"
                    exit={prefersReducedMotion ? undefined : "exit"}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {activeSlide ? (
                      <ModalImage
                        src={activeSlide.src}
                        alt={activeSlide.title}
                        fallback={fallback}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        {fallback}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {showMediaNav && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevMedia}
                      aria-label="Previous image"
                      className={`${navButtonClassName} left-3`}
                    >
                      <ChevronLeft className="pointer-events-none h-5 w-5" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={showNextMedia}
                      aria-label="Next image"
                      className={`${navButtonClassName} right-3`}
                    >
                      <ChevronRight className="pointer-events-none h-5 w-5" aria-hidden />
                    </button>
                  </>
                )}

                {counterLabel && (
                  <span className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/70 bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur-sm dark:border-slate-600 dark:bg-slate-900/90 dark:text-slate-200">
                    {counterLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Active caption + thumbnails (fixed; not in scroll region) */}
            {media.length > 0 && (
              <div className="shrink-0 px-4 pt-3 sm:px-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeSlide?.src ?? mediaIndex}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 4 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion ? undefined : { opacity: 0, y: -3 }
                    }
                    transition={{ duration: 0.15 }}
                  >
                    <p className="text-sm font-medium text-sky-950 dark:text-sky-100">
                      {activeSlide?.title}
                    </p>
                    {activeSlide?.description ? (
                      <p className="mt-0.5 truncate text-[13px] leading-snug text-slate-600 dark:text-slate-400">
                        {activeSlide.description}
                      </p>
                    ) : null}
                  </motion.div>
                </AnimatePresence>

                {hasMediaCarousel && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {media.map((slide, index) => {
                      const isActive = index === mediaIndex;
                      return (
                        <button
                          key={slide.src}
                          type="button"
                          onClick={() => {
                            if (index === mediaIndex) return;
                            goToMedia(index, index > mediaIndex ? 1 : -1);
                          }}
                          aria-label={`Show ${slide.title}`}
                          aria-current={isActive ? "true" : undefined}
                          className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-md border-2 bg-sky-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:bg-slate-800 ${
                            isActive
                              ? "border-sky-600 dark:border-sky-400"
                              : "border-transparent hover:border-sky-300 dark:hover:border-slate-500"
                          }`}
                        >
                          <Image
                            src={slide.src}
                            alt=""
                            fill
                            sizes="80px"
                            quality={70}
                            className="pointer-events-none object-cover object-top"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Scrollable description only */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3 sm:px-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={project.title}
                  initial={prefersReducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400"
                >
                  {project.description}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Sticky footer */}
            {canNavigateProjects && (
              <footer className="flex shrink-0 items-center justify-between gap-2 border-t border-sky-100 px-4 py-3 dark:border-slate-700 sm:px-5">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous project"
                  className={footerButtonClassName}
                >
                  <ChevronLeft className="pointer-events-none h-3.5 w-3.5" aria-hidden />
                  Prev project
                </button>
                {position != null && total != null && (
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {position} / {total}
                  </span>
                )}
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next project"
                  className={footerButtonClassName}
                >
                  Next project
                  <ChevronRight className="pointer-events-none h-3.5 w-3.5" aria-hidden />
                </button>
              </footer>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function ModalImage({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        {fallback}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      quality={95}
      sizes="(max-width: 672px) 100vw, 1344px"
      className="object-contain object-center"
      onError={() => setFailed(true)}
    />
  );
}
