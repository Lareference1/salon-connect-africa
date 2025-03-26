
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Control } from 'react-hook-form';

interface AvailabilitySelectorProps {
  control: Control<any>;
}

const AvailabilitySelector = ({ control }: AvailabilitySelectorProps) => {
  return (
    <FormField
      control={control}
      name="availability"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Availability</FormLabel>
          <FormControl>
            <div className="flex gap-4">
              <div 
                className={`flex-1 border rounded-md p-4 cursor-pointer transition-colors ${field.value === "available" ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-muted"}`}
                onClick={() => field.onChange("available")}
              >
                <div className="font-medium mb-1 text-green-600 dark:text-green-400">Available</div>
                <div className="text-sm text-muted-foreground">I'm currently available for bookings</div>
              </div>
              <div 
                className={`flex-1 border rounded-md p-4 cursor-pointer transition-colors ${field.value === "unavailable" ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-muted"}`}
                onClick={() => field.onChange("unavailable")}
              >
                <div className="font-medium mb-1 text-red-600 dark:text-red-400">Not Available</div>
                <div className="text-sm text-muted-foreground">I'm not currently taking bookings</div>
              </div>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default AvailabilitySelector;
