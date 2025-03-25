
import { MapPin, Star, Phone, Calendar } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

export interface SalonData {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
  image: string;
  hiringStatus: boolean;
}

interface SalonCardProps {
  salon: SalonData;
}

const SalonCard = ({ salon }: SalonCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card key={salon.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 h-full flex flex-col">
      <div className="relative h-40 sm:h-48">
        <img 
          src={salon.image} 
          alt={salon.name}
          className="h-full w-full object-cover"
        />
        {salon.hiringStatus && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {t('hiring')}
          </div>
        )}
      </div>
      <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold mb-2 dark:text-white line-clamp-1">{salon.name}</h3>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1 sm:mb-2">
          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
          <span className="text-xs sm:text-sm truncate">{salon.location}</span>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2 sm:mb-3">
          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-salon-accent2 fill-salon-accent2 mr-1 flex-shrink-0" />
          <span className="text-xs sm:text-sm">{salon.rating} ({salon.reviews} avis)</span>
        </div>
        
        <div className="mb-3 sm:mb-4 flex-grow">
          <h4 className="text-xs sm:text-sm font-medium mb-1 dark:text-gray-300">{t('specialties')}</h4>
          <div className="flex flex-wrap gap-1">
            {salon.specialties.slice(0, 3).map((specialty, index) => (
              <span 
                key={index}
                className="inline-block bg-salon-primary/10 text-salon-primary text-xs px-2 py-0.5 rounded dark:bg-salon-primary/20"
              >
                {specialty}
              </span>
            ))}
            {salon.specialties.length > 3 && (
              <span className="inline-block text-xs text-gray-500">+{salon.specialties.length - 3}</span>
            )}
          </div>
        </div>
        
        <div className="flex space-x-2 mt-auto">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 bg-salon-primary hover:bg-salon-primary/90 text-xs sm:text-sm py-1 h-auto"
          >
            <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Contact
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10 dark:text-white dark:border-white text-xs sm:text-sm py-1 h-auto"
          >
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Rendez-vous
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonCard;
