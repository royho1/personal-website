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
const ogDescription =
  "UC Davis graduate in Statistical Data Science with a minor in Computer Science.";
const ogImage = {
  url: `${siteUrl}/roy-ho-headshot.jpg`,
  width: 728,
  height: 1024,
  alt: "Roy Ho",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Roy Ho | Data Science & AI",
  description:
    "UC Davis graduate in Statistical Data Science building data pipelines, dashboards, and full-stack analytics tools with Python, SQL, and machine learning.",
  openGraph: {
    title: "Roy Ho | Data Science & AI",
    description: ogDescription,
    url: siteUrl,
    siteName: "Roy Ho",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roy Ho | Data Science & AI",
    description: ogDescription,
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
      <body className="min-h-full flex flex-col font-sans text-slate-800 antialiased dark:text-slate-200">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
