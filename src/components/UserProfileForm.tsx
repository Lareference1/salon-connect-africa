
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  bio: z.string().max(300, 'Bio must be less than 300 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  preferredContact: z.enum(['email', 'phone']),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
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
        // In a real app, we would fetch the profile from the database
        // For now, we'll just use the user's email
        form.setValue('email', user.email || '');
        
        // Here you would typically fetch additional user profile data from your database
        // const { data, error } = await supabase
        //   .from('profiles')
        //   .select('*')
        //   .eq('id', user.id)
        //   .single();
        
        // if (data) {
        //   form.setValue('fullName', data.full_name);
        //   form.setValue('bio', data.bio);
        //   form.setValue('phone', data.phone);
        //   form.setValue('preferredContact', data.preferred_contact);
        // }
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
      // Here you would typically update the profile in your database
      // const { error } = await supabase
      //   .from('profiles')
      //   .upsert({
      //     id: user.id,
      //     full_name: data.fullName,
      //     bio: data.bio,
      //     phone: data.phone,
      //     preferred_contact: data.preferredContact,
      //     updated_at: new Date(),
      //   });
      
      // if (error) throw error;
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile information has been saved.',
      });
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

  if (!user) {
    return (
      <div className="text-center p-8">
        <p>Please sign in to edit your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-salon-dark/80 backdrop-blur-lg rounded-xl p-6 shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-display mb-6 text-salon-dark dark:text-white">Your Profile</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us a bit about yourself" 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="preferredContact"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Preferred Contact Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="email" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Email
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="phone" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Phone
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/80 hover:to-salon-primary hover:scale-105 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 border-0 rounded-full text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Profile'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;
