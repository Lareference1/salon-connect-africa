
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User, Scissors } from "lucide-react";
import LanguageThemeToggle from './LanguageThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="w-full bg-white dark:bg-salon-dark dark:text-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <div className="mr-2 p-1.5 bg-salon-primary rounded-md flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
            <Scissors className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display text-salon-primary tracking-wide leading-tight">SalonConnect</span>
            <span className="text-salon-accent1 text-xs -mt-1 font-medium">Africa</span>
          </div>
        </Link>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-salon-dark dark:text-white hover:text-salon-primary transition-colors">
            {t('home')}
          </Link>
          <Link to="/salons" className="text-salon-dark dark:text-white hover:text-salon-primary transition-colors">
            {t('salons')}
          </Link>
          <Link to="/braiders" className="text-salon-dark dark:text-white hover:text-salon-primary transition-colors">
            {t('braiders')}
          </Link>
          <Link to="/about" className="text-salon-dark dark:text-white hover:text-salon-primary transition-colors">
            {t('about')}
          </Link>
        </nav>
        
        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageThemeToggle />
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button className="bg-salon-primary hover:bg-salon-primary/90">
            {t('signUp')}
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageThemeToggle />
          <button 
            className="flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-salon-dark shadow-md py-4 px-4 z-50">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-salon-dark dark:text-white hover:text-salon-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link 
              to="/salons" 
              className="text-salon-dark dark:text-white hover:text-salon-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('salons')}
            </Link>
            <Link 
              to="/braiders" 
              className="text-salon-dark dark:text-white hover:text-salon-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('braiders')}
            </Link>
            <Link 
              to="/about" 
              className="text-salon-dark dark:text-white hover:text-salon-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button className="w-full bg-salon-primary hover:bg-salon-primary/90">
                {t('signUp')}
              </Button>
              <Button variant="outline" className="w-full">
                {t('login')}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
