"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { FaExpand } from "react-icons/fa";

const CERT_SRC = "/certs/nvidia-deep-learning.png";
const CERT_ALT =
  "NVIDIA Deep Learning Institute certificate of competency, Fundamentals of Deep Learning, awarded to Roy Ho";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function CertificationsCard() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cardRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      cardRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
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
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const onCardKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  };

  return (
    <>
      <div>
        <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-slate-500 sm:text-sm dark:text-slate-400">
          Certifications
        </h3>
        <button
          ref={cardRef}
          type="button"
          onClick={() => setOpen(true)}
          onKeyDown={onCardKeyDown}
          aria-haspopup="dialog"
          aria-expanded={open}
          className="flex w-full cursor-pointer items-center gap-4 rounded-xl border border-sky-200 bg-white px-5 py-5 text-left shadow-sm shadow-sky-200/30 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:border-sky-300 hover:bg-sky-50 hover:shadow-md hover:shadow-sky-300/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/30 dark:hover:border-slate-600 dark:hover:bg-slate-700/70 dark:hover:shadow-black/50"
        >
          <span className="shrink-0 dark:rounded-[6px] dark:bg-white dark:p-[6px]">
            <Image
              src="/logos/nvidia.png"
              alt="NVIDIA logo"
              width={600}
              height={337}
              className="h-11 w-auto"
            />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-medium text-sky-900 dark:text-sky-100">
              Fundamentals of Deep Learning
            </span>
            <span className="mt-0.5 block text-xs text-slate-500 dark:text-slate-400">
              NVIDIA Deep Learning Institute · October 2025
            </span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            View certificate
            <FaExpand className="h-3.5 w-3.5" aria-hidden />
          </span>
        </button>
      </div>

      {mounted &&
        open &&
        createPortal(
          <div
            className="cert-lightbox fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="presentation"
          >
            <button
              type="button"
              aria-label="Close certificate viewer"
              className="absolute inset-0 cursor-pointer bg-slate-950/60 backdrop-blur-[3px] dark:bg-black/70"
              onClick={close}
            />
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="NVIDIA Fundamentals of Deep Learning certificate"
              className="cert-lightbox-panel relative z-10"
            >
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="fixed right-4 top-4 z-20 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-slate-900/85 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                <span aria-hidden="true" className="text-xl leading-none">
                  ×
                </span>
              </button>
              <Image
                src={CERT_SRC}
                alt={CERT_ALT}
                width={1024}
                height={816}
                className="max-h-[85vh] w-auto max-w-[90vw] rounded-xl object-contain shadow-[0_24px_60px_-12px_rgba(0,0,0,0.55)]"
                priority
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
