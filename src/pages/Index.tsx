
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
