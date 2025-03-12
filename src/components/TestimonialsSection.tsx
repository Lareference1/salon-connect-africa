
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Marie Johnson",
    role: "Propriétaire de Salon",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    content: "SalonConnect Africa a transformé mon salon. Trouver des tresseuses qualifiées était un vrai défi jusqu'à ce que je découvre cette plateforme. Maintenant, je peux facilement trouver des professionnelles talentueuses quand j'en ai besoin.",
    rating: 5
  },
  {
    id: 2,
    name: "Fatou Diallo",
    role: "Tresseuse professionnelle",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    content: "Grâce à SalonConnect, j'ai pu étendre ma clientèle et travailler avec plusieurs salons de qualité. La plateforme m'a permis de gagner en visibilité et d'augmenter mes revenus de manière significative.",
    rating: 5
  },
  {
    id: 3,
    name: "David Thompson",
    role: "Client",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "La qualité des tresses que j'ai reçues dans les salons partenaires de SalonConnect est exceptionnelle. Je peux voir la différence que fait une vraie professionnelle, et je ne retournerai jamais en arrière!",
    rating: 4
  },
  {
    id: 4,
    name: "Aisha Mohammed",
    role: "Tresseuse indépendante",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    content: "SalonConnect m'a permis de trouver des salons qui respectent mon travail et offrent un environnement professionnel. Je recommande cette plateforme à toutes les tresseuses qui cherchent à progresser dans leur carrière.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + 2);
  
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % (testimonials.length - 1));
  };
  
  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 2 : prev - 1));
  };

  return (
    <section className="py-16 bg-salon-accent1/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display mb-4">Ce que disent nos utilisateurs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les expériences de salons et de tresseuses qui ont utilisé notre plateforme.
          </p>
        </div>
        
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {visibleTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                  
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating 
                            ? "text-salon-accent2 fill-salon-accent2" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center space-x-4">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full bg-salon-primary/10 text-salon-primary hover:bg-salon-primary hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-full bg-salon-primary/10 text-salon-primary hover:bg-salon-primary hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
