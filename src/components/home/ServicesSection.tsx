
import { ArrowRight, Calendar, FileText, Laptop, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <User className="h-10 w-10 text-primary" />,
    title: "Portfolio Websites",
    description: "Showcase your skills, projects, and achievements with a custom-designed personal portfolio website.",
    turnaround: "2-3 days",
    price: "Starting from ₹4,999",
  },
  {
    icon: <Laptop className="h-10 w-10 text-primary" />,
    title: "Academic Project Sites",
    description: "Present your research, thesis, or academic projects professionally with an interactive website.",
    turnaround: "3-5 days",
    price: "Starting from ₹3,999",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Resume & Landing Pages",
    description: "Stand out from the crowd with an interactive online resume or a targeted landing page.",
    turnaround: "1-2 days",
    price: "Starting from ₹2,999",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Web Consultation",
    description: "Get expert advice on your existing website or discuss your requirements for a new project.",
    turnaround: "Same day",
    price: "Starting from ₹999",
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
                <div className="text-sm font-bold">{service.price}</div>
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
