import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCreationForm from '@/components/ProfileCreationForm';
const BusinessProfileSettings = () => {
  return <Tabs defaultValue="salon" className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Business Profile</h2>
        
      </div>
      
      
      
      <TabsContent value="salon">
        <div className="space-y-4">
          <div className="mb-2">
            <h3 className="text-lg font-medium mb-2">Create Your Salon Listing</h3>
            <p className="text-muted-foreground">
              Showcase your salon to potential clients.
              Your profile will appear in the salon listings once approved.
            </p>
          </div>
          
          <ProfileCreationForm />
        </div>
      </TabsContent>
      
      <TabsContent value="braider">
        <div className="space-y-4">
          <div className="mb-2">
            <h3 className="text-lg font-medium mb-2">Create Your Braider Profile</h3>
            <p className="text-muted-foreground">
              Showcase your braiding services to potential clients.
              Your profile will appear in the braider listings once approved.
            </p>
          </div>
          
          <ProfileCreationForm />
        </div>
      </TabsContent>
    </Tabs>;
};
export default BusinessProfileSettings;