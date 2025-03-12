
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="pattern-bg py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-display mb-6 leading-tight">
            Connecter les <span className="text-salon-primary">salons africains</span> aux <span className="text-salon-accent1">meilleures tresseuses</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            La première plateforme qui met en relation les salons de coiffure africains avec des tresseuses qualifiées aux États-Unis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-salon-primary hover:bg-salon-primary/90 text-white py-6 px-8 rounded-full text-lg">
              Je suis un salon
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10 py-6 px-8 rounded-full text-lg">
              Je suis une tresseuse
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
