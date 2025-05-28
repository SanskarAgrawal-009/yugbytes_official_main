
import { ArrowRight, Calendar, FileText, Laptop, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <User className="h-12 w-12 text-primary" />,
    title: "Portfolio Website",
    description: "A professional portfolio website is your digital business card and the cornerstone of your online presence. We create custom portfolio websites that showcase your work, skills, and achievements in a visually appealing manner. Perfect for designers, developers, writers, photographers, and other creative professionals.",
    features: [
    "3-5 Semi-Dynamic pages",
   "Template-based or semi-custom design",
"Mobile-friendly (responsive) layout",
"Basic contact form",
"On-page SEO (titles, descriptions)",
"Domain + hosting help (if needed)",
    ],
    turnaround: "3-4 days",
    price: "Starting from ₹10,000 and upto ₹30,000",
    imageSrc: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
  },
  {
    icon: <Laptop className="h-12 w-12 text-primary" />,
    title: "Small Business Website",
    description: "A small business website is essential for establishing your online presence and reaching potential customers. We build small business websites that are not only visually appealing but also functional, helping you to effectively communicate your services and engage with your audience.",
    features: [
      "5-15 pages with custom layout",
      "WordPress or other CMS setup",
      "Interactive data visualizations (if applicable)",
      "Project documentation and findings",
      "Blog integration",
      "Google Maps, Analytics, Social Media links",
      "Responsive design for all devices",
      "Basic SEO setup",
      "Speed optimization",
      "Domain + hosting help (if needed)",

    ],
    turnaround: "5-10 days",
    price: "Starting from ₹30,000 and upto ₹80,000",
    imageSrc: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  },
  {
    icon: <FileText className="h-12 w-12 text-primary" />,
    title: "E-commerce Website",
    description: "An e-commerce website is crucial for businesses looking to sell products or services online. We create fully functional e-commerce websites that provide a seamless shopping experience for your customers, complete with secure payment gateways, product management, and user-friendly interfaces.",
    features: [
      "Clean, professional design",
      "Online store with cart and checkout",
      "Payment gateway integration (UPI, Paytm, Razorpay, etc.)",
      "Inventory & order management",
      "Customer accounts and profiles",
      " Basic product SEO",
      "Responsive design for mobile and desktop",
      "Domain + hosting help (if needed)",
      "Coupons, shipping setup",
      "Admin dashboard and training",
    ],
    turnaround: "20-25 days",
    price: "Starting from ₹55,000 and upto ₹2,00,000",
    imageSrc: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
  },
  {
    icon: <Calendar className="h-12 w-12 text-primary" />,
    title: "Custom Web Application / SaaS",
    description: "A custom web application or SaaS (Software as a Service) solution is tailored to meet specific business needs. We develop robust, scalable, and secure web applications that can handle complex functionalities, user management, and data processing, providing a seamless user experience.",
    features: [
      "Fully custom-coded frontend and backend",
      "Admin and user dashboards",
      "Role-based access control",
      "API integration (health tech, payment, analytics, etc.)",
      "AI/ML model deployment (e.g., in your Neuro Scan AI)",
      "Database design (e.g., MongoDB integration)",
      "Security, hosting setup, deployment support",
      "Integration with existing systems",
    ],
    turnaround: "Will vary based on complexity",
    price: "Starting from ₹1,00,000 and upto ₹5,00,000",
    imageSrc: "neuroscan.png", 
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
