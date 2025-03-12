
import { Award, Calendar, MapPin, Users } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: "Connexion directe",
    description: "Mettez en relation votre salon avec des tresseuses qualifiées selon vos besoins spécifiques."
  },
  {
    icon: Award,
    title: "Professionnalisme garanti",
    description: "Toutes les tresseuses sont vérifiées et évaluées pour assurer un service de qualité."
  },
  {
    icon: MapPin,
    title: "Recherche locale",
    description: "Trouvez des tresseuses et des salons dans votre région pour faciliter la collaboration."
  },
  {
    icon: Calendar,
    title: "Planification flexible",
    description: "Gérez facilement les horaires et disponibilités pour une meilleure organisation."
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-salon-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display mb-4">Pourquoi choisir SalonConnect?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Notre plateforme simplifie la mise en relation entre salons et tresseuses pour une expérience professionnelle optimale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-salon-primary/10 text-salon-primary mb-6 mx-auto">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
