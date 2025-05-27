
import barba from '@barba/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Initialize scroll animations with more dramatic effects
export const initScrollAnimations = () => {
  // Animate elements with the fade-in class
  gsap.utils.toArray('.fade-in').forEach((element: any) => {
    gsap.set(element, { opacity: 0, y: 50 });
    
    ScrollTrigger.create({
      trigger: element,
      start: "top bottom-=50",
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          overwrite: true
        });
      },
      once: true
    });
  });

  // Animate elements with the slide-in class
  gsap.utils.toArray('.slide-in').forEach((element: any) => {
    gsap.set(element, { opacity: 0, x: -80 });
    
    ScrollTrigger.create({
      trigger: element,
      start: "top bottom-=80",
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "back.out(1.5)",
          overwrite: true
        });
      },
      once: true
    });
  });
  
  // Add scale animation for elements with scale-in class
  gsap.utils.toArray('.scale-in').forEach((element: any) => {
    gsap.set(element, { opacity: 0, scale: 0.85 });
    
    ScrollTrigger.create({
      trigger: element,
      start: "top bottom-=50",
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          overwrite: true
        });
      },
      once: true
    });
  });
};

// Initialize Barba.js page transitions with more dramatic effects
export const initPageTransitions = () => {
  barba.init({
    transitions: [
      {
        name: 'default-transition',
        sync: true, // Make the animations synchronous for more impact
        leave(data) {
          return new Promise<void>((resolve) => {
            // Create a timeline for more complex exit animations
            const tl = gsap.timeline({
              onComplete: resolve,
            });
            
            // Add a clip-path animation for a wipe effect
            tl.to(data.current.container, {
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
              duration: 0.8,
              ease: "power3.inOut",
            });
            
            // Scale and rotate slightly while fading out
            tl.to(data.current.container, {
              opacity: 0,
              scale: 0.9,
              rotation: -2,
              duration: 0.5,
              ease: "power2.in",
            }, "-=0.5");
          });
        },
        enter(data) {
          return new Promise<void>((resolve) => {
            window.scrollTo(0, 0);
            
            // Set initial state for entrance
            gsap.set(data.next.container, {
              opacity: 0,
              scale: 1.05,
              rotation: 2,
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            });
            
            // Create timeline for entrance animation
            const tl = gsap.timeline({
              onComplete: () => {
                // Reinitialize scroll animations for the new page
                setTimeout(() => {
                  initScrollAnimations();
                }, 100);
                resolve();
              }
            });
            
            // Reveal with clip-path animation
            tl.to(data.next.container, {
              clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
              duration: 0.8,
              ease: "power3.out",
            });
            
            // Fade in, scale and straighten
            tl.to(data.next.container, {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.7,
              ease: "back.out(1.2)",
            }, "-=0.4");
          });
        }
      }
    ]
  });
};

// Function to reset animations when needed (useful for manual triggers)
export const resetAnimations = () => {
  // Force refresh of scroll animations
  initScrollAnimations();
};
