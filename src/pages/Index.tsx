
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorks from '@/components/HowItWorks';
import TestimonialsSection from '@/components/TestimonialsSection';
import CtaSection from '@/components/CtaSection';
import FloatingElement from '@/components/FloatingElement';

const Index = () => {
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
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
