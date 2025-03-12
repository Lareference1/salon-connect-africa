
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-salon-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display mb-4 text-salon-primary">SalonConnect Africa</h3>
            <p className="text-sm text-gray-300 mb-4">
              Connecter les salons de coiffure africains aux tresseuses qualifiées pour un service exceptionnel.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-salon-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-salon-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-salon-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-salon-primary transition-colors">Accueil</Link></li>
              <li><Link to="/salons" className="hover:text-salon-primary transition-colors">Salons</Link></li>
              <li><Link to="/braiders" className="hover:text-salon-primary transition-colors">Tresseuses</Link></li>
              <li><Link to="/about" className="hover:text-salon-primary transition-colors">À propos</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-salon-primary transition-colors">Recherche de salon</a></li>
              <li><a href="#" className="hover:text-salon-primary transition-colors">Recrutement de tresseuses</a></li>
              <li><a href="#" className="hover:text-salon-primary transition-colors">Réservations</a></li>
              <li><a href="#" className="hover:text-salon-primary transition-colors">Formations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>info@salonconnect.africa</li>
              <li>+1 (234) 567-8901</li>
              <li>New York, NY 10001</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} SalonConnect Africa. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
