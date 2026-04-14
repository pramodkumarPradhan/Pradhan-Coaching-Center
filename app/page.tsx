import { Nunito } from "next/font/google";

import Navbar from "./components/Navbar";
import ExamCountdown from "./components/ExamCountdown";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import NoticeBoard from "./components/NoticeBoard";
import CoursesSection from "./components/CoursesSection";
import FeeStructure from "./components/FeeStructure";
import FeaturesSection from "./components/FeaturesSection";
import FacultySection from "./components/FacultySection";
import ToppersWall from "./components/ToppersWall";
import YouTubeSection from "./components/YouTubeSection";
import TestimonialsSection from "./components/TestimonialsSection";
import GallerySection from "./components/GallerySection";
import AdmissionForm from "./components/AdmissionForm";
import MapSection from "./components/MapSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";

// ✅ Google Font (Proper Way)
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

// ✅ Page-level SEO (IMPORTANT)
export const metadata = {
  title:
    "Pradhan Coaching Center - Best Coaching in Tekhand, Okhla Phase 1, New Delhi",
  description:
    "Pradhan Coaching Center in Tekhand, Okhla Phase 1, New Delhi provides quality education for classes 8th to 12th with experienced teachers, regular tests, and study materials.",
};

export default function Home() {
  return (
    <div
      className={`${nunito.className} bg-slate-50 text-slate-800 scroll-smooth`}
    >
      {/* Floating Buttons */}
      <FloatingButtons />

      {/* Navbar */}
      <Navbar />

      {/* Optional Countdown */}
      {/* 
      <div className="pt-[72px]">
        <ExamCountdown />
      </div> 
      */}

      <main>
        {/* SEO hidden heading (helps Google) */}
        <section className="hidden">
          <h1>
            Pradhan Coaching Center in Tekhand, Okhla Phase 1, New Delhi
          </h1>
        </section>

        {/* Sections */}
        <section id="home">
          <HeroSection />
        </section>

        <section id="stats">
          <StatsSection />
        </section>

        {/* <section id="notices"><NoticeBoard /></section> */}

        <section id="courses">
          <CoursesSection />
        </section>

        {/* <section id="fees"><FeeStructure /></section> */}

        <section id="features">
          <FeaturesSection />
        </section>

        {/* <section id="faculty"><FacultySection /></section> */}
        {/* <section id="toppers"><ToppersWall /></section> */}

        <section id="youtube">
          <YouTubeSection />
        </section>

        {/* <section id="testimonials"><TestimonialsSection /></section> */}

        <section id="gallery">
          <GallerySection />
        </section>

        <section id="admission">
          <AdmissionForm />
        </section>

        <section id="map">
          <MapSection />
        </section>

        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}