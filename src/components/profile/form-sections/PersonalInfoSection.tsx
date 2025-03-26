
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ProfileImageUpload from '../ProfileImageUpload';

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
      <ProfileImageUpload 
        profileImage={profileImage} 
        onImageChange={onImageChange} 
      />
      
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
