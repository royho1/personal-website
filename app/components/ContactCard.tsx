"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Libre_Baskerville } from "next/font/google";
import { ContactRound, Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { fireConfettiFromElement } from "../lib/confetti";

// Scoped to this card only via libreBaskerville.className below — the rest
// of the site keeps its sans-serif type. Sturdier x-height and strokes than
// EB Garamond, so the letterpress small caps stay legible at small sizes.
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const EMAIL = "royho.career@gmail.com";
const SAVED_LABEL_MS = 2500;
const COPIED_LABEL_MS = 2000;

/** Flip to true to render the social icons in their brand colors at rest
 * instead of ink monochrome that picks up brand color on hover. */
const BRAND_COLOR_ICONS = false;

/** Letterpress deboss: a soft highlight below the glyph and a faint shadow
 * above, so the ink reads as pressed into the paper rather than printed on
 * top of it. Text-shadow inherits, so this only needs to sit on each
 * text-bearing block, not every individual node. */
const DEBOSS =
  "[text-shadow:0_1px_0_rgba(255,255,255,0.75),0_-1px_1px_rgba(0,0,0,0.12)]";

const SMALL_CAPS = "[font-variant:small-caps]";

// Rendered as a data URI so the paper grain never needs an image asset —
// a fractal-noise filter painted into a tiny tile and repeated as a CSS
// background on a multiply-blended overlay.
const GRAIN_SVG_MARKUP =
  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">' +
  '<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/></filter>' +
  '<rect width="100%" height="100%" filter="url(#grain)"/></svg>';
const GRAIN_DATA_URL = `data:image/svg+xml,${encodeURIComponent(GRAIN_SVG_MARKUP)}`;

const iconLinkBase =
  "inline-flex h-6 w-6 items-center justify-center transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2A2724]";

const linkedInIconClass = BRAND_COLOR_ICONS
  ? "text-[#0A66C2]"
  : "text-[#2A2724] hover:text-[#0A66C2]";

const gitHubIconClass = BRAND_COLOR_ICONS
  ? "text-[#181717]"
  : "text-[#2A2724] hover:text-[#181717]";

/**
 * Pressing the card sets off the same confetti burst as the hero's
 * availability badge. Purely decorative, so it stays a plain container rather
 * than taking on button semantics that would compete with the real links
 * nested inside it.
 */
export default function ContactCard() {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const savedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    // Presses that land on a link or button belong to that control, so let it
    // do its own thing (mailto, socials, vCard download) without a burst.
    if ((event.target as HTMLElement).closest("a, button")) return;

    fireConfettiFromElement(event.currentTarget);
  };

  const handleSaveClick = () => {
    setSaved(true);
    if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
    savedTimeoutRef.current = setTimeout(() => setSaved(false), SAVED_LABEL_MS);
  };

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
      copiedTimeoutRef.current = setTimeout(() => setCopied(false), COPIED_LABEL_MS);
    } catch {
      // Clipboard API unavailable or permission denied — fail silently.
    }
  };

  return (
    <div className="relative mx-auto mt-12 w-full max-w-[620px]">
      {/* Stacked-paper edges peeking out from behind the top sheet. */}
      <div
        aria-hidden
        className="absolute inset-0 translate-y-[6px] rounded-[4px] bg-[#E0DACD] shadow-[0_12px_32px_rgba(60,50,35,0.18)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 translate-y-[3px] rounded-[4px] bg-[#EAE5DA]"
      />

      <div
        onClick={handleClick}
        className={`group relative cursor-pointer overflow-hidden rounded-[4px] bg-[#F5F2EA] p-8 transition-transform duration-300 hover:-translate-y-1 min-[600px]:aspect-[7/4] min-[600px]:p-10 ${libreBaskerville.className}`}
      >
        {/* Paper grain, multiplied over the bone base and everything on it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply"
          style={{ backgroundImage: `url("${GRAIN_DATA_URL}")` }}
        />

        <div className="relative flex h-full flex-col items-center justify-center text-center">
          <p
            className={`text-[1.9rem] font-bold text-[#2A2724] tracking-[0.06em] md:text-[2.5rem] ${SMALL_CAPS} ${DEBOSS}`}
          >
            Roy Ho
          </p>
          <p
            className={`mt-1 flex items-center justify-center gap-2 text-[0.95rem] text-[#33302B] tracking-[0.04em] md:text-[1.05rem] ${SMALL_CAPS} ${DEBOSS}`}
          >
            <MapPin
              className="h-[1em] w-[1em] shrink-0 text-current"
              strokeWidth={1.5}
              aria-hidden
            />
            San Francisco, CA
          </p>
          <p
            className={`mt-1 flex items-center justify-center gap-2 text-[0.95rem] text-[#33302B] md:text-[1.05rem] ${DEBOSS}`}
          >
            <Mail
              className="h-[1em] w-[1em] shrink-0 text-current"
              strokeWidth={1.5}
              aria-hidden
            />
            <a
              href={`mailto:${EMAIL}`}
              className="rounded-sm underline-offset-4 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A2724]"
            >
              {EMAIL}
            </a>
          </p>

          <div className="mt-6 flex items-center justify-center gap-6">
            <a
              href="https://www.linkedin.com/in/royho1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className={`${iconLinkBase} ${linkedInIconClass}`}
            >
              <FaLinkedin className="h-6 w-6" aria-hidden />
            </a>
            <a
              href="https://github.com/royho1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className={`${iconLinkBase} ${gitHubIconClass}`}
            >
              <FaGithub className="h-6 w-6" aria-hidden />
            </a>
          </div>

          <div className="mt-5 flex flex-col items-center">
            <a
              href="/roy-ho.vcf"
              download="roy-ho.vcf"
              onClick={handleSaveClick}
              className={`inline-flex w-[200px] items-center justify-center gap-2 whitespace-nowrap rounded-[2px] border border-[rgba(42,39,36,0.25)] bg-transparent px-6 py-2.5 text-[0.9rem] text-[#2A2724] tracking-[0.1em] transition-colors duration-200 hover:border-[rgba(42,39,36,0.4)] hover:bg-[rgba(42,39,36,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A2724] md:w-[220px] md:text-[1rem] ${SMALL_CAPS} ${DEBOSS}`}
            >
              <ContactRound
                className="h-[1em] w-[1em] shrink-0 text-current"
                strokeWidth={1.5}
                aria-hidden
              />
              {saved ? "Saved to Downloads" : "Save Contact Card"}
            </a>

            <button
              type="button"
              onClick={handleCopyClick}
              aria-live="polite"
              className={`mt-3 rounded-sm text-xs text-[rgba(42,39,36,0.65)] transition-colors duration-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A2724] ${DEBOSS}`}
            >
              {copied ? "Copied" : "or copy email"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
