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
					The talented people behind WebCraft who make your website dreams a
					reality.
				</p>
				<div className="flex justify-center mt-12">
					<div className="bg-white rounded-lg shadow-md p-8 max-w-6xl w-full text-center">

						<p className="text-muted-foreground text-sm" style={{ fontSize: '16px' }}>
							At YugBytes, our team is a dedicated collective of creative thinkers, skilled developers, and strategic planners committed to delivering exceptional digital solutions. With a strong foundation in innovation and collaboration, we approach every project with integrity, transparency, and a relentless focus on quality. Our clients trust us to turn their ideas into reality, knowing we prioritize clear communication, reliability, and long-term partnerships. Your success is our mission, and we take pride in building digital experiences that stand the test of time.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TeamSection;
