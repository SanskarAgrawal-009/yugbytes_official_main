
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 mt-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold font-poppins">
                <span className="text-primary">Web</span>
                <span className="text-accent">Craft</span>
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              We build beautiful websites for students and professionals to showcase their work and establish their digital presence.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>Portfolio Websites</li>
              <li>Academic Project Sites</li>
              <li>Landing Pages</li>
              <li>Resume Websites</li>
              <li>Web Consultation</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:official@yugbytes.com" className="hover:text-primary transition-colors">official@yugbytes.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+917455046605" className="hover:text-primary transition-colors">+917455046605</a>
              </div>
              <div className="flex gap-4 mt-4">
                <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} YugBytes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
