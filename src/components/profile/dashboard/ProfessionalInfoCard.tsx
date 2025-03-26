
import { Building2, MapPin, Clock, Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import FloatingElement from '@/components/FloatingElement';

interface ProfessionalInfoCardProps {
  profileData: {
    location?: string;
    experience?: string;
    specialties?: string[];
  };
}

const ProfessionalInfoCard = ({ profileData }: ProfessionalInfoCardProps) => {
  return (
    <FloatingElement amplitude="small" delay={0.1}>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-xl font-medium mb-4">Professional Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileData.location && (
              <div className="p-4 rounded-lg bg-background/50 border">
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-salon-primary" />
                  <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                </div>
                <p className="text-sm">{profileData.location}</p>
              </div>
            )}
            
            {profileData.experience && (
              <div className="p-4 rounded-lg bg-background/50 border">
                <div className="flex items-center mb-2">
                  <Clock className="h-4 w-4 mr-2 text-salon-primary" />
                  <h4 className="text-sm font-medium text-muted-foreground">Experience</h4>
                </div>
                <p className="text-sm">{profileData.experience}</p>
              </div>
            )}
          </div>
          
          {profileData.specialties && profileData.specialties.length > 0 && (
            <div className="p-4 rounded-lg bg-background/50 border">
              <div className="flex items-center mb-2">
                <Bookmark className="h-4 w-4 mr-2 text-salon-primary" />
                <h4 className="text-sm font-medium text-muted-foreground">Specialties</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileData.specialties.map((specialty, index) => (
                  <div 
                    key={index} 
                    className="bg-salon-primary/10 text-salon-primary text-xs px-2 py-1 rounded"
                  >
                    {specialty}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </FloatingElement>
  );
};

export default ProfessionalInfoCard;
