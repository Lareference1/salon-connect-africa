
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-display text-salon-primary tracking-wide">SalonConnect</span>
          <span className="text-salon-accent1 ml-1 text-sm">Africa</span>
        </Link>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-salon-dark hover:text-salon-primary transition-colors">
            Accueil
          </Link>
          <Link to="/salons" className="text-salon-dark hover:text-salon-primary transition-colors">
            Salons
          </Link>
          <Link to="/braiders" className="text-salon-dark hover:text-salon-primary transition-colors">
            Tresseuses
          </Link>
          <Link to="/about" className="text-salon-dark hover:text-salon-primary transition-colors">
            À propos
          </Link>
        </nav>
        
        {/* Action Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button className="bg-salon-primary hover:bg-salon-primary/90">
            S'inscrire
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-4 z-50">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-salon-dark hover:text-salon-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/salons" 
              className="text-salon-dark hover:text-salon-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Salons
            </Link>
            <Link 
              to="/braiders" 
              className="text-salon-dark hover:text-salon-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tresseuses
            </Link>
            <Link 
              to="/about" 
              className="text-salon-dark hover:text-salon-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button className="w-full bg-salon-primary hover:bg-salon-primary/90">
                S'inscrire
              </Button>
              <Button variant="outline" className="w-full">
                Connexion
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
