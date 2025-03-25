
import { Button } from "@/components/ui/button";
import { Search, User, Loader2 } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageThemeToggle from '../LanguageThemeToggle';
import { cn } from '@/lib/utils';

interface ActionButtonsProps {
  isLoading: boolean;
  onSignUp: () => void;
}

const ActionButtons = ({ isLoading, onSignUp }: ActionButtonsProps) => {
  const { t } = useLanguage();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <LanguageThemeToggle />
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
        <Search className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
        <User className="h-5 w-5" />
      </Button>
      <Button 
        onClick={onSignUp}
        disabled={isLoading}
        className={cn(
          "bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/80 hover:to-salon-primary hover:scale-105 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 border-0 rounded-full px-6 text-sm",
          isLoading && "opacity-80 cursor-not-allowed"
        )}
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
    </div>
  );
};

export default ActionButtons;
