import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HeartPulse, Star } from "lucide-react";
import AboutSection from "./components/AboutSection";
import BackToTop from "./components/BackToTop";
import DrowsyEyeIcon from "./components/DrowsyEyeIcon";
import FadeInSection from "./components/FadeInSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";

/** PDF lives in `public/` (served from site root). */
const resumePdfPath = "/Roy_Ho_Resume.pdf";
const jaikeLogoSrc = "/experience/JAIKE.png";
const techSprintLogoSrc = "/experience/TechSprint.png";

/** Add hobby images under `public/hobbies/` and list them here (width/height = pixel size of each file). */
const hobbyPhotos: { src: string; alt: string; width: number; height: number }[] =
  [
    { src: "/hobbies/photo1.jpg", alt: "Hobby photo 1", width: 4284, height: 5712 },
    { src: "/hobbies/photo2.jpeg", alt: "Hobby photo 2", width: 1179, height: 1452 },
    { src: "/hobbies/photo3.jpeg", alt: "Hobby photo 3", width: 1179, height: 1454 },
    { src: "/hobbies/photo4.jpeg", alt: "Hobby photo 4", width: 1179, height: 1450 },
    { src: "/hobbies/photo5.jpeg", alt: "Hobby photo 5", width: 1179, height: 1557 },
    { src: "/hobbies/photo6.jpeg", alt: "Hobby photo 6", width: 1536, height: 2049 },
  ];

type FeaturedProjectIconVariant = "eye" | "bars" | "heart";

type FeaturedProject = {
  title: string;
  description: string;
  tech: string;
  githubHref: string;
  iconVariant: FeaturedProjectIconVariant;
  gradient: string;
  award?: string;
};

const featuredProjects: FeaturedProject[] = [
  {
    title: "Drowsy Driver Detection",
    description:
      "Built a real-time drowsiness detection system using computer vision techniques and a CNN model trained on eye-state data.",
    tech: "Python, OpenCV, CNN",
    githubHref: "https://github.com/royho1/drowsy-driver-detection",
    iconVariant: "eye",
    gradient: "from-sky-100 via-white to-cyan-100",
    award: "Award Winner: Best Execution",
  },
  {
    title: "Job Analytics Dashboard",
    description:
      "Built a dashboard to analyze job market trends, including salaries, skills, and geographic differences across roles.",
    tech: "Python, Data Visualization",
    githubHref: "https://github.com/royho1/job-market-analysis-dashboard",
    iconVariant: "bars",
    gradient: "from-emerald-100 via-white to-sky-100",
  },
  {
    title: "Heart Stroke Risk Prediction",
    description:
      "Machine learning model to predict stroke risk from healthcare data, with preprocessing, training, and an interactive Streamlit app.",
    tech: "Python, scikit-learn, Streamlit",
    githubHref: "https://github.com/royho1/heart-stroke-risk-prediction",
    iconVariant: "heart",
    gradient: "from-rose-100 via-white to-sky-100",
  },
];

function AnimatedProjectIcon({
  variant,
}: {
  variant: FeaturedProjectIconVariant;
}) {
  if (variant === "bars") {
    return (
      <div
        className="flex h-14 w-14 items-end justify-center gap-1 text-emerald-600"
        aria-hidden
      >
        <span className="h-6 w-3 origin-bottom rounded-sm bg-current animate-bar-grow-1" />
        <span className="h-12 w-3 origin-bottom rounded-sm bg-current animate-bar-grow-2" />
        <span className="h-9 w-3 origin-bottom rounded-sm bg-current animate-bar-grow-3" />
      </div>
    );
  }

  if (variant === "heart") {
    return (
      <HeartPulse
        className="h-14 w-14 origin-center text-rose-600 animate-heartbeat"
        strokeWidth={1.75}
        aria-hidden
      />
    );
  }

  return <DrowsyEyeIcon />;
}

