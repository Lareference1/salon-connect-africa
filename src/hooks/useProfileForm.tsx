
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { profileSchema, ProfileFormValues } from '@/types/profile';

export const useProfileForm = (user: User | null, onSuccess?: (data: ProfileFormValues) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      bio: '',
      email: user?.email || '',
      phone: '',
      preferredContact: 'email',
      userType: 'customer',
      businessName: '',
      location: '',
      specialties: '',
      hiringStatus: 'false',
      experience: '',
      businessDescription: '',
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        // Set the user email
        form.setValue('email', user.email || '');
        
        // Fetch the user profile from the database
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          // PGRST116 is "no rows returned" - that's expected for new users
          throw error;
        }
        
        if (data) {
          form.setValue('fullName', data.full_name || '');
          form.setValue('bio', data.bio || '');
          form.setValue('phone', data.phone || '');
          form.setValue('preferredContact', data.preferred_contact as 'email' | 'phone' || 'email');
          form.setValue('userType', data.user_type as 'salon' | 'braider' | 'customer' || 'customer');
          
          // Set business-related fields
          form.setValue('businessName', data.business_name || '');
          form.setValue('location', data.location || '');
          form.setValue('specialties', data.specialties || '');
          form.setValue('hiringStatus', data.hiring_status ? 'true' : 'false');
          form.setValue('experience', data.experience || '');
          form.setValue('businessDescription', data.business_description || '');
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

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Convert specialties string to array if provided
      const specialtiesArray = data.specialties 
        ? data.specialties.split(',').map(s => s.trim()) 
        : [];
      
      // Update the profile in the database
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: data.fullName,
          bio: data.bio,
          phone: data.phone || null,
          preferred_contact: data.preferredContact,
          user_type: data.userType,
          // Business-related fields
          business_name: data.businessName || null,
          location: data.location || null,
          specialties: specialtiesArray.length > 0 ? specialtiesArray : null,
          hiring_status: data.hiringStatus === 'true',
          experience: data.experience || null,
          business_description: data.businessDescription || null,
          updated_at: new Date().toISOString(), // Convert Date to ISO string
        });
      
      if (error) throw error;
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been saved.',
      });
      
      if (onSuccess) {
        onSuccess(data);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
