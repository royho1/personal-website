import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const profileImageSrc = "/picture.jpeg";
/** Intrinsic size of `public/picture.jpeg` — update if you replace the file. */
const profileImageWidth = 799;
const profileImageHeight = 1123;

/** PDF lives in `public/` (served from site root). */
const resumePdfPath = "/Roy_Ho_Resume.pdf";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "#resume" },
  { label: "Hobbies", href: "#hobbies" },
] as const;

/** Add hobby images under `public/hobbies/` and list them here (width/height = pixel size of each file). */
const hobbyPhotos: { src: string; alt: string; width: number; height: number }[] =
  [
    // Example after adding files:
    // { src: "/hobbies/hiking.jpg", alt: "Hiking", width: 1600, height: 1200 },
  ];

const hobbyPhotoSlots = 6;

const skills = [
  "Python",
  "SQL",
  "Excel",
  "R",
  "Pandas",
  "Scikit-learn",
  "Data Visualization",
  "Machine Learning",
] as const;

const featuredProjects = [
  {
    title: "Drowsy Driver Detection",
    description:
      "Built a real-time drowsiness detection system using computer vision techniques and a CNN model trained on eye-state data.",
    tech: "Python, OpenCV, CNN",
    githubHref: "https://github.com/royho1/drowsy-driver-detection",
  },
  {
    title: "Job Analytics Dashboard",
    description:
      "Built a dashboard to analyze job market trends, including salaries, skills, and geographic differences across roles.",
    tech: "Python, Data Visualization",
    githubHref: "https://github.com/royho1/job-market-analysis-dashboard",
  },
  {
    title: "Heart Stroke Risk Prediction",
    description:
      "Machine learning model to predict stroke risk from healthcare data, with preprocessing, training, and an interactive Streamlit app.",
    tech: "Python, scikit-learn, Streamlit",
    githubHref: "https://github.com/royho1/heart-stroke-risk-prediction",
  },
] as const;

