
import { useState } from 'react';
import FloatingElement from '@/components/FloatingElement';
import UserProfileForm from '@/components/UserProfileForm';
import BusinessProfileSettings from './BusinessProfileSettings';
import PrivacySettings from './PrivacySettings';

type SettingsOption = 'personal' | 'business' | 'privacy';

interface SettingsContentProps {
  activeOption: SettingsOption;
}

const SettingsContent = ({ activeOption }: SettingsContentProps) => {
  return (
    <FloatingElement amplitude="small" delay={0.4}>
      <div className="glass-card p-6 md:p-8">
        {activeOption === 'personal' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-medium mb-4">Personal Information</h2>
            <p className="text-muted-foreground mb-6">
              Update your personal information and account settings.
            </p>
            <UserProfileForm />
          </div>
        )}

        {activeOption === 'business' && <BusinessProfileSettings />}

        {activeOption === 'privacy' && <PrivacySettings />}
      </div>
    </FloatingElement>
  );
};

export default SettingsContent;
