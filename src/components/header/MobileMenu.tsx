
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, User, Loader2 } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSignUp: () => void;
}

const MobileMenu = ({ isOpen, onClose, isLoading, onSignUp }: MobileMenuProps) => {
  const { t } = useLanguage();
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-salon-dark/95 backdrop-blur-sm shadow-md py-4 px-4 z-50 animate-fade-in">
      <nav className="flex flex-col space-y-1">
        <Link 
          to="/" 
          className={cn(
            "text-salon-dark dark:text-white hover:text-salon-primary transition-colors py-3 px-3 rounded-md",
            location.pathname === "/" && "bg-muted dark:bg-muted text-salon-primary"
          )}
          onClick={onClose}
        >
          {t('home')}
        </Link>
        
        <div className="py-1 px-3">
          <div className="flex justify-between items-center cursor-pointer py-2" 
               onClick={() => {
                 const subMenu = document.getElementById('salons-submenu');
                 if (subMenu) subMenu.classList.toggle('hidden');
               }}>
            <span className="text-salon-dark dark:text-white">{t('salons')}</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <div id="salons-submenu" className="hidden pl-4 space-y-2 py-2">
            <Link 
              to="/salons" 
              className="block py-2 text-salon-dark dark:text-white hover:text-salon-primary transition-colors"
              onClick={onClose}
            >
              {t('allSalons')}
            </Link>
            <Link 
              to="/salons?featured=true" 
              className="block py-2 text-salon-dark dark:text-white hover:text-salon-primary transition-colors"
              onClick={onClose}
            >
              {t('featuredSalons')}
            </Link>
          </div>
        </div>
        
        <Link 
          to="/braiders" 
          className={cn(
            "text-salon-dark dark:text-white hover:text-salon-primary transition-colors py-3 px-3 rounded-md",
            location.pathname === "/braiders" && "bg-muted dark:bg-muted text-salon-primary"
          )}
          onClick={onClose}
        >
          {t('braiders')}
        </Link>
        <Link 
          to="/about" 
          className={cn(
            "text-salon-dark dark:text-white hover:text-salon-primary transition-colors py-3 px-3 rounded-md",
            location.pathname === "/about" && "bg-muted dark:bg-muted text-salon-primary"
          )}
          onClick={onClose}
        >
          {t('about')}
        </Link>
        
        <div className="flex items-center space-x-3 py-3 px-3">
          <Button variant="ghost" size="icon" className="rounded-full p-2">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full p-2">
            <User className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="pt-2 flex flex-col space-y-2 px-3">
          <Button 
            className={cn(
              "w-full bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/80 hover:to-salon-primary hover:scale-105 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 border-0 rounded-full text-sm",
              isLoading && "opacity-80 cursor-not-allowed"
            )}
            onClick={onSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {t('signUp')}...
              </>
            ) : (
              t('signUp')
            )}
          </Button>
          <Button variant="outline" className="w-full rounded-full text-sm">
            {t('login')}
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
