import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import AboutSection from "./components/AboutSection";
import BackToTop from "./components/BackToTop";
import FadeInSection from "./components/FadeInSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import ProjectsSection from "./components/ProjectsSection";
import Sparkles from "./components/Sparkles";

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

export default function Home() {
  return (
    <>
      <NavBar />

      <main>
        <HeroSection />

        <AboutSection />

        <ProjectsSection />

        <FadeInSection
          as="section"
          id="experience"
          className="border-t border-sky-200/80 bg-sky-100 dark:border-slate-800 dark:bg-slate-900"
          aria-labelledby="experience-heading"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="experience-heading"
              className="mx-auto block w-max max-w-full cursor-default text-center text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl dark:text-sky-100"
            >
              Experience
            </h2>
            <div className="mt-10 space-y-8">
              <div className="rounded-2xl border border-sky-200 bg-white/90 p-6 shadow-sm shadow-sky-900/10 ring-1 ring-sky-300/25 md:p-8 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/40 dark:ring-slate-700/50">
                <div className="grid items-start gap-8 md:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] md:gap-10">
                  <div className="group relative min-h-[18rem] w-full overflow-hidden rounded-2xl border border-sky-200 bg-white p-6 shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:min-h-[26rem] md:p-8 dark:border-slate-700 dark:bg-slate-100 dark:shadow-black/40 dark:ring-slate-700/50">
                    <Image
                      src={jaikeLogoSrc}
                      alt="JAIKE logo"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-sky-100">
                      JAIKE
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-slate-500 md:text-base dark:text-slate-400">
                      Journal of Artificial Intelligence and Knowledge Engineering
                    </p>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-sky-800 md:text-base dark:text-sky-300">
                      January 2025 &ndash; Present
                    </p>
                    <h4 className="mt-3 text-lg font-semibold tracking-tight text-slate-900 md:text-xl dark:text-slate-100">
                      Artificial Intelligence Researcher
                    </h4>
                    <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-900 marker:text-slate-900 md:text-base dark:text-slate-300 dark:marker:text-slate-500">
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

              <div className="rounded-2xl border border-sky-200 bg-white/90 p-6 shadow-sm shadow-sky-900/10 ring-1 ring-sky-300/25 md:p-8 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/40 dark:ring-slate-700/50">
                <div className="grid items-start gap-8 md:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] md:gap-10">
                  <div className="group relative min-h-[18rem] w-full overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm shadow-sky-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:min-h-[26rem] dark:border-slate-700 dark:bg-slate-100 dark:shadow-black/40">
                    <Image
                      src={techSprintLogoSrc}
                      alt="TechSprint Innovators logo"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-sky-100">
                      TechSprint Innovators
                    </h3>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-sky-800 md:text-base dark:text-sky-300">
                      March 2024 &ndash; September 2025
                    </p>
                    <h4 className="mt-3 text-lg font-semibold tracking-tight text-slate-900 md:text-xl dark:text-slate-100">
                      Head of Data Engineering
                    </h4>
                    <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-900 marker:text-slate-900 md:text-base dark:text-slate-300 dark:marker:text-slate-500">
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
          className="border-t border-sky-200/80 bg-sky-100 dark:border-slate-800 dark:bg-slate-900"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-2xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="contact-heading"
              className="mx-auto block w-max max-w-full cursor-default text-center text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl dark:text-sky-100"
            >
              Let&apos;s Connect!
            </h2>
            <div className="group relative mt-12 rounded-2xl border border-sky-200 bg-white p-8 shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-10 dark:border-slate-700 dark:bg-slate-800/80 dark:shadow-black/40 dark:ring-slate-700/50">
              <Sparkles count={3} bleed={36} sizeRange={[32, 48]} />
              <p className="relative text-center text-2xl font-semibold tracking-tight text-sky-950 md:text-3xl dark:text-sky-100">
                Roy Ho
              </p>
              <p className="mt-3 text-center text-base text-slate-600 md:text-lg dark:text-slate-300">
                Davis, CA | San Francisco, CA
              </p>
              <p className="mt-3 text-center text-base md:text-lg">
                <a
                  href="mailto:royho.career@gmail.com"
                  className="text-slate-600 transition-colors hover:text-sky-950 hover:underline dark:text-slate-300 dark:hover:text-sky-200"
                >
                  royho.career@gmail.com
                </a>
              </p>
              <div className="mt-10 flex justify-center gap-10">
                <a
                  href="https://www.linkedin.com/in/royho1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-950 dark:text-slate-400 dark:hover:text-sky-300"
                >
                  <FaLinkedin className="h-8 w-8" aria-hidden />
                </a>
                <a
                  href="https://github.com/royho1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-950 dark:text-slate-400 dark:hover:text-sky-300"
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
          className="border-t border-sky-200/80 bg-white dark:border-slate-800 dark:bg-slate-950"
          aria-labelledby="resume-heading"
        >
          <div className="mx-auto max-w-3xl px-6 py-20 text-center md:px-8 md:py-28">
            <h2
              id="resume-heading"
              className="inline-block w-max max-w-full cursor-default text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl dark:text-sky-100"
            >
              Resume
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              Download a PDF of my experience, education, and skills.
            </p>
            <a
              href={resumePdfPath}
              download
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-sky-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-sky-600/25 transition-colors hover:bg-sky-700 dark:bg-sky-500 dark:shadow-sky-950/40 dark:hover:bg-sky-400"
            >
              Download resume
            </a>
            <div className="mt-12 w-full">
              <p className="mb-4 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                Preview
              </p>
              <div className="overflow-hidden rounded-xl border border-sky-200 bg-sky-100/50 shadow-sm ring-1 ring-sky-300/25 dark:border-slate-700 dark:bg-slate-800/50 dark:ring-slate-700/50">
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
          className="border-t border-sky-200/80 bg-sky-50 dark:border-slate-800 dark:bg-slate-900/80"
          aria-labelledby="hobbies-heading"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 text-center md:px-8 md:py-28">
            <h2
              id="hobbies-heading"
              className="mx-auto inline-block w-max max-w-full cursor-default text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl dark:text-sky-100"
            >
              Hobbies
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              Outside of work, I enjoy thrifting, bass fishing, spending time outdoors, and
              poker. I also love keeping up with fashion and
              music.
            </p>
            <div className="mt-12 grid items-start gap-7 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {hobbyPhotos.map((photo, index) => (
                <figure
                  key={`${photo.src}-${index}`}
                  className="group self-start overflow-hidden rounded-2xl shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/90 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:shadow-black/40 dark:ring-slate-700/60"
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
