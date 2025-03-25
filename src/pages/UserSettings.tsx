
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UserProfileForm from '@/components/UserProfileForm';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import FloatingElement from '@/components/FloatingElement';

const UserSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // If not authenticated, redirect to auth page
  useEffect(() => {
    if (!user) {
      // Direct navigation to auth page without showing toast
      navigate('/auth');
    }
  }, [user, navigate]);

  // If user is not authenticated, don't render the rest of the component
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container max-w-6xl mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <FloatingElement amplitude="small" delay={0.2}>
          <div className="mb-12">
            <h1 className="text-4xl font-display text-salon-dark dark:text-white mb-2">
              Profile Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>
        </FloatingElement>
        
        <FloatingElement amplitude="small" delay={0.4}>
          <UserProfileForm />
        </FloatingElement>
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
            className={`absolute bg-salon-primary/5 dark:bg-salon-primary/10 rounded-full
                     ${i % 3 === 0 ? 'w-64 h-64' : i % 2 === 0 ? 'w-40 h-40' : 'w-24 h-24'}
                     ${
                      i === 0 ? 'top-1/4 left-1/5' :
                      i === 1 ? 'top-3/4 left-1/4' :
                      i === 2 ? 'top-2/3 right-1/4' :
                      'top-1/5 right-1/6'
                     }
                     blur-xl`}
          >
            <div className="w-full h-full"></div>
          </FloatingElement>
        ))}
      </div>
    </div>
  );
};

export default UserSettings;
