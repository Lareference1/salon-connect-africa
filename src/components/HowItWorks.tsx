
import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: "01",
    title: "Créez votre profil",
    description: "Inscrivez-vous en tant que salon ou tresseuse et créez un profil détaillé.",
    color: "bg-salon-primary"
  },
  {
    number: "02",
    title: "Recherchez des opportunités",
    description: "Parcourez les profils des salons ou des tresseuses selon vos besoins.",
    color: "bg-salon-accent1"
  },
  {
    number: "03",
    title: "Entrez en contact",
    description: "Discutez directement avec les parties intéressées pour établir une collaboration.",
    color: "bg-salon-accent2"
  },
  {
    number: "04",
    title: "Commencez à travailler ensemble",
    description: "Définissez les termes et commencez une collaboration professionnelle réussie.",
    color: "bg-salon-dark"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display mb-4">Comment ça marche</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un processus simple en quatre étapes pour connecter les salons et les tresseuses.
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white text-xl font-bold mb-6`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-16 left-[calc(25%*0.5+25%*${index}+25%*0.5)] transform -translate-x-1/2">
                    <ArrowRight className="text-gray-300" size={24} />
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
