"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";

type AtlasDogProps = {
  size?: number;
  className?: string;
  variant?: "full" | "head";
  /** Enables hover/click pet reaction (eyes close, smile widens, bounce/wag). */
  pettable?: boolean;
};

const hopTransition = { duration: 1.8, ease: "easeOut" as const };
const hopY = [0, -16, 0, -8, 0];

const MOUTH_REST =
  "M320 150 Q 330 165 340 154 Q 350 165 360 150";
const MOUTH_HAPPY =
  "M316 148 Q 328 178 340 162 Q 352 178 364 148";

function ClosedEyes() {
  return (
    <>
      <path
        d="M309 104 Q 318 112 327 104"
        stroke="#3A2411"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M353 104 Q 362 112 371 104"
        stroke="#3A2411"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
    </>
  );
}

function OpenEyes({ blink }: { blink: boolean }) {
  if (!blink) {
    return (
      <>
        <circle cx="318" cy="104" r="9" fill="#3A2411" />
        <circle cx="321" cy="101" r="3.2" fill="#FFFFFF" />
        <circle cx="362" cy="104" r="9" fill="#3A2411" />
        <circle cx="365" cy="101" r="3.2" fill="#FFFFFF" />
      </>
    );
  }

  return (
    <>
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
    </>
  );
}

export default function AtlasDog({
  size = 48,
  className,
  variant = "full",
  pettable = false,
}: AtlasDogProps) {
  const prefersReducedMotion = useReducedMotion();
  const idleAnimate = variant === "full" && !prefersReducedMotion;
  const hopControls = useAnimation();
  const leftEarControls = useAnimation();
  const rightEarControls = useAnimation();
  const tongueControls = useAnimation();
  const bodyControls = useAnimation();

  const [hovering, setHovering] = useState(false);
  const [clickPet, setClickPet] = useState(false);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPetted = pettable && (hovering || clickPet);

  const playHop = () => {
    if (!idleAnimate || isPetted) return;
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
    if (!idleAnimate) return;
    playHop();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional mount-only hop
  }, [idleAnimate]);

  useEffect(() => {
    return () => {
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!pettable || prefersReducedMotion) {
      void bodyControls.start({ y: 0, scale: 1 });
      return;
    }
    if (isPetted) {
      void bodyControls.start({
        y: [0, -8, 0, -4, 0],
        scale: [1, 1.06, 0.97, 1.03, 1],
        transition: { duration: 0.55, ease: "easeOut" },
      });
    } else {
      void bodyControls.start({
        y: 0,
        scale: 1,
        transition: { duration: 0.25, ease: "easeOut" },
      });
    }
  }, [isPetted, pettable, prefersReducedMotion, bodyControls]);

  const viewBox = variant === "head" ? "258 48 164 150" : "255 45 170 260";

  const startClickPet = () => {
    if (!pettable) return;
    setClickPet(true);
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => setClickPet(false), 1500);
  };

  const tailTransition = isPetted && !prefersReducedMotion
    ? { duration: 0.28, repeat: Infinity, ease: "easeInOut" as const }
    : { duration: 0.5, repeat: Infinity, ease: "easeInOut" as const };
  const tailRotate = isPetted && !prefersReducedMotion
    ? [-26, 30, -26]
    : [-16, 18, -16];

  const artwork = (
    <>
      {idleAnimate ? (
        <motion.path
          d="M390 214 C 432 210 452 182 444 152 C 438 176 420 194 388 198 Z"
          fill="#C8873F"
          style={{ transformOrigin: "392px 212px" }}
          animate={{ rotate: tailRotate }}
          transition={tailTransition}
        />
      ) : (
        <path
          d="M390 214 C 432 210 452 182 444 152 C 438 176 420 194 388 198 Z"
          fill="#C8873F"
        />
      )}
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
      {idleAnimate ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
      <circle cx="340" cy="116" r="58" fill="#E8A85C" />
      <ellipse cx="340" cy="142" rx="31" ry="23" fill="#F7DCB4" />
      {idleAnimate ? (
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
      ) : (
        <ellipse cx="340" cy="166" rx="9" ry="15" fill="#E8788C" />
      )}
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
        d={isPetted ? MOUTH_HAPPY : MOUTH_REST}
        stroke="#7A4A1E"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <ellipse cx="340" cy="132" rx="12" ry="9" fill="#4A2E14" />
      <ellipse cx="336" cy="129" rx="4" ry="2.5" fill="#8C6A48" />
      {isPetted ? <ClosedEyes /> : <OpenEyes blink={idleAnimate} />}
      <ellipse cx="299" cy="139" rx="10" ry="6" fill="#E88C8C" opacity="0.5" />
      <ellipse cx="381" cy="139" rx="10" ry="6" fill="#E88C8C" opacity="0.5" />
    </>
  );

  const svg = (
    <svg
      role="img"
      viewBox={viewBox}
      width={size}
      height={size}
      className={className}
      overflow="visible"
      aria-hidden={pettable || undefined}
    >
      {!pettable && <title>Atlas, Roy&apos;s AI assistant</title>}
      <ellipse cx="340" cy="284" rx="62" ry="9" fill="#3A2411" opacity="0.13" />
      {idleAnimate ? (
        <motion.g
          animate={hopControls}
          onHoverStart={pettable ? undefined : playHop}
        >
          <motion.g animate={pettable ? bodyControls : undefined}>
            {artwork}
          </motion.g>
        </motion.g>
      ) : pettable && !prefersReducedMotion ? (
        <motion.g animate={bodyControls}>{artwork}</motion.g>
      ) : (
        <g>{artwork}</g>
      )}
    </svg>
  );

  if (!pettable) return svg;

  return (
    <div
      aria-hidden
      className="cursor-pointer select-none"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onPointerDown={(event) => {
        // Tap/click pet; ignore secondary buttons.
        if (event.button === 0) startClickPet();
      }}
    >
      {svg}
    </div>
  );
}
