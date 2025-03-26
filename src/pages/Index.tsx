
import { useAuth } from '@/components/auth/AuthContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import FloatingElement from '@/components/FloatingElement';
import Logo from '@/components/header/Logo';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronRight, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Index = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = (type: 'salon' | 'braider') => {
    navigate('/auth');
  };

  // Add mouse parallax effect
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate distance from center (normalized)
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;
      
      // Apply transformation to floating elements
      const elements = containerRef.current?.querySelectorAll('.blob');
      elements?.forEach((elem, index) => {
        const factor = (index + 1) * 5; // Different movement intensity for each blob
        const el = elem as HTMLElement;
        el.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simple version before login
  if (!user) {
    return (
      <div 
        ref={containerRef}
        className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-salon-dark dark:to-gray-900 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="blob absolute h-[40vh] w-[40vh] md:h-[50vh] md:w-[50vh] bg-salon-primary/10 rounded-full top-[10%] left-[-10%] blur-3xl"></div>
          <div className="blob absolute h-[35vh] w-[35vh] md:h-[45vh] md:w-[45vh] bg-salon-accent1/10 rounded-full bottom-[20%] right-[-10%] blur-3xl"></div>
          <div className="blob absolute h-[25vh] w-[25vh] md:h-[30vh] md:w-[30vh] bg-salon-accent2/10 rounded-full top-[60%] left-[20%] blur-3xl"></div>
        </div>
        
        <div className="flex items-center justify-between px-6 py-4">
          <div className="transform-3d">
            <Logo />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            onClick={() => navigate('/auth')}
            title={t('login')}
            aria-label={t('login')}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex flex-col items-center gap-4 pt-6 sm:pt-12 px-4 relative z-10 animate-fade-in">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-display text-salon-dark dark:text-white text-center my-2 sm:my-4">
            <span className="inline-block animate-float-small">{t('heroTitle').split(' ').slice(0, 2).join(' ')}</span>{' '}
            <span className="text-salon-primary inline-block animate-float-medium">{t('heroTitle').split(' ').slice(2).join(' ')}</span>
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-center text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-10">
            {t('platformSimplifies')}
          </p>
        </div>
        
        <div className="flex-grow flex items-center justify-center p-4 sm:p-8 transition-all">
          <div className="max-w-md mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              <Button 
                className="framer-card bg-salon-primary hover:bg-salon-primary/90 text-white py-4 sm:py-6 px-4 sm:px-8 rounded-full text-sm sm:text-lg"
                onClick={() => handleButtonClick('salon')}
              >
                {t('iAmSalon')}
                <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 animate-float-small" />
              </Button>
              <Button 
                variant="outline" 
                className="framer-card border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10 py-4 sm:py-6 px-4 sm:px-8 rounded-full text-sm sm:text-lg dark:text-white dark:border-white"
                onClick={() => handleButtonClick('braider')}
              >
                {t('iAmBraider')}
                <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 animate-float-small" />
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Full version after login
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Header />
      <main className="flex-grow">
        <div className="animate-slide-in-left" style={{animationDelay: '0.1s'}}>
          <HeroSection />
        </div>
        
        <div className="animate-slide-in-right" style={{animationDelay: '0.3s'}}>
          <FeaturesSection />
        </div>
        
        <div className="animate-slide-in-left" style={{animationDelay: '0.5s'}}>
          <HowItWorks />
        </div>
        
        <div className="animate-slide-in-right" style={{animationDelay: '0.7s'}}>
          <TestimonialsSection />
        </div>
        
        <div className="animate-slide-in-left" style={{animationDelay: '0.9s'}}>
          <CtaSection />
        </div>
      </main>
      <Footer />
      
      {/* 3D Floating decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <FloatingElement 
            key={i}
            amplitude={i % 3 === 0 ? "large" : i % 2 === 0 ? "medium" : "small"}
            delay={i * 0.5}
            duration={3 + i}
            className={`absolute bg-salon-primary/5 dark:bg-salon-primary/10 rounded-full blob
                     ${i % 3 === 0 ? 'w-32 sm:w-64 h-32 sm:h-64' : i % 2 === 0 ? 'w-24 sm:w-40 h-24 sm:h-40' : 'w-16 sm:w-24 h-16 sm:h-24'}
                     ${
                      i === 0 ? 'top-1/4 left-1/5' :
                      i === 1 ? 'top-3/4 left-1/4' :
                      i === 2 ? 'top-2/3 right-1/4' :
                      i === 3 ? 'top-1/5 right-1/6' :
                      i === 4 ? 'top-1/2 left-1/3' :
                      'bottom-1/4 right-1/5'
                     }
                     blur-xl transform-3d`}
          >
            <div className="w-full h-full"></div>
          </FloatingElement>
        ))}
      </div>
    </div>
  );
};

export default Index;
