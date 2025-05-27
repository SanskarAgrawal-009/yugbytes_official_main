
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const portfolioItems = [
  {
    title: "NeuroScan AI",
    client: "Medical AI Initiative",
    category: "ML Medical Project",
    tags: ["medical", "ml", "research"],
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    description: "AI-powered MRI image analysis system with appointment scheduling, diagnosis, medical history, and comprehensive dashboard features.",
    externalLink: "https://neuro-scan-ai.vercel.app/"
  },
  {
    title: "Design Portfolio",
    client: "Sophia Chen, UI/UX Designer",
    category: "Portfolio Website",
    tags: ["portfolio", "creative"],
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    description: "A minimalist portfolio website for a UI/UX designer featuring an interactive project showcase and case studies.",
  },
  {
    title: "Quantum Computing Research",
    client: "Dr. Rahul Kapoor, PhD Researcher",
    category: "Academic Website",
    tags: ["academic", "research"],
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
    description: "A comprehensive website for a quantum computing research project with interactive visualizations and downloadable resources.",
  },
  {
    title: "Marketing Professional",
    client: "Aisha Patel, Marketing Specialist",
    category: "Resume Website",
    tags: ["resume", "professional"],
    image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
    description: "An interactive online resume with a timeline of work experience and skill visualization for a marketing professional.",
  },
  {
    title: "Photography Portfolio",
    client: "Vikram Singh, Photographer",
    category: "Portfolio Website",
    tags: ["portfolio", "creative"],
    image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace",
    description: "A visually stunning portfolio website for a photographer with full-screen galleries and client testimonials.",
  },
  {
    title: "Machine Learning Thesis",
    client: "Meera Shah, MTech Student",
    category: "Academic Website",
    tags: ["academic", "research"],
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
    description: "A website showcasing an MTech student's thesis on machine learning applications in healthcare, including interactive demos.",
  },
  {
    title: "Architecture Engineer",
    client: "Arjun Nair, Architectural Engineer",
    category: "Portfolio Website",
    tags: ["portfolio", "professional"],
    image: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2",
    description: "A sophisticated portfolio for an architectural engineer featuring 3D models and project case studies.",
  },
  {
    title: "Fitness Instructor",
    client: "Priya Sharma, Yoga Instructor",
    category: "Service Website",
    tags: ["service", "professional"],
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
    description: "A landing page for a yoga instructor with class schedules, testimonials, and booking functionality.",
  },
  {
    title: "Environmental Science Research",
    client: "Dr. Ajay Kumar, Environmental Scientist",
    category: "Academic Website",
    tags: ["academic", "research"],
    image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e",
    description: "A research website documenting environmental studies with interactive maps and data visualizations.",
  },
  {
    title: "Graphic Design Portfolio",
    client: "Neha Singh, Graphic Designer",
    category: "Portfolio Website",
    tags: ["portfolio", "creative"],
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511",
    description: "A colorful, interactive portfolio for a graphic designer with animated transitions between projects.",
  },
];

const PortfolioGrid = () => {
  const [filter, setFilter] = useState("all");
  const [visibleItems, setVisibleItems] = useState(6);
  
  const filteredItems = filter === "all" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.tags.includes(filter));
  
  const displayedItems = filteredItems.slice(0, visibleItems);
  
  const loadMore = () => {
    setVisibleItems(prev => Math.min(prev + 3, filteredItems.length));
  };
  
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["all", "portfolio", "academic", "resume", "creative", "professional", "research", "service", "medical", "ml"].map((tag) => (
            <Button 
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              className="rounded-full text-sm"
              onClick={() => {
                setFilter(tag);
                setVisibleItems(6);
              }}
            >
              {tag === "all" ? "All Projects" : tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedItems.map((item, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg fade-in opacity-0"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <div className="text-sm font-medium mb-1">{item.category}</div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-accent mb-1">{item.category}</div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <div className="text-sm text-muted-foreground mb-3">{item.client}</div>
                  </div>
                  {item.externalLink ? (
                    <a 
                      href={item.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 rounded-full p-2 text-primary hover:bg-primary/20 transition-colors"
                      aria-label={`Visit ${item.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link 
                      to="#" 
                      className="bg-primary/10 rounded-full p-2 text-primary hover:bg-primary/20 transition-colors"
                      aria-label={`View ${item.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {visibleItems < filteredItems.length && (
          <div className="text-center mt-12">
            <Button variant="outline" onClick={loadMore}>
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioGrid;
