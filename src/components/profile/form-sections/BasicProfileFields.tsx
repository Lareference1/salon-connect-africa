
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import ProfileImageUpload from '../ProfileImageUpload';

interface BasicProfileFieldsProps {
  control: Control<any>;
  profileImage: string | null;
  onImageChange: (image: string) => void;
}

const BasicProfileFields = ({ control, profileImage, onImageChange }: BasicProfileFieldsProps) => {
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
          inputId="profilePicUpload"
        />
      </div>

      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your name or business name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="City, State" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell clients about your services..." 
                className="min-h-[120px]" 
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

export default BasicProfileFields;
