"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { recentTracks } from "../lib/recentMusic";

type PlaybackUpdateEvent = {
  data: {
    isPaused: boolean;
    isBuffering: boolean;
    duration: number;
    position: number;
  };
};

type SpotifyEmbedController = {
  pause: () => void;
  destroy: () => void;
  addListener: (
    event: "playback_update",
    callback: (event: PlaybackUpdateEvent) => void,
  ) => void;
};

type SpotifyIFrameAPI = {
  createController: (
    element: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
  }
}

const IFRAME_API_SRC = "https://open.spotify.com/embed/iframe-api/v1";
const EMBED_HEIGHT = 352;

// Spotify calls window.onSpotifyIframeApiReady exactly once per page load, so
// every mount has to share this promise rather than reassign the callback.
let iframeApiPromise: Promise<SpotifyIFrameAPI> | null = null;

function loadSpotifyIframeApi(): Promise<SpotifyIFrameAPI> {
  if (!iframeApiPromise) {
    iframeApiPromise = new Promise((resolve) => {
      window.onSpotifyIframeApiReady = resolve;
      if (!document.querySelector(`script[src="${IFRAME_API_SRC}"]`)) {
        const script = document.createElement("script");
        script.src = IFRAME_API_SRC;
        script.async = true;
        document.body.appendChild(script);
      }
    });
  }
  return iframeApiPromise;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function RecentMusic() {
  const prefersReducedMotion = useReducedMotion();
  const hostRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controllersRef = useRef<(SpotifyEmbedController | null)[]>([]);
  const pausedRef = useRef<(boolean | undefined)[]>([]);

  useEffect(() => {
    let cancelled = false;
    const hosts = hostRefs.current;

    loadSpotifyIframeApi().then((api) => {
      if (cancelled) return;

      recentTracks.forEach(({ id, title, artist }, index) => {
        const host = hosts[index];
        if (!host) return;

        // createController replaces the element it is given with an iframe, so
        // mount into a child React doesn't own to keep reconciliation safe.
        const mountPoint = document.createElement("div");
        host.appendChild(mountPoint);

        api.createController(
          mountPoint,
          { uri: `spotify:track:${id}`, width: "100%", height: EMBED_HEIGHT },
          (controller) => {
            if (cancelled) {
              controller.destroy();
              return;
            }

            host
              .querySelector("iframe")
              ?.setAttribute("title", `${title} by ${artist} on Spotify`);

            controllersRef.current[index] = controller;

            controller.addListener("playback_update", ({ data }) => {
              const wasPaused = pausedRef.current[index];
              pausedRef.current[index] = data.isPaused;

              // playback_update fires continuously while playing, so only act
              // on the paused-to-playing transition.
              if (data.isPaused || wasPaused === false) return;

              controllersRef.current.forEach((other, otherIndex) => {
                if (
                  other &&
                  otherIndex !== index &&
                  pausedRef.current[otherIndex] === false
                ) {
                  other.pause();
                }
              });
            });
          },
        );
      });
    });

    return () => {
      cancelled = true;
      controllersRef.current.forEach((controller) => controller?.destroy());
      controllersRef.current = [];
      pausedRef.current = [];
      hosts.forEach((host) => host?.replaceChildren());
    };
  }, []);

  return (
    <motion.div
      className="mt-12 md:mt-16"
      {...(prefersReducedMotion
        ? {}
        : {
            variants,
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, amount: "some" as const },
          })}
    >
      <h3 className="cursor-default text-center text-xl font-semibold tracking-tight text-sky-950 md:text-2xl dark:text-sky-100">
        On repeat lately
      </h3>
      <ul className="mt-6 grid grid-cols-1 gap-5 md:gap-8 lg:grid-cols-3">
        {recentTracks.map(({ id }, index) => (
          <li
            key={id}
            className="h-[352px] overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-800"
          >
            <div
              ref={(el) => {
                hostRefs.current[index] = el;
              }}
              className="h-full w-full"
            />
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
