
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-salon-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display mb-4 text-salon-primary">SalonConnect Africa</h3>
            <p className="text-sm text-gray-300 mb-4">
              Connecting African hair salons with qualified braiders for exceptional service.
              Our platform helps salons find experienced professionals and helps braiders find work.
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
            <h4 className="text-lg font-medium mb-4">{t('navigation')}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-salon-primary transition-colors">{t('home')}</Link></li>
              <li><Link to="/salons" className="hover:text-salon-primary transition-colors">{t('salons')}</Link></li>
              <li><Link to="/braiders" className="hover:text-salon-primary transition-colors">{t('braiders')}</Link></li>
              <li><Link to="/about" className="hover:text-salon-primary transition-colors">{t('about')}</Link></li>
              <li><Link to="/dashboard" className="hover:text-salon-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/settings" className="hover:text-salon-primary transition-colors">Settings</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">{t('services')}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-salon-primary transition-colors">Salon Search</a></li>
              <li><a href="#" className="hover:text-salon-primary transition-colors">Braider Recruitment</a></li>
              <li><a href="#" className="hover:text-salon-primary transition-colors">Booking Services</a></li>
              <li><a href="#" className="hover:text-salon-primary transition-colors">Professional Training</a></li>
              <li><a href="#" className="hover:text-salon-primary transition-colors">Salon Directory</a></li>
              <li><a href="#" className="hover:text-salon-primary transition-colors">Business Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">{t('contact')}</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: info@salonconnect.africa</li>
              <li>Phone: +1 (234) 567-8901</li>
              <li>Address: 123 Salon St, New York, NY 10001</li>
              <li className="pt-2">
                <Link to="/terms" className="hover:text-salon-primary transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-salon-primary transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} SalonConnect Africa. {t('copyright')} All rights reserved. Connecting salon owners and qualified braiders across Africa and beyond.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
