"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";

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

export default function FadeInSection({
  children,
  as = "div",
  ...rest
}: FadeInSectionProps) {
  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
