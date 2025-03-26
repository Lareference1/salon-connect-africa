
import React, { ReactNode, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type FloatingElementProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  amplitude?: 'small' | 'medium' | 'large';
  enable3D?: boolean;
  parallax?: boolean;
};

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  delay = 0,
  duration = 3,
  className,
  amplitude = 'medium',
  enable3D = true,
  parallax = false,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  
  const amplitudeValues = {
    small: 'animate-float-small',
    medium: 'animate-float-medium',
    large: 'animate-float-large',
  };

  const animationClass = amplitudeValues[amplitude];
  const delayStyle = { animationDelay: `${delay}s`, animationDuration: `${duration}s` };
  
  // Add parallax effect on mouse move
  useEffect(() => {
    if (!parallax || !elementRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate distance from center (normalized)
      const moveX = (clientX - centerX) / centerX;
      const moveY = (clientY - centerY) / centerY;
      
      // Apply 3D transformation
      if (elementRef.current) {
        let factor = 15; // Movement intensity
        switch (amplitude) {
          case 'small': factor = 5; break;
          case 'medium': factor = 10; break;
          case 'large': factor = 15; break;
        }
        
        elementRef.current.style.transform = enable3D 
          ? `translate3d(${moveX * factor}px, ${moveY * factor}px, 0) rotateX(${moveY * -factor/3}deg) rotateY(${moveX * factor/3}deg)`
          : `translate(${moveX * factor}px, ${moveY * factor}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [amplitude, enable3D, parallax]);

  return (
    <div 
      ref={elementRef}
      className={cn(
        animationClass, 
        enable3D && 'transform-3d',
        className
      )} 
      style={{
        ...delayStyle,
        transition: parallax ? 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' : undefined
      }}
    >
      {children}
    </div>
  );
};

export default FloatingElement;
