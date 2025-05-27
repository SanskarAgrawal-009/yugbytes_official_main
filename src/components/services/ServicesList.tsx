
import { ArrowRight, Calendar, FileText, Laptop, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <User className="h-12 w-12 text-primary" />,
    title: "Portfolio Website Development",
    description: "A professional portfolio website is your digital business card and the cornerstone of your online presence. We create custom portfolio websites that showcase your work, skills, and achievements in a visually appealing manner. Perfect for designers, developers, writers, photographers, and other creative professionals.",
    features: [
      "Custom design tailored to your personal brand",
      "Mobile-responsive layout",
      "Portfolio/project showcase section",
      "About me/biography section",
      "Contact form and social media integration",
      "SEO optimization",
    ],
    turnaround: "2-3 days",
    price: "Starting from ₹4,999",
    imageSrc: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
  },
  {
    icon: <Laptop className="h-12 w-12 text-primary" />,
    title: "Academic Project Websites",
    description: "Present your research, thesis, or academic projects professionally with a dedicated website. We help students, researchers, and academics create informative websites that effectively communicate complex ideas and showcase their academic work to peers, professors, and potential employers.",
    features: [
      "Research methodology presentation",
      "Interactive data visualizations (if applicable)",
      "Project documentation and findings",
      "Team member profiles",
      "Resource downloads (papers, presentations)",
      "Citation and reference management",
    ],
    turnaround: "3-5 days",
    price: "Starting from ₹3,999",
    imageSrc: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  },
  {
    icon: <FileText className="h-12 w-12 text-primary" />,
    title: "Resume & Landing Pages",
    description: "Stand out from the crowd with an interactive online resume or a targeted landing page. These single-page websites are perfect for job seekers, consultants, or professionals looking to highlight specific skills or services. They provide a quick, impressive overview that complements your traditional resume.",
    features: [
      "Clean, professional design",
      "Interactive resume elements",
      "Skill visualization",
      "Work history timeline",
      "Downloadable PDF resume option",
      "Contact information and form",
    ],
    turnaround: "1-2 days",
    price: "Starting from ₹2,999",
    imageSrc: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  },
  {
    icon: <Calendar className="h-12 w-12 text-primary" />,
    title: "Web Consultation & Project Assistance",
    description: "Need expert advice on your existing website or academic web project? Our consultation service provides professional guidance on design improvements, functionality enhancements, or technical issues. We also offer assistance with web-related academic projects for students studying web development or design.",
    features: [
      "One-on-one consultation sessions",
      "Website audit and recommendations",
      "Technical troubleshooting",
      "Project planning assistance",
      "Technology stack recommendations",
      "Implementation guidance",
    ],
    turnaround: "Same day",
    price: "Starting from ₹999",
    imageSrc: "https://images.unsplash.com/photo-1496307653780-42ee777d4833",
  },
];

const ServicesList = () => {
  return (
    <section className="py-16">
      <div className="container">
        {services.map((service, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16 ${
              index !== services.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className={`fade-in opacity-0 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="inline-block mb-6">
                <div className="bg-primary/10 p-4 rounded-lg">
                  {service.icon}
                </div>
              </div>
              <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>
              
              <h3 className="font-semibold text-lg mb-3">Features:</h3>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1.5 rounded-full bg-primary/20 p-0.5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Turnaround Time</div>
                  <div className="font-semibold">{service.turnaround}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Pricing</div>
                  <div className="font-semibold">{service.price}</div>
                </div>
              </div>
              
              <Button className="button-gradient gap-2" asChild>
                <Link to="/contact">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className={`relative fade-in opacity-0 ${index % 2 === 1 ? "lg:order-1" : ""}`} style={{ animationDelay: "0.3s" }}>
              <img 
                src={service.imageSrc} 
                alt={service.title} 
                className="rounded-lg shadow-lg w-full object-cover h-80"
              />
              {index % 2 === 0 && (
                <div className="absolute -bottom-6 -right-6 bg-white p-6 shadow-lg rounded-lg border border-border">
                  <div className="font-bold text-2xl gradient-text">{service.price}</div>
                </div>
              )}
              {index % 2 === 1 && (
                <div className="absolute -top-6 -left-6 bg-white p-6 shadow-lg rounded-lg border border-border">
                  <div className="font-bold text-2xl gradient-text">{service.price}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
