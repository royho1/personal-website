/**
 * Small celebratory burst fired from a specific point on the page. Imported
 * lazily so `canvas-confetti` (which touches the DOM at module load) is
 * never pulled in during server rendering.
 */
export async function fireConfettiFrom(originX: number, originY: number) {
  const mod = await import("canvas-confetti");
  const confetti = mod.default;
  const defaults = {
    origin: { x: originX, y: originY },
    spread: 70,
    ticks: 200,
    gravity: 0.9,
    scalar: 0.9,
    colors: ["#38bdf8", "#0ea5e9", "#22c55e", "#fde047", "#f472b6"],
  };

  // Two quick bursts so the celebration feels a bit more alive.
  confetti({ ...defaults, particleCount: 90, startVelocity: 55 });
  confetti({
    ...defaults,
    particleCount: 50,
    startVelocity: 35,
    spread: 110,
    scalar: 0.75,
  });
}

/** Fire the burst from the center of an element, in viewport-relative terms. */
export function fireConfettiFromElement(element: Element) {
  const rect = element.getBoundingClientRect();
  const originX = (rect.left + rect.width / 2) / window.innerWidth;
  const originY = (rect.top + rect.height / 2) / window.innerHeight;
  void fireConfettiFrom(originX, originY);
}
