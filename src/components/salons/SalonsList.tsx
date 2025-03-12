
import React from 'react';
import SalonCard from './SalonCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface SalonProps {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  specialties: string[];
  image: string;
  hiringStatus: boolean;
}

interface SalonsListProps {
  salons: SalonProps[];
}

const SalonsList = ({ salons }: SalonsListProps) => {
  const { t } = useLanguage();

  if (salons.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2 dark:text-white">{t('noSalonFound')}</h3>
        <p className="text-gray-600 dark:text-gray-400">{t('tryOtherCriteria')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {salons.map((salon) => (
        <SalonCard key={salon.id} salon={salon} />
      ))}
    </div>
  );
};

export default SalonsList;
