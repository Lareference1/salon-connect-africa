
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-salon-primary to-salon-accent1">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-display mb-6 text-white">
          Prêt à rejoindre notre communauté?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Que vous soyez un salon à la recherche de tresseuses qualifiées ou une tresseuse cherchant de nouvelles opportunités, SalonConnect Africa est là pour vous.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-white text-salon-primary hover:bg-white/90 py-6 px-8 rounded-full text-lg">
            Créer un compte gratuitement
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 py-6 px-8 rounded-full text-lg">
            En savoir plus
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
