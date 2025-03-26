
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useAuth } from '@/components/auth/AuthContext';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import PersonalProfileForm from './profile/PersonalProfileForm';
import BraiderProfileForm from './profile/BraiderProfileForm';

type PreferredContactType = 'email' | 'phone';

const UserProfileForm = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  
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
          <TabsTrigger value="braider">Braider Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <PersonalProfileForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="braider">
          <Card>
            <CardContent className="pt-6">
              <BraiderProfileForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfileForm;
