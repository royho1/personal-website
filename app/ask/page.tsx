import type { Metadata } from "next";
import AtlasChat from "../components/AtlasChat";
import AtlasDog from "../components/AtlasDog";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export const metadata: Metadata = {
  title: "Ask Atlas | Roy Ho",
  description:
    "Ask an AI assistant about Roy Ho's background, projects, and experience.",
};

export default function AskPage() {
  return (
    <>
      <NavBar />

      <main>
        <section
          className="border-t border-sky-200/80 bg-white dark:border-slate-800 dark:bg-slate-950"
          aria-labelledby="ask-heading"
        >
          <div className="mx-auto max-w-3xl px-6 py-14 text-center md:px-8 md:py-28">
            <div className="mx-auto flex w-max max-w-full items-center justify-center gap-2.5">
              <AtlasDog size={52} />
              <h1
                id="ask-heading"
                className="cursor-default text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl dark:text-sky-100"
              >
                Ask Atlas
              </h1>
            </div>
            <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
              My AI assistant. Ask about my background, projects, or
              experience.
            </p>
            <AtlasChat />
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
