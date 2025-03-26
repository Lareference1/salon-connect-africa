
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth/AuthContext";
import { PlusCircle, X, Loader2, Camera, User, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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
});

type FormValues = z.infer<typeof formSchema>;

const ProfileCreationForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newSpecialty, setNewSpecialty] = useState("");
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
    },
  });

  const profileType = form.watch("profileType");
  const availability = form.watch("availability");

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

  const handleAddSpecialty = () => {
    if (!newSpecialty.trim()) return;
    
    const currentSpecialties = form.getValues("specialties");
    if (!currentSpecialties.includes(newSpecialty.trim())) {
      form.setValue("specialties", [...currentSpecialties, newSpecialty.trim()]);
    }
    setNewSpecialty("");
  };

  const handleRemoveSpecialty = (specialty: string) => {
    const currentSpecialties = form.getValues("specialties");
    form.setValue(
      "specialties",
      currentSpecialties.filter((s) => s !== specialty)
    );
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
        experience: data.profileType === "braider" ? 
          (data.availability === "unavailable" && data.availableDate 
            ? `Available from ${format(data.availableDate, "PPP")}` 
            : (data.availability === "available" ? "Available now" : "Not available")) 
          : null,
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
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="w-20 h-20 border-2 border-muted">
              {profileImage ? (
                <AvatarImage src={profileImage} alt="Profile" />
              ) : (
                <AvatarFallback className="bg-muted">
                  <User className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="flex flex-col space-y-2">
              <Button 
                type="button"
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={() => document.getElementById("profilePicUpload")?.click()}
              >
                <Camera className="h-4 w-4" />
                <span>Upload Profile Photo</span>
              </Button>
              <p className="text-xs text-muted-foreground">
                Upload a professional profile photo. JPG or PNG, up to 2MB.
              </p>
              <input 
                type="file" 
                id="profilePicUpload" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="profileType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Type</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <div 
                      className={`flex-1 border rounded-md p-4 cursor-pointer transition-colors ${field.value === "salon" ? "border-primary bg-primary/10" : "border-muted"}`}
                      onClick={() => form.setValue("profileType", "salon")}
                    >
                      <div className="font-medium mb-1">Salon</div>
                      <div className="text-sm text-muted-foreground">Create a salon or business profile</div>
                    </div>
                    <div 
                      className={`flex-1 border rounded-md p-4 cursor-pointer transition-colors ${field.value === "braider" ? "border-primary bg-primary/10" : "border-muted"}`}
                      onClick={() => form.setValue("profileType", "braider")}
                    >
                      <div className="font-medium mb-1">Braider</div>
                      <div className="text-sm text-muted-foreground">Create a braider profile</div>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name or business name" {...field} />
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell clients about your services..." 
                    className="min-h-[120px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialties"
            render={() => (
              <FormItem>
                <FormLabel>Specialties</FormLabel>
                <div className="space-y-2">
                  <div className="flex">
                    <Input 
                      value={newSpecialty}
                      onChange={(e) => setNewSpecialty(e.target.value)}
                      placeholder="Add a specialty (e.g., Box Braids, Cornrows)"
                      className="flex-1 rounded-r-none"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddSpecialty();
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddSpecialty}
                      className="rounded-l-none"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.watch("specialties").map((specialty, index) => (
                      <div 
                        key={index} 
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center"
                      >
                        <span>{specialty}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-5 w-5 ml-1 p-0 hover:bg-transparent"
                          onClick={() => handleRemoveSpecialty(specialty)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {specialty}</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {profileType === "salon" && (
            <FormField
              control={form.control}
              name="hiringStatus"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Currently Hiring</FormLabel>
                    <FormDescription>
                      Check this if your salon is currently looking for braiders.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          )}
          
          {profileType === "braider" && (
            <>
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        <div 
                          className={`flex-1 border rounded-md p-4 cursor-pointer transition-colors ${field.value === "available" ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-muted"}`}
                          onClick={() => form.setValue("availability", "available")}
                        >
                          <div className="font-medium mb-1 text-green-600 dark:text-green-400">Available</div>
                          <div className="text-sm text-muted-foreground">I'm currently available for bookings</div>
                        </div>
                        <div 
                          className={`flex-1 border rounded-md p-4 cursor-pointer transition-colors ${field.value === "unavailable" ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-muted"}`}
                          onClick={() => form.setValue("availability", "unavailable")}
                        >
                          <div className="font-medium mb-1 text-red-600 dark:text-red-400">Not Available</div>
                          <div className="text-sm text-muted-foreground">I'm not currently taking bookings</div>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              
              {availability === "unavailable" && (
                <FormField
                  control={form.control}
                  name="availableDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Available from</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        When will you be available again for bookings?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/80 hover:to-salon-primary hover:scale-105 shadow-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Profile"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileCreationForm;
