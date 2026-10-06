"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** Add hobby images under `public/hobbies/` and list them here (width/height = pixel size of each file). */
const hobbyPhotos: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}[] = [
  {
    src: "/hobbies/photo1.jpg",
    alt: "Horse",
    width: 4284,
    height: 5712,
    caption: "Horse!",
  },
  {
    src: "/hobbies/photo2.jpeg",
    alt: "Wake surfing on Clear Lake, CA",
    width: 1179,
    height: 1452,
    caption: "Wake Surfing: Clear Lake, CA",
  },
  {
    src: "/hobbies/photo3.jpeg",
    alt: "Lake Tahoe, CA",
    width: 1179,
    height: 1454,
    caption: "Lake Tahoe, CA",
  },
  {
    src: "/hobbies/photo4.jpeg",
    alt: "Bass fishing at Lake Lagunitas, CA",
    width: 1179,
    height: 1450,
    caption: "Bass Fishing: Lake Lagunitas, CA",
  },
  {
    src: "/hobbies/photo5.jpeg",
    alt: "Baker Beach in San Francisco, CA",
    width: 1179,
    height: 1557,
    caption: "Baker Beach: San Francisco, CA",
  },
  {
    src: "/hobbies/photo6.jpeg",
    alt: "Yosemite National Park",
    width: 1536,
    height: 2049,
    caption: "Yosemite National Park",
  },
];

type HobbyPhoto = (typeof hobbyPhotos)[number];

/** Per-photo tilt in degrees, picked by index so the scatter is identical on
 * every render (a random angle would change on each pass and break hydration). */
const TILTS = [-2, 1.5, -1, 2, -1.5, 1];

/** Caption tilt, kept separate from the card tilt so the writing sits slightly
 * off-axis from the print like a hand-lettered label. */
const CAPTION_TILTS = [1.4, -1.7, 0.9, -2, 1.6, -0.8];

/** Wire geometry in px. The SVG viewBox height equals WIRE_BAND_HEIGHT so curve
 * y values map 1:1 to CSS px, while x is stretched to the row width. */
const WIRE_BAND_HEIGHT = 72;
const WIRE_END_Y = 12;
const BULB_SPACING = 40;
const BULB_SIZE = 6;
const SWAY_DEG = 1.5;
/** Distance from the polaroid's top edge up to where the clothespin grips the wire. */
const CLIP_GRIP_OFFSET = 6;

/** One gallery layout per breakpoint. Each is rendered and toggled with CSS so
 * the server markup matches every viewport and there is no post-hydration reflow. */
const LAYOUTS = [
  {
    perRow: 1,
    sag: 22,
    visibility: "block sm:hidden",
    polaroidWidth: "w-[72%]",
  },
  {
    perRow: 2,
    sag: 30,
    visibility: "hidden sm:block lg:hidden",
    polaroidWidth: "w-[40%]",
  },
  {
    perRow: 3,
    sag: 40,
    visibility: "hidden lg:block",
    polaroidWidth: "w-[27%]",
  },
] as const;

/** Quadratic Bezier from (0, WIRE_END_Y) through control (0.5, WIRE_END_Y + 2*sag)
 * to (1, WIRE_END_Y). With a centered control point x(t) = t, so y at a horizontal
 * fraction x simplifies to WIRE_END_Y + 4 * sag * x * (1 - x). */
function wireY(x: number, sag: number) {
  return WIRE_END_Y + 4 * sag * x * (1 - x);
}

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
  return rows;
}

/** Bulb count tracks the measured row width; hidden layouts measure 0 and render no bulbs. */
function useBulbCount(ref: RefObject<HTMLDivElement | null>) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      setCount(width > 0 ? Math.max(2, Math.floor(width / BULB_SPACING)) : 0);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return count;
}

