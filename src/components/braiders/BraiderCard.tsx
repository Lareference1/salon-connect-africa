
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, MessageSquare, Calendar, Check, Clock } from 'lucide-react';
import { BraiderData } from '@/data/braidersData';

interface BraiderCardProps {
  braider: BraiderData;
}

const BraiderCard = ({ braider }: BraiderCardProps) => {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-500';
      case 'soon':
        return 'text-amber-500';
      case 'unavailable':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getAvailabilityIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Check className="h-4 w-4 mr-1" />;
      case 'soon':
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-64">
        <img 
          src={braider.image} 
          alt={braider.name}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{braider.name}</h3>
        
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{braider.location}</span>
        </div>
        
        <div className="flex items-center text-gray-500 mb-2">
          <Star className="h-4 w-4 text-salon-accent2 fill-salon-accent2 mr-1" />
          <span className="text-sm">{braider.rating} ({braider.reviews} avis)</span>
        </div>
        
        <div className={`flex items-center mb-3 ${getAvailabilityColor(braider.status)}`}>
          {getAvailabilityIcon(braider.status)}
          <span className="text-sm">{braider.availability} · {braider.experience} d'expérience</span>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-1">Spécialités:</h4>
          <div className="flex flex-wrap gap-1">
            {braider.specialties.map((specialty, index) => (
              <span 
                key={index}
                className="inline-block bg-salon-primary/10 text-salon-primary text-xs px-2 py-1 rounded"
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
            className="flex-1 bg-salon-primary hover:bg-salon-primary/90"
            disabled={braider.status === 'unavailable'}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Contacter
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10"
            disabled={braider.status === 'unavailable'}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Planifier
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BraiderCard;
