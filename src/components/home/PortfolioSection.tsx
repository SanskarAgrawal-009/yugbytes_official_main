
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const portfolioItems = [
  {
    title: "NeuroScan AI",
    category: "ML Medical Project",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    description: "AI-powered MRI image analysis system with appointment scheduling, diagnosis, medical history, and dashboard features.",
    link: "https://neuro-scan-ai.vercel.app/"
  },
  {
    title: "Designer Portfolio",
    category: "Personal Website",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    description: "Minimalist portfolio for a graphic designer featuring an interactive gallery and case studies.",
  },
  {
    title: "Research Project",
    category: "Academic Website",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    description: "Comprehensive website for a university research project with interactive data visualizations.",
  },
  {
    title: "Marketing Specialist",
    category: "Resume Website",
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    description: "Interactive online resume with portfolio section and downloadable CV option.",
  },
];

const PortfolioSection = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <h2 className="section-heading">Our Recent Work</h2>
        <p className="section-subheading">
          Browse through some of our recent projects to see the quality and style of our work.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {portfolioItems.map((item, index) => (
            <div 
              key={index} 
              className="group rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg fade-in opacity-0"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <div className="text-sm font-medium text-accent mb-1">{item.category}</div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-accent mb-1">{item.category}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {item.link && (
                  <div className="mt-4">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1"
                    >
                      Visit Project <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/portfolio">
              View Full Portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
