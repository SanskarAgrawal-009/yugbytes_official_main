
import { ArrowRight, Calendar, FileText, Laptop, User } from "lucide-react";
// Update the import path below to the correct relative path based on your folder structure.
// For example, if ServicesSection.tsx is in src/components/home and button.tsx is in src/components/ui:
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <User className="h-10 w-10 text-primary" />,
    title: "Portfolio Websites",
    description: "Showcase your skills, projects, and achievements with a custom-designed personal portfolio website.",
    turnaround: "3-5 days",
  },
  {
    icon: <Laptop className="h-10 w-10 text-primary" />,
    title: "Small Business Websites",
    description: "Get your business online with a professional website that highlights your services and engages customers.",
    turnaround: "5-10 days",

  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "E-commerce Websites",
    description: "Launch your online store with a fully functional e-commerce website, complete with secure payment options.",
    turnaround: "20-25 days",

  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Custom Web Applications/SaaS",
    description: "Develop tailored web applications or SaaS solutions to meet specific business needs, from concept to deployment.",
    turnaround: "1-3 months",

  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container">
        <h2 className="section-heading">Our Services</h2>
        <p className="section-subheading">
          We offer a range of web development services tailored specifically for students and professionals.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card fade-in opacity-0" 
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <div className="mt-auto">
                <div className="text-sm text-primary font-medium">{service.turnaround}</div>
                <div className="text-sm font-bold"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
