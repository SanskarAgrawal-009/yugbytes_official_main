
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Computer Science Student",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    content: "WebCraft built my portfolio site in just 3 days! The design perfectly showcases my projects and has helped me stand out during job interviews. Highly recommend their services to fellow students!",
    rating: 5,
  },
  {
    name: "Rahul Mehra",
    role: "UX Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    content: "As someone who works in design, I had high expectations for my personal website. WebCraft didn't just meet them but exceeded them. The final result is clean, professional, and perfectly represents my personal brand.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "PhD Researcher",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    content: "I needed a website to showcase my research work and academic publications. WebCraft delivered an organized, professional platform that impressed my department. The process was smooth from start to finish.",
    rating: 4,
  },
  {
    name: "Vikram Singh",
    role: "Photographer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    content: "My photography portfolio by WebCraft has been a game-changer. The image galleries are stunning, and the site loads quickly despite having many high-resolution photos. Worth every penny!",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    role: "Marketing Specialist",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    content: "I was looking for an online resume that would stand out, and WebCraft delivered exactly what I needed. The interactive elements and clean design helped me land interviews at several top companies.",
    rating: 5,
  },
  {
    name: "Arjun Nair",
    role: "Engineering Student",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    content: "WebCraft helped me showcase my engineering projects in an impressive way. They understood the technical aspects of my work and created visual representations that make it easy to understand.",
    rating: 4,
  },
];

const TestimonialGrid = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container">
        <h2 className="section-heading">Client Testimonials</h2>
        <p className="section-subheading">
          Don't take our word for it - here's what our clients have to say about their experience working with us.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 fade-in opacity-0"
              style={{ animationDelay: `${0.1 + index * 0.05}s` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialGrid;
