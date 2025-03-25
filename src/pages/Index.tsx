
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
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleButtonClick = (type: 'salon' | 'braider') => {
    if (!user) {
      toast({
        title: t('authRequired'),
        description: t('pleaseLoginFirst'),
      });
      navigate('/auth');
    } else {
      if (type === 'salon') {
        navigate('/salons');
      } else if (type === 'braider') {
        navigate('/braiders');
      }
    }
  };

  // Simple version before login
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-salon-dark dark:to-gray-900">
        <div className="flex flex-col items-center gap-4 pt-12">
          <Logo />
          <h1 className="text-2xl md:text-3xl font-display text-salon-dark dark:text-white">
            <span className="text-salon-primary">{t('heroTitle')}</span>
          </h1>
        </div>
        <div className="flex-grow flex items-center justify-center">
          <div className="max-w-md mx-auto text-center px-4">
            <div className="flex flex-col gap-4">
              <Button 
                className="bg-salon-primary hover:bg-salon-primary/90 text-white py-6 px-8 rounded-full text-lg"
                onClick={() => handleButtonClick('salon')}
              >
                {t('iAmSalon')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10 py-6 px-8 rounded-full text-lg dark:text-white dark:border-white"
                onClick={() => handleButtonClick('braider')}
              >
                {t('iAmBraider')}
                <ChevronRight className="ml-2 h-5 w-5" />
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
                       ${i % 3 === 0 ? 'w-64 h-64' : i % 2 === 0 ? 'w-40 h-40' : 'w-24 h-24'}
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
