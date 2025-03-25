
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { MapPin, Users, Award, Phone } from 'lucide-react';
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-salon-primary to-salon-primary/80 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display text-white mb-6 drop-shadow-md">{t('ourMission')}</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto backdrop-blur-sm bg-white/10 p-6 rounded-lg shadow-lg">
              {t('missionDescription')}
            </p>
          </div>
        </section>
        
        {/* Story Section - This is the selected element */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 rounded-xl shadow-xl p-8">
              <h2 className="text-3xl font-display mb-6 text-center text-salon-dark dark:text-white">{t('ourStory')}</h2>
              <div className="prose lg:prose-xl max-w-none text-gray-700 dark:text-gray-200">
                <p>
                  SalonConnect Africa est née d'une observation simple mais révélatrice : les salons de coiffure africains aux États-Unis font face à un défi constant pour trouver des tresseuses qualifiées, tandis que de nombreuses tresseuses talentueuses peinent à trouver des opportunités professionnelles stables.
                </p>
                <p>
                  Fondée en 2023 par une équipe passionnée de l'industrie de la beauté et de la technologie, notre plateforme a été conçue pour combler ce fossé et créer un pont entre ces deux mondes qui ont tant à s'offrir mutuellement.
                </p>
                <p>
                  Nous croyons fermement que la beauté africaine mérite d'être célébrée et que les professionnels qui perpétuent ces traditions ancestrales méritent reconnaissance et opportunités. C'est pourquoi nous avons créé un espace où l'expertise, le talent et la passion peuvent se rencontrer et prospérer.
                </p>
                <p>
                  Aujourd'hui, SalonConnect Africa est fière de contribuer à l'économie de la beauté africaine aux États-Unis en facilitant des milliers de connexions professionnelles chaque mois, tout en aidant à préserver et promouvoir l'artisanat des coiffures traditionnelles africaines.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-salon-primary/5 to-salon-accent1/5 pattern-bg opacity-20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-display mb-12 text-center text-salon-dark dark:text-white drop-shadow-sm">{t('ourValues')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 rounded-full bg-salon-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Users className="h-8 w-8 text-salon-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-salon-dark dark:text-white">{t('community')}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  {t('communityDesc')}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 rounded-full bg-salon-accent1/10 flex items-center justify-center mb-6 mx-auto">
                  <Award className="h-8 w-8 text-salon-accent1" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-salon-dark dark:text-white">{t('excellence')}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  {t('excellenceDesc')}
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 rounded-full bg-salon-accent2/10 flex items-center justify-center mb-6 mx-auto">
                  <MapPin className="h-8 w-8 text-salon-accent2" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-salon-dark dark:text-white">{t('authenticity')}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  {t('authenticityDesc')}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display mb-12 text-center text-salon-dark dark:text-white">{t('ourTeam')}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=1974&auto=format&fit=crop" 
                    alt="Marie Diop" 
                    className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-salon-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-center text-salon-dark dark:text-white">Marie Diop</h3>
                <p className="text-salon-primary mb-3 text-center font-medium">Fondatrice & CEO</p>
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  {t('founderDesc')}
                </p>
              </div>
              
              <div className="group">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1974&auto=format&fit=crop" 
                    alt="David Johnson" 
                    className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-salon-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-center text-salon-dark dark:text-white">David Johnson</h3>
                <p className="text-salon-primary mb-3 text-center font-medium">CTO</p>
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  {t('techDesc')}
                </p>
              </div>
              
              <div className="group">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop" 
                    alt="Aminata Touré" 
                    className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-salon-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-center text-salon-dark dark:text-white">Aminata Touré</h3>
                <p className="text-salon-primary mb-3 text-center font-medium">Directrice des Opérations</p>
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  {t('operationsDesc')}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-gradient-to-r from-salon-dark to-salon-dark/90 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-6 text-white">{t('contactUs')}</h2>
              <p className="text-xl text-white/80 mb-8">
                {t('contactDesc')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{t('phone')}</h3>
                  <p className="text-white/80">+1 (234) 567-8901</p>
                </div>
                
                <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">{t('email')}</h3>
                  <p className="text-white/80">info@salonconnect.africa</p>
                </div>
                
                <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm p-6 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">{t('address')}</h3>
                  <p className="text-white/80">New York, NY 10001</p>
                </div>
              </div>
              
              <Button className="bg-salon-primary hover:bg-salon-primary/90 py-6 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {t('sendMessage')}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
