
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Sample salon data
const salonsData = [
  {
    id: 1,
    name: "Afro Beauty Salon",
    location: "Brooklyn, NY",
    rating: 4.8,
    reviews: 124,
    specialties: ["Box Braids", "Locs", "Twist Outs"],
    image: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2036&auto=format&fit=crop",
    hiringStatus: true
  },
  {
    id: 2,
    name: "Crown & Glory Hair Studio",
    location: "Harlem, NY",
    rating: 4.6,
    reviews: 98,
    specialties: ["Faux Locs", "Cornrows", "Crochet Braids"],
    image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=2187&auto=format&fit=crop",
    hiringStatus: true
  },
  {
    id: 3,
    name: "Braided Paradise",
    location: "Atlanta, GA",
    rating: 4.9,
    reviews: 210,
    specialties: ["Knotless Braids", "Senegalese Twist", "Feed-in Braids"],
    image: "https://images.unsplash.com/photo-1559599076-9c61d8e1b77c?q=80&w=2069&auto=format&fit=crop",
    hiringStatus: false
  },
  {
    id: 4,
    name: "Natural Roots Salon",
    location: "Houston, TX",
    rating: 4.7,
    reviews: 156,
    specialties: ["Passion Twists", "Box Braids", "Goddess Braids"],
    image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2074&auto=format&fit=crop",
    hiringStatus: true
  },
  {
    id: 5,
    name: "Essence Hair Boutique",
    location: "Philadelphia, PA",
    rating: 4.5,
    reviews: 89,
    specialties: ["Fulani Braids", "Ghana Braids", "Micro Braids"],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1976&auto=format&fit=crop",
    hiringStatus: true
  },
  {
    id: 6,
    name: "Royal Scalp Hair Studio",
    location: "Washington DC",
    rating: 4.8,
    reviews: 132,
    specialties: ["Flat Twists", "Bantu Knots", "Cornrows"],
    image: "https://images.unsplash.com/photo-1610563167394-f5e3c8bf9689?q=80&w=1974&auto=format&fit=crop",
    hiringStatus: false
  }
];

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
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-display mb-4 dark:text-white">{t('discoverSalons')}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('findBestSalons')}
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('location')}
                </label>
                <Input 
                  id="location"
                  placeholder={t('location')} 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('specialty')}
                </label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <SelectValue placeholder={t('selectSpecialty')} />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800">
                    <SelectItem value="">{t('allSpecialties')}</SelectItem>
                    <SelectItem value="Box Braids">Box Braids</SelectItem>
                    <SelectItem value="Knotless">Knotless Braids</SelectItem>
                    <SelectItem value="Locs">Locs</SelectItem>
                    <SelectItem value="Twists">Twists</SelectItem>
                    <SelectItem value="Cornrows">Cornrows</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  variant="default" 
                  className="w-full bg-salon-primary hover:bg-salon-primary/90"
                  onClick={handleSearch}
                >
                  {t('search')}
                </Button>
              </div>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="hiringOnly" 
                className="mr-2 h-4 w-4 rounded border-gray-300 text-salon-primary focus:ring-salon-primary/25 dark:border-gray-600 dark:bg-gray-700"
                checked={hiringOnly}
                onChange={(e) => setHiringOnly(e.target.checked)}
              />
              <label htmlFor="hiringOnly" className="text-sm text-gray-700 dark:text-gray-300">
                {t('showOnlyHiring')}
              </label>
            </div>
          </div>
          
          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSalons.map((salon) => (
              <Card key={salon.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
                <div className="relative h-48">
                  <img 
                    src={salon.image} 
                    alt={salon.name}
                    className="h-full w-full object-cover"
                  />
                  {salon.hiringStatus && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                      {t('hiring')}
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{salon.name}</h3>
                  
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{salon.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                    <Star className="h-4 w-4 text-salon-accent2 fill-salon-accent2 mr-1" />
                    <span className="text-sm">{salon.rating} ({salon.reviews} avis)</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1 dark:text-gray-300">{t('specialties')}</h4>
                    <div className="flex flex-wrap gap-1">
                      {salon.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="inline-block bg-salon-primary/10 text-salon-primary text-xs px-2 py-1 rounded dark:bg-salon-primary/20"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1 bg-salon-primary hover:bg-salon-primary/90"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10 dark:text-white dark:border-white"
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Rendez-vous
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredSalons.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2 dark:text-white">{t('noSalonFound')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('tryOtherCriteria')}</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Salons;
