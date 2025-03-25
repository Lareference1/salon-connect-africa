
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface SalonLayoutProps {
  children: React.ReactNode;
}

const SalonLayout = ({ children }: SalonLayoutProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is authenticated
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
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default SalonLayout;
