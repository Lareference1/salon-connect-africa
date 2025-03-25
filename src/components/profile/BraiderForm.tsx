
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from '@supabase/supabase-js';
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
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const braiderSchema = z.object({
  location: z.string().min(2, 'Location must be at least 2 characters'),
  experience: z.string(),
  status: z.enum(['available', 'soon', 'unavailable']).default('available'),
  specialties: z.array(z.string()),
});

export type BraiderFormValues = z.infer<typeof braiderSchema>;

interface BraiderFormProps {
  user: User;
}

const BraiderForm = ({ user }: BraiderFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [specialtyInput, setSpecialtyInput] = useState("");
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

  const handleAddSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      const newSpecialties = [...specialties, specialtyInput.trim()];
      setSpecialties(newSpecialties);
      form.setValue('specialties', newSpecialties);
      setSpecialtyInput("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    const newSpecialties = specialties.filter(s => s !== specialty);
    setSpecialties(newSpecialties);
    form.setValue('specialties', newSpecialties);
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

  const onSubmit = async (data: BraiderFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Here you would typically update the braider profile in your database
      // const { error } = await supabase
      //   .from('braider_profiles')
      //   .upsert({
      //     user_id: user.id,
      //     location: data.location,
      //     experience: data.experience,
      //     status: data.status,
      //     specialties: specialties,
      //     image: profileImage,
      //     updated_at: new Date(),
      //   });
      
      // if (error) throw error;
      
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
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
  );
};

export default BraiderForm;
