/**
 * Drop project screenshots into `public/projects/` using these filenames,
 * then add the filename to `AVAILABLE_PROJECT_IMAGES` so cards pick them up.
 *
 * Preferred format: WebP (or JPEG/PNG). Aim ~1600px wide, 16:10 crop.
 */
export const PROJECT_IMAGE_FILES = {
  sfRestaurantSafetyMap: "sf-restaurant-safety-map/citywide-map.jpg",
  jobMarketAnalyticsDashboard: "job-market-analytics-dashboard.webp",
  drowsyDriverDetection: "drowsy-driver-detection.webp",
  solstice: "solstice.webp",
  heartStrokeRiskPrediction: "heart-stroke-risk-prediction.webp",
  wineQualityClassification: "wine-quality-classification.webp",
  stockTradingAlgorithm: "stock-trading-algorithm.webp",
  nbaPlayerPrediction: "nba-player-prediction.webp",
  movieReviewsAnalysis: "movie-reviews-analysis.webp",
  drakeTimeSeries: "drake-time-series.webp",
  nbaSalaryAnalysis: "nba-salary-analysis.webp",
  socioeconomicCrimeRates: "socioeconomic-crime-rates.webp",
  sixDegreesKevinBacon: "six-degrees-kevin-bacon.webp",
} as const;

export type ProjectImageFile =
  (typeof PROJECT_IMAGE_FILES)[keyof typeof PROJECT_IMAGE_FILES];

/**
 * Filenames that currently exist under `public/projects/`.
 * Keep this in sync when you add or remove screenshot files.
 */
export const AVAILABLE_PROJECT_IMAGES = new Set<ProjectImageFile>([
  // Card fronts stay icon-only. Screenshots live on `media` for the modal.
]);

export type ProjectMediaSlide = {
  src: string;
  title: string;
  description: string;
};

export function projectMedia(
  file: ProjectImageFile,
  imageAlt: string,
): { imageSrc?: string; imageAlt?: string } {
  if (!AVAILABLE_PROJECT_IMAGES.has(file)) return {};
  return {
    imageSrc: `/projects/${file}`,
    imageAlt,
  };
}

export const SF_RESTAURANT_SAFETY_MAP_MEDIA: ProjectMediaSlide[] = [
  {
    src: "/projects/sf-restaurant-safety-map/citywide-map.jpg",
    title: "Citywide Map",
    description: "Every restaurant health inspection on one map.",
  },
  {
    src: "/projects/sf-restaurant-safety-map/citywide-map-dark.jpg",
    title: "Citywide Map: Dark mode",
    description: "Same map, dark basemap.",
  },
  {
    src: "/projects/sf-restaurant-safety-map/detail-popup.png",
    title: "Detail Popup",
    description:
      "Click a pin to get the latest rating, date, and violations.",
  },
  {
    src: "/projects/sf-restaurant-safety-map/map-filters.png",
    title: "Map Filters",
    description:
      "Filter by rating and put closures on top so they don’t get buried.",
  },
  {
    src: "/projects/sf-restaurant-safety-map/insights-panel.png",
    title: "Insights Panel",
    description:
      "Citywide pass rate, rating breakdown, and places that need attention.",
  },
];
