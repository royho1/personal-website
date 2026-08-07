"use client";

import { useEffect } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";

type AtlasDogProps = {
  size?: number;
  className?: string;
  variant?: "full" | "head";
};

const hopTransition = { duration: 1.8, ease: "easeOut" as const };
const hopY = [0, -16, 0, -8, 0];

function StaticArtwork() {
  return (
    <>
      <ellipse cx="340" cy="284" rx="62" ry="9" fill="#3A2411" opacity="0.13" />
      <path
        d="M390 214 C 432 210 452 182 444 152 C 438 176 420 194 388 198 Z"
        fill="#C8873F"
      />
      <ellipse cx="315" cy="262" rx="19" ry="14" fill="#E8A85C" />
      <ellipse cx="366" cy="262" rx="19" ry="14" fill="#E8A85C" />
      <ellipse cx="340" cy="214" rx="58" ry="50" fill="#E8A85C" />
      <ellipse cx="340" cy="222" rx="34" ry="32" fill="#F7DCB4" />
      <rect x="298" y="168" width="84" height="15" rx="7" fill="#3B9BD9" />
      <circle cx="340" cy="188" r="9" fill="#2F7FB8" />
      <circle
        cx="340"
        cy="188"
        r="9"
        fill="none"
        stroke="#E8F4FC"
        strokeWidth="1.2"
      />
      <path
        d="M331 188 h18 M340 179 v18 M334.5 182 Q 340 188 334.5 194 M345.5 182 Q 340 188 345.5 194"
        stroke="#E8F4FC"
        strokeWidth="1"
        fill="none"
      />
      <ellipse
        cx="286"
        cy="112"
        rx="21"
        ry="38"
        fill="#C8873F"
        transform="rotate(-12 286 112)"
      />
      <ellipse
        cx="394"
        cy="112"
        rx="21"
        ry="38"
        fill="#C8873F"
        transform="rotate(12 394 112)"
      />
      <circle cx="340" cy="116" r="58" fill="#E8A85C" />
      <ellipse cx="340" cy="142" rx="31" ry="23" fill="#F7DCB4" />
      <ellipse cx="340" cy="166" rx="9" ry="15" fill="#E8788C" />
      <path
        d="M340 158 L340 176"
        stroke="#C4566A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M340 141 L340 151"
        stroke="#7A4A1E"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M320 150 Q 330 165 340 154 Q 350 165 360 150"
        stroke="#7A4A1E"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <ellipse cx="340" cy="132" rx="12" ry="9" fill="#4A2E14" />
      <ellipse cx="336" cy="129" rx="4" ry="2.5" fill="#8C6A48" />
      <circle cx="318" cy="104" r="9" fill="#3A2411" />
      <circle cx="321" cy="101" r="3.2" fill="#FFFFFF" />
      <circle cx="362" cy="104" r="9" fill="#3A2411" />
      <circle cx="365" cy="101" r="3.2" fill="#FFFFFF" />
      <ellipse cx="299" cy="139" rx="10" ry="6" fill="#E88C8C" opacity="0.5" />
      <ellipse cx="381" cy="139" rx="10" ry="6" fill="#E88C8C" opacity="0.5" />
    </>
  );
}

