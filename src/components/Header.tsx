
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User, Scissors, ChevronDown } from "lucide-react";
import LanguageThemeToggle from './LanguageThemeToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "w-full bg-white/95 dark:bg-salon-dark/95 dark:text-white py-4 sticky top-0 z-50 transition-all duration-300",
      isScrolled ? "shadow-md backdrop-blur-sm" : "shadow-sm"
    )}>
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
                      <Link to="/salons" className="block p-2 hover:bg-muted rounded-md transition-colors">
                        {t('allSalons')}
                      </Link>
                    </li>
                    <li>
                      <Link to="/salons?featured=true" className="block p-2 hover:bg-muted rounded-md transition-colors">
                        {t('featuredSalons')}
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/braiders" className={cn(
                  "text-salon-dark dark:text-white hover:text-salon-primary transition-colors px-3 py-2",
                  location.pathname === "/braiders" && "text-salon-primary font-medium"
                )}>
                  {t('braiders')}
                </Link>
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
        
        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageThemeToggle />
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted/50">
            <User className="h-5 w-5" />
          </Button>
          <Button className="bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/90 hover:to-salon-primary shadow-md hover:shadow-lg transition-all duration-300 border-0 rounded-full px-6 text-sm">
            {t('signUp')}
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageThemeToggle />
          <Button 
            variant="ghost"
            size="icon"
            className="flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-salon-dark/95 backdrop-blur-sm shadow-md py-4 px-4 z-50 animate-fade-in">
          <nav className="flex flex-col space-y-1">
            <Link 
              to="/" 
              className={cn(
                "text-salon-dark dark:text-white hover:text-salon-primary transition-colors py-3 px-3 rounded-md",
                location.pathname === "/" && "bg-muted dark:bg-muted text-salon-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
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
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('allSalons')}
                </Link>
                <Link 
                  to="/salons?featured=true" 
                  className="block py-2 text-salon-dark dark:text-white hover:text-salon-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
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
              onClick={() => setIsMenuOpen(false)}
            >
              {t('braiders')}
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-salon-dark dark:text-white hover:text-salon-primary transition-colors py-3 px-3 rounded-md",
                location.pathname === "/about" && "bg-muted dark:bg-muted text-salon-primary"
              )}
              onClick={() => setIsMenuOpen(false)}
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
              <Button className="w-full bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/90 hover:to-salon-primary shadow-md hover:shadow-lg transition-all duration-300 border-0 rounded-full text-sm">
                {t('signUp')}
              </Button>
              <Button variant="outline" className="w-full rounded-full text-sm">
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
