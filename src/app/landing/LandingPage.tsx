import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
// import AboutSection from "./components/AboutSection";
// import CoursesSection from "./components/CoursesSection";
import Footer from "./components/Footer";
import AppDownloadSection from "./components/AppDownloadSection";

export default function LandingPage() {
  return (
    <>
      <Header />

      <main>
        <HeroSection />
        {/* <AboutSection />
        <CoursesSection /> */}
        <AppDownloadSection />
      </main>

      <Footer />
    </>
  );
}