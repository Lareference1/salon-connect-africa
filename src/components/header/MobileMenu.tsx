
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ChevronDown, User, Loader2, LogOut } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/components/auth/AuthContext';
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
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
      onClose();
    }
  };

  const handleProtectedNavigation = (path: string) => {
    if (!user) {
      // Direct navigation to auth page without showing toast
      navigate('/auth');
      onClose();
      return;
    }
    navigate(path);
    onClose();
  };

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  return (
    <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white/95 dark:bg-salon-dark/95 backdrop-blur-sm shadow-md py-4 px-4 z-50 overflow-y-auto animate-fade-in">
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
        
        {user && (
          <>
            <div className="py-1 px-3">
              <div 
                className="flex justify-between items-center cursor-pointer py-2"
                onClick={() => toggleSubmenu('salons')}
              >
                <span className="text-salon-dark dark:text-white">{t('salons')}</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  expandedMenus['salons'] && "transform rotate-180"
                )} />
              </div>
              <div className={cn(
                "pl-4 space-y-2 py-2 transition-all duration-200 overflow-hidden",
                expandedMenus['salons'] ? "max-h-40" : "max-h-0"
              )}>
                <button 
                  className="block py-2 text-salon-dark dark:text-white hover:text-salon-primary transition-colors"
                  onClick={() => handleProtectedNavigation('/salons')}
                >
                  {t('allSalons')}
                </button>
                <button 
                  className="block py-2 text-salon-dark dark:text-white hover:text-salon-primary transition-colors"
                  onClick={() => handleProtectedNavigation('/salons?featured=true')}
                >
                  {t('featuredSalons')}
                </button>
              </div>
            </div>
            
            <button 
              className={cn(
                "text-left text-salon-dark dark:text-white hover:text-salon-primary transition-colors py-3 px-3 rounded-md",
                location.pathname === "/braiders" && "bg-muted dark:bg-muted text-salon-primary"
              )}
              onClick={() => handleProtectedNavigation('/braiders')}
            >
              {t('braiders')}
            </button>
          </>
        )}
        
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
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full p-2"
            onClick={() => {
              navigate(user ? '/settings' : '/auth');
              onClose();
            }}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="pt-2 flex flex-col space-y-2 px-3">
          <Button 
            className={cn(
              "w-full bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/80 hover:to-salon-primary hover:scale-105 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 border-0 rounded-full text-sm",
              isLoading && "opacity-80 cursor-not-allowed"
            )}
            onClick={handleAuthAction}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                {user ? t('logout') : t('signUp')}...
              </>
            ) : (
              <>
                {user ? (
                  <>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('logout')}
                  </>
                ) : (
                  t('signUp')
                )}
              </>
            )}
          </Button>
          
          {!user && (
            <Button 
              variant="outline" 
              className="w-full rounded-full text-sm"
              onClick={() => {
                navigate('/auth');
                onClose();
              }}
            >
              {t('login')}
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileMenu;
