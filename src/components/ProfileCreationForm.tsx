
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

// Import form section components
import ProfileTypeSelector from "@/components/profile/form-sections/ProfileTypeSelector";
import BasicProfileFields from "@/components/profile/form-sections/BasicProfileFields";
import SpecialtiesField from "@/components/profile/form-sections/SpecialtiesField";
import SalonFields from "@/components/profile/form-sections/SalonFields";
import BraiderAvailabilityFields from "@/components/profile/form-sections/BraiderAvailabilityFields";
import FormSubmitButton from "@/components/profile/form-sections/FormSubmitButton";

// Define the schema for form validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  description: z.string().optional(),
  hiringStatus: z.boolean().optional(),
  specialties: z.array(z.string()).min(1, "At least one specialty is required"),
  profileType: z.enum(["salon", "braider"]).default("salon"),
  availability: z.enum(["available", "unavailable"]).default("available"),
  availableDate: z.date().optional(),
  unavailableDates: z.array(z.date()).default([]),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileCreationForm = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      hiringStatus: false,
      specialties: [],
      profileType: "salon",
      availability: "available",
      unavailableDates: [],
    },
  });

  const profileType = form.watch("profileType");
  const availability = form.watch("availability");

  const handleImageChange = (image: string) => {
    setProfileImage(image);
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a profile",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format availability information
      let availabilityInfo = '';
      if (data.profileType === "braider") {
        if (data.availability === "available") {
          availabilityInfo = "Available now";
        } else if (data.availability === "unavailable") {
          if (data.unavailableDates && data.unavailableDates.length > 0) {
            // Format the unavailable dates
            const formattedDates = data.unavailableDates
              .sort((a, b) => a.getTime() - b.getTime())
              .map(date => format(date, "PPP"))
              .join(", ");
            
            availabilityInfo = `Unavailable on: ${formattedDates}`;
          } else {
            availabilityInfo = "Not available";
          }
        }
      }

      // Insert the profile data into Supabase
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        name: data.name,
        location: data.location,
        description: data.description || '',
        specialties: data.specialties,
        hiring_status: data.profileType === "salon" ? data.hiringStatus : false,
        user_id: user.id,
        image: profileImage,
        profile_type: data.profileType,
        experience: data.profileType === "braider" ? availabilityInfo : null,
      });
      
      if (error) throw error;
      
      toast({
        title: "Profile Created!",
        description: "Your profile has been created and will appear in the listings.",
      });
      
      // Navigate to the appropriate page
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Error creating profile:", error);
      toast({
        title: "Error",
        description: "There was a problem creating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If user is not authenticated, show a message
  if (!user) {
    return (
      <div className="text-center p-6">
        <p className="text-muted-foreground">Please log in to create a profile.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <ProfileTypeSelector control={form.control} />
          
          <BasicProfileFields 
            control={form.control} 
            profileImage={profileImage} 
            onImageChange={handleImageChange} 
          />
          
          <SpecialtiesField control={form.control} />

          {profileType === "salon" && <SalonFields control={form.control} />}
          
          {profileType === "braider" && <BraiderAvailabilityFields control={form.control} />}
        </div>

        <FormSubmitButton 
          isSubmitting={isSubmitting} 
          text="Create Profile" 
        />
      </form>
    </Form>
  );
};

export default ProfileCreationForm;
