
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const CtaSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-r from-salon-primary to-salon-accent1">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-display mb-6 text-white">
          {t('readyToJoin')}
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          {t('ctaSubtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            className="bg-white text-salon-primary hover:bg-white/90 py-6 px-8 rounded-full text-lg"
            asChild
          >
            <Link to="/auth?tab=signup">{t('createFreeAccount')}</Link>
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 py-6 px-8 rounded-full text-lg"
            asChild
          >
            <Link to="/about">{t('learnMore')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
