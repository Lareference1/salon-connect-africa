
import { useLanguage } from '@/contexts/LanguageContext';

const NoResults = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium mb-2 dark:text-white">{t('noSalonFound')}</h3>
      <p className="text-gray-600 dark:text-gray-400">{t('tryOtherCriteria')}</p>
    </div>
  );
};

export default NoResults;
