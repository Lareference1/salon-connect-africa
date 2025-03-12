
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const PageHeader = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto text-center mb-12">
      <h1 className="text-4xl font-display mb-4 dark:text-white">{t('discoverSalons')}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        {t('findBestSalons')}
      </p>
    </div>
  );
};

export default PageHeader;
