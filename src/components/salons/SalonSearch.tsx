
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchForm from '@/components/salons/SearchForm';
import SalonGrid from '@/components/salons/SalonGrid';
import NoResults from '@/components/salons/NoResults';
import { salonsData } from '@/data/salonsData';

const SalonSearch = () => {
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
    
    if (specialty && specialty !== "all") {
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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-display mb-4 dark:text-white">{t('discoverSalons')}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
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
      
      {filteredSalons.length > 0 ? (
        <SalonGrid salons={filteredSalons} />
      ) : (
        <NoResults />
      )}
    </div>
  );
};

export default SalonSearch;
