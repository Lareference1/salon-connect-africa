
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { canAccessSalons } from '@/types/profile';
import { useToast } from '@/components/ui/use-toast';

interface SalonLayoutProps {
  children: React.ReactNode;
}

const SalonLayout = ({ children }: SalonLayoutProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is authenticated and has access
  useEffect(() => {
    const checkUserAccess = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }
      
      try {
        setIsLoading(true);
        // Fetch user profile to check user type
        const { data, error } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        setUserType(data.user_type);
        
        // Check if user has access to salons page
        if (!canAccessSalons(data.user_type as any)) {
          toast({
            title: "Access Denied",
            description: "You don't have permission to view salons.",
            variant: "destructive"
          });
          navigate('/');
        }
      } catch (error) {
        console.error("Error checking user access:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUserAccess();
  }, [user, navigate, toast]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-salon-primary"></div>
      </div>
    );
  }
  
  // If user doesn't have access, don't render the component
  if (!canAccessSalons(userType as any)) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default SalonLayout;
