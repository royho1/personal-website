import Link from "next/link";
import { MessageCircle } from "lucide-react";
import AboutSection from "./components/AboutSection";
import AtlasDog from "./components/AtlasDog";
import BackToTop from "./components/BackToTop";
import ContactCard from "./components/ContactCard";
import ExperienceSection from "./components/ExperienceSection";
import FadeInSection from "./components/FadeInSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HobbyGallery from "./components/HobbyGallery";
import NavBar from "./components/NavBar";
import ProjectsSection from "./components/ProjectsSection";
import ResumeSection from "./components/ResumeSection";

export default function Home() {
  return (
    <>
      <NavBar />

      <main>
        <HeroSection />

        <AboutSection />

        <ProjectsSection />

        <ExperienceSection />

        <ResumeSection />

        <FadeInSection
          as="section"
          id="hobbies"
          className="border-t border-sky-200/80 bg-sky-50 dark:border-slate-800 dark:bg-slate-900/80"
          aria-labelledby="hobbies-heading"
        >
          <div className="mx-auto max-w-5xl px-6 py-14 text-center md:px-8 md:py-28">
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
          <div className="mx-auto max-w-2xl px-6 py-14 text-center md:px-8 md:py-28">
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
              reaching out!
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
          <div className="mx-auto max-w-2xl px-6 py-14 md:px-8 md:py-28">
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
