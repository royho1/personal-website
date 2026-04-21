import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-sky-200/80 bg-sky-100/70 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-600 md:flex-row md:px-8 dark:text-slate-400">
        <p>
          © 2026{" "}
          <span className="font-medium text-sky-950 dark:text-sky-200">Roy Ho</span>.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/royho1/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-800 dark:text-slate-400 dark:hover:text-sky-300"
          >
            <FaLinkedin className="h-5 w-5" aria-hidden />
          </a>
          <a
            href="https://github.com/royho1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-800 dark:text-slate-400 dark:hover:text-sky-300"
          >
            <FaGithub className="h-5 w-5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
