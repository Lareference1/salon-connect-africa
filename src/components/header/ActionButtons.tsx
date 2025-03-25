
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, User, Loader2, LogOut, Settings } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/components/auth/AuthContext';

interface ActionButtonsProps {
  isLoading: boolean;
  onSignUp: () => void;
}

const ActionButtons = ({ isLoading, onSignUp }: ActionButtonsProps) => {
  const { t } = useLanguage();
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
      <Button variant="ghost" size="icon" className="rounded-full p-2">
        <Search className="h-5 w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full p-2"
        onClick={() => navigate(user ? '/settings' : '/auth')}
      >
        {user ? <Settings className="h-5 w-5" /> : <User className="h-5 w-5" />}
      </Button>
      
      <Button 
        className="bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/80 hover:to-salon-primary hover:scale-105 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 border-0 rounded-full text-sm"
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
          className="rounded-full text-sm"
          onClick={() => navigate('/auth')}
        >
          {t('login')}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