const additionalProjects = [
  {
    name: "Portuguese Wine Type and Quality Prediction",
    description:
      "Classified red vs. white wines and predicted quality ratings using logistic regression, LDA, and PCA on chemical properties.",
    tech: "Python, scikit-learn, PCA",
  },
  {
    name: "InvestorAI",
    description:
      "Stock market analysis platform with real-time news scraping, regression-based price predictions, and interactive data visualizations.",
    tech: "Python, scikit-learn, Highcharts",
  },
  {
    name: "NBA Player Performance Prediction",
    description:
      "Predicted 5th-season NBA player performance using regression and classification models on historical stats and draft data.",
    tech: "Python, Random Forest, Gradient Boosting",
  },
  {
    name: "Analyzing Movie Reviews Across Genres",
    description:
      "Scraped and compared IMDb audience reviews with professional critic reviews using sentiment analysis and NLP models.",
    tech: "Python, Selenium, VADER, RoBERTa",
  },
  {
    name: "Drake Time Series Analysis",
    description:
      "Forecasted Drake's popularity trends using 14 years of Google Trends data with ARMA and ARIMA models.",
    tech: "R, forecast, ggplot2",
  },
  {
    name: "NBA Player Salary Analysis",
    description:
      "Analyzed the relationship between player performance metrics and salary structures using regression and clustering.",
    tech: "R, tidyverse, ggplot2",
  },
  {
    name: "Socioeconomic Predictors of Crime Rates",
    description:
      "Modeled the relationship between poverty, unemployment, and crime rates using multiple linear regression and model selection.",
    tech: "R, ANOVA, AIC/BIC",
  },
  {
    name: "Graph-Based Shortest Path Analysis (Six Degrees of Kevin Bacon)",
    description:
      "Built a graph traversal algorithm to compute degrees of separation between actors through shared movie appearances.",
    tech: "Python, BFS, Graph Algorithms",
  },
] as const;

