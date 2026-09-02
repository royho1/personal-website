import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import AboutSection from "./components/AboutSection";
import AtlasDog from "./components/AtlasDog";
import BackToTop from "./components/BackToTop";
import ContactCard from "./components/ContactCard";
import FadeInSection from "./components/FadeInSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HobbyGallery from "./components/HobbyGallery";
import NavBar from "./components/NavBar";
import ProjectsSection from "./components/ProjectsSection";
import ResumeSection from "./components/ResumeSection";

const jaikeLogoSrc = "/experience/JAIKE.png";
const techSprintLogoSrc = "/experience/TechSprint.png";
const aiscLogoSrc = "/experience/AISC.jpg";

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
              <div className="group rounded-2xl border border-sky-200 bg-white/90 p-6 shadow-sm shadow-sky-900/10 ring-1 ring-sky-300/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/40 dark:ring-slate-700/50">
                <div className="grid items-start gap-8 md:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] md:gap-10">
                  <div className="relative min-h-[18rem] w-full overflow-hidden rounded-2xl border border-sky-200 bg-white p-6 shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/70 md:min-h-[26rem] md:p-8 dark:border-slate-700 dark:bg-slate-100 dark:shadow-black/40 dark:ring-slate-700/50">
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
                        Conducted research on LLM-based automation covering
                        API-driven system design, agent orchestration frameworks,
                        retrieval-augmented generation (RAG), and a consolidated
                        threat model spanning prompt injection, data leakage, and
                        unintended action execution.
                      </li>
                      <li>
                        First-authored a 29-page, 36-source review introducing a
                        two-axis framework for LLM agent autonomy and oversight,
                        plus a cost model pricing oversight against productivity
                        gains; revise-and-resubmit with publication recommended.
                      </li>
                      <li>
                        Served as a peer reviewer for JAIKE, evaluating submissions
                        on retrieval methods in large language models, reasoning
                        performance in extended tasks, and large-scale model
                        architectures for methodological rigor and evaluation
                        quality.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="group rounded-2xl border border-sky-200 bg-white/90 p-6 shadow-sm shadow-sky-900/10 ring-1 ring-sky-300/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/40 dark:ring-slate-700/50">
                <div className="grid items-start gap-8 md:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] md:gap-10">
                  <div className="relative min-h-[18rem] w-full overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm shadow-sky-900/10 md:min-h-[26rem] dark:border-slate-700 dark:bg-slate-100 dark:shadow-black/40">
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

              <div className="group rounded-2xl border border-sky-200 bg-white/90 p-6 shadow-sm shadow-sky-900/10 ring-1 ring-sky-300/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-8 dark:border-slate-700 dark:bg-slate-800/70 dark:shadow-black/40 dark:ring-slate-700/50">
                <div className="grid items-start gap-8 md:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] md:gap-10">
                  <div className="relative min-h-[18rem] w-full overflow-hidden rounded-2xl border border-sky-200 bg-white p-10 shadow-sm shadow-sky-900/10 ring-1 ring-sky-200/70 md:min-h-[26rem] md:p-14 dark:border-slate-700 dark:bg-slate-100 dark:shadow-black/40 dark:ring-slate-700/50">
                    <Image
                      src={aiscLogoSrc}
                      alt="AI Student Collective logo"
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-sky-100">
                      AISC
                    </h3>
                    <p className="mt-1 text-sm leading-snug text-slate-500 md:text-base dark:text-slate-400">
                      AI Student Collective
                    </p>
                    <p className="mt-2 text-sm font-medium uppercase tracking-[0.15em] text-sky-800 md:text-base dark:text-sky-300">
                      September 2024 &ndash; April 2025
                    </p>
                    <h4 className="mt-3 text-lg font-semibold tracking-tight text-slate-900 md:text-xl dark:text-slate-100">
                      General Member
                    </h4>
                    <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-900 marker:text-slate-900 md:text-base dark:text-slate-300 dark:marker:text-slate-500">
                      <li>
                        Built machine learning models for stroke risk prediction
                        and real-time drowsy driver detection within structured
                        project cycles.
                      </li>
                      <li>
                        Performed data preprocessing, feature engineering, model
                        development, evaluation, and project presentations.
                      </li>
                      <li>
                        Worked within quarter-long sprint cycles with defined
                        milestones, code reviews, and final project demos,
                        following structured machine learning development
                        workflows from ideation to deployment.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>

        <ResumeSection />

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
              playing golf. I also love keeping up with fashion and
              music.
            </p>
            <HobbyGallery />
          </div>
        </FadeInSection>

        <FadeInSection
          as="section"
          id="ask-atlas"
          className="border-t border-sky-200/80 bg-white dark:border-slate-800 dark:bg-slate-950"
          aria-labelledby="ask-atlas-heading"
        >
          <div className="mx-auto max-w-2xl px-6 py-20 text-center md:px-8 md:py-28">
            <div className="mx-auto flex w-max max-w-full items-center justify-center gap-2.5">
              <AtlasDog size={44} />
              <h2
                id="ask-atlas-heading"
                className="cursor-default text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl dark:text-sky-100"
              >
                Ask Atlas
              </h2>
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              Atlas is my AI assistant. Ask it anything you&apos;d want
              to know about my background, projects, or experience before
              reaching out.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/ask"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-sky-600 px-7 py-3 text-base font-medium text-white shadow-sm shadow-sky-600/25 transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-sky-700 hover:shadow-md hover:shadow-sky-600/30 dark:bg-sky-500 dark:shadow-sky-950/40 dark:hover:bg-sky-400"
              >
                <MessageCircle
                  className="h-[1em] w-[1em] shrink-0 text-current"
                  strokeWidth={2}
                  aria-hidden
                />
                Ask Atlas
              </Link>
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
            <ContactCard />
          </div>
        </FadeInSection>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
