
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FloatingElement from '@/components/FloatingElement';
import { User, Building2, Clock, MapPin, Bookmark } from 'lucide-react';

interface ProfileData {
  full_name?: string;
  bio?: string;
  email?: string;
  phone?: string;
  preferred_contact?: 'email' | 'phone';
  image?: string;
  location?: string;
  experience?: string;
  specialties?: string[];
  profile_type?: string;
}

const ProfileDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          // Create a properly typed profile data object
          const typedProfileData: ProfileData = {
            full_name: data.full_name,
            bio: data.bio,
            email: data.email,
            phone: data.phone,
            image: data.image,
            location: data.location,
            experience: data.experience,
            specialties: data.specialties,
            profile_type: data.profile_type,
            // Ensure preferred_contact is either 'email', 'phone' or undefined
            preferred_contact: data.preferred_contact === 'email' || data.preferred_contact === 'phone' 
              ? data.preferred_contact as 'email' | 'phone' 
              : 'email' // Default to email if value is invalid
          };
          
          setProfileData(typedProfileData);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, toast]);

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-salon-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-2 text-muted-foreground">Loading profile information...</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-muted-foreground">No profile information found.</p>
        <a href="/settings" className="text-salon-primary hover:underline">
          Complete your profile settings
        </a>
      </div>
    );
  }

  const isBraider = profileData.profile_type === 'braider';

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal">
            <User className="h-4 w-4 mr-2" />
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="professional" disabled={!isBraider}>
            <Building2 className="h-4 w-4 mr-2" />
            Professional Info
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
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
        </TabsContent>
        
        <TabsContent value="professional">
          {isBraider && (
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
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileDashboard;
