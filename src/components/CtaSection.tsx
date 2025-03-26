
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef, useEffect } from "react";

const CtaSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  
  // Add parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionPosition = sectionRef.current.offsetTop;
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section is from the viewport center
      const distanceFromCenter = sectionPosition - scrollPosition - windowHeight / 2;
      
      // Calculate a parallax factor based on distance
      const parallaxFactor = distanceFromCenter * 0.05;
      
      // Apply parallax effect to background
      const backgroundEl = sectionRef.current.querySelector('.cta-bg') as HTMLElement;
      if (backgroundEl) {
        backgroundEl.style.transform = `translateY(${parallaxFactor}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Background with parallax effect */}
      <div className="cta-bg absolute inset-0 z-0 bg-gradient-to-r from-salon-primary to-salon-accent1 transform-gpu transition-transform"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="blob absolute h-[40vh] w-[40vh] bg-white/5 rounded-full top-[-10%] left-[20%] blur-3xl"></div>
        <div className="blob absolute h-[35vh] w-[35vh] bg-white/5 rounded-full bottom-[-10%] right-[20%] blur-3xl"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto glass-card p-8 md:p-12 backdrop-blur-xl bg-white/10 dark:bg-black/10 border border-white/20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-6 text-white drop-shadow-md">
            {t('readyToJoin')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
            <Button className="framer-card bg-white text-salon-primary hover:bg-white/90 py-6 px-8 rounded-full text-lg shadow-lg">
              {t('createFreeAccount')}
            </Button>
            <Button variant="outline" className="framer-card border-white text-white hover:bg-white/10 py-6 px-8 rounded-full text-lg border-2">
              {t('learnMore')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
