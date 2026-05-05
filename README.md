# Roy Ho — Personal Website

A portfolio site for Roy Ho, a UC Davis graduate in Statistical Data Science, showcasing projects across data analytics, machine learning, and data engineering. Built with Next.js and designed with a sky-blue theme, full dark mode, and a focus on small, polished interactions.

**Live site:** [royho-career.com](https://royho-career.com) (deployed on Vercel)

Sections: Hero • About • Projects • Experience • Resume • Let's Connect • Hobbies.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router) on [React 19](https://react.dev)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) with a custom `dark` variant and themed CSS variables
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for entrance, scroll, and SVG path morphing; CSS keyframes for looping micro-animations
- **Icons:** [Lucide React](https://lucide.dev) and [react-icons](https://react-icons.github.io/react-icons/)
- **Effects:** [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for the easter-egg confetti burst
- **Fonts:** Geist via `next/font`

## Features

### Hero
- Staggered entrance animation (name → badge → subtitle → tagline → contact info → social icons → CTAs)
- Typewriter effect on the tagline with a briefly blinking cursor
- Clickable "Available for opportunities" badge that scrolls to the contact section and fires a confetti burst
- Subtle static sky-blue halo around the profile photo
- "Scroll to explore" chevron with a synced bouncing label

### Navigation
- Sticky nav with active-section highlighting via `IntersectionObserver`
- Projects dropdown with filter shortcuts (hover on desktop, tap + chevron on mobile)
- Light/dark theme toggle with smooth cross-fade transitions
- Smooth scrolling with scroll padding to account for the header

### About
- Two-column layout: paragraph highlights + stat cards (`11+ Projects`, `8+ Core Tools`, `25 Page AI Research Paper`)
- Eight core skill tags with Lucide/brand icons and hover lift
- Scroll-triggered fade-in/slide-up via Framer Motion

### Projects
- **Three featured cards** (Drowsy Driver Detection, Job Analytics Dashboard, Heart Stroke Risk Prediction) with custom animated gradient headers:
  - Drowsy eye — multi-phase SVG path-morphing sequence (open → blink → closed → Zs → red alert → reopen) driven by Framer Motion (`DrowsyEyeIcon.tsx`)
  - Bar chart — staggered CSS keyframe bar grow/shrink
  - Heart pulse — CSS keyframe heartbeat
- **"Best Execution" award badge** on the Drowsy Driver card
- **Additional projects** list with matching styling and a GitHub logo link in the heading
- **Filter tags** (All, Python, R, Machine Learning, NLP, Data Visualization) filter both featured and additional projects simultaneously, synced with the nav dropdown via a lightweight `window` event bus (`projectsFilterBus.ts`)
- Entire card is clickable and opens the project's GitHub repo in a new tab

### Experience
- Side-by-side company logos and details (JAIKE, TechSprint Innovators)
- Consistent typography between entries: company, dates, role, bullet points
- Subtle hover lift on company logos

### Resume
- One-click download
- Embedded live PDF preview

### Let's Connect
- Contact card with email, phone, location, GitHub, and LinkedIn links
- Large sparkle/twinkle effects that drift randomly around the outside of the card
- Gently bouncing "Let's Connect!" heading

### Hobbies
- Responsive grid of personal photos with hover-lift treatment

### Footer + Floating UI
- Minimal footer with name, copyright, and social links
- Floating "Back to top" button that appears after the hero

## Viewing the Site

- **Online:** [royho-career.com](https://royho-career.com)
- **Locally:** follow the steps below

## Getting Started (Local Development)

### Prerequisites
- Node.js `>= 20.9`
- npm (bundled with Node) or another package manager of your choice

### Install

```bash
npm install
```

### Scripts

```bash
npm run dev     # start the dev server at http://localhost:3000
npm run build   # production build
npm run start   # run the production build
npm run lint    # run ESLint
```

Open [http://localhost:3000](http://localhost:3000) to view the site locally.

## Project Structure

```
app/
├── components/
│   ├── AboutSection.tsx        About section with stats + skills
│   ├── BackToTop.tsx           Floating back-to-top button
│   ├── DrowsyEyeIcon.tsx       Drowsy Driver animated icon
│   ├── FadeInSection.tsx       Scroll-triggered fade/slide wrapper
│   ├── Footer.tsx              Site footer
│   ├── HeroSection.tsx         Hero entrance + typewriter + confetti
│   ├── NavBar.tsx              Navigation + active highlighting + projects dropdown
│   ├── ProjectsSection.tsx     Filterable project grids
│   ├── Sparkles.tsx            Reusable sparkle/twinkle effect
│   ├── ThemeProvider.tsx       Dark/light theme context
│   ├── ThemeToggle.tsx         Sun/moon toggle button
│   └── projectsFilterBus.ts    Nav <-> Projects filter event bus
├── globals.css                 Tailwind imports, theme vars, keyframes
├── layout.tsx                  Root layout + ThemeProvider
└── page.tsx                    Page composition (sections in order)

public/
├── Roy_Ho_Resume.pdf           Resume (download + preview source)
├── hobbies/                    Hobby photos
└── experience/                 Company logos (JAIKE, TechSprint, UC Davis)
```

## Deployment

Deployed on [Vercel](https://vercel.com) at [royho-career.com](https://royho-career.com). Pushes to `main` trigger an automatic build (`next build`) and production deploy. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for other hosts.

## Contact

- **Email:** royho346@gmail.com
- **GitHub:** [royho1](https://github.com/royho1)
- **LinkedIn:** See the site footer
