import type { Metadata } from "next";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ResumeSection from "../components/ResumeSection";

const resumeTitle = "Resume | Roy Ho";
const resumeDescription =
  "View or download Roy Ho's resume as a PDF - experience, education, and skills.";

export const metadata: Metadata = {
  title: resumeTitle,
  description: resumeDescription,
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: resumeTitle,
    description: resumeDescription,
    url: "/resume",
    siteName: "Roy Ho",
    type: "website",
    images: [
      {
        url: "/roy-ho-headshot.jpg",
        width: 728,
        height: 1024,
        alt: "Roy Ho",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: resumeTitle,
    description: resumeDescription,
    images: ["/roy-ho-headshot.jpg"],
  },
};

export default function ResumePage() {
  return (
    <>
      <NavBar />

      <main>
        <ResumeSection titleElement="h1" />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
