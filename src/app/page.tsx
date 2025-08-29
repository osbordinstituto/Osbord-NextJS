import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AppDownloadSection from '@/components/AppDownloadSection';
import FeaturesSection from '@/components/FeaturesSection';
import CoursesSection from '@/components/CoursesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import StatsSection from '@/components/StatsSection';
import Footer from '@/components/Footer';
import HashNavigationHandler from '@/components/HashNavigationHandler';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HashNavigationHandler />
      <Header />
      <HeroSection />
      <AppDownloadSection />
      <FeaturesSection />
      <CoursesSection />
      <TestimonialsSection />
      <StatsSection />
      <Footer />
    </div>
  );
}
