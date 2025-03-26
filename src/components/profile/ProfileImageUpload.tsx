
import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';

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
    <div className="space-y-2">
      <Label>Profile Photo</Label>
      <div className="flex items-center space-x-4">
        <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
          <img 
            src={profileImage || '/placeholder.svg'} 
            alt="Profile" 
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor={inputId} className="cursor-pointer">
            <div className="flex items-center border border-input rounded-md p-2 hover:bg-accent">
              <Upload className="h-4 w-4 mr-2" />
              <span>Upload photo</span>
            </div>
            <input 
              type="file" 
              id={inputId} 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange}
            />
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUpload;
