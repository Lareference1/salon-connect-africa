
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star } from 'lucide-react';
import { BraiderData } from '@/data/braidersData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import BraiderSpecialties from "./BraiderSpecialties";
import BraiderAvailability from "./BraiderAvailability";
import BraiderContactButtons from "./BraiderContactButtons";
import BraiderEditForm from "./BraiderEditForm";

interface BraiderCardProps {
  braider: BraiderData;
  onUpdate?: (id: number | string, updatedData: Partial<BraiderData>) => void;
}

const BraiderCard = ({ braider, onUpdate }: BraiderCardProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedBraider: BraiderData) => {
    if (onUpdate) {
      onUpdate(braider.id, updatedBraider);
      toast({
        title: "Modifications enregistrées",
        description: "Les informations ont été mises à jour avec succès.",
      });
    }
    setIsEditing(false);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-40 sm:h-52">
          <img 
            src={braider.image} 
            alt={braider.name}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg sm:text-xl font-semibold line-clamp-1">{braider.name}</h3>
          </div>
          
          <div className="flex items-center text-gray-500 mb-1 sm:mb-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
            <span className="text-xs sm:text-sm truncate">{braider.location}</span>
          </div>
          
          <div className="flex items-center text-gray-500 mb-2">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-salon-accent2 fill-salon-accent2 mr-1 flex-shrink-0" />
            <span className="text-xs sm:text-sm">{braider.rating} ({braider.reviews} avis)</span>
          </div>
          
          <BraiderAvailability 
            status={braider.status} 
            availability={braider.availability} 
            experience={braider.experience}
          />

          {braider.bio && (
            <div className="mb-3">
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{braider.bio}</p>
            </div>
          )}
          
          <BraiderSpecialties specialties={braider.specialties} />
          
          <div className="mt-auto pt-2">
            <BraiderContactButtons isAvailable={braider.status !== 'unavailable'} />
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier les informations</DialogTitle>
          </DialogHeader>
          <BraiderEditForm 
            braider={braider} 
            onSave={handleSave} 
            onCancel={() => setIsEditing(false)} 
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BraiderCard;
