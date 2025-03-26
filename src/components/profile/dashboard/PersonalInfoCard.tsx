
import { User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import FloatingElement from '@/components/FloatingElement';

interface PersonalInfoCardProps {
  profileData: {
    full_name?: string;
    bio?: string;
    email?: string;
    phone?: string;
    preferred_contact?: 'email' | 'phone';
    image?: string;
  };
}

const PersonalInfoCard = ({ profileData }: PersonalInfoCardProps) => {
  return (
    <FloatingElement amplitude="small" delay={0.1}>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
              <img 
                src={profileData.image || '/placeholder.svg'} 
                alt="Profile" 
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-medium">{profileData.full_name || 'Anonymous User'}</h3>
              <p className="text-sm text-muted-foreground">{profileData.email}</p>
            </div>
          </div>
          
          {profileData.bio && (
            <div className="p-4 rounded-lg bg-background/50 border">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">About</h4>
              <p className="text-sm">{profileData.bio}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-background/50 border">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Contact</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Email:</span>
                  <span className="text-sm font-medium">{profileData.email}</span>
                </div>
                {profileData.phone && (
                  <div className="flex justify-between">
                    <span className="text-sm">Phone:</span>
                    <span className="text-sm font-medium">{profileData.phone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sm">Preferred Contact:</span>
                  <span className="text-sm font-medium capitalize">
                    {profileData.preferred_contact || 'Email'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </FloatingElement>
  );
};

export default PersonalInfoCard;
