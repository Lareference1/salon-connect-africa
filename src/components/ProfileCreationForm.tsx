
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
import { PlusCircle, X } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";

// Define the schema for form validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  description: z.string().optional(),
  profileType: z.enum(["salon", "braider"]),
  hiringStatus: z.boolean().optional(),
  specialties: z.array(z.string()).min(1, "At least one specialty is required"),
});

type FormValues = z.infer<typeof formSchema>;

const ProfileCreationForm = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [newSpecialty, setNewSpecialty] = useState("");
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      profileType: "salon",
      hiringStatus: false,
      specialties: [],
    },
  });

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
    try {
      // In a real application, this would send data to your backend
      console.log("Form submitted:", data);
      
      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Profile Created!",
          description: `Your ${data.profileType} profile has been created and will appear in the listings.`,
        });
        
        // Reset form
        form.reset();
      }, 1000);
    } catch (error) {
      console.error("Error creating profile:", error);
      toast({
        title: "Error",
        description: "There was a problem creating your profile. Please try again.",
        variant: "destructive",
      });
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
          <FormField
            control={form.control}
            name="profileType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select profile type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="salon">Salon</SelectItem>
                    <SelectItem value="braider">Braider</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select whether you are a salon or an individual braider.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{form.watch("profileType") === "salon" ? "Salon Name" : "Full Name"}</FormLabel>
                <FormControl>
                  <Input placeholder={form.watch("profileType") === "salon" ? "Enter salon name" : "Enter your name"} {...field} />
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

          {form.watch("profileType") === "salon" && (
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
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/80 hover:to-salon-primary hover:scale-105 shadow-md"
        >
          Create Profile
        </Button>
      </form>
    </Form>
  );
};

export default ProfileCreationForm;
