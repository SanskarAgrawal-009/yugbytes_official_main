import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Mail, MessageSquare, Phone, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://yugbytes-official-main-2.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSuccess(true);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
        variant: "default",
      });
      
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="fade-in opacity-0">
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-muted-foreground mb-8">
              We'd love to hear from you! Fill out the form below to start a conversation about your web development needs. Whether you're a student needing a portfolio, a professional updating your online presence, or just have questions about our services - we're here to help.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 slide-in opacity-0" style={{ animationDelay: "0.1s" }}>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <a href="mailto:official@yugbytes.com" className="text-primary hover:underline">official@yugbytes.com</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 slide-in opacity-0" style={{ animationDelay: "0.2s" }}>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <a href="tel:+917455046605" className="text-primary hover:underline">+917455046605</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 slide-in opacity-0" style={{ animationDelay: "0.3s" }}>
                <div className="bg-primary/10 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a href="https://wa.me/7455046605" className="text-primary hover:underline">Send a message</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 slide-in opacity-0" style={{ animationDelay: "0.4s" }}>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Book a Consultation</h3>
                  <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Schedule on Calendly</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 slide-in opacity-0" style={{ animationDelay: "0.5s" }}>
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Student Inquiries</h3>
                  <a href="mailto:students@webcraft.com" className="text-primary hover:underline">students@webcraft.com</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 scale-in opacity-0" style={{ animationDelay: "0.3s" }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or inquiry..."
                  required
                  className="mt-1 min-h-32"
                />
              </div>
              
              <Button type="submit" className="w-full button-gradient" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
              {success && <p className="text-green-500 mt-4">Message sent!</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;