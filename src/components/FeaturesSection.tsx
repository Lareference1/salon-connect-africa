
import { Award, Calendar, MapPin, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t('directConnection'),
      description: t('directConnectionDesc')
    },
    {
      icon: Award,
      title: t('guaranteedProfessionalism'),
      description: t('guaranteedProfessionalismDesc')
    },
    {
      icon: MapPin,
      title: t('localSearch'),
      description: t('localSearchDesc')
    },
    {
      icon: Calendar,
      title: t('flexiblePlanning'),
      description: t('flexiblePlanningDesc')
    }
  ];

  return (
    <section className="py-16 bg-salon-light dark:bg-salon-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display mb-4 dark:text-white">{t('whyChoose')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('platformSimplifies')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-salon-primary/10 text-salon-primary mb-6 mx-auto">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
