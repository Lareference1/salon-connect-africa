
import { useState } from 'react';
import { Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileImageUploadProps {
  profileImage: string | null;
  onImageChange: (image: string) => void;
  inputId?: string;
}

const ProfileImageUpload = ({ 
  profileImage, 
  onImageChange,
  inputId = "profileImageUpload"
}: ProfileImageUploadProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={() => document.getElementById(inputId)?.click()}
      >
        <Camera className="h-4 w-4" />
        <span>Upload Profile Photo</span>
      </Button>
      <p className="text-xs text-muted-foreground">
        Upload a professional profile photo. JPG or PNG, up to 2MB.
      </p>
      <input 
        type="file" 
        id={inputId} 
        accept="image/*" 
        className="hidden" 
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfileImageUpload;
