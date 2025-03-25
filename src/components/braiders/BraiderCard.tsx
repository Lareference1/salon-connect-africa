
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Edit } from 'lucide-react';
import { BraiderData } from '@/data/braidersData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import BraiderSpecialties from "./BraiderSpecialties";
import BraiderAvailability from "./BraiderAvailability";
import BraiderContactButtons from "./BraiderContactButtons";
import BraiderEditForm from "./BraiderEditForm";

interface BraiderCardProps {
  braider: BraiderData;
  onUpdate?: (id: number, updatedData: Partial<BraiderData>) => void;
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
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-64">
          <img 
            src={braider.image} 
            alt={braider.name}
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{braider.name}</h3>
              {onUpdate && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-salon-primary text-white border-none hover:bg-salon-primary/90"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{braider.location}</span>
          </div>
          
          <div className="flex items-center text-gray-500 mb-2">
            <Star className="h-4 w-4 text-salon-accent2 fill-salon-accent2 mr-1" />
            <span className="text-sm">{braider.rating} ({braider.reviews} avis)</span>
          </div>
          
          <BraiderAvailability 
            status={braider.status} 
            availability={braider.availability} 
            experience={braider.experience}
          />

          {braider.bio && (
            <div className="mb-3">
              <p className="text-sm text-gray-600">{braider.bio}</p>
            </div>
          )}
          
          <BraiderSpecialties specialties={braider.specialties} />
          
          <BraiderContactButtons isAvailable={braider.status !== 'unavailable'} />
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
