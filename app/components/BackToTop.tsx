"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const toggle = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.8);
    };
    toggle();
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
          className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-40 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-sky-200 bg-white/80 text-sky-900 shadow-lg shadow-sky-900/15 backdrop-blur-md transition-[color,background-color,border-color,opacity,box-shadow,transform] duration-300 hover:-translate-y-1 hover:bg-sky-50 hover:text-sky-950 hover:shadow-xl hover:shadow-sky-900/25 motion-reduce:transition-colors motion-reduce:hover:translate-y-0 md:right-6 md:bottom-6 md:h-12 md:w-12 md:bg-white md:backdrop-blur-none dark:border-slate-700 dark:bg-slate-800/80 dark:text-sky-200 dark:shadow-black/40 dark:hover:bg-slate-700 dark:hover:text-sky-100 dark:hover:shadow-black/60 md:dark:bg-slate-800"
        >
          <ArrowUp className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
