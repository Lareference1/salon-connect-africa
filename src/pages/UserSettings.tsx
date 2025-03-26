
import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import SettingsLayout from '@/components/settings/SettingsLayout';
import SettingsNavigation from '@/components/settings/SettingsNavigation';
import SettingsContent from '@/components/settings/SettingsContent';

// Settings options type
type SettingsOption = 'personal' | 'business' | 'privacy';

const UserSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeOption, setActiveOption] = useState<SettingsOption>('personal');
  
  // If not authenticated, redirect to auth page with a message
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access your profile settings.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, navigate, toast]);

  // If user is not authenticated, don't render the rest of the component
  if (!user) {
    return null;
  }

  // Handle setting option click
  const handleOptionClick = (option: SettingsOption) => {
    setActiveOption(option);
  };

  return (
    <SettingsLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <SettingsNavigation 
            activeOption={activeOption} 
            onOptionClick={handleOptionClick} 
          />
        </div>
        
        <div className="lg:col-span-8">
          <SettingsContent activeOption={activeOption} />
        </div>
      </div>
    </SettingsLayout>
  );
};

export default UserSettings;
