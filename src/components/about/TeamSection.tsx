
const teamMembers = [
  {
    name: "Arjun Mehta",
    role: "Founder & Lead Developer",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    bio: "Computer Science graduate with 5+ years of experience in web development. Passionate about creating user-friendly websites.",
  },
  {
    name: "Neha Singh",
    role: "Design Lead",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    bio: "UX/UI designer with a background in fine arts. Specializes in creating visually appealing and intuitive user interfaces.",
  },
  {
    name: "Rohan Sharma",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    bio: "React and Angular specialist. Has developed over 50 websites for clients in various industries.",
  },
  {
    name: "Divya Kapoor",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    bio: "PMP certified project manager ensuring smooth communication and timely delivery of all projects.",
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container">
        <h2 className="section-heading">Meet Our Team</h2>
        <p className="section-subheading">
          The talented people behind WebCraft who make your website dreams a reality.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg fade-in opacity-0"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <div className="text-sm text-accent mb-3">{member.role}</div>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