export default function Home() {
  return (
    <>
      <NavBar />

      <main>
        <HeroSection />

        <AboutSection />

        <FadeInSection
          as="section"
          id="projects"
          className="border-t border-sky-200/80 bg-white"
          aria-labelledby="projects-heading"
        >
          <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="projects-heading"
              className="mx-auto block w-max max-w-full cursor-default text-center text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl"
            >
              Projects
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.githubHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-sky-200 bg-white text-left shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                >
                  {project.award && (
                    <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50/95 px-2 py-0.5 text-[10px] font-semibold text-amber-800 shadow-sm shadow-amber-900/10 backdrop-blur-sm">
                      <Star
                        className="h-3 w-3 fill-amber-400 text-amber-500"
                        aria-hidden
                      />
                      {project.award}
                    </span>
                  )}

                  <div
                    className={`flex h-28 w-full items-center justify-center bg-gradient-to-br ${project.gradient}`}
                  >
                    <AnimatedProjectIcon variant={project.iconVariant} />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-sky-950">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                      {project.description}
                    </p>
                    <p className="mt-4 text-xs text-slate-500">
                      {project.tech}
                    </p>
                    <span className="mt-5 inline-flex text-sm font-medium text-sky-700 underline decoration-sky-300 underline-offset-4 transition-colors group-hover:text-sky-900 group-hover:decoration-sky-600">
                      GitHub
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-16">
              <div className="flex items-center justify-center gap-3">
                <h3 className="text-sm font-medium uppercase tracking-wide text-slate-500">
                  Additional projects
                </h3>
                <a
                  href="https://github.com/royho1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Roy Ho GitHub profile"
                  className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-900"
                >
                  <FaGithub className="h-6 w-6" aria-hidden />
                </a>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {additionalProjects.map((project) => (
                  <article
                    key={project.name}
                    className="group rounded-lg border border-sky-200 bg-sky-50/90 p-4 shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  >
                    <h4 className="text-sm font-semibold text-sky-950">
                      {project.name}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {project.description}
                    </p>
                    <p className="mt-3 text-[11px] font-medium text-slate-500">
                      {project.tech}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection
          as="section"
          id="experience"
          className="border-t border-sky-200/80 bg-sky-100"
          aria-labelledby="experience-heading"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="experience-heading"
              className="mx-auto block w-max max-w-full cursor-default text-center text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl"
            >
              Experience
            </h2>
            <div className="mt-10 space-y-8">
              <div className="rounded-2xl border border-sky-200 bg-white/90 p-6 shadow-sm shadow-sky-900/10 ring-1 ring-sky-300/25 md:p-8">
                <div className="grid items-start gap-8 md:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] md:gap-10">
                  <div className="group relative min-h-[18rem] w-full overflow-hidden rounded-2xl border border-sky-200 bg-white p-6 shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:min-h-[26rem] md:p-8">
                    <Image
                      src={jaikeLogoSrc}
                      alt="JAIKE logo"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                      JAIKE
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-slate-500 md:text-base">
                      Journal of Artificial Intelligence and Knowledge Engineering
                    </p>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-sky-800 md:text-base">
                      January 2025 &ndash; Present
                    </p>
                    <h4 className="mt-3 text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                      Artificial Intelligence Researcher
                    </h4>
                    <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-900 marker:text-slate-900 md:text-base">
                      <li>
                        Conducted research on LLM-based automation, focusing on
                        API-driven system design, agent orchestration frameworks,
                        and productivity applications across research, coding, and
                        enterprise workflows.
                      </li>
                      <li>
                        Authored a 25-page research paper on LLM-based automation
                        and agent architectures, synthesizing peer-reviewed and
                        industry research on API integration, architectural design
                        patterns, system limitations, and responsible deployment;
                        submitted for journal publication.
                      </li>
                      <li>
                        Served as a peer reviewer for JAIKE, evaluating research
                        on retrieval methods in large language models, reasoning
                        performance in extended tasks, and large-scale model
                        architectures for methodological rigor and evaluation
                        quality.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-sky-200 bg-white/90 p-6 shadow-sm shadow-sky-900/10 ring-1 ring-sky-300/25 md:p-8">
                <div className="grid items-start gap-8 md:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] md:gap-10">
                  <div className="group relative min-h-[18rem] w-full overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm shadow-sky-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:min-h-[26rem]">
                    <Image
                      src={techSprintLogoSrc}
                      alt="TechSprint Innovators logo"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                      TechSprint Innovators
                    </h3>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-sky-800 md:text-base">
                      March 2024 &ndash; September 2025
                    </p>
                    <h4 className="mt-3 text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                      Head of Data Engineering
                    </h4>
                    <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-900 marker:text-slate-900 md:text-base">
                      <li>
                        Built a multi-factor stock screening model using
                        fundamental, technical, and NLP-based sentiment features
                        (FinBERT).
                      </li>
                      <li>
                        Developed and evaluated a supervised classification model
                        in scikit-learn to predict price appreciation, performing
                        feature selection, model tuning, and performance
                        validation on historical market data.
                      </li>
                      <li>
                        Engineered and automated a daily ETL data pipeline
                        (Python, yfinance, Alpaca API) running on a Raspberry Pi
                        to filter equities, generate structured CSV outputs, and
                        deliver real-time investment signals via Discord webhook.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection
          as="section"
          id="contact"
          className="border-t border-sky-200/80 bg-sky-100"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-2xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="contact-heading"
              className="mx-auto block w-max max-w-full cursor-default text-center text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl"
            >
              Let&apos;s Connect!
            </h2>
            <div className="group mt-12 rounded-2xl border border-sky-200 bg-white p-8 shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-10">
              <p className="text-center text-2xl font-semibold tracking-tight text-sky-950 md:text-3xl">
                Roy Ho
              </p>
              <p className="mt-3 text-center text-base text-slate-600 md:text-lg">
                Davis, CA | San Francisco, CA
              </p>
              <p className="mt-3 text-center text-base md:text-lg">
                <a
                  href="mailto:royho346@gmail.com"
                  className="text-slate-600 transition-colors hover:text-sky-950 hover:underline"
                >
                  royho346@gmail.com
                </a>
              </p>
              <p className="mt-6 text-center">
                <a
                  href="tel:+14157418955"
                  className="text-lg font-medium text-sky-950 underline decoration-sky-300 underline-offset-4 transition-colors hover:decoration-sky-800"
                >
                  415-741-8955
                </a>
              </p>
              <div className="mt-10 flex justify-center gap-10">
                <a
                  href="https://www.linkedin.com/in/royho1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-950"
                >
                  <FaLinkedin className="h-8 w-8" aria-hidden />
                </a>
                <a
                  href="https://github.com/royho1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-950"
                >
                  <FaGithub className="h-8 w-8" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection
          as="section"
          id="resume"
          className="border-t border-sky-200/80 bg-white"
          aria-labelledby="resume-heading"
        >
          <div className="mx-auto max-w-3xl px-6 py-20 text-center md:px-8 md:py-28">
            <h2
              id="resume-heading"
              className="inline-block w-max max-w-full cursor-default text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl"
            >
              Resume
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
              Download a PDF of my experience, education, and skills.
            </p>
            <a
              href={resumePdfPath}
              download
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-sky-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-sky-600/25 transition-colors hover:bg-sky-700"
            >
              Download resume
            </a>
            <div className="mt-12 w-full">
              <p className="mb-4 text-center text-sm font-medium text-slate-500">
                Preview
              </p>
              <div className="overflow-hidden rounded-xl border border-sky-200 bg-sky-100/50 shadow-sm ring-1 ring-sky-300/25">
                <iframe
                  title="Roy Ho resume PDF preview"
                  src={resumePdfPath}
                  className="h-[min(85vh,56rem)] w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection
          as="section"
          id="hobbies"
          className="border-t border-sky-200/80 bg-sky-50"
          aria-labelledby="hobbies-heading"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 text-center md:px-8 md:py-28">
            <h2
              id="hobbies-heading"
              className="mx-auto inline-block w-max max-w-full cursor-default text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl"
            >
              Hobbies
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              Outside of work, I enjoy thrifting, bass fishing, spending time outdoors, and
              poker. I also love keeping up with fashion and
              music.
            </p>
            <div className="mt-12 grid items-start gap-7 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {hobbyPhotos.map((photo, index) => (
                <figure
                  key={`${photo.src}-${index}`}
                  className="group self-start overflow-hidden rounded-2xl shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    className="block h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </figure>
              ))}
            </div>
          </div>
        </FadeInSection>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
