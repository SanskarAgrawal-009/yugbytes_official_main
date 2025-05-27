
const PortfolioHero = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in opacity-0" style={{ animationDelay: "0.3s" }}>Our Portfolio</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
          Browse through our collection of websites we've built for students and professionals across various fields.
        </p>
        <div className="relative h-1 w-24 bg-accent mx-auto rounded-full scale-in opacity-0" style={{ animationDelay: "0.7s" }}></div>
      </div>
    </section>
  );
};

export default PortfolioHero;
