
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import SalonLayout from '@/components/salons/SalonLayout';
import SalonSearch from '@/components/salons/SalonSearch';
import { canAccessSalons } from '@/types/profile';

const Salons = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userType, setUserType] = useState<string | null>(null);
  
  // Check if user is authenticated and has access
  useEffect(() => {
    const checkUserAccess = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }
      
      try {
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
      }
    };
    
    checkUserAccess();
  }, [user, navigate, toast]);

  // If user doesn't have access, don't render the component
  if (!canAccessSalons(userType as any)) {
    return null;
  }
  
  return (
    <SalonLayout>
      <SalonSearch />
    </SalonLayout>
  );
};

export default Salons;
