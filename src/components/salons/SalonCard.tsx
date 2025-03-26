
import { useState } from 'react';
import { Star, MapPin, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthContext';
import { Badge } from '@/components/ui/badge';
import SalonEditForm from './SalonEditForm';
import { SalonData } from '@/data/salonsData';

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
          
          <Button 
            variant={salon.hiringStatus ? "default" : "outline"} 
            size="sm" 
            className={salon.hiringStatus ? "w-full bg-salon-primary hover:bg-salon-primary/90" : "w-full"}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            {salon.hiringStatus ? "Apply Now" : "View Details"}
          </Button>
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
