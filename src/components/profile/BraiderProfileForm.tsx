
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ProfileImageUpload from './ProfileImageUpload';
import SpecialtiesList from './SpecialtiesList';
import SubmitButton from './SubmitButton';

const braiderSchema = z.object({
  location: z.string().min(2, 'Location must be at least 2 characters'),
  experience: z.string(),
  status: z.enum(['available', 'soon', 'unavailable']).default('available'),
  specialties: z.array(z.string()),
});

type BraiderFormValues = z.infer<typeof braiderSchema>;

const BraiderProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const form = useForm<BraiderFormValues>({
    resolver: zodResolver(braiderSchema),
    defaultValues: {
      location: '',
      experience: '',
      status: 'available',
      specialties: [],
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          if (data.image) {
            setProfileImage(data.image);
          }

          if (data.specialties && data.specialties.length > 0) {
            form.setValue('location', data.location || '');
            form.setValue('experience', data.experience || '');
            form.setValue('status', data.profile_type === 'braider' ? 'available' : 'unavailable');
            setSpecialties(data.specialties || []);
            form.setValue('specialties', data.specialties || []);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, form, toast]);

  const onSubmit = async (data: BraiderFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          id: user.id,
          location: data.location,
          experience: data.experience,
          profile_type: 'braider',
          specialties: specialties,
          image: profileImage,
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
      toast({
        title: 'Braider Profile Updated',
        description: 'Your braider information has been saved.',
      });
      
      navigate('/braiders');
    } catch (error) {
      console.error('Error updating braider profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update braider profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProfileImageUpload 
          profileImage={profileImage} 
          onImageChange={setProfileImage}
          inputId="imageUpload"
        />
        
        <FormField
          control={form.control}
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
          control={form.control}
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
        
        <FormField
          control={form.control}
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
        
        <div className="space-y-2">
          <FormLabel>Specialties</FormLabel>
          <SpecialtiesList
            specialties={specialties}
            onSpecialtiesChange={setSpecialties}
          />
        </div>
        
        <SubmitButton isLoading={isLoading}>Save Braider Profile</SubmitButton>
      </form>
    </Form>
  );
};

export default BraiderProfileForm;
