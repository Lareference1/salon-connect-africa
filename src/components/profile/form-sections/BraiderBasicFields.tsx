
import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { BraiderFormValues } from './useBraiderProfileForm';

interface BraiderBasicFieldsProps {
  control: Control<BraiderFormValues>;
}

const BraiderBasicFields = ({ control }: BraiderBasicFieldsProps) => {
  return (
    <>
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input placeholder="Paris, France" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Experience</FormLabel>
            <FormControl>
              <Input placeholder="5 years" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default BraiderBasicFields;
