
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface ProfileTypeSelectorProps {
  control: Control<any>;
}

const ProfileTypeSelector = ({ control }: ProfileTypeSelectorProps) => {
  return (
    <FormField
      control={control}
      name="profileType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Profile Type</FormLabel>
          <FormControl>
            <div className="flex gap-4">
              <div 
                className={`flex-1 border rounded-md p-4 cursor-pointer transition-colors ${field.value === "salon" ? "border-primary bg-primary/10" : "border-muted"}`}
                onClick={() => field.onChange("salon")}
              >
                <div className="font-medium mb-1">Salon</div>
                <div className="text-sm text-muted-foreground">Create a salon or business profile</div>
              </div>
              <div 
                className={`flex-1 border rounded-md p-4 cursor-pointer transition-colors ${field.value === "braider" ? "border-primary bg-primary/10" : "border-muted"}`}
                onClick={() => field.onChange("braider")}
              >
                <div className="font-medium mb-1">Braider</div>
                <div className="text-sm text-muted-foreground">Create a braider profile</div>
              </div>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default ProfileTypeSelector;
