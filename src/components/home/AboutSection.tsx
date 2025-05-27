
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Student working on laptop" 
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-border">
                <div className="text-3xl font-bold text-primary">3+ Years</div>
                <div className="text-sm text-muted-foreground">of Experience</div>
              </div>
            </div>
          </div>
          
          <div className="fade-in opacity-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
            <p className="text-muted-foreground mb-6">
              We are a team of passionate web developers dedicated to helping students and professionals establish their online presence. We understand that in today's competitive world, having a strong digital identity is crucial for career growth and academic success.
            </p>
            <p className="text-muted-foreground mb-6">
              Our mission is to provide affordable, high-quality websites that showcase your talents, projects, and achievements to the world. We believe that everyone deserves a professional online presence, regardless of their technical skills.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Fast Turnaround</h4>
                  <p className="text-sm text-muted-foreground">Most projects completed within 48-72 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Student Friendly</h4>
                  <p className="text-sm text-muted-foreground">Special pricing for students and academics</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Professional Design</h4>
                  <p className="text-sm text-muted-foreground">Modern, responsive, and customized designs</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div>
                  <h4 className="font-semibold">Ongoing Support</h4>
                  <p className="text-sm text-muted-foreground">Dedicated assistance even after delivery</p>
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
