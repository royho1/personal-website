import Image from "next/image";

const profileImageSrc = "/picture.jpeg";
/** Intrinsic size of `public/picture.jpeg` — update if you replace the file. */
const profileImageWidth = 799;
const profileImageHeight = 1123;

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Hobbies", href: "#hobbies" },
  { label: "Contact", href: "#contact" },
] as const;

/** Add hobby images under `public/hobbies/` and list them here (width/height = pixel size of each file). */
const hobbyPhotos: { src: string; alt: string; width: number; height: number }[] =
  [
    // Example after adding files:
    // { src: "/hobbies/hiking.jpg", alt: "Hiking", width: 1600, height: 1200 },
  ];

const skills = [
  "Python",
  "SQL",
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
    githubHref: "#",
  },
  {
    title: "Stock Screening Model",
    description:
      "Developed a stock screening system combining technical indicators and NLP-based sentiment analysis using financial text data.",
    tech: "Python, Pandas, NLP",
    githubHref: "#",
  },
  {
    title: "Job Analytics Dashboard",
    description:
      "Built a dashboard to analyze job market trends, including salaries, skills, and geographic differences across roles.",
    tech: "Python, Data Visualization",
    githubHref: "#",
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
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/95 backdrop-blur-sm">
        <nav
          className="mx-auto flex max-w-5xl items-center justify-between gap-8 px-6 py-5 md:px-8"
          aria-label="Primary"
        >
          <a
            href="#"
            className="text-base font-semibold tracking-tight text-neutral-900"
          >
            Roy Ho
          </a>
          <ul className="flex flex-wrap items-center justify-end gap-6 text-sm text-neutral-600 md:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="transition-colors hover:text-neutral-900"
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
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <h1
                  id="hero-heading"
                  className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl lg:text-6xl"
                >
                  Roy Ho
                </h1>
                <p className="text-lg text-neutral-600 md:text-xl">
                  UC Davis Graduate
                </p>
                <p className="text-base text-neutral-500 md:text-lg">
                  Davis, CA | San Francisco, CA
                </p>
              </div>
              <p className="max-w-lg text-base leading-relaxed text-neutral-600 md:text-lg">
                I build data-driven solutions using Python, SQL, and machine
                learning.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                >
                  Contact Me
                </a>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-neutral-200 shadow-lg shadow-neutral-900/5 ring-1 ring-neutral-900/5">
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
          </div>
        </section>

        <section
          id="about"
          className="border-t border-neutral-200/80 bg-neutral-50/50"
          aria-labelledby="about-heading"
        >
          <div className="mx-auto max-w-3xl px-6 py-20 text-center md:px-8 md:py-28">
            <h2
              id="about-heading"
              className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl"
            >
              About
            </h2>
            <div className="mt-10 space-y-6 text-left text-base leading-relaxed text-neutral-600 md:text-lg">
              <p>
                Hi, my name is Roy Ho! I&apos;m a recent UC Davis graduate with
                a background in Statistics (Data Science) and a minor in
                Computer Science.
              </p>
              <p>
                I&apos;m interested in building data-driven solutions using
                Python, SQL, and machine learning, and I&apos;m currently
                focused on pursuing roles in data analytics and data
                engineering.
              </p>
            </div>
            <ul
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
              aria-label="Skills"
            >
              {skills.map((skill) => (
                <li key={skill}>
                  <span className="inline-block rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-sm text-neutral-700 shadow-sm">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="projects"
          className="border-t border-neutral-200/80"
          aria-labelledby="projects-heading"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="projects-heading"
              className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl"
            >
              Projects
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {featuredProjects.map((project) => (
                <article
                  key={project.title}
                  className="flex flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-sm shadow-neutral-900/5 ring-1 ring-neutral-900/5"
                >
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {project.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
                    {project.description}
                  </p>
                  <p className="mt-4 text-xs text-neutral-500">{project.tech}</p>
                  <a
                    href={project.githubHref}
                    className="mt-5 inline-flex text-sm font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                  >
                    GitHub
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-sm font-medium uppercase tracking-wide text-neutral-500">
                Additional projects
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {additionalProjects.map((project) => (
                  <article
                    key={project.name}
                    className="rounded-lg border border-neutral-200 bg-neutral-50/80 p-4 ring-1 ring-neutral-900/5"
                  >
                    <h4 className="text-sm font-semibold text-neutral-900">
                      {project.name}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-600">
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
          className="border-t border-neutral-200/80 bg-neutral-50/50"
          aria-labelledby="experience-heading"
        >
          <div className="mx-auto max-w-3xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="experience-heading"
              className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl"
            >
              Experience
            </h2>
            <div className="mt-10 space-y-6 text-base leading-relaxed text-neutral-600 md:text-lg">
              <p>
                I&apos;m early in my career and focused on data analytics and data
                engineering. I&apos;m eager to apply what I&apos;ve learned through
                coursework and projects in a full-time role.
              </p>
            </div>
          </div>
        </section>

        <section
          id="hobbies"
          className="border-t border-neutral-200/80"
          aria-labelledby="hobbies-heading"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="hobbies-heading"
              className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl"
            >
              Hobbies
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600 md:text-lg">
              Outside of work I enjoy exploring the Bay Area, staying active, and
              spending time with friends and family.
            </p>
            {hobbyPhotos.length > 0 ? (
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {hobbyPhotos.map((photo, index) => (
                  <figure
                    key={`${photo.src}-${index}`}
                    className="overflow-hidden rounded-xl bg-neutral-100 shadow-sm ring-1 ring-neutral-900/5"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-neutral-200/80 bg-neutral-50/50"
          aria-labelledby="contact-heading"
        >
          <div className="mx-auto max-w-2xl px-6 py-20 md:px-8 md:py-28">
            <h2
              id="contact-heading"
              className="text-center text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl"
            >
              Contact
            </h2>
            <div className="mt-12 rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm shadow-neutral-900/5 ring-1 ring-neutral-900/5 md:p-10">
              <p className="text-center text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
                Roy Ho
              </p>
              <p className="mt-3 text-center text-base text-neutral-600 md:text-lg">
                San Francisco, CA
              </p>
              <p className="mt-6 text-center">
                <a
                  href="tel:+14157418955"
                  className="text-lg font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-900"
                >
                  415-741-8955
                </a>
              </p>
              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <a
                  href="https://www.linkedin.com/in/royho1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/royho1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
