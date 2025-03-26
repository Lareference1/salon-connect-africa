
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';

type PreferredContactType = 'email' | 'phone';

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  bio: z.string().max(300, 'Bio must be less than 300 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  preferredContact: z.enum(['email', 'phone']),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const useProfileForm = (onSuccess?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      bio: '',
      email: user?.email || '',
      phone: '',
      preferredContact: 'email',
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
          form.setValue('fullName', data.full_name || '');
          form.setValue('bio', data.bio || '');
          form.setValue('email', data.email || user.email || '');
          form.setValue('phone', data.phone || '');
          
          const preferredContact = data.preferred_contact as PreferredContactType;
          form.setValue(
            'preferredContact', 
            preferredContact === 'email' || preferredContact === 'phone' 
              ? preferredContact 
              : 'email'
          );
          
          if (data.image) {
            setProfileImage(data.image);
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

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          id: user.id,
          full_name: data.fullName,
          bio: data.bio,
          email: data.email,
          phone: data.phone,
          preferred_contact: data.preferredContact,
          image: profileImage,
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been saved.',
      });
      
      if (onSuccess) {
        onSuccess();
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
    profileImage,
    setProfileImage,
    onSubmit
  };
};
