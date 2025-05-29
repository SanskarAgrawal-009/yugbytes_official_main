
const ContactHero = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="container text-center max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in opacity-0" style={{ animationDelay: "0.1s" }}>Contact Us</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
          Ready to start your web project? Get in touch with us today for a free consultation.
        </p>
        <div className="relative h-1 w-24 bg-accent mx-auto rounded-full scale-in opacity-0" style={{ animationDelay: "0.5s" }}></div>
      </div>
    </section>
  );
};

export default ContactHero;
