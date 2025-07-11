
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "founder of Priya's Designs",
   
    content: "I choose yugbytes for my e-commerce website, and I couldn't be happier. The team was professional, responsive, and delivered a stunning site that has significantly boosted my online sales. Highly recommend!",
    rating: 5,
  },
  {
    name: "Rahul Mehra",
    role: "UX Designer",
    content: "As someone who works in design, I had high expectations for my personal website. YugBytes didn't just meet them but exceeded them. The final result is clean, professional, and perfectly represents my personal brand.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "PhD Researcher",
    content: "I needed a website to showcase my research work and academic publications. YugBytes delivered an organized, professional platform that impressed my department. The process was smooth from start to finish.",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container">
        <h2 className="section-heading">What Our Clients Say</h2>
        <p className="section-subheading">
          Don't just take our word for it. Here's what students and professionals have to say about our services.
        </p>
        
        <div className="relative mt-12 max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="flex justify-center mb-6">
                      
                    </div>
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic mb-6">"{testimonial.content}"</p>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary scale-125" : "bg-primary/30"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
