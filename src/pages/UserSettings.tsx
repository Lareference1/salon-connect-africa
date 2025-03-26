
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UserProfileForm from '@/components/UserProfileForm';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserCircle, Building2, Lock } from 'lucide-react';
import FloatingElement from '@/components/FloatingElement';
import { useToast } from '@/components/ui/use-toast';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import ProfileCreationForm from '@/components/ProfileCreationForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Settings options type
type SettingsOption = 'personal' | 'business' | 'privacy';

const UserSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeOption, setActiveOption] = useState<SettingsOption>('personal');
  
  // If not authenticated, redirect to auth page with a message
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access your profile settings.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [user, navigate, toast]);

  // If user is not authenticated, don't render the rest of the component
  if (!user) {
    return null;
  }

  // Handle setting option click
  const handleOptionClick = (option: SettingsOption) => {
    setActiveOption(option);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container max-w-6xl mx-auto px-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="blob absolute h-[40vh] w-[40vh] bg-salon-primary/5 dark:bg-salon-primary/10 rounded-full top-[10%] left-[-10%] blur-3xl"></div>
          <div className="blob absolute h-[35vh] w-[35vh] bg-salon-accent1/5 dark:bg-salon-accent1/10 rounded-full bottom-[20%] right-[-10%] blur-3xl"></div>
        </div>
        
        <Button 
          variant="ghost" 
          className="mb-6 framer-card group" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-foreground after:transition-all group-hover:after:w-full">Back</span>
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <FloatingElement amplitude="small" delay={0.2}>
              <div className="glass-card p-6 md:p-8 mb-8">
                <h1 className="text-3xl md:text-4xl font-display text-salon-dark dark:text-white mb-2">
                  Settings
                </h1>
                <p className="text-muted-foreground">
                  Manage your personal information and business profiles
                </p>
                
                <div className="mt-8 space-y-4">
                  <div 
                    className={`p-4 rounded-lg ${activeOption === 'personal' ? 'bg-primary/10 border border-primary/30' : 'bg-primary/5 border border-primary/10'} 
                    transform-gpu hover:-translate-y-1 transition-all cursor-pointer`}
                    onClick={() => handleOptionClick('personal')}
                  >
                    <div className="flex items-center">
                      <UserCircle className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium">Personal Information</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Update your basic profile information</p>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg ${activeOption === 'business' ? 'bg-accent/10 border border-accent/30' : 'bg-accent/5 border border-accent/10'} 
                    transform-gpu hover:-translate-y-1 transition-all cursor-pointer`}
                    onClick={() => handleOptionClick('business')}
                  >
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 mr-2 text-accent" />
                      <h3 className="font-medium">Business Profile</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Create a salon or braider listing</p>
                  </div>
                  
                  <div 
                    className={`p-4 rounded-lg ${activeOption === 'privacy' ? 'bg-secondary/10 border border-secondary/30' : 'bg-secondary/5 border border-secondary/10'} 
                    transform-gpu hover:-translate-y-1 transition-all cursor-pointer`}
                    onClick={() => handleOptionClick('privacy')}
                  >
                    <div className="flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-secondary" />
                      <h3 className="font-medium">Privacy Settings</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Manage your data and privacy options</p>
                  </div>
                </div>
              </div>
            </FloatingElement>
          </div>
          
          <div className="lg:col-span-8">
            <FloatingElement amplitude="small" delay={0.4}>
              <div className="glass-card p-6 md:p-8">
                {activeOption === 'personal' && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-medium mb-4">Personal Information</h2>
                    <p className="text-muted-foreground mb-6">
                      Update your personal information and account settings.
                    </p>
                    <UserProfileForm />
                  </div>
                )}

                {activeOption === 'business' && (
                  <Tabs defaultValue="salon" className="w-full">
                    <div className="mb-6">
                      <h2 className="text-2xl font-medium mb-2">Business Profile</h2>
                      <p className="text-muted-foreground">
                        Create and manage your business listings. Choose the type of profile you want to create.
                      </p>
                    </div>
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="salon">Salon</TabsTrigger>
                      <TabsTrigger value="braider">Braider</TabsTrigger>
                    </TabsList>
                    
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
                  </Tabs>
                )}

                {activeOption === 'privacy' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-medium mb-4">Privacy Settings</h2>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Data Privacy</CardTitle>
                        <CardDescription>
                          Manage how your personal data is stored and used
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-sm">
                          We value your privacy and are committed to protecting your personal information. 
                          Your data is stored securely and is only used to provide you with the best experience on our platform.
                        </p>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Your Rights</h3>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Right to access your personal data</li>
                            <li>Right to rectify inaccurate information</li>
                            <li>Right to erase your data (right to be forgotten)</li>
                            <li>Right to restrict processing of your data</li>
                            <li>Right to data portability</li>
                          </ul>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="font-medium mb-2">Contact Us</h3>
                          <p className="text-sm">
                            If you have any questions about your data or would like to exercise any of your rights,
                            please contact our data protection officer at privacy@beautyplatform.com
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </FloatingElement>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Floating decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <FloatingElement 
            key={i}
            amplitude={i % 3 === 0 ? "large" : i % 2 === 0 ? "medium" : "small"}
            delay={i * 0.5}
            duration={3 + i}
            className={`absolute bg-salon-primary/5 dark:bg-salon-primary/10 rounded-full blob
                     ${i % 3 === 0 ? 'w-64 h-64' : i % 2 === 0 ? 'w-40 h-40' : 'w-24 h-24'}
                     ${
                      i === 0 ? 'top-1/4 left-1/5' :
                      i === 1 ? 'top-3/4 left-1/4' :
                      i === 2 ? 'top-2/3 right-1/4' :
                      'top-1/5 right-1/6'
                     }
                     blur-xl transform-3d`}
          >
            <div className="w-full h-full"></div>
          </FloatingElement>
        ))}
      </div>
    </div>
  );
};

export default UserSettings;
