
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { User, Loader2, LogOut, Settings, Moon, Sun, Globe } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/components/auth/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';

interface ActionButtonsProps {
  isLoading: boolean;
  onSignUp: () => void;
}

const ActionButtons = ({ isLoading, onSignUp }: ActionButtonsProps) => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };
  
  return (
    <div className="hidden md:flex items-center space-x-3">
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full p-2 relative"
        onClick={toggleLanguage}
        title={language === "fr" ? "Switch to English" : "Passer au français"}
      >
        <Globe className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-salon-primary text-white rounded-full w-4 h-4 flex items-center justify-center">
          {language === "fr" ? "EN" : "FR"}
        </span>
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full p-2"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full p-2"
        onClick={() => navigate(user ? '/settings' : '/auth')}
      >
        {user ? <Settings className="h-5 w-5" /> : <User className="h-5 w-5" />}
      </Button>
      
      {user ? (
        <Button 
          className="bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/80 hover:to-salon-primary hover:scale-105 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 border-0 rounded-full text-sm"
          onClick={handleAuthAction}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {t('logout')}...
            </>
          ) : (
            <>
              <LogOut className="h-4 w-4 mr-2" />
              {t('logout')}
            </>
          )}
        </Button>
      ) : (
        <Button 
          variant="outline" 
          className="rounded-full text-sm"
          onClick={() => navigate('/auth?tab=signup')}
        >
          {t('login')}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
