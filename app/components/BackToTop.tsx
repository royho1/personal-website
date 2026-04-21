"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-900 shadow-lg shadow-sky-900/15 transition-all duration-300 hover:-translate-y-1 hover:bg-sky-50 hover:text-sky-950 hover:shadow-xl hover:shadow-sky-900/25 md:h-12 md:w-12 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-200 dark:shadow-black/40 dark:hover:bg-slate-700 dark:hover:text-sky-100 dark:hover:shadow-black/60"
        >
          <ArrowUp className="h-5 w-5 md:h-6 md:w-6" aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
