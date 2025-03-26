
import { Building2, Lock, User } from 'lucide-react';

type SettingsOption = 'personal' | 'business' | 'privacy';

interface SettingsNavigationProps {
  activeOption: SettingsOption;
  onOptionClick: (option: SettingsOption) => void;
}

const SettingsNavigation = ({ activeOption, onOptionClick }: SettingsNavigationProps) => {
  return (
    <div className="glass-card p-6 md:p-8 mb-8">
      <h1 className="text-3xl md:text-4xl font-display text-salon-dark dark:text-white mb-2">
        Settings
      </h1>
      <p className="text-muted-foreground">
        Manage your personal information and business profiles
      </p>
      
      <div className="mt-8 space-y-4">
        <div 
          className={`p-4 rounded-lg ${activeOption === 'personal' ? 'bg-primary/10 border border-primary/30' : 'bg-primary/5 border border-primary/10'} 
          transform-gpu hover:-translate-y-1 transition-all cursor-pointer`}
          onClick={() => onOptionClick('personal')}
        >
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2 text-primary" />
            <h3 className="font-medium">Personal Information</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Update your basic profile information</p>
        </div>
        
        <div 
          className={`p-4 rounded-lg ${activeOption === 'business' ? 'bg-accent/10 border border-accent/30' : 'bg-accent/5 border border-accent/10'} 
          transform-gpu hover:-translate-y-1 transition-all cursor-pointer`}
          onClick={() => onOptionClick('business')}
        >
          <div className="flex items-center">
            <Building2 className="h-5 w-5 mr-2 text-accent" />
            <h3 className="font-medium">Business Profile</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Create a salon or braider listing</p>
        </div>
        
        <div 
          className={`p-4 rounded-lg ${activeOption === 'privacy' ? 'bg-secondary/10 border border-secondary/30' : 'bg-secondary/5 border border-secondary/10'} 
          transform-gpu hover:-translate-y-1 transition-all cursor-pointer`}
          onClick={() => onOptionClick('privacy')}
        >
          <div className="flex items-center">
            <Lock className="h-5 w-5 mr-2 text-secondary" />
            <h3 className="font-medium">Privacy Settings</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Manage your data and privacy options</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsNavigation;
