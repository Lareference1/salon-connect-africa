
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, MessageSquare, Calendar, Check, Clock } from 'lucide-react';

// Sample braiders data
const braidersData = [
  {
    id: 1,
    name: "Aminata Diallo",
    location: "Brooklyn, NY",
    rating: 4.9,
    reviews: 187,
    specialties: ["Box Braids", "Knotless Braids", "Fulani Braids"],
    image: "https://images.unsplash.com/photo-1611432579699-484f7990b127?q=80&w=2070&auto=format&fit=crop",
    availability: "Disponible",
    experience: "7 ans",
    status: "available"
  },
  {
    id: 2,
    name: "Fatou Sow",
    location: "Bronx, NY",
    rating: 4.7,
    reviews: 142,
    specialties: ["Senegalese Twist", "Ghana Braids", "Feed-In Braids"],
    image: "https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?q=80&w=1974&auto=format&fit=crop",
    availability: "Disponible dans 2 jours",
    experience: "5 ans",
    status: "soon"
  },
  {
    id: 3,
    name: "Grace Okafor",
    location: "Queens, NY",
    rating: 5.0,
    reviews: 203,
    specialties: ["Lemonade Braids", "Goddess Braids", "Tribal Braids"],
    image: "https://images.unsplash.com/photo-1611679472919-36e505fdde7c?q=80&w=1974&auto=format&fit=crop",
    availability: "Non disponible",
    experience: "9 ans",
    status: "unavailable"
  },
  {
    id: 4,
    name: "Aisha Mohammed",
    location: "Harlem, NY",
    rating: 4.8,
    reviews: 156,
    specialties: ["Passion Twist", "Spring Twist", "Butterfly Locs"],
    image: "https://images.unsplash.com/photo-1533748430324-45f466e36c7c?q=80&w=2070&auto=format&fit=crop",
    availability: "Disponible",
    experience: "6 ans",
    status: "available"
  },
  {
    id: 5,
    name: "Precious Adeyemi",
    location: "Atlanta, GA",
    rating: 4.9,
    reviews: 178,
    specialties: ["Crochet Braids", "Faux Locs", "Twist Outs"],
    image: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=1986&auto=format&fit=crop",
    availability: "Disponible",
    experience: "8 ans",
    status: "available"
  },
  {
    id: 6,
    name: "Monique Jean-Baptiste",
    location: "Miami, FL",
    rating: 4.6,
    reviews: 132,
    specialties: ["Micro Braids", "Kinky Twist", "Havana Twist"],
    image: "https://images.unsplash.com/photo-1507019403270-cca502add9f8?q=80&w=1974&auto=format&fit=crop",
    availability: "Disponible dans 3 jours",
    experience: "4 ans",
    status: "soon"
  },
];

const Braiders = () => {
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [availability, setAvailability] = useState("");
  const [filteredBraiders, setFilteredBraiders] = useState(braidersData);
  
  const handleSearch = () => {
    let results = braidersData;
    
    if (location) {
      results = results.filter(braider => 
        braider.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    if (specialty) {
      results = results.filter(braider => 
        braider.specialties.some(s => s.toLowerCase().includes(specialty.toLowerCase()))
      );
    }
    
    if (availability) {
      results = results.filter(braider => braider.status === availability);
    }
    
    setFilteredBraiders(results);
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-500';
      case 'soon':
        return 'text-amber-500';
      case 'unavailable':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getAvailabilityIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Check className="h-4 w-4 mr-1" />;
      case 'soon':
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-display mb-4">Trouvez des tresseuses talentueuses</h1>
            <p className="text-lg text-gray-600">
              Découvrez les meilleures tresseuses africaines disponibles pour travailler avec votre salon.
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Lieu
                </label>
                <Input 
                  id="location"
                  placeholder="Ville, État..." 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                  Spécialité
                </label>
                <Select value={specialty} onValueChange={setSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une spécialité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes les spécialités</SelectItem>
                    <SelectItem value="Box Braids">Box Braids</SelectItem>
                    <SelectItem value="Knotless">Knotless Braids</SelectItem>
                    <SelectItem value="Locs">Locs</SelectItem>
                    <SelectItem value="Twist">Twists</SelectItem>
                    <SelectItem value="Cornrows">Cornrows</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-1">
                  Disponibilité
                </label>
                <Select value={availability} onValueChange={setAvailability}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner la disponibilité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Toutes disponibilités</SelectItem>
                    <SelectItem value="available">Disponible maintenant</SelectItem>
                    <SelectItem value="soon">Disponible prochainement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              variant="default" 
              className="w-full bg-salon-primary hover:bg-salon-primary/90 mt-2"
              onClick={handleSearch}
            >
              Rechercher
            </Button>
          </div>
          
          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBraiders.map((braider) => (
              <Card key={braider.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64">
                  <img 
                    src={braider.image} 
                    alt={braider.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{braider.name}</h3>
                  
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{braider.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 mb-2">
                    <Star className="h-4 w-4 text-salon-accent2 fill-salon-accent2 mr-1" />
                    <span className="text-sm">{braider.rating} ({braider.reviews} avis)</span>
                  </div>
                  
                  <div className={`flex items-center mb-3 ${getAvailabilityColor(braider.status)}`}>
                    {getAvailabilityIcon(braider.status)}
                    <span className="text-sm">{braider.availability} · {braider.experience} d'expérience</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Spécialités:</h4>
                    <div className="flex flex-wrap gap-1">
                      {braider.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="inline-block bg-salon-primary/10 text-salon-primary text-xs px-2 py-1 rounded"
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
                      disabled={braider.status === 'unavailable'}
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Contacter
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10"
                      disabled={braider.status === 'unavailable'}
                    >
                      <Calendar className="h-4 w-4 mr-1" />
                      Planifier
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredBraiders.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">Aucune tresseuse trouvée</h3>
              <p className="text-gray-600">Veuillez essayer d'autres critères de recherche.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Braiders;
