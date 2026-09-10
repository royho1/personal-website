/**
 * Drop project screenshots into `public/projects/` using these filenames,
 * then add the filename to `AVAILABLE_PROJECT_IMAGES` so cards pick them up.
 *
 * Preferred format: WebP (or JPEG/PNG). Aim ~1600px wide, 16:10 crop.
 * Modal galleries use the `*_MEDIA` arrays below (not the single-file gate).
 */
export const PROJECT_IMAGE_FILES = {
  sfRestaurantSafetyMap: "sf-restaurant-safety-map/citywide-map.jpg",
  jobMarketAnalyticsDashboard: "job-market-analytics-dashboard/overview.png",
  drowsyDriverDetection: "drowsy-driver-detection.webp",
  solstice: "solstice/cover.png",
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
 * Filenames that currently exist under `public/projects/` for optional
 * single-image card fronts. Card fronts stay icon-only; modal slides use `*_MEDIA`.
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

export const SOLSTICE_MEDIA: ProjectMediaSlide[] = [
  {
    src: "/projects/solstice/cover.png",
    title: "Solstice",
    description: "Solstice Sneaker Analyzer brand cover.",
  },
];

export const JOB_MARKET_ANALYTICS_DASHBOARD_MEDIA: ProjectMediaSlide[] = [
  {
    src: "/projects/job-market-analytics-dashboard/overview.png",
    title: "Overview",
    description:
      "Landing hub for salaries, skills, trends, and resume-matched postings.",
  },
  {
    src: "/projects/job-market-analytics-dashboard/methodology.png",
    title: "Methodology",
    description:
      "How JobSpy, Selenium, spaCy, and TF-IDF resume matching fit together.",
  },
  {
    src: "/projects/job-market-analytics-dashboard/dashboard-overview.png",
    title: "Dashboard Overview",
    description: "Salary distribution and top skills across the scraped market.",
  },
  {
    src: "/projects/job-market-analytics-dashboard/posting-trends.png",
    title: "Job Posting Trends",
    description: "Posting volume over time to spot hiring spikes.",
  },
  {
    src: "/projects/job-market-analytics-dashboard/salary-analysis.png",
    title: "Salary Analysis",
    description: "Filter salary distributions by location and job title.",
  },
  {
    src: "/projects/job-market-analytics-dashboard/skills-analysis.png",
    title: "Skills Analysis",
    description: "Most-requested skills, filterable by location and role.",
  },
  {
    src: "/projects/job-market-analytics-dashboard/recommended-jobs.png",
    title: "Recommended Jobs",
    description: "Resume-matched postings ranked by TF-IDF similarity score.",
  },
];

export const HEART_STROKE_RISK_PREDICTION_MEDIA: ProjectMediaSlide[] = [
  {
    src: "/projects/heart-stroke-risk-prediction/ui-predictor.png",
    title: "Stroke Predictor",
    description:
      "Interactive Streamlit form where visitors enter health features and get a risk prediction.",
  },
  {
    src: "/projects/heart-stroke-risk-prediction/model-metrics.png",
    title: "Model metrics",
    description:
      "Held-out accuracy, precision, recall, and F1 for Balanced RF vs RF + SMOTE.",
  },
  {
    src: "/projects/heart-stroke-risk-prediction/confusion-matrix.png",
    title: "Confusion matrix",
    description: "Test-set confusion matrix for the deployed RF + SMOTE model.",
  },
  {
    src: "/projects/heart-stroke-risk-prediction/ui-graphs-heatmap.png",
    title: "Graphs page",
    description:
      "Full Streamlit graphs view with the correlation heatmap selected.",
  },
  {
    src: "/projects/heart-stroke-risk-prediction/plot-age-range.png",
    title: "Age range chart",
    description: "Stroke proportion across age groups from the healthcare dataset.",
  },
];

export const WINE_QUALITY_CLASSIFICATION_MEDIA: ProjectMediaSlide[] = [
  {
    src: "/projects/wine-quality-classification/pca-separation.png",
    title: "PCA separation",
    description: "Red vs white wines separate clearly in PCA space.",
  },
  {
    src: "/projects/wine-quality-classification/lda-separation.png",
    title: "LDA separation",
    description: "Linear discriminant projection for red vs white classification.",
  },
  {
    src: "/projects/wine-quality-classification/roc-curve.png",
    title: "ROC curve",
    description: "Red vs white classification ROC with held-out AUC.",
  },
  {
    src: "/projects/wine-quality-classification/roc-high-quality.png",
    title: "High-quality ROC",
    description: "ROC for classifying highest-quality wines vs the rest.",
  },
  {
    src: "/projects/wine-quality-classification/correlation-matrix.png",
    title: "Feature correlations",
    description: "Upper-triangle correlation matrix of wine chemical properties.",
  },
  {
    src: "/projects/wine-quality-classification/quality-boxplot.png",
    title: "Quality vs alcohol",
    description: "Alcohol level distributions across wine quality ratings.",
  },
];

export const NBA_PLAYER_PREDICTION_MEDIA: ProjectMediaSlide[] = [
  {
    src: "/projects/nba-player-prediction/model-comparison.png",
    title: "Regression models",
    description: "Held-out R² for OLS, Random Forest, and Gradient Boosting.",
  },
  {
    src: "/projects/nba-player-prediction/predicted-vs-actual.png",
    title: "Predicted vs actual",
    description: "5th-season points predictions against the test set.",
  },
  {
    src: "/projects/nba-player-prediction/classification-accuracy.png",
    title: "Peak-season classification",
    description: "Accuracy for predicting whether season 5 is a player's peak.",
  },
  {
    src: "/projects/nba-player-prediction/classification-confusion.png",
    title: "Confusion matrix",
    description: "Best classifier confusion matrix on the held-out test set.",
  },
];

export const MOVIE_REVIEWS_ANALYSIS_MEDIA: ProjectMediaSlide[] = [
  {
    src: "/projects/movie-reviews-analysis/sentiment-by-genre.png",
    title: "Sentiment by genre",
    description: "Average professional vs user sentiment across five genres.",
  },
  {
    src: "/projects/movie-reviews-analysis/roberta-vs-vader.png",
    title: "RoBERTa vs VADER",
    description:
      "Reported true positive and negative-class error rates. RoBERTa outperforms VADER.",
  },
  {
    src: "/projects/movie-reviews-analysis/distributions-adventure-comedy.png",
    title: "Adventure and comedy",
    description: "Sentiment distributions and rating correlations for two genres.",
  },
  {
    src: "/projects/movie-reviews-analysis/distributions-crime-horror.png",
    title: "Crime and horror",
    description: "Sentiment distributions and rating correlations for two genres.",
  },
  {
    src: "/projects/movie-reviews-analysis/distributions-superhero.png",
    title: "Superhero",
    description: "Sentiment distribution and rating correlation for superhero films.",
  },
];

export const DRAKE_TIME_SERIES_MEDIA: ProjectMediaSlide[] = [
  {
    src: "/projects/drake-time-series/trend-series.png",
    title: "Trend series",
    description: "Drake Google Trends interest from 2010 onward.",
  },
  {
    src: "/projects/drake-time-series/decomposition.png",
    title: "Decomposition",
    description: "Additive trend, seasonal, and remainder components.",
  },
  {
    src: "/projects/drake-time-series/acf.png",
    title: "ACF",
    description: "Autocorrelation structure used to guide ARMA orders.",
  },
  {
    src: "/projects/drake-time-series/forecast.png",
    title: "Forecast",
    description: "12-month ARMA forecast of upcoming trend values.",
  },
];

export const NBA_SALARY_ANALYSIS_MEDIA: ProjectMediaSlide[] = [
  {
    src: "/projects/nba-salary-analysis/basic-stats.png",
    title: "Basic stats",
    description: "Points, rebounds, and assists vs average salary.",
  },
  {
    src: "/projects/nba-salary-analysis/advanced-stats.png",
    title: "Advanced stats",
    description: "PER, eFG%, and win shares vs average salary.",
  },
  {
    src: "/projects/nba-salary-analysis/salary-by-position.png",
    title: "Salary by position",
    description: "Average salary across the five standard NBA positions.",
  },
];

export const SOCIOECONOMIC_CRIME_RATES_MEDIA: ProjectMediaSlide[] = [
  {
    src: "/projects/socioeconomic-crime-rates/pairs-plot.png",
    title: "Pairs plot",
    description: "Region 1 pairwise relationships across crimes and predictors.",
  },
  {
    src: "/projects/socioeconomic-crime-rates/poverty-scatter.png",
    title: "Poverty scatter",
    description: "Total crimes vs percent below poverty level.",
  },
  {
    src: "/projects/socioeconomic-crime-rates/fitted-vs-actual.png",
    title: "Fitted vs actual",
    description: "Multiple regression fitted values against observed crimes.",
  },
  {
    src: "/projects/socioeconomic-crime-rates/residual-diagnostics.png",
    title: "Residual diagnostics",
    description: "Standard lm diagnostic plots for the selected crime model.",
  },
];

export const SIX_DEGREES_KEVIN_BACON_MEDIA: ProjectMediaSlide[] = [
  {
    src: "/projects/six-degrees-kevin-bacon/rdj-bfs-path.png",
    title: "BFS path",
    description:
      "Shortest path from Robert Downey Jr. to Kevin Bacon via shared movies.",
  },
  {
    src: "/projects/six-degrees-kevin-bacon/test-cases.png",
    title: "Test cases",
    description:
      "Sanity checks for minimum paths, valid longer paths, and invalid inputs.",
  },
];
