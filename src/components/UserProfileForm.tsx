import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Upload } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  bio: z.string().max(300, 'Bio must be less than 300 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  preferredContact: z.enum(['email', 'phone']),
});

const braiderSchema = z.object({
  location: z.string().min(2, 'Location must be at least 2 characters'),
  experience: z.string(),
  status: z.enum(['available', 'soon', 'unavailable']).default('available'),
  specialties: z.array(z.string()),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type BraiderFormValues = z.infer<typeof braiderSchema>;

const UserProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [specialtyInput, setSpecialtyInput] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      bio: '',
      email: user?.email || '',
      phone: '',
      preferredContact: 'email',
    },
  });

  const braiderForm = useForm<BraiderFormValues>({
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
          profileForm.setValue('fullName', data.full_name || '');
          profileForm.setValue('bio', data.bio || '');
          profileForm.setValue('email', data.email || user.email || '');
          profileForm.setValue('phone', data.phone || '');
          profileForm.setValue('preferredContact', data.preferred_contact || 'email');
          
          if (data.image) {
            setProfileImage(data.image);
          }

          if (data.specialties && data.specialties.length > 0) {
            setActiveTab('braider');
            braiderForm.setValue('location', data.location || '');
            braiderForm.setValue('experience', data.experience || '');
            braiderForm.setValue('status', data.profile_type === 'braider' ? 'available' : 'unavailable');
            setSpecialties(data.specialties || []);
            braiderForm.setValue('specialties', data.specialties || []);
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
  }, [user, profileForm, braiderForm, toast]);

  const onProfileSubmit = async (data: ProfileFormValues) => {
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
      
      navigate('/settings');
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

  const onBraiderSubmit = async (data: BraiderFormValues) => {
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

  const handleAddSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      const newSpecialties = [...specialties, specialtyInput.trim()];
      setSpecialties(newSpecialties);
      braiderForm.setValue('specialties', newSpecialties);
      setSpecialtyInput("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    const newSpecialties = specialties.filter(s => s !== specialty);
    setSpecialties(newSpecialties);
    braiderForm.setValue('specialties', newSpecialties);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="braider">Braider Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardContent className="pt-6">
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel>Profile Photo</FormLabel>
                    <div className="flex items-center space-x-4">
                      <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                        <img 
                          src={profileImage || '/placeholder.svg'} 
                          alt="Profile" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="profileImageUpload" className="cursor-pointer">
                          <div className="flex items-center border border-input rounded-md p-2 hover:bg-accent">
                            <Upload className="h-4 w-4 mr-2" />
                            <span>Upload photo</span>
                          </div>
                          <input 
                            type="file" 
                            id="profileImageUpload" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageChange}
                          />
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <FormField
                    control={profileForm.control}
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
                    control={profileForm.control}
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
                      control={profileForm.control}
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
                      control={profileForm.control}
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
                    control={profileForm.control}
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
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="braider">
          <Card>
            <CardContent className="pt-6">
              <Form {...braiderForm}>
                <form onSubmit={braiderForm.handleSubmit(onBraiderSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel>Profile Photo</FormLabel>
                    <div className="flex items-center space-x-4">
                      <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                        <img 
                          src={profileImage || '/placeholder.svg'} 
                          alt="Profile" 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="imageUpload" className="cursor-pointer">
                          <div className="flex items-center border border-input rounded-md p-2 hover:bg-accent">
                            <Upload className="h-4 w-4 mr-2" />
                            <span>Upload photo</span>
                          </div>
                          <input 
                            type="file" 
                            id="imageUpload" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageChange}
                          />
                        </Label>
                      </div>
                    </div>
                  </div>
                  
                  <FormField
                    control={braiderForm.control}
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
                    control={braiderForm.control}
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
                    control={braiderForm.control}
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
                    <div className="flex flex-wrap gap-2 mb-2">
                      {specialties.map((specialty, index) => (
                        <div key={index} className="flex items-center bg-salon-primary/10 text-salon-primary text-xs px-2 py-1 rounded">
                          {specialty}
                          <button 
                            type="button" 
                            className="ml-2 text-salon-primary hover:text-red-500"
                            onClick={() => handleRemoveSpecialty(specialty)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Add a specialty" 
                        value={specialtyInput} 
                        onChange={(e) => setSpecialtyInput(e.target.value)} 
                      />
                      <Button type="button" size="sm" onClick={handleAddSpecialty}>Add</Button>
                    </div>
                  </div>
                  
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
                      'Save Braider Profile'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfileForm;
