import type { Metadata } from "next";
import { Caveat, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const siteUrl = "https://www.royho-career.com";
const ogDescription =
  "UC Davis graduate in Statistical Data Science with a minor in Computer Science.";
const ogImage = {
  url: `${siteUrl}/picture.jpeg`,
  width: 799,
  height: 1123,
  alt: "Roy Ho",
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Roy Ho | Data and Analytics",
  description:
    "UC Davis graduate in Statistical Data Science building data pipelines, dashboards, and full-stack analytics tools with Python, SQL, and machine learning.",
  openGraph: {
    title: "Roy Ho",
    description: ogDescription,
    url: siteUrl,
    siteName: "Roy Ho",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roy Ho",
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
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-slate-800 antialiased dark:text-slate-200">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
