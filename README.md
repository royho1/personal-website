# Personal Website

Portfolio site for a UC Davis Statistical Data Science graduate (CS minor). Showcases projects across data analytics, machine learning, and data engineering. Built with Next.js, a sky-blue light theme, full dark mode, and small polished interactions.

**Live site:** [royho-career.com](https://royho-career.com) (Vercel)

Sections: Hero • About • Projects • Experience • Resume • Hobbies • Ask Atlas • Let's Connect.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router) on [React 19](https://react.dev)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) with a custom `dark` variant and themed CSS variables
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for entrance and scroll motion; CSS keyframes for looping micro-animations
- **Icons:** [Lucide React](https://lucide.dev) and [react-icons](https://react-icons.github.io/react-icons/)
- **Effects:** [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) on the contact card
- **Fonts:** Geist and Caveat via `next/font` (Libre Baskerville scoped to the contact card)

## Features

### Hero

- Two-column layout: profile photo with soft sky-blue halo on the left; identity, status, contact, and actions on the right
- Staggered Framer Motion entrance for name, degree line, status callout, contact/socials, and CTAs
- Status callout describing current job search and research focus
- Contact details (email, San Francisco location) plus LinkedIn and GitHub icons
- Primary CTAs: **View Projects** and **Resume**, plus an **Ask Atlas!** handwriting-style link with the Atlas dog mark
- "Scroll to explore" chevron into the About section

### Navigation

- Sticky nav with active-section highlighting via `IntersectionObserver`
- Projects dropdown with filter shortcuts (hover on desktop, tap + chevron on mobile)
- Light/dark theme toggle with smooth transitions
- Smooth scrolling with scroll padding for the fixed header

### About

- Two-column layout: highlights plus stat cards
- Core skill tags with icons and hover lift
- Scroll-triggered fade-in/slide-up via Framer Motion

### Projects

- Featured and additional project grids with animated header treatments (including the drowsy-eye SVG morph and related CSS keyframe icons)
- Clicking a card opens an in-page **project modal** with write-up, media, links, and (where available) an on-device demo such as drowsy-driver detection
- Filter tags (All, Python, R, Machine Learning, NLP, Data Visualization) synced with the nav dropdown through `projectsFilterBus.ts`
- Status badges on select cards; GitHub profile link in the section heading

### Experience

Timeline-style entries with logos:

- **JAIKE** (AI Researcher)
- **TechSprint Innovators** (Head of Data Engineering)
- **AISC / AI Student Collective** (General Member)

### Resume

- One-click download and embedded PDF preview (`/resume` route also available)

### Ask Atlas

- Dedicated homepage section plus full `/ask` chat page
- Atlas dog avatar and chat UI backed by `/api/atlas` with a grounded knowledge base (`app/lib/atlasKnowledge.ts`)

### Hobbies

- Short intro plus responsive photo grid with hover lift

### Let's Connect

- Letterpress-styled contact card with email, location, GitHub, and LinkedIn
- Optional confetti burst when clicking empty card chrome (links still behave normally)
- Sparkle effects around the card

### Footer + floating UI

- Footer with name, copyright, and social links
- Floating back-to-top button after the hero

## Viewing the site

- **Online:** [royho-career.com](https://royho-career.com)
- **Locally:** steps below

## Getting Started (local)

### Prerequisites

- Node.js `>= 20.9`
- npm (or another package manager)

### Install

```bash
npm install
```

### Scripts

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run start   # run the production build
npm run lint    # ESLint
```

## Project structure

```
app/
├── components/          UI sections (Hero, About, Projects, Atlas, Contact, ...)
├── ask/                 Ask Atlas chat page
├── resume/              Resume page
├── api/atlas/           Atlas API route
├── lib/                 Confetti helper, Atlas knowledge, project media
├── globals.css          Theme variables and keyframes
├── layout.tsx           Root layout + theme provider
└── page.tsx             Homepage section composition

public/
├── Roy_Ho_Resume.pdf
├── picture.jpeg         Hero profile photo
├── hobbies/             Hobby photos
└── experience/          Logos (JAIKE, TechSprint, AISC)
```

## Deployment

Deployed on [Vercel](https://vercel.com) at [royho-career.com](https://royho-career.com). Pushes to `main` trigger `next build` and a production deploy.

## Contact

- **Email:** royho.career@gmail.com
- **GitHub:** [royho1](https://github.com/royho1)
- **LinkedIn:** [linkedin.com/in/royho1](https://www.linkedin.com/in/royho1/)
