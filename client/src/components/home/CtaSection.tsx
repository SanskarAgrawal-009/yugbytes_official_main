
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="bg-gradient-to-r from-primary to-accent rounded-xl text-white p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="relative max-w-3xl mx-auto fade-in opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build Your Online Presence?</h2>
            <p className="text-lg mb-8 text-white/90">
              Get a professional website tailored to your needs in as little as 48 hours.
              No technical skills required - we handle everything for you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg" asChild>
                <Link to="/contact" className="flex items-center">Get Started Now</Link>
              </Button>
              <Button className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg" asChild>
                <Link to="/services" className="flex items-center">
                  Browse Services
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
