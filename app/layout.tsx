import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Caveat, Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl = "https://www.royho-career.com";
const siteTitle = "Roy Ho | Data Science & AI";
const siteDescription =
  "Portfolio of Roy Ho, a San Francisco data science and AI professional. Projects in data engineering, machine learning, and full-stack data apps.";
const ogImage = {
  url: `${siteUrl}/roy-ho-headshot.jpg`,
  width: 728,
  height: 1024,
  alt: "Roy Ho",
} as const;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Roy Ho",
  url: siteUrl,
  image: ogImage.url,
  jobTitle: ["AI Search Strategist", "AI Researcher"],
  description:
    "Roy Ho is a San Francisco based data science and AI professional. He works as an AI Search Strategist at XLR8 AI and as an AI researcher and peer reviewer for the Journal of Artificial Intelligence and Knowledge Engineering (JAIKE), where he is first author of a survey paper on LLM agent autonomy and oversight. A UC Davis graduate in Statistical Data Science with a minor in Computer Science, he builds data pipelines, machine learning models, and full-stack data applications, including an interactive map of 20,000+ San Francisco restaurant health inspections.",
  email: "mailto:royho.career@gmail.com",
  homeLocation: {
    "@type": "Place",
    name: "San Francisco",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
  },
  worksFor: [
    {
      "@type": "Organization",
      name: "XLR8 AI",
      url: "https://www.tryxlr8.ai",
    },
    {
      "@type": "Organization",
      name: "Journal of Artificial Intelligence and Knowledge Engineering",
      alternateName: "JAIKE",
      url: "https://ijaike.org/",
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of California, Davis",
    url: "https://www.ucdavis.edu/",
  },
  sameAs: [
    "https://github.com/royho1",
    "https://www.linkedin.com/in/royho1/",
  ],
  knowsAbout: [
    "Data science",
    "Artificial intelligence",
    "Machine learning",
    "Statistical data science",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Roy Ho",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${caveat.variable} ${interTight.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans text-slate-800 antialiased dark:text-slate-200">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
