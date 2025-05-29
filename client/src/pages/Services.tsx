
import Layout from "@/components/layout/Layout";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import Faq from "@/components/services/Faq";
import CtaSection from "@/components/home/CtaSection";

const Services = () => {
  return (
    <Layout>
      <ServicesHero />
      <ServicesList />
      <Faq />
      <CtaSection />
    </Layout>
  );
};

export default Services;
