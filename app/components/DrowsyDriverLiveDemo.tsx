"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Loader2 } from "lucide-react";

/**
 * Browser port of SourceCode.py from royho1/drowsy-driver-detection:
 * 68-point eye landmarks → EAR → alert after eyes stay closed.
 * dlib indices via face-api (same 6-point eye layout as imutils).
 */
const LEFT_EYE = [36, 37, 38, 39, 40, 41] as const;
const RIGHT_EYE = [42, 43, 44, 45, 46, 47] as const;

/**
 * Browser landmarks (face-api tiny) are noisier than dlib and often keep a
 * slightly open-eye shape when lids close, so we use a softer threshold than
 * SourceCode.py (0.25) and a rolling window instead of a brittle consecutive streak.
 */
const EAR_THRESH = 0.28;
const WINDOW_SIZE = 48;
/** Need this many closed samples inside the window to fire an alert (~2.5–3.5s). */
const CLOSED_NEEDED = 28;
/** Tolerate brief detector misses without wiping the window. */
const MISS_GRACE = 10;

const FACE_API_MODEL_URL =
  "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.15/model";
const ALERT_SOUND = "/projects/drowsy-driver-detection/music.wav";

type DemoStatus =
  | "idle"
  | "starting"
  | "running"
  | "denied"
  | "unsupported"
  | "error";

type Point = { x: number; y: number };

type FaceApiModule = {
  nets: {
    tinyFaceDetector: {
      loadFromUri: (uri: string) => Promise<void>;
    };
    faceLandmark68TinyNet: {
      loadFromUri: (uri: string) => Promise<void>;
    };
  };
  TinyFaceDetectorOptions: new (options?: {
    inputSize?: number;
    scoreThreshold?: number;
  }) => unknown;
  detectSingleFace: (
    input: HTMLVideoElement,
    options: unknown,
  ) => {
    withFaceLandmarks: (useTiny?: boolean) => Promise<{
      landmarks: { positions: Point[] };
    } | undefined>;
  };
};

