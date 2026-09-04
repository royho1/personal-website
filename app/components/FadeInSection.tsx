"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

type FadeInSectionProps = HTMLMotionProps<"div"> & {
  as?: "div" | "section";
};

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/**
 * Fade-in on scroll. Uses `amount: "some"` (any pixel intersection) instead of
 * a fractional threshold — tall sections like Projects can never reach e.g.
 * 15% visibility on a short mobile viewport, which left them stuck at opacity 0.
 */
export default function FadeInSection({
  children,
  as = "div",
  ...rest
}: FadeInSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = as === "section" ? motion.section : motion.div;

  if (prefersReducedMotion) {
    return <MotionTag {...rest}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: "some" }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
