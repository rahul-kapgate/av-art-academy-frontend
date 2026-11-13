import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
// import AboutSection from "./components/AboutSection";
// import CoursesSection from "./components/CoursesSection";
import Footer from "./components/Footer";
import AppDownloadSection from "./components/AppDownloadSection";
import BrandSignature from "./components/BrandSignature";
import CoursesSection from "./components/CoursesSection";

export default function LandingPage() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />
         <CoursesSection />
        {/* <AboutSection />
        <CoursesSection /> */}
        <AppDownloadSection />
      </main>

      <Footer />
      <BrandSignature />
    </>
  );
}
