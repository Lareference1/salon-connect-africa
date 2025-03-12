
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchFiltersProps {
  location: string;
  setLocation: (location: string) => void;
  specialty: string;
  setSpecialty: (specialty: string) => void;
  hiringOnly: boolean;
  setHiringOnly: (hiringOnly: boolean) => void;
  onSearch: () => void;
}

const SearchFilters = ({
  location,
  setLocation,
  specialty,
  setSpecialty,
  hiringOnly,
  setHiringOnly,
  onSearch
}: SearchFiltersProps) => {
  const { t } = useLanguage();

  return (
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
        <label htmlFor="hiringOnly" className="text-sm text-gray-700 dark:text-gray-300">
          {t('showOnlyHiring')}
        </label>
      </div>
    </div>
  );
};

export default SearchFilters;
