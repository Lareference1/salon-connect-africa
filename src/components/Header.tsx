
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import LanguageThemeToggle from './LanguageThemeToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

// Import our new components
import Logo from './header/Logo';
import DesktopNav from './header/DesktopNav';
import ActionButtons from './header/ActionButtons';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSignUp = () => {
    setIsLoading(true);
    // Simulate API call or authentication process
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you'd navigate to the sign-up page after authentication
      window.location.href = '/signup';
    }, 1000);
  };

  return (
    <header className={cn(
      "w-full bg-white/95 dark:bg-salon-dark/95 dark:text-white py-4 sticky top-0 z-50 transition-all duration-300",
      isScrolled ? "shadow-md backdrop-blur-sm" : "shadow-sm"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        
        {/* Desktop Navigation */}
        <DesktopNav />
        
        {/* Action Buttons - Desktop */}
        <ActionButtons isLoading={isLoading} onSignUp={handleSignUp} />
        
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
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        isLoading={isLoading} 
        onSignUp={handleSignUp} 
      />
    </header>
  );
};

export default Header;
