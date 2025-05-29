
import { Check } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Initial Consultation",
    description: "We start by understanding your needs, goals, and preferences through a brief consultation.",
  },
  {
    number: "02",
    title: "Proposal & Design",
    description: "We prepare a proposal with pricing and timeline, then create initial design concepts for your approval.",
  },
  {
    number: "03",
    title: "Development",
    description: "Our team builds your website with attention to detail, ensuring it's responsive and user-friendly.",
  },
  {
    number: "04",
    title: "Review & Launch",
    description: "You review the final website, we make any necessary adjustments, and then launch it to the world.",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="section-heading">Our Approach</h2>
        <p className="section-subheading">
          We follow a simple, transparent process to ensure your website is delivered on time and exceeds your expectations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="border border-border rounded-lg p-6 relative fade-in opacity-0"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="absolute -top-4 left-6 bg-white px-2 text-sm font-semibold text-accent">
                Step {step.number}
              </div>
              <h3 className="text-xl font-bold mb-4 mt-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Clients Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {[
              "Affordable pricing with student discounts",
              "Quick turnaround - most projects completed in 2-5 days",
              "Mobile-responsive designs that look great on all devices",
              "SEO optimization for better visibility",
              "Regular updates and maintenance packages",
              "24/7 customer support via email and WhatsApp",
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-2 fade-in opacity-0" style={{ animationDelay: `${0.4 + index * 0.1}s` }}>
                <div className="mt-1 rounded-full bg-accent/20 p-1 flex items-center justify-center">
                  <Check className="h-3 w-3 text-accent" />
                </div>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
