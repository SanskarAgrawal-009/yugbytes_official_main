
const MissionSection = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative fade-in opacity-0">
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
              alt="Our mission" 
              className="rounded-lg shadow-lg w-full"
            />
            <div className="absolute -top-6 -right-6 bg-white p-6 shadow-lg rounded-lg border border-border">
              <div className="font-bold text-2xl gradient-text">Our Mission</div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-3xl font-bold mb-6">Why We Focus on Students and Professionals</h2>
            <p className="text-muted-foreground mb-6">
              We believe that every student and professional deserves a strong online presence that accurately represents their skills, experience, and personality. In today's competitive job market, having a professional website can be the difference between getting noticed and getting overlooked.
            </p>
            <p className="text-muted-foreground mb-6">
              Our mission is to democratize access to professional web development by offering affordable, fast, and high-quality services specifically designed for individuals at crucial stages of their academic and career journeys.
            </p>
            <p className="text-muted-foreground">
              Whether you're a student showcasing your projects, a researcher sharing your findings, or a professional establishing your personal brand, we're committed to helping you succeed in the digital world.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