function Bulb({
  index,
  x,
  sag,
  animate,
}: {
  index: number;
  x: number;
  sag: number;
  animate: boolean;
}) {
  const minOpacity = 0.6 + ((index * 7) % 4) * 0.03;
  const duration = 2.4 + ((index * 37) % 17) / 10;
  const delay = ((index * 53) % 23) / 10;

  return (
    <motion.span
      className="absolute rounded-full bg-[#fffbe8] shadow-[0_0_4px_1px_rgba(253,230,138,0.55)] dark:shadow-[0_0_6px_2px_rgba(253,230,138,0.95),0_0_16px_6px_rgba(251,191,36,0.45)]"
      style={{
        width: BULB_SIZE,
        height: BULB_SIZE,
        left: `calc(${x * 100}% - ${BULB_SIZE / 2}px)`,
        top: wireY(x, sag) - BULB_SIZE / 2 + 2,
      }}
      initial={{ opacity: 1 }}
      animate={animate ? { opacity: [1, minOpacity, 1] } : { opacity: 1 }}
      transition={
        animate
          ? { duration, delay, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    />
  );
}

function Polaroid({
  photo,
  index,
  rowPosition,
  rowLength,
  sag,
  widthClass,
  prefersReducedMotion,
}: {
  photo: HobbyPhoto;
  index: number;
  rowPosition: number;
  rowLength: number;
  sag: number;
  widthClass: string;
  prefersReducedMotion: boolean;
}) {
  const tilt = TILTS[index % TILTS.length];
  const captionTilt = CAPTION_TILTS[index % CAPTION_TILTS.length];
  // justify-around puts each item's center at (i + 0.5) / n of the row width.
  const centerX = (rowPosition + 0.5) / rowLength;
  const marginTop = wireY(centerX, sag) + CLIP_GRIP_OFFSET;
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Observe a wrapper with no transforms so the entrance drop can't move the
  // observed box back and forth across the visibility threshold.
  const inView = useInView(wrapperRef, { once: true, amount: 0.15 });

  // Each layer owns one motion so they never interrupt each other:
  // entrance (opacity, y) > sway (rotate loop) > hover (relative rotate, lift).
  return (
    <div
      ref={wrapperRef}
      className={`relative z-10 ${widthClass}`}
      style={{ marginTop }}
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{
          hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -48 },
          visible: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
        }}
        transition={
          prefersReducedMotion
            ? { duration: 0.3 }
            : {
                type: "spring",
                stiffness: 260,
                damping: 18,
                delay: rowPosition * 0.08,
              }
        }
      >
        <motion.div
          style={{ transformOrigin: "50% 0%", willChange: "transform" }}
          initial={{ rotate: prefersReducedMotion ? tilt : tilt - SWAY_DEG }}
          animate={{ rotate: prefersReducedMotion ? tilt : tilt + SWAY_DEG }}
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  // Half of the old full-cycle duration, since mirror plays
                  // each direction as its own leg.
                  duration: 2.5 + (index % 3) * 0.4,
                  delay: index * 0.45,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
        >
          <motion.div
            className="group"
            style={{ transformOrigin: "50% 0%", willChange: "transform" }}
            // Counter-rotate by the base tilt so it composes with the sway
            // layer and settles near level wherever the sway currently is.
            whileHover={prefersReducedMotion ? undefined : { rotate: -tilt, y: -6 }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
          >
            <figure className="relative flex flex-col rounded-md bg-white p-3 shadow-[0_6px_16px_rgba(15,23,42,0.12)] transition-shadow duration-300 group-hover:shadow-[0_14px_32px_rgba(15,23,42,0.22)] dark:bg-stone-100">
              <span
                aria-hidden="true"
                className="absolute -top-3.5 left-1/2 h-6 w-3 -translate-x-1/2 rounded-[3px] border border-[#8b5a2b] bg-[#d6b07f] shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
              >
                <span className="absolute inset-x-0 top-[40%] h-px bg-[#8b5a2b]/70" />
              </span>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="block h-auto w-full rounded-sm object-contain"
                sizes="(max-width: 640px) 72vw, (max-width: 1024px) 40vw, 280px"
              />
              <figcaption
                className="px-2 pb-5 pt-4 text-center font-handwriting text-[1.47rem] font-semibold tracking-wide text-[#262626]"
                style={{ transform: `rotate(${captionTilt}deg)` }}
              >
                {photo.caption}
              </figcaption>
            </figure>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function LightString({
  photos,
  startIndex,
  sag,
  widthClass,
  prefersReducedMotion,
}: {
  photos: HobbyPhoto[];
  startIndex: number;
  sag: number;
  widthClass: string;
  prefersReducedMotion: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const bulbCount = useBulbCount(rowRef);

  return (
    <div
      ref={rowRef}
      className="relative flex items-start justify-around"
      style={{ minHeight: WIRE_BAND_HEIGHT }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0"
        style={{ height: WIRE_BAND_HEIGHT }}
      >
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 100 ${WIRE_BAND_HEIGHT}`}
          preserveAspectRatio="none"
        >
          <path
            d={`M0 ${WIRE_END_Y} Q50 ${WIRE_END_Y + 2 * sag} 100 ${WIRE_END_Y}`}
            fill="none"
            strokeWidth={1.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="stroke-[#8a7560] dark:stroke-[#a3907a]"
          />
        </svg>
        {Array.from({ length: bulbCount }, (_, i) => (
          <Bulb
            key={i}
            index={i}
            x={(i + 0.5) / bulbCount}
            sag={sag}
            animate={!prefersReducedMotion}
          />
        ))}
      </div>
      {photos.map((photo, i) => (
        <Polaroid
          key={`${photo.src}-${startIndex + i}`}
          photo={photo}
          index={startIndex + i}
          rowPosition={i}
          rowLength={photos.length}
          sag={sag}
          widthClass={widthClass}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </div>
  );
}

export default function HobbyGallery() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <div className="mt-8 sm:mt-12">
      {LAYOUTS.map((layout) => (
        <div
          key={layout.perRow}
          className={`${layout.visibility} space-y-16 sm:space-y-20`}
        >
          {chunk(hobbyPhotos, layout.perRow).map((row, rowIndex) => (
            <LightString
              key={rowIndex}
              photos={row}
              startIndex={rowIndex * layout.perRow}
              sag={layout.sag}
              widthClass={layout.polaroidWidth}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
