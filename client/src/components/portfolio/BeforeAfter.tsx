
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const beforeAfterProjects = [
  {
    title: "Portfolio Transformation",
    description: "A designer's portfolio website transformation from a basic template to a custom, branded experience.",
    before: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    after: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
  },
  {
    title: "Academic Project Upgrade",
    description: "Elevating a basic academic project page to an interactive, professional research showcase.",
    before: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    after: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
  },
];

const BeforeAfter = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="section-heading">Before & After</h2>
        <p className="section-subheading">
          See the transformations we've created for our clients, taking their web presence to the next level.
        </p>
        
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="flex mb-6">
            {beforeAfterProjects.map((project, index) => (
              <Button
                key={index}
                variant={activeTab === index ? "default" : "outline"}
                className={`flex-1 rounded-none ${
                  index === 0 ? "rounded-l-lg" : ""
                } ${
                  index === beforeAfterProjects.length - 1 ? "rounded-r-lg" : ""
                }`}
                onClick={() => {
                  setActiveTab(index);
                  setShowAfter(false);
                }}
              >
                {project.title}
              </Button>
            ))}
          </div>
          
          <div className="relative overflow-hidden bg-secondary rounded-lg shadow-md">
            <div className="flex items-center justify-center">
              <img 
                src={showAfter ? beforeAfterProjects[activeTab].after : beforeAfterProjects[activeTab].before} 
                alt={showAfter ? "After transformation" : "Before transformation"} 
                className="w-full h-auto object-cover rounded-lg transition-all duration-1000"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 flex justify-between items-center">
              <div>
                <div className="text-sm font-medium">{showAfter ? "AFTER" : "BEFORE"}</div>
                <div className="text-xl font-bold">{beforeAfterProjects[activeTab].title}</div>
              </div>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/20"
                onClick={() => setShowAfter(!showAfter)}
              >
                {showAfter ? "View Before" : "View After"}
              </Button>
            </div>
          </div>
          
          <p className="text-center mt-6 text-muted-foreground">
            {beforeAfterProjects[activeTab].description}
          </p>
          
          <div className="text-center mt-12">
            <Button className="button-gradient" asChild>
              <Link to="/contact">Get Your Website Transformation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
