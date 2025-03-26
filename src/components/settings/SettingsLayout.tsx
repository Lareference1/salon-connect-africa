
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingElement from '@/components/FloatingElement';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SettingsLayoutProps {
  children: ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container max-w-6xl mx-auto px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="blob absolute h-[40vh] w-[40vh] bg-salon-primary/5 dark:bg-salon-primary/10 rounded-full top-[10%] left-[-10%] blur-3xl"></div>
          <div className="blob absolute h-[35vh] w-[35vh] bg-salon-accent1/5 dark:bg-salon-accent1/10 rounded-full bottom-[20%] right-[-10%] blur-3xl"></div>
        </div>
        
        <Button 
          variant="ghost" 
          className="mb-6 framer-card group" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all group-hover:after:w-full">Back</span>
        </Button>
        
        {children}
      </main>
      <Footer />
      
      {/* Floating decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <FloatingElement 
            key={i}
            amplitude={i % 3 === 0 ? "large" : i % 2 === 0 ? "medium" : "small"}
            delay={i * 0.5}
            duration={3 + i}
            className={`absolute bg-salon-primary/5 dark:bg-salon-primary/10 rounded-full blob
                     ${i % 3 === 0 ? 'w-64 h-64' : i % 2 === 0 ? 'w-40 h-40' : 'w-24 h-24'}
                     ${
                      i === 0 ? 'top-1/4 left-1/5' :
                      i === 1 ? 'top-3/4 left-1/4' :
                      i === 2 ? 'top-2/3 right-1/4' :
                      'top-1/5 right-1/6'
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

export default SettingsLayout;
