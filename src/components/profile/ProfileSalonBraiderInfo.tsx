
import { useState, useEffect } from 'react';
import { 
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { ProfileFormValues } from '@/types/profile';

interface ProfileSalonBraiderInfoProps {
  form: UseFormReturn<ProfileFormValues>;
}

const ProfileSalonBraiderInfo = ({ form }: ProfileSalonBraiderInfoProps) => {
  const [showFields, setShowFields] = useState(false);
  const userType = form.watch('userType');
  
  useEffect(() => {
    setShowFields(userType === 'salon' || userType === 'braider');
  }, [userType]);
  
  if (!showFields) return null;
  
  return (
    <div className="space-y-4 rounded-lg border p-4 bg-muted/30">
      <h3 className="text-lg font-medium">
        {userType === 'salon' ? 'Salon Information' : 'Braider Information'}
      </h3>
      
      <FormField
        control={form.control}
        name="businessName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{userType === 'salon' ? 'Salon Name' : 'Business Name'}</FormLabel>
            <FormControl>
              <Input placeholder="Enter your business name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
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
        control={form.control}
        name="specialties"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Specialties</FormLabel>
            <FormControl>
              <Input placeholder="Box Braids, Cornrows, etc. (separate with commas)" {...field} />
            </FormControl>
            <FormDescription>
              Enter your specialties separated by commas
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {userType === 'salon' && (
        <FormField
          control={form.control}
          name="hiringStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currently Hiring?</FormLabel>
              <FormControl>
                <select 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                >
                  <option value="true">Yes, we're hiring</option>
                  <option value="false">Not currently hiring</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      {userType === 'braider' && (
        <FormField
          control={form.control}
          name="experience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Years of Experience</FormLabel>
              <FormControl>
                <Input type="number" placeholder="5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      
      <FormField
        control={form.control}
        name="businessDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Business Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Tell potential clients about your services" 
                className="resize-none h-24" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProfileSalonBraiderInfo;
