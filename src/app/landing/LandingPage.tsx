import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import AppDownloadSection from "./components/AppDownloadSection";
import BrandSignature from "./components/BrandSignature";
import CoursesSection from "./components/CoursesSection";
import { getCourses } from "@/src/features/courses/api/getCourses";
import ReviewsSection from "./components/ReviewsSection";
import FAQSection from "./components/FAQSection";

export default async function LandingPage() {
  const courses = await getCourses();
  return (
    <>
      <Header />

      <main>
        <HeroSection />
        <CoursesSection courses={courses} />
        <ReviewsSection />
        <AppDownloadSection />
        <FAQSection />
      </main>

      <Footer />
      <BrandSignature />
    </>
  );
}
