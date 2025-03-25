
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFormProps {
  location: string;
  setLocation: (value: string) => void;
  specialty: string;
  setSpecialty: (value: string) => void;
  availability: string;
  setAvailability: (value: string) => void;
  onSearch: () => void;
}

const SearchForm = ({
  location,
  setLocation,
  specialty,
  setSpecialty,
  availability,
  setAvailability,
  onSearch
}: SearchFormProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Lieu
          </label>
          <Input 
            id="location"
            placeholder="Ville, État..." 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        
        <div>
          <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Spécialité
          </label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue placeholder="Sélectionner une spécialité" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800">
              <SelectItem value="all">Toutes les spécialités</SelectItem>
              <SelectItem value="Box Braids">Box Braids</SelectItem>
              <SelectItem value="Knotless">Knotless Braids</SelectItem>
              <SelectItem value="Locs">Locs</SelectItem>
              <SelectItem value="Twist">Twists</SelectItem>
              <SelectItem value="Cornrows">Cornrows</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Disponibilité
          </label>
          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <SelectValue placeholder="Sélectionner la disponibilité" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800">
              <SelectItem value="all">Toutes disponibilités</SelectItem>
              <SelectItem value="available">Disponible maintenant</SelectItem>
              <SelectItem value="soon">Disponible prochainement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Button 
        variant="default" 
        className="w-full bg-salon-primary hover:bg-salon-primary/90 mt-2 dark:text-white"
        onClick={onSearch}
      >
        Rechercher
      </Button>
    </div>
  );
};

export default SearchForm;
