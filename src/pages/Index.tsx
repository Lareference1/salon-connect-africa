
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
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleButtonClick = (type: 'salon' | 'braider') => {
    navigate('/auth');
  };

  // Simple version before login
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-salon-dark dark:to-gray-900">
        <div className="flex flex-col items-center gap-4 pt-6 sm:pt-12 px-4">
          <Logo />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-display text-salon-dark dark:text-white text-center">
            <span className="text-salon-primary">{t('heroTitle')}</span>
          </h1>
        </div>
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                className="bg-salon-primary hover:bg-salon-primary/90 text-white py-3 sm:py-6 px-4 sm:px-8 rounded-full text-sm sm:text-lg"
                onClick={() => handleButtonClick('salon')}
              >
                {t('iAmSalon')}
                <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10 py-3 sm:py-6 px-4 sm:px-8 rounded-full text-sm sm:text-lg dark:text-white dark:border-white"
                onClick={() => handleButtonClick('braider')}
              >
                {t('iAmBraider')}
                <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
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
        <FloatingElement amplitude="small" delay={0.2}>
          <HeroSection />
        </FloatingElement>
        
        <FloatingElement amplitude="small" delay={0.5}>
          <FeaturesSection />
        </FloatingElement>
        
        <FloatingElement amplitude="small" delay={0.3}>
          <HowItWorks />
        </FloatingElement>
        
        <FloatingElement amplitude="small" delay={0.7}>
          <TestimonialsSection />
        </FloatingElement>
        
        <FloatingElement amplitude="small" delay={0.4}>
          <CtaSection />
        </FloatingElement>
      </main>
      <Footer />
      
      {/* Floating decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <FloatingElement 
            key={i}
            amplitude={i % 3 === 0 ? "large" : i % 2 === 0 ? "medium" : "small"}
            delay={i * 0.5}
            duration={3 + i}
            className={`absolute bg-salon-primary/5 dark:bg-salon-primary/10 rounded-full
                     ${i % 3 === 0 ? 'w-32 sm:w-64 h-32 sm:h-64' : i % 2 === 0 ? 'w-24 sm:w-40 h-24 sm:h-40' : 'w-16 sm:w-24 h-16 sm:h-24'}
                     ${
                      i === 0 ? 'top-1/4 left-1/5' :
                      i === 1 ? 'top-3/4 left-1/4' :
                      i === 2 ? 'top-2/3 right-1/4' :
                      i === 3 ? 'top-1/5 right-1/6' :
                      i === 4 ? 'top-1/2 left-1/3' :
                      'bottom-1/4 right-1/5'
                     }
                     blur-xl`}
          >
            <div className="w-full h-full"></div>
          </FloatingElement>
        ))}
      </div>
    </div>
  );
};

export default Index;
