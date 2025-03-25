
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import SearchForm from '@/components/salons/SearchForm';
import SalonCard from '@/components/salons/SalonCard';
import NoResults from '@/components/salons/NoResults';
import { salonsData } from '@/data/salonsData';

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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-display mb-4 dark:text-white">{t('discoverSalons')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('findBestSalons')}
            </p>
          </div>
          
          {/* Search Form Component */}
          <SearchForm 
            location={location}
            setLocation={setLocation}
            specialty={specialty}
            setSpecialty={setSpecialty}
            hiringOnly={hiringOnly}
            setHiringOnly={setHiringOnly}
            onSearch={handleSearch}
          />
          
          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>
          
          {/* No Results Component */}
          {filteredSalons.length === 0 && <NoResults />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Salons;
