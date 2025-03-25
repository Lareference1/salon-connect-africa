
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleButtonClick = (type: 'salon' | 'braider') => {
    if (!user) {
      // Direct navigation to auth page without showing toast
      navigate('/auth');
      return;
    }
    
    if (type === 'salon') {
      navigate('/salons');
    } else if (type === 'braider') {
      navigate('/braiders');
    }
  };

  return (
    <div className="pattern-bg py-20 md:py-28 dark:bg-salon-dark dark:bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display mb-6 leading-tight text-salon-dark dark:text-white">
            <span className="text-salon-primary">{t('heroTitle')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-row justify-center gap-4">
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
    </div>
  );
};

export default HeroSection;
