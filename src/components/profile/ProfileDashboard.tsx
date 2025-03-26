
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Building2 } from 'lucide-react';
import PersonalInfoCard from './dashboard/PersonalInfoCard';
import ProfessionalInfoCard from './dashboard/ProfessionalInfoCard';
import ProfileLoadingState from './dashboard/ProfileLoadingState';
import ProfileEmptyState from './dashboard/ProfileEmptyState';

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
    return <ProfileLoadingState />;
  }

  if (!profileData) {
    return <ProfileEmptyState />;
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
          <PersonalInfoCard profileData={profileData} />
        </TabsContent>
        
        <TabsContent value="professional">
          {isBraider && <ProfessionalInfoCard profileData={profileData} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileDashboard;
