
import Layout from "@/components/layout/Layout";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import TestimonialGrid from "@/components/portfolio/TestimonialGrid";
import BeforeAfter from "@/components/portfolio/BeforeAfter";
import CtaSection from "@/components/home/CtaSection";

const Portfolio = () => {
  return (
    <Layout>
      <PortfolioHero />
      <PortfolioGrid />
      <TestimonialGrid />
      <BeforeAfter />
      <CtaSection />
    </Layout>
  );
};

export default Portfolio;
