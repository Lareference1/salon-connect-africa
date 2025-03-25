
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-7xl font-display text-salon-primary mb-4">404</h1>
          <p className="text-2xl text-salon-dark dark:text-white mb-6">{t('pageNotFound')}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('pageNotFoundDesc')}
          </p>
          <Button asChild className="bg-salon-primary hover:bg-salon-primary/90">
            <Link to="/">{t('backToHome')}</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
