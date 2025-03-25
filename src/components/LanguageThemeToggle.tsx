
import { Globe, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LanguageThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleLanguage}
        title={language === "fr" ? "Switch to English" : "Passer au français"}
        className="relative"
      >
        <Globe className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-salon-primary text-white rounded-full w-4 h-4 flex items-center justify-center">
          {language === "fr" ? "EN" : "FR"}
        </span>
      </Button>

      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === "light" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};

export default LanguageThemeToggle;
