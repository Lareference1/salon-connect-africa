
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchFormProps {
  location: string;
  setLocation: (value: string) => void;
  specialty: string;
  setSpecialty: (value: string) => void;
  hiringOnly: boolean;
  setHiringOnly: (value: boolean) => void;
  onSearch: () => void;
}

const SearchForm = ({
  location,
  setLocation,
  specialty,
  setSpecialty,
  hiringOnly,
  setHiringOnly,
  onSearch
}: SearchFormProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
        <div>
          <label htmlFor="location" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('location')}
          </label>
          <Input 
            id="location"
            placeholder={t('location')} 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
          />
        </div>
        
        <div>
          <label htmlFor="specialty" className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('specialty')}
          </label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm">
              <SelectValue placeholder={t('selectSpecialty')} />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-800">
              <SelectItem value="all">{t('allSpecialties')}</SelectItem>
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
            className="w-full bg-salon-primary hover:bg-salon-primary/90 text-sm"
            onClick={onSearch}
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
        <label htmlFor="hiringOnly" className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
          {t('showOnlyHiring')}
        </label>
      </div>
    </div>
  );
};

export default SearchForm;
