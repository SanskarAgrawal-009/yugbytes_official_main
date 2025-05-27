
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "../ui/theme-toggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5 dark:bg-transparent"
      }`}
    >
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold font-poppins">
            <span className="text-primary">Yug</span>
            <span className="text-accent">Bytes</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <Button className="button-gradient">Get Started</Button>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg">
          <div className="container py-5 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button className="button-gradient w-full mt-2">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