function dist(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/** Mirrors SourceCode.py eye_aspect_ratio (scipy Euclidean on 6 eye points). */
function eyeAspectRatio(eye: Point[]) {
  const A = dist(eye[1], eye[5]);
  const B = dist(eye[2], eye[4]);
  const C = dist(eye[0], eye[3]) || 1e-6;
  return (A + B) / (2.0 * C);
}

function pointsForEye(positions: Point[], idxs: readonly number[]) {
  return idxs.map((i) => positions[i]).filter(Boolean) as Point[];
}

export default function DrowsyDriverLiveDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const faceapiRef = useRef<FaceApiModule | null>(null);
  const detectOptsRef = useRef<unknown>(null);
  const rafRef = useRef<number | null>(null);
  const closedWindowRef = useRef<boolean[]>([]);
  const missStreakRef = useRef(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const alertActiveRef = useRef(false);
  const runningRef = useRef(false);

  const [status, setStatus] = useState<DemoStatus>("idle");
  const [ear, setEar] = useState<number | null>(null);
  const [alerting, setAlerting] = useState(false);
  const [faceFound, setFaceFound] = useState(false);
  const [closedCount, setClosedCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(ALERT_SOUND);
      audioRef.current.preload = "auto";
    }
    return audioRef.current;
  }, []);

  const stopAlertSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = false;
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch {
      // Ignore seek errors on freshly created elements.
    }
  }, []);

  const startAlertSound = useCallback(() => {
    if (!runningRef.current) return;
    try {
      const audio = ensureAudio();
      audio.loop = true;
      try {
        audio.currentTime = 0;
      } catch {
        // Ignore seek errors; play() still attempts.
      }
      void audio.play().catch(() => {
        // Autoplay policies can block audio; visual alert still works.
      });
    } catch {
      // Visual alert still works if audio fails.
    }
  }, [ensureAudio]);

  const endAlertEpisode = useCallback(() => {
    if (!alertActiveRef.current) return;
    alertActiveRef.current = false;
    stopAlertSound();
  }, [stopAlertSound]);

  const resetClosedWindow = useCallback(() => {
    closedWindowRef.current = [];
    missStreakRef.current = 0;
    setClosedCount(0);
  }, []);

  const stop = useCallback(() => {
    runningRef.current = false;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    endAlertEpisode();
    resetClosedWindow();
    setAlerting(false);
    setEar(null);
    setFaceFound(false);
  }, [endAlertEpisode, resetClosedWindow]);

  // Unmount-only cleanup. Do not depend on `stop` identity — that would kill a
  // live session whenever the callback is recreated mid-start.
  const stopRef = useRef(stop);
  stopRef.current = stop;
  useEffect(() => () => stopRef.current(), []);

  const drawFrame = useCallback(
    (positions: Point[] | null, isAlert: boolean, currentEar: number | null) => {
      if (!runningRef.current) return;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      const width = video.videoWidth;
      const height = video.videoHeight;
      if (!width || !height) return;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.save();
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, width, height);

      // Green convex-hull style overlays (SourceCode.py drawContours).
      if (positions) {
        const drawEyeHull = (idxs: readonly number[]) => {
          const pts = pointsForEye(positions, idxs);
          if (pts.length < 3) return;
          ctx.beginPath();
          pts.forEach((pt, n) => {
            if (n === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.closePath();
          ctx.strokeStyle = "#00ff00";
          ctx.lineWidth = 1;
          ctx.stroke();
        };
        drawEyeHull(LEFT_EYE);
        drawEyeHull(RIGHT_EYE);
      }

      ctx.restore();

      if (isAlert) {
        ctx.font = "bold 22px system-ui, sans-serif";
        ctx.fillStyle = "#ef4444";
        ctx.strokeStyle = "rgba(0,0,0,0.45)";
        ctx.lineWidth = 4;
        const label = "DROWSINESS ALERT!";
        ctx.strokeText(label, 12, 32);
        ctx.fillText(label, 12, 32);
      } else if (currentEar != null) {
        ctx.font = "600 13px system-ui, sans-serif";
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.fillText(`EAR ${currentEar.toFixed(3)}`, 12, 24);
      }
    },
    [],
  );

  const loop = useCallback(async () => {
    if (!runningRef.current) return;

    const video = videoRef.current;
    const faceapi = faceapiRef.current;
    if (!video || !faceapi || video.readyState < 2) {
      if (!runningRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        void loop();
      });
      return;
    }

    try {
      const detection = await faceapi
        .detectSingleFace(video, detectOptsRef.current)
        .withFaceLandmarks(true);

      if (!runningRef.current) return;

      if (!detection?.landmarks?.positions) {
        missStreakRef.current += 1;
        if (missStreakRef.current > MISS_GRACE) {
          resetClosedWindow();
          endAlertEpisode();
          setFaceFound(false);
          setEar(null);
          setAlerting(false);
        }
        drawFrame(null, alertActiveRef.current, null);
      } else {
        missStreakRef.current = 0;
        const positions = detection.landmarks.positions;
        const leftEye = pointsForEye(positions, LEFT_EYE);
        const rightEye = pointsForEye(positions, RIGHT_EYE);
        if (leftEye.length < 6 || rightEye.length < 6) {
          drawFrame(positions, alertActiveRef.current, null);
        } else {
          const currentEar =
            (eyeAspectRatio(leftEye) + eyeAspectRatio(rightEye)) / 2.0;
          const eyesClosed = currentEar < EAR_THRESH;

          const window = closedWindowRef.current;
          window.push(eyesClosed);
          if (window.length > WINDOW_SIZE) window.shift();
          const closedInWindow = window.filter(Boolean).length;
          setClosedCount((prev) =>
            prev === closedInWindow ? prev : closedInWindow,
          );

          let isAlert = false;
          if (closedInWindow >= CLOSED_NEEDED) {
            isAlert = true;
            if (!alertActiveRef.current) {
              alertActiveRef.current = true;
              startAlertSound();
            }
          } else {
            endAlertEpisode();
          }

          setFaceFound(true);
          setEar(currentEar);
          setAlerting(isAlert);
          drawFrame(positions, isAlert, currentEar);
        }
      }
    } catch {
      if (!runningRef.current) return;
      drawFrame(null, false, null);
    }

    if (!runningRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      void loop();
    });
  }, [drawFrame, endAlertEpisode, resetClosedWindow, startAlertSound]);

  const start = useCallback(async () => {
    if (typeof window === "undefined") return;
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus("unsupported");
      return;
    }

    setStatus("starting");
    setErrorMessage(null);
    stop();
    runningRef.current = true;

    // Unlock audio during the user gesture so later alert play() is allowed.
    try {
      const audio = ensureAudio();
      audio.muted = true;
      void audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.muted = false;
        })
        .catch(() => {
          audio.muted = false;
        });
    } catch {
      // Visual alert still works if unlock fails.
    }

    try {
      if (!faceapiRef.current) {
        const faceapi = (await import(
          /* webpackIgnore: true */
          /* turbopackIgnore: true */
          "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.15/dist/face-api.esm.js"
        )) as FaceApiModule;
        if (!runningRef.current) return;
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(FACE_API_MODEL_URL),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri(FACE_API_MODEL_URL),
        ]);
        if (!runningRef.current) return;
        faceapiRef.current = faceapi;
        detectOptsRef.current = new faceapi.TinyFaceDetectorOptions({
          inputSize: 416,
          scoreThreshold: 0.4,
        });
      }

      if (!runningRef.current) return;

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        });
      } catch (err) {
        if (!runningRef.current) return;
        const name = err instanceof DOMException ? err.name : "";
        if (name === "NotAllowedError" || name === "SecurityError") {
          setStatus("denied");
        } else {
          setStatus("error");
          setErrorMessage(
            err instanceof Error ? err.message : "Could not open the camera.",
          );
        }
        return;
      }

      if (!runningRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      streamRef.current = stream;
      const video = videoRef.current;
      if (!video) {
        stream.getTracks().forEach((t) => t.stop());
        setStatus("error");
        setErrorMessage("Video element missing.");
        return;
      }

      video.srcObject = stream;
      await video.play();
      if (!runningRef.current) {
        stop();
        return;
      }
      setStatus("running");
      rafRef.current = requestAnimationFrame(() => {
        void loop();
      });
    } catch (err) {
      if (!runningRef.current) return;
      stop();
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Could not load the face-landmark model.",
      );
    }
  }, [ensureAudio, loop, stop]);

  return (
    <div className="relative flex h-full w-full flex-col bg-slate-950">
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <video
          ref={videoRef}
          playsInline
          muted
          // Keep the element painted so browsers keep decoding frames; canvas is the UI.
          className="pointer-events-none absolute h-px w-px opacity-0"
        />
        <canvas
          ref={canvasRef}
          className={`h-full w-full object-contain ${
            status === "running" ? "block" : "hidden"
          }`}
        />

        {status !== "running" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-sky-950 via-slate-900 to-cyan-950 px-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-sky-400/30 bg-sky-500/10 text-sky-200">
              {status === "starting" ? (
                <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
              ) : status === "denied" || status === "unsupported" ? (
                <CameraOff className="h-6 w-6" aria-hidden />
              ) : (
                <Camera className="h-6 w-6" aria-hidden />
              )}
            </div>

            <div className="max-w-sm space-y-1.5">
              <p className="text-sm font-medium text-sky-50">
                {status === "starting"
                  ? "Loading camera + landmark model…"
                  : status === "denied"
                    ? "Camera access blocked"
                    : status === "unsupported"
                      ? "Camera not supported here"
                      : status === "error"
                        ? "Couldn’t start the live demo"
                        : "Try the live EAR detector"}
              </p>
              <p className="text-[12px] leading-relaxed text-sky-100/70">
                {status === "denied"
                  ? "Allow camera access in the browser address bar, then try again. Video stays on your device."
                  : status === "unsupported"
                    ? "This browser can’t open a webcam from the page. Open the site on desktop Chrome/Safari over HTTPS."
                    : status === "error"
                      ? (errorMessage ?? "Something went wrong starting the demo.")
                      : "Same loop as the Python demo: 68-point eye landmarks → Eye Aspect Ratio → alert after eyes stay closed. Nothing is uploaded."}
              </p>
            </div>

            {(status === "idle" ||
              status === "denied" ||
              status === "error") && (
              <button
                type="button"
                onClick={() => void start()}
                className="mt-1 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-sky-300/40 bg-sky-500/20 px-3.5 py-2 text-xs font-semibold text-sky-50 transition-colors hover:bg-sky-500/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
              >
                <Camera className="h-3.5 w-3.5" aria-hidden />
                {status === "idle" ? "Enable camera" : "Try again"}
              </button>
            )}
          </div>
        )}

        {status === "running" && alerting && (
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 animate-pulse bg-red-500" />
        )}
      </div>

      {status === "running" && (
        <div className="flex shrink-0 items-center justify-between gap-2 border-t border-white/10 bg-black/50 px-3 py-2 text-[11px] text-sky-100/80 backdrop-blur-sm">
          <span className="truncate">
            {!faceFound
              ? "Look at the camera"
              : alerting
                ? "Eyes closed long enough — alert"
                : `Tracking · EAR ${ear?.toFixed(3) ?? "—"} · closed ${closedCount}/${CLOSED_NEEDED}`}
          </span>
          <button
            type="button"
            onClick={() => {
              stop();
              setStatus("idle");
            }}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-md border border-white/15 bg-white/5 px-2 py-1 font-medium text-sky-50 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <CameraOff className="h-3 w-3" aria-hidden />
            Stop
          </button>
        </div>
      )}
    </div>
  );
}
