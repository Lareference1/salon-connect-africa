
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorks = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t('createProfile'),
      description: t('createProfileDesc'),
      color: "bg-salon-primary"
    },
    {
      number: "02",
      title: t('searchOpportunities'),
      description: t('searchOpportunitiesDesc'),
      color: "bg-salon-accent1"
    },
    {
      number: "03",
      title: t('contactDirectly'),
      description: t('contactDirectlyDesc'),
      color: "bg-salon-accent2"
    },
    {
      number: "04",
      title: t('startWorking'),
      description: t('startWorkingDesc'),
      color: "bg-salon-dark dark:bg-gray-600"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display mb-4 dark:text-white">{t('howItWorks')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('simpleProcess')}
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white text-xl font-bold mb-6`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-16 left-[calc(25%*0.5+25%*${index}+25%*0.5)] transform -translate-x-1/2">
                    <ArrowRight className="text-gray-300 dark:text-gray-600" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
