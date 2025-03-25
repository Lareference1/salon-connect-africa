
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '@/components/profile/ProfileForm';
import BraiderForm from '@/components/profile/BraiderForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FloatingElement from '@/components/FloatingElement';

const UserProfileForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isUserBraider, setIsUserBraider] = useState(false);
  
  // Handle user type change from profile form
  const handleUserTypeChange = (userType: string) => {
    setIsUserBraider(userType === 'braider');
    if (userType === 'braider' && activeTab !== 'braider') {
      setActiveTab('braider');
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      // Here you would typically fetch the user profile and set the active tab
      // based on the user type
      // For now, we'll just set the active tab to 'profile'
      setActiveTab('profile');
    };

    fetchUserProfile();
  }, [user]);

  if (!user) {
    return (
      <div className="text-center p-8">
        <p>Please sign in to edit your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-salon-dark/80 backdrop-blur-lg rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-display mb-6 text-salon-dark dark:text-white">Your Profile</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          {isUserBraider && (
            <TabsTrigger value="braider">Braider Details</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="profile">
          <FloatingElement amplitude="small" delay={0.1}>
            <ProfileForm user={user} onTypeChange={handleUserTypeChange} />
          </FloatingElement>
        </TabsContent>
        
        {isUserBraider && (
          <TabsContent value="braider">
            <FloatingElement amplitude="small" delay={0.2}>
              <BraiderForm user={user} />
            </FloatingElement>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default UserProfileForm;
