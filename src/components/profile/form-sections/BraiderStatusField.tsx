
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Control } from 'react-hook-form';
import { BraiderFormValues } from './useBraiderProfileForm';

interface BraiderStatusFieldProps {
  control: Control<BraiderFormValues>;
}

const BraiderStatusField = ({ control }: BraiderStatusFieldProps) => {
  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Availability Status</FormLabel>
          <FormControl>
            <select 
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={field.value}
              onChange={field.onChange}
            >
              <option value="available">Available</option>
              <option value="soon">Available Soon</option>
              <option value="unavailable">Not Available</option>
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BraiderStatusField;
