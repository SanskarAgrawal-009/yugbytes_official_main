
import Layout from "@/components/layout/Layout";
import AboutHero from "@/components/about/AboutHero";
import StorySection from "@/components/about/StorySection";
import MissionSection from "@/components/about/MissionSection";
import ProcessSection from "@/components/about/ProcessSection";
import TeamSection from "@/components/about/TeamSection";
import CtaSection from "@/components/home/CtaSection";

const About = () => {
  return (
    <Layout>
      <AboutHero />
      <StorySection />
      <MissionSection />
      <ProcessSection />
      <TeamSection />
      <CtaSection />
    </Layout>
  );
};

export default About;
