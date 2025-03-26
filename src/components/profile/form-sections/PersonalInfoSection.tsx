
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ProfileImageUpload from '../ProfileImageUpload';
import { User } from 'lucide-react';

type PersonalInfoSectionProps = {
  control: Control<any>;
  profileImage: string | null;
  onImageChange: (image: string) => void;
};

const PersonalInfoSection = ({ 
  control, 
  profileImage, 
  onImageChange 
}: PersonalInfoSectionProps) => {
  return (
    <>
      <div className="flex items-center gap-6 mb-6">
        <Avatar className="w-20 h-20 border-2 border-muted">
          {profileImage ? (
            <AvatarImage src={profileImage} alt="Profile" />
          ) : (
            <AvatarFallback className="bg-muted">
              <User className="h-8 w-8 text-muted-foreground" />
            </AvatarFallback>
          )}
        </Avatar>
        
        <ProfileImageUpload 
          profileImage={profileImage} 
          onImageChange={onImageChange} 
        />
      </div>
      
      <FormField
        control={control}
        name="fullName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Full Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your full name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell us a bit about yourself" 
                className="resize-none" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PersonalInfoSection;
