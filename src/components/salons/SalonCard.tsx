
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SalonProps {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
  image: string;
  hiringStatus: boolean;
}

const SalonCard = ({ salon }: { salon: SalonProps }) => {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
      <div className="relative h-48">
        <img 
          src={salon.image} 
          alt={salon.name}
          className="h-full w-full object-cover"
        />
        {salon.hiringStatus && (
          <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
            {t('hiring')}
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 dark:text-white">{salon.name}</h3>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{salon.location}</span>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
          <span className="text-sm">{salon.rating} ({salon.reviews} reviews)</span>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-1 dark:text-gray-300">{t('specialties')}</h4>
          <div className="flex flex-wrap gap-1">
            {salon.specialties.map((specialty, index) => (
              <span 
                key={index}
                className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded dark:bg-orange-900/20 dark:text-orange-300"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
          >
            <Phone className="h-4 w-4 mr-1" />
            Contact
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            <Calendar className="h-4 w-4 mr-1" />
            Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonCard;
