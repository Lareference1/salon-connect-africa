
import React from 'react';
import { FormField, FormItem, FormControl, FormDescription, FormLabel } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Control } from 'react-hook-form';

interface SalonFieldsProps {
  control: Control<any>;
}

const SalonFields = ({ control }: SalonFieldsProps) => {
  return (
    <FormField
      control={control}
      name="hiringStatus"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>Currently Hiring</FormLabel>
            <FormDescription>
              Check this if your salon is currently looking for braiders.
            </FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

export default SalonFields;
