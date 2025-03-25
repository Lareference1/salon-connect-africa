
import { useState } from 'react';
import { FuturisticCard } from './ui/futuristic-card';
import { FuturisticButton } from './ui/futuristic-button';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowRight, Sparkles, Star, Lightbulb, Zap } from 'lucide-react';

const FuturisticShowcase = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>('cards');

  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-salon-primary to-salon-accent1">
              Futuristic UI Design
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our sleek, minimalist interface with mirror effects, 
            transparent layers, and subtle animations for a cutting-edge user experience.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-2">
          {['cards', 'buttons', 'effects'].map((tab) => (
            <FuturisticButton
              key={tab}
              variant={activeTab === tab ? "mirror" : "ghost"}
              onClick={() => setActiveTab(tab)}
              className="capitalize"
            >
              {tab}
            </FuturisticButton>
          ))}
        </div>

        {/* Content based on selected tab */}
        <div className="grid grid-cols-1 gap-8">
          {/* Cards Showcase */}
          {activeTab === 'cards' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FuturisticCard 
                variant="mirror" 
                hoverEffect="lift" 
                animate 
                className="p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Mirror Card</h3>
                  <Sparkles className="h-5 w-5 text-salon-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Reflective surface with subtle gradient and transparency effects.
                </p>
                <FuturisticButton 
                  variant="default" 
                  size="sm" 
                  className="mt-auto w-full"
                  animation="shine"
                >
                  Explore <ArrowRight className="h-4 w-4" />
                </FuturisticButton>
              </FuturisticCard>

              <FuturisticCard 
                variant="glass" 
                hoverEffect="glow" 
                animate 
                className="p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Glass Card</h3>
                  <Star className="h-5 w-5 text-salon-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Frosted glass effect with blur and subtle transparency.
                </p>
                <FuturisticButton 
                  variant="glass" 
                  size="sm" 
                  className="mt-auto w-full"
                >
                  Discover <ArrowRight className="h-4 w-4" />
                </FuturisticButton>
              </FuturisticCard>

              <FuturisticCard 
                variant="neo-glass" 
                hoverEffect="scale" 
                animate 
                className="p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Neo Glass</h3>
                  <Lightbulb className="h-5 w-5 text-salon-primary" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Modern neomorphic glass with inner highlight and soft shadow.
                </p>
                <FuturisticButton 
                  variant="neo-glass" 
                  size="sm" 
                  className="mt-auto w-full"
                >
                  Learn More <ArrowRight className="h-4 w-4" />
                </FuturisticButton>
              </FuturisticCard>
            </div>
          )}

          {/* Buttons Showcase */}
          {activeTab === 'buttons' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-lg glass">
                <h3 className="text-lg font-semibold mb-4">Standard Variants</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FuturisticButton>Default</FuturisticButton>
                  <FuturisticButton variant="secondary">Secondary</FuturisticButton>
                  <FuturisticButton variant="outline">Outline</FuturisticButton>
                  <FuturisticButton variant="ghost">Ghost</FuturisticButton>
                  <FuturisticButton variant="destructive">Destructive</FuturisticButton>
                  <FuturisticButton variant="link">Link Style</FuturisticButton>
                </div>
              </div>

              <div className="p-6 rounded-lg mirror">
                <h3 className="text-lg font-semibold mb-4">Futuristic Variants</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FuturisticButton variant="mirror">Mirror</FuturisticButton>
                  <FuturisticButton variant="glass">Glass</FuturisticButton>
                  <FuturisticButton variant="frost">Frost</FuturisticButton>
                  <FuturisticButton variant="neo-glass">Neo Glass</FuturisticButton>
                  <FuturisticButton variant="glow">Glow Effect</FuturisticButton>
                  <FuturisticButton variant="default" animation="shine">Shine Effect</FuturisticButton>
                </div>
              </div>
            </div>
          )}

          {/* Effects Showcase */}
          {activeTab === 'effects' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FuturisticCard variant="mirror" className="p-6 overflow-hidden relative">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-salon-primary/20 rounded-full blur-3xl animate-pulse-subtle"></div>
                <h3 className="text-lg font-semibold mb-4">Blur & Glow</h3>
                <p className="text-sm text-muted-foreground">
                  Atmospheric blur effects combined with subtle glowing animations.
                </p>
                <div className="mt-4">
                  <FuturisticButton variant="glow" className="w-full">
                    <Zap className="h-4 w-4" /> Energize
                  </FuturisticButton>
                </div>
              </FuturisticCard>

              <FuturisticCard variant="glass" className="p-6 animate-float">
                <h3 className="text-lg font-semibold mb-4">Floating Animation</h3>
                <p className="text-sm text-muted-foreground">
                  Smooth, subtle floating animation creates a sense of lightness.
                </p>
                <div className="flex justify-center mt-6">
                  <div className="w-16 h-16 rounded-full bg-salon-primary/20 backdrop-blur-md flex items-center justify-center animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-salon-primary/40"></div>
                  </div>
                </div>
              </FuturisticCard>

              <FuturisticCard variant="neo-glass" className="p-6 shine-effect">
                <h3 className="text-lg font-semibold mb-4">Shimmer Effect</h3>
                <p className="text-sm text-muted-foreground">
                  Dynamic light reflections that move across surfaces.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-8 rounded bg-gradient-to-r ${
                        i === 0 ? 'from-salon-primary/30 to-salon-primary/10' :
                        i === 1 ? 'from-salon-accent1/30 to-salon-accent1/10' :
                        'from-salon-accent2/30 to-salon-accent2/10'
                      } animate-shimmer bg-[length:200%_100%]`}
                    ></div>
                  ))}
                </div>
              </FuturisticCard>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FuturisticShowcase;
