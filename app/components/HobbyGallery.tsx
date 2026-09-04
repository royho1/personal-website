"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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

/** Per-photo tilt in degrees, picked by index so the scatter is identical on
 * every render (a random angle would change on each pass and break hydration). */
const TILTS = [-2, 1.5, -1, 2, -1.5, 1];

/** Caption tilt, kept separate from the card tilt so the writing sits slightly
 * off-axis from the print like a hand-lettered label. */
const CAPTION_TILTS = [1.4, -1.7, 0.9, -2, 1.6, -0.8];

export default function HobbyGallery() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="mt-8 grid items-start gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:grid-cols-2 xl:grid-cols-3">
      {hobbyPhotos.map((photo, index) => {
        const tilt = TILTS[index % TILTS.length];
        const captionTilt = CAPTION_TILTS[index % CAPTION_TILTS.length];

        return (
          <motion.figure
            key={`${photo.src}-${index}`}
            initial="hidden"
            whileInView="visible"
            // once:false so the prints pop again every time they re-enter the
            // viewport, including when scrolling back up.
            viewport={{ once: false, amount: 0.3 }}
            variants={{
              hidden: prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.85, y: 30, rotate: 0 },
              visible: prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0, rotate: tilt },
            }}
            transition={
              prefersReducedMotion
                ? { duration: 0.3 }
                : {
                    type: "spring",
                    stiffness: 260,
                    damping: 18,
                    delay: (index % 3) * 0.08,
                  }
            }
            whileHover={prefersReducedMotion ? undefined : { rotate: 0, y: -6 }}
            className="flex flex-col self-start rounded-md bg-white p-3 shadow-[0_6px_16px_rgba(15,23,42,0.12)] transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(15,23,42,0.22)] dark:bg-stone-100"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              className="block h-auto w-full rounded-sm object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <figcaption
              className="px-2 pb-5 pt-4 text-center font-handwriting text-[1.47rem] font-semibold tracking-wide text-[#262626]"
              style={{ transform: `rotate(${captionTilt}deg)` }}
            >
              {photo.caption}
            </figcaption>
          </motion.figure>
        );
      })}
    </div>
  );
}
