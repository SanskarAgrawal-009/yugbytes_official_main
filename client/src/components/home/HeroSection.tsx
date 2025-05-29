
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-teal-50 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl"></div>
      </div>
      <div className="container relative min-h-[90vh] flex flex-col justify-center items-center text-center py-20">
        <div className="max-w-3xl fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            We Build Your Online Identity – 
            <span className="gradient-text"> One Page at a Time</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground">
            Personal portfolio websites and project support crafted for students and professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="button-gradient px-8 py-6 text-lg" asChild>
              <Link to="/contact">Get a Website</Link>
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg" asChild>
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-16 w-full max-w-4xl bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-6 fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="font-bold text-3xl text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div>
              <div className="font-bold text-3xl text-primary">48h</div>
              <div className="text-sm text-muted-foreground">Average Delivery</div>
            </div>
            <div>
              <div className="font-bold text-3xl text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="font-bold text-3xl text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
