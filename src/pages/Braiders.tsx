
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/components/auth/AuthContext';
import SearchForm from '@/components/braiders/SearchForm';
import BraiderCard from '@/components/braiders/BraiderCard';
import NoResults from '@/components/braiders/NoResults';
import { braidersData, BraiderData } from '@/data/braidersData';
import { useToast } from '@/hooks/use-toast';

const Braiders = () => {
  const { t } = useLanguage();
  const { toast } = useToast();  // Keep this for the braider update notification
  const { user } = useAuth();
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("");
  const [braidersState, setBraidersState] = useState(braidersData || []);
  const [filteredBraiders, setFilteredBraiders] = useState(braidersData || []);
  
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
  
  const handleSearch = () => {
    let results = braidersState;
    
    if (location) {
      results = results.filter(braider => 
        braider.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (specialty && specialty !== "all") {
      results = results.filter(braider => 
        braider.specialties && braider.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
      );
    }
    
    if (availability && availability !== "all") {
      results = results.filter(braider => braider.status === availability);
    }
    
    setFilteredBraiders(results);
  };

  const handleUpdateBraider = (id: number, updatedData: Partial<BraiderData>) => {
    if (!braidersState) return;
    
    const updatedBraiders = braidersState.map(braider => 
      braider.id === id ? { ...braider, ...updatedData } : braider
    );
    
    setBraidersState(updatedBraiders);
    setFilteredBraiders(prev => 
      prev.map(braider => braider.id === id ? { ...braider, ...updatedData } : braider)
    );
    
    toast({
      title: "Braider Updated",
      description: `${updatedData.name || 'Braider'}'s information has been updated.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-display mb-4 dark:text-white">{t('discoverBraiders')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('findBestBraiders')}
            </p>
          </div>
          
          {/* Search Form Component */}
          <SearchForm 
            location={location}
            setLocation={setLocation}
            specialty={specialty}
            setSpecialty={setSpecialty}
            availability={availability}
            setAvailability={setAvailability}
            onSearch={handleSearch}
          />
          
          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBraiders && filteredBraiders.length > 0 ? (
              filteredBraiders.map((braider) => (
                <BraiderCard 
                  key={braider.id} 
                  braider={braider} 
                  onUpdate={handleUpdateBraider}
                />
              ))
            ) : null}
          </div>
          
          {/* No Results Component */}
          {(!filteredBraiders || filteredBraiders.length === 0) && <NoResults />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Braiders;
