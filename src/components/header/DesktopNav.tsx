
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/components/auth/AuthContext';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const DesktopNav = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProtectedNavigation = (path: string) => {
    if (!user) {
      // Direct navigation to auth page without showing toast
      navigate('/auth');
      return;
    }
    navigate(path);
  };

  return (
    <nav className="hidden md:flex items-center space-x-6">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/" className={cn(
              "text-salon-dark dark:text-white hover:text-salon-primary transition-colors px-3 py-2",
              location.pathname === "/" && "text-salon-primary font-medium"
            )}>
              {t('home')}
            </Link>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent hover:bg-transparent hover:text-salon-primary focus:bg-transparent data-[state=open]:bg-transparent text-salon-dark dark:text-white">
              {t('salons')}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-white/95 dark:bg-salon-dark/95 backdrop-blur-sm p-3 rounded-md min-w-[200px]">
              <ul className="grid gap-2">
                <li>
                  <button 
                    onClick={() => handleProtectedNavigation('/salons')}
                    className="w-full text-left block p-2 hover:bg-muted rounded-md transition-colors">
                    {t('allSalons')}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleProtectedNavigation('/salons?featured=true')}
                    className="w-full text-left block p-2 hover:bg-muted rounded-md transition-colors">
                    {t('featuredSalons')}
                  </button>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <button 
              onClick={() => handleProtectedNavigation('/braiders')}
              className={cn(
                "text-salon-dark dark:text-white hover:text-salon-primary transition-colors px-3 py-2",
                location.pathname === "/braiders" && "text-salon-primary font-medium"
              )}>
              {t('braiders')}
            </button>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <Link to="/about" className={cn(
              "text-salon-dark dark:text-white hover:text-salon-primary transition-colors px-3 py-2",
              location.pathname === "/about" && "text-salon-primary font-medium"
            )}>
              {t('about')}
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNav;
