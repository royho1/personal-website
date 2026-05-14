import type { Metadata } from "next";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ResumeSection from "../components/ResumeSection";

export const metadata: Metadata = {
  title: "Resume | Roy Ho",
  description:
    "View or download Roy Ho's resume as a PDF — experience, education, and skills.",
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
