
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { salonsData } from '@/data/salonsData';
import PageHeader from '@/components/salons/PageHeader';
import SearchFilters from '@/components/salons/SearchFilters';
import SalonsList from '@/components/salons/SalonsList';

const Salons = () => {
  const { t } = useLanguage();
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [hiringOnly, setHiringOnly] = useState(false);
  const [filteredSalons, setFilteredSalons] = useState(salonsData);
  
  const handleSearch = () => {
    let results = salonsData;
    
    if (location) {
      results = results.filter(salon => 
        salon.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (specialty) {
      results = results.filter(salon => 
        salon.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
      );
    }
    
    if (hiringOnly) {
      results = results.filter(salon => salon.hiringStatus);
    }
    
    setFilteredSalons(results);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <PageHeader />
          
          <SearchFilters 
            location={location}
            setLocation={setLocation}
            specialty={specialty}
            setSpecialty={setSpecialty}
            hiringOnly={hiringOnly}
            setHiringOnly={setHiringOnly}
            onSearch={handleSearch}
          />
          
          <SalonsList salons={filteredSalons} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Salons;
