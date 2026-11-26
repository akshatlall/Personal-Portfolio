import AboutSection from "./components/AboutSection";
import CosmicFooter from "./components/CosmicFooter";
import CosmicNavbar from "./components/CosmicNavbar";
import ExperienceSection from "./components/ExperienceSection";
import HeroSection from "./components/HeroSection";
import HighlightsMarquee from "./components/HighlightsMarquee";
import ParallaxBanner from "./components/ParallaxBanner";
import ProjectsSection from "./components/ProjectsSection";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#04020e] text-[#eae5df]">
      <CosmicNavbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ParallaxBanner />
      <ProjectsSection />
      <HighlightsMarquee />
      <CosmicFooter />
    </main>
  );
}
