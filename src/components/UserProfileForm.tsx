
import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';

import { Card, CardContent } from '@/components/ui/card';
import PersonalProfileForm from './profile/PersonalProfileForm';

const UserProfileForm = () => {
  const { user } = useAuth();
  
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
      
      <Card>
        <CardContent className="pt-6">
          <PersonalProfileForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileForm;
