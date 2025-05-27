
import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useToast } from "@/hooks/use-toast";
import { initPageTransitions, initScrollAnimations } from "@/lib/transitions";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { toast } = useToast();

  useEffect(() => {
    // Initialize scroll animations with a small delay to ensure DOM is ready
    setTimeout(() => {
      initScrollAnimations();
    }, 100);
    
    // Only initialize Barba once
    if (!window.barbaInitialized) {
      initPageTransitions();
      window.barbaInitialized = true;
      
      // Notify user about navigation animations
      toast({
        title: "Welcome!",
        description: "let's build something amazing together.",
        duration: 4000,
      });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main 
        data-barba="container" 
        data-barba-namespace="default" 
        className="flex-grow pt-20"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
