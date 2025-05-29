
const StorySection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="fade-in opacity-0">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-6">
              YugBytes was founded by a group of university graduates who noticed a gap in the market: affordable and quick website development services specifically for students and young professionals.
            </p>
            <p className="text-muted-foreground mb-6">
              Having experienced the challenges of creating their own online portfolios while balancing academic commitments, our founders understood the need for a service that could deliver professional websites without the high costs or long timelines typically associated with web development.
            </p>
            <p className="text-muted-foreground">
              Today, YugBytes has grown into a trusted partner for hundreds of students and professionals looking to establish their online presence. Our team consists of talented developers, designers, and digital marketers who are passionate about helping clients showcase their work and achievements to the world.
            </p>
          </div>
          <div className="relative fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="Our beginnings" 
              className="rounded-lg shadow-lg w-full"
            />
            <div className="absolute -bottom-6 -left-6 p-6 bg-white shadow-lg rounded-lg border border-border">
              <div className="text-xl font-bold text-primary">Story </div>
              <div className="text-sm text-muted-foreground">of growth</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