const additionalProjects = [
  {
    name: "Retail Sales Forecast",
    description: "Time-series forecasting with seasonality and error analysis.",
  },
  {
    name: "Customer Segmentation",
    description: "Clustering and profiling from transactional behavior data.",
  },
  {
    name: "A/B Test Analysis",
    description: "Hypothesis testing and lift estimates for product experiments.",
  },
  {
    name: "ETL Pipeline Script",
    description: "Automated cleaning and loading from APIs into analysis-ready tables.",
  },
] as const;

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-sky-200/80 bg-sky-50/90 backdrop-blur-md">
        <nav
          className="mx-auto flex max-w-5xl items-center justify-between gap-8 px-6 py-5 md:px-8"
          aria-label="Primary"
        >
          <a
            href="#"
            className="text-base font-semibold tracking-tight text-sky-950"
          >
            Roy Ho
          </a>
          <ul className="flex flex-wrap items-center justify-end gap-6 text-sm text-slate-600 md:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block origin-center font-medium text-slate-600 transition-all duration-200 ease-out hover:scale-105 hover:font-bold hover:text-sky-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section
          className="mx-auto max-w-5xl px-6 py-16 md:px-8 md:py-24 lg:py-32"
          aria-labelledby="hero-heading"
        >
          <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16 lg:gap-20">
            <div className="flex justify-center md:justify-start">
              <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-sky-200/80 shadow-lg shadow-sky-900/10 ring-1 ring-sky-300/40">
                <Image
                  src={profileImageSrc}
                  alt="Roy Ho"
                  width={profileImageWidth}
                  height={profileImageHeight}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 384px"
                  priority
                />
              </div>
            </div>

            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h1
                  id="hero-heading"
                  className="text-4xl font-bold tracking-tight text-sky-950 md:text-5xl lg:text-6xl"
                >
                  Roy Ho
                </h1>
                <p className="text-lg text-sky-800/90 md:text-xl">
                  UC Davis Graduate
                </p>
              </div>
              <p className="max-w-lg text-base leading-relaxed text-slate-600 md:text-lg">
                I build data-driven solutions using Python, SQL, and machine
                learning.
              </p>
              <div className="max-w-lg space-y-2 text-sm text-slate-500">
                <p>
                  <span className="text-slate-400">Email: </span>
                  <a
                    href="mailto:royho346@gmail.com"
                    className="text-slate-500 transition-colors hover:text-sky-800"
                  >
                    royho346@gmail.com
                  </a>
                </p>
                <p>
                  <span className="text-slate-400">Phone: </span>
                  <a
                    href="tel:+14157418955"
                    className="text-slate-500 transition-colors hover:text-sky-800"
                  >
                    415-741-8955
                  </a>
                </p>
                <p>
                  <span className="text-slate-400">Location: </span>
                  Davis, CA | San Francisco, CA
                </p>
              </div>
              <div className="flex gap-9">
                <a
                  href="https://www.linkedin.com/in/royho1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-800"
                >
                  <FaLinkedin className="h-7 w-7" aria-hidden />
                </a>
                <a
                  href="https://github.com/royho1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="text-slate-500 transition-all duration-200 hover:scale-110 hover:text-sky-800"
                >
                  <FaGithub className="h-7 w-7" aria-hidden />
                </a>
              </div>
              <div className="flex flex-wrap gap-4 pt-1">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-sky-600/25 transition-colors hover:bg-sky-700"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg border border-sky-300 bg-white/90 px-6 py-3 text-sm font-medium text-sky-950 transition-colors hover:bg-sky-50"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="border-t border-sky-200/80 bg-sky-100/45"
          aria-labelledby="about-heading"
        >
          <div className="mx-auto max-w-3xl px-6 py-20 text-center md:px-8 md:py-28">
            <h2
              id="about-heading"
              className="inline-block w-max max-w-full cursor-default text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl"
            >
              About
            </h2>
            <div className="mt-10 space-y-6 text-left text-base leading-relaxed text-slate-600 md:text-lg">
              <p>
                Hi, my name is Roy Ho, and I am a recent UC Davis graduate with
                a Bachelor&apos;s degree in Statistical Data Science and a minor
                in Computer Science.
              </p>
              <p>
                I&apos;m interested in building data-driven solutions using
                Python, R, SQL, and Excel, with a focus on machine learning.
                I&apos;m currently pursuing roles in data analytics and data
                engineering.
              </p>
            </div>
            <ul
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
              aria-label="Skills"
            >
              {skills.map((skill) => (
                <li key={skill}>
                  <span className="inline-block rounded-full border border-sky-200 bg-white px-4 py-1.5 text-sm text-sky-900 shadow-sm shadow-sky-200/30">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="projects"
          className="border-t border-sky-200/80 bg-white/55"
          aria-labelledby="projects-heading"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="projects-heading"
              className="inline-block w-max max-w-full cursor-default text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl"
            >
              Projects
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <article
                  key={project.title}
                  className="flex flex-col rounded-xl border border-sky-200 bg-white p-6 shadow-sm shadow-sky-900/10 ring-1 ring-sky-300/25"
                >
                  <h3 className="text-lg font-semibold text-sky-950">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {project.description}
                  </p>
                  <p className="mt-4 text-xs text-slate-500">{project.tech}</p>
                  <a
                    href={project.githubHref}
                    className="mt-5 inline-flex text-sm font-medium text-sky-700 underline decoration-sky-300 underline-offset-4 transition-colors hover:text-sky-900 hover:decoration-sky-600"
                  >
                    GitHub
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Additional projects
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {additionalProjects.map((project) => (
                  <article
                    key={project.name}
                    className="rounded-lg border border-sky-200 bg-sky-50/90 p-4 ring-1 ring-sky-300/25"
                  >
                    <h4 className="text-sm font-semibold text-sky-950">
                      {project.name}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600">
                      {project.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="border-t border-sky-200/80 bg-sky-100/45"
          aria-labelledby="experience-heading"
        >
          <div className="mx-auto max-w-3xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="experience-heading"
              className="inline-block w-max max-w-full cursor-default text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl"
            >
              Experience
            </h2>
            <div className="mt-10 space-y-6 text-base leading-relaxed text-slate-600 md:text-lg">
              <p>
                I&apos;m early in my career and focused on data analytics and data
                engineering. I&apos;m eager to apply what I&apos;ve learned through
                coursework and projects in a full-time role.
              </p>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-sky-200/80 bg-sky-100/45"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-2xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="contact-heading"
              className="mx-auto inline-block w-max max-w-full cursor-default text-center text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl"
            >
              Let&apos;s Connect!
            </h2>
            <div className="mt-12 rounded-2xl border border-sky-200 bg-white p-8 shadow-sm shadow-sky-900/10 ring-1 ring-sky-300/25 md:p-10">
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
        </section>

        <section
          id="resume"
          className="border-t border-sky-200/80 bg-white/40"
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
        </section>

        <section
          id="hobbies"
          className="border-t border-sky-200/80 bg-sky-50/25"
          aria-labelledby="hobbies-heading"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="hobbies-heading"
              className="inline-block w-max max-w-full cursor-default text-2xl font-semibold tracking-tight text-sky-950 transition-[font-weight] duration-300 ease-out hover:font-bold md:text-3xl"
            >
              Hobbies
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              Outside of work, I enjoy thrifting, bass fishing, spending time outdoors, and
              poker. I also love keeping up with fashion and
              music.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: hobbyPhotoSlots }).map((_, index) => {
                const photo = hobbyPhotos[index];
                return (
                  <figure
                    key={photo ? `${photo.src}-${index}` : `hobby-slot-${index}`}
                    className="overflow-hidden rounded-xl bg-sky-100/60 shadow-sm ring-1 ring-sky-300/25"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      {photo ? (
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div
                          className="flex h-full min-h-[10rem] w-full items-center justify-center bg-gradient-to-br from-sky-100/80 to-sky-200/40 ring-1 ring-inset ring-sky-300/30"
                          aria-label="Photo placeholder"
                          role="img"
                        />
                      )}
                    </div>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
