
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { MapPin, Users, Award, Phone } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-salon-primary py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display text-white mb-6">Notre mission</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Faciliter la connexion entre les salons de coiffure africains et les tresseuses talentueuses pour créer un écosystème de beauté florissant.
            </p>
          </div>
        </section>
        
        {/* Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-display mb-6 text-center">Notre histoire</h2>
              <div className="prose lg:prose-xl max-w-none">
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display mb-12 text-center">Nos valeurs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-salon-primary/10 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-salon-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Communauté</h3>
                <p className="text-gray-600">
                  Nous cultivons un espace où les professionnels peuvent partager leurs connaissances, s'entraider et grandir ensemble dans un esprit de solidarité.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-salon-accent1/10 flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-salon-accent1" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Excellence</h3>
                <p className="text-gray-600">
                  Nous encourageons et mettons en avant le professionnalisme et l'expertise, car nous croyons que la qualité mérite d'être reconnue et valorisée.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-salon-accent2/10 flex items-center justify-center mb-6">
                  <MapPin className="h-8 w-8 text-salon-accent2" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Authenticité</h3>
                <p className="text-gray-600">
                  Nous célébrons et préservons l'héritage des coiffures africaines traditionnelles tout en embrassant l'innovation et la créativité moderne.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display mb-12 text-center">Notre équipe</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1550525811-e5869dd03032?q=80&w=1974&auto=format&fit=crop" 
                  alt="Marie Diop" 
                  className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">Marie Diop</h3>
                <p className="text-salon-primary mb-2">Fondatrice & CEO</p>
                <p className="text-gray-600 text-sm">
                  Ancienne propriétaire de salon avec 15 ans d'expérience dans l'industrie de la beauté.
                </p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1974&auto=format&fit=crop" 
                  alt="David Johnson" 
                  className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">David Johnson</h3>
                <p className="text-salon-primary mb-2">CTO</p>
                <p className="text-gray-600 text-sm">
                  Expert en technologie avec une passion pour créer des solutions qui font la différence.
                </p>
              </div>
              
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1974&auto=format&fit=crop" 
                  alt="Aminata Touré" 
                  className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-1">Aminata Touré</h3>
                <p className="text-salon-primary mb-2">Directrice des Opérations</p>
                <p className="text-gray-600 text-sm">
                  Spécialiste en relations professionnelles avec un réseau étendu dans le secteur de la beauté.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-salon-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-display mb-6">Contactez-nous</h2>
              <p className="text-xl text-white/80 mb-8">
                Des questions? Notre équipe est là pour vous aider.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Téléphone</h3>
                  <p className="text-white/80">+1 (234) 567-8901</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Email</h3>
                  <p className="text-white/80">info@salonconnect.africa</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Adresse</h3>
                  <p className="text-white/80">New York, NY 10001</p>
                </div>
              </div>
              
              <Button className="bg-salon-primary hover:bg-salon-primary/90 py-6 px-10 rounded-full text-lg">
                Envoyez-nous un message
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
