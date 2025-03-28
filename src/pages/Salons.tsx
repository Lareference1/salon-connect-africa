import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/hooks/use-toast';
import SearchForm from '@/components/salons/SearchForm';
import SalonCard from '@/components/salons/SalonCard';
import NoResults from '@/components/salons/NoResults';
import { supabase } from '@/integrations/supabase/client';
import { salonsData, SalonData, transformProfileToSalon } from '@/data/salonsData';

const Salons = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hiringOnly, setHiringOnly] = useState(false);
  const [salonsState, setSalonsState] = useState<SalonData[]>(salonsData);
  const [filteredSalons, setFilteredSalons] = useState<SalonData[]>(salonsData);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchSalonProfiles = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('profile_type', 'salon');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const supabaseSalons = data.map(salon => transformProfileToSalon(salon));
          const combinedSalons = [...supabaseSalons, ...salonsData];
          setSalonsState(combinedSalons);
          setFilteredSalons(combinedSalons);
        }
      } catch (error) {
        console.error('Error fetching salon profiles:', error);
        toast({
          title: 'Error',
          description: 'Failed to load salon data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchSalonProfiles();
    }
  }, [user, toast]);

  if (!user) {
    return null;
  }
  
  const handleSearch = () => {
    let results = salonsState;
    
    if (location) {
      results = results.filter(salon => 
        salon.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (specialty && specialty !== "all") {
      results = results.filter(salon => 
        salon.specialties && salon.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
      );
    }
    
    if (hiringOnly) {
      results = results.filter(salon => salon.hiringStatus);
    }
    
    setFilteredSalons(results);
  };

  const handleUpdateSalon = (id: number | string, updatedData: Partial<SalonData>) => {
    const updatedSalons = salonsState.map(salon => 
      salon.id === id ? { ...salon, ...updatedData } : salon
    );
    
    setSalonsState(updatedSalons);
    setFilteredSalons(prev => 
      prev.map(salon => salon.id === id ? { ...salon, ...updatedData } : salon)
    );
    
    toast({
      title: "Salon Updated",
      description: `${updatedData.name || 'Salon'}'s information has been updated.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-display mb-3 sm:mb-4 dark:text-white">{t('discoverSalons')}</h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              {t('findBestSalons')}
            </p>
          </div>
          
          <SearchForm 
            location={location}
            setLocation={setLocation}
            specialty={specialty}
            setSpecialty={setSpecialty}
            hiringOnly={hiringOnly}
            setHiringOnly={setHiringOnly}
            onSearch={handleSearch}
          />
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="spinner-border inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Loading salons...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredSalons.map((salon) => (
                  <SalonCard 
                    key={salon.id} 
                    salon={salon} 
                    onUpdate={handleUpdateSalon}
                  />
                ))}
              </div>
              
              {filteredSalons.length === 0 && <NoResults />}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Salons;
