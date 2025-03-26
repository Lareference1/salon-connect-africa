
import { useState } from 'react';
import { Star, MapPin, Briefcase, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthContext';
import { Badge } from '@/components/ui/badge';
import SalonEditForm from './SalonEditForm';
import { SalonData } from '@/data/salonsData';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SalonCardProps {
  salon: SalonData;
  onUpdate?: (id: number | string, data: Partial<SalonData>) => void;
}

const SalonCard = ({ salon, onUpdate }: SalonCardProps) => {
  const { user } = useAuth();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleUpdate = (id: number | string, data: Partial<SalonData>) => {
    if (onUpdate) {
      onUpdate(id, data);
    }
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={salon.image}
            alt={salon.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {salon.hiringStatus && (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                Hiring
              </Badge>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 dark:text-white">{salon.name}</h3>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{salon.location}</span>
          </div>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className={cn("h-4 w-4", salon.rating >= 4.5 ? "text-yellow-400" : "text-gray-400")} />
              <span className="ml-1 text-sm font-medium">{salon.rating.toFixed(1)}</span>
            </div>
            <span className="mx-2 text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{salon.reviews} reviews</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {salon.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100 dark:bg-gray-700 text-xs">
                {specialty}
              </Badge>
            ))}
            {salon.specialties.length > 3 && (
              <Badge variant="outline" className="bg-gray-100 dark:bg-gray-700 text-xs">
                +{salon.specialties.length - 3}
              </Badge>
            )}
          </div>
          
          {salon.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {salon.description}
            </p>
          )}
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-salon-primary border-salon-primary hover:bg-salon-primary/10"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Contact Information</h4>
                {salon.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-salon-primary" />
                    <span>{salon.phone}</span>
                  </div>
                )}
                {salon.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="h-4 w-4 text-salon-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>{salon.email}</span>
                  </div>
                )}
                {!salon.phone && !salon.email && (
                  <p className="text-sm text-gray-500">No contact information available</p>
                )}
                {salon.website && (
                  <div className="pt-2">
                    <a 
                      href={salon.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-salon-primary hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {isEditOpen && (
        <SalonEditForm 
          salon={salon} 
          open={isEditOpen} 
          onClose={handleEditClose} 
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default SalonCard;
