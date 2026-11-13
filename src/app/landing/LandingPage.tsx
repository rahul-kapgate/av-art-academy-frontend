import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
// import AboutSection from "./components/AboutSection";
// import CoursesSection from "./components/CoursesSection";
import Footer from "./components/Footer";
import AppDownloadSection from "./components/AppDownloadSection";
import BrandSignature from "./components/BrandSignature";
import CoursesSection from "./components/CoursesSection";
import { getCourses } from "@/src/features/courses/api/getCourses";

export default async function LandingPage() {
  const courses = await getCourses();
  return (
    <>
      <Header />

      <main>
        <HeroSection />
        <CoursesSection courses={courses} />
        {/* <AboutSection />
        <CoursesSection /> */}
        <AppDownloadSection />
      </main>

      <Footer />
      <BrandSignature />
    </>
  );
}