export default function AtlasDog({
  size = 48,
  className,
  variant = "full",
}: AtlasDogProps) {
  const prefersReducedMotion = useReducedMotion();
  const animate = variant === "full" && !prefersReducedMotion;
  const hopControls = useAnimation();
  const leftEarControls = useAnimation();
  const rightEarControls = useAnimation();
  const tongueControls = useAnimation();

  const playHop = () => {
    if (!animate) return;
    void hopControls.start({
      y: hopY,
      transition: hopTransition,
    });
    void leftEarControls.start({
      rotate: [-12, -22, -12, -17, -12],
      transition: hopTransition,
    });
    void rightEarControls.start({
      rotate: [12, 22, 12, 17, 12],
      transition: hopTransition,
    });
    void tongueControls.start({
      scaleY: [1, 1.22, 1, 1.1, 1],
      transition: hopTransition,
    });
  };

  useEffect(() => {
    if (!animate) return;
    playHop();
    // Mount hop only; hover retriggers via onHoverStart.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only hop
  }, [animate]);

  const viewBox = variant === "head" ? "258 48 164 150" : "255 45 170 260";

  if (!animate) {
    return (
      <svg
        role="img"
        viewBox={viewBox}
        width={size}
        height={size}
        className={className}
      >
        <title>Atlas, Roy&apos;s AI assistant</title>
        <StaticArtwork />
      </svg>
    );
  }

  return (
    <svg
      role="img"
      viewBox={viewBox}
      width={size}
      height={size}
      className={className}
      overflow="visible"
    >
      <title>Atlas, Roy&apos;s AI assistant</title>
      <ellipse cx="340" cy="284" rx="62" ry="9" fill="#3A2411" opacity="0.13" />
      <motion.g animate={hopControls} onHoverStart={playHop}>
        <motion.path
          d="M390 214 C 432 210 452 182 444 152 C 438 176 420 194 388 198 Z"
          fill="#C8873F"
          style={{ transformOrigin: "392px 212px" }}
          animate={{ rotate: [-16, 18, -16] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <ellipse cx="315" cy="262" rx="19" ry="14" fill="#E8A85C" />
        <ellipse cx="366" cy="262" rx="19" ry="14" fill="#E8A85C" />
        <ellipse cx="340" cy="214" rx="58" ry="50" fill="#E8A85C" />
        <ellipse cx="340" cy="222" rx="34" ry="32" fill="#F7DCB4" />
        <rect x="298" y="168" width="84" height="15" rx="7" fill="#3B9BD9" />
        <circle cx="340" cy="188" r="9" fill="#2F7FB8" />
        <circle
          cx="340"
          cy="188"
          r="9"
          fill="none"
          stroke="#E8F4FC"
          strokeWidth="1.2"
        />
        <path
          d="M331 188 h18 M340 179 v18 M334.5 182 Q 340 188 334.5 194 M345.5 182 Q 340 188 345.5 194"
          stroke="#E8F4FC"
          strokeWidth="1"
          fill="none"
        />
        <motion.ellipse
          cx="286"
          cy="112"
          rx="21"
          ry="38"
          fill="#C8873F"
          style={{ transformOrigin: "286px 150px" }}
          initial={{ rotate: -12 }}
          animate={leftEarControls}
        />
        <motion.ellipse
          cx="394"
          cy="112"
          rx="21"
          ry="38"
          fill="#C8873F"
          style={{ transformOrigin: "394px 150px" }}
          initial={{ rotate: 12 }}
          animate={rightEarControls}
        />
        <circle cx="340" cy="116" r="58" fill="#E8A85C" />
        <ellipse cx="340" cy="142" rx="31" ry="23" fill="#F7DCB4" />
        <motion.ellipse
          cx="340"
          cy="166"
          rx="9"
          ry="15"
          fill="#E8788C"
          style={{ transformOrigin: "340px 156px" }}
          initial={{ scaleY: 1 }}
          animate={tongueControls}
        />
        <path
          d="M340 158 L340 176"
          stroke="#C4566A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M340 141 L340 151"
          stroke="#7A4A1E"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M320 150 Q 330 165 340 154 Q 350 165 360 150"
          stroke="#7A4A1E"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <ellipse cx="340" cy="132" rx="12" ry="9" fill="#4A2E14" />
        <ellipse cx="336" cy="129" rx="4" ry="2.5" fill="#8C6A48" />
        <motion.g
          style={{ transformOrigin: "318px 104px" }}
          animate={{ scaleY: [1, 1, 1, 0.1, 1, 1, 1, 1, 1, 1] }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle cx="318" cy="104" r="9" fill="#3A2411" />
          <circle cx="321" cy="101" r="3.2" fill="#FFFFFF" />
        </motion.g>
        <motion.g
          style={{ transformOrigin: "362px 104px" }}
          animate={{ scaleY: [1, 1, 1, 0.1, 1, 1, 1, 1, 1, 1] }}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <circle cx="362" cy="104" r="9" fill="#3A2411" />
          <circle cx="365" cy="101" r="3.2" fill="#FFFFFF" />
        </motion.g>
        <ellipse cx="299" cy="139" rx="10" ry="6" fill="#E88C8C" opacity="0.5" />
        <ellipse cx="381" cy="139" rx="10" ry="6" fill="#E88C8C" opacity="0.5" />
      </motion.g>
    </svg>
  );
}
