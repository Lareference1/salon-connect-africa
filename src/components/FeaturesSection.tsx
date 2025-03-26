
import { Award, Calendar, MapPin, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useRef } from 'react';

const FeaturesSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Add hover effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const cards = sectionRef.current.querySelectorAll('.feature-card');
      
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        const cardEl = card as HTMLElement;
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
        
        // Only apply effect if mouse is near the card
        if (distance < maxDistance * 1.5 && 
            x > 0 && x < rect.width && 
            y > 0 && y < rect.height) {
          cardEl.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
          cardEl.style.transition = 'transform 0.1s';
        } else {
          cardEl.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
          cardEl.style.transition = 'transform 0.5s';
        }
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
    <section ref={sectionRef} className="py-16 bg-salon-light dark:bg-salon-dark relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="blob absolute h-[40vh] w-[40vh] bg-salon-primary/5 dark:bg-salon-primary/10 rounded-full top-[10%] left-[-10%] blur-3xl"></div>
        <div className="blob absolute h-[35vh] w-[35vh] bg-salon-accent1/5 dark:bg-salon-accent1/10 rounded-full bottom-[20%] right-[-10%] blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 transform-3d">
          <h2 className="text-3xl md:text-4xl font-display mb-4 dark:text-white">{t('whyChoose')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('platformSimplifies')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="feature-card glass-card p-6 rounded-lg shadow-md transition-all duration-300 transform-3d"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-salon-primary/10 text-salon-primary mb-6 mx-auto">
                <feature.icon size={24} className="animate-float-small" />
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
