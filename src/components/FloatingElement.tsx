
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FloatingElementProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  amplitude?: 'small' | 'medium' | 'large';
};

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  delay = 0,
  duration = 3,
  className,
  amplitude = 'medium',
}) => {
  const amplitudeValues = {
    small: 'animate-float-small',
    medium: 'animate-float-medium',
    large: 'animate-float-large',
  };

  const animationClass = amplitudeValues[amplitude];
  const delayStyle = { animationDelay: `${delay}s`, animationDuration: `${duration}s` };

  return (
    <div 
      className={cn(animationClass, className)} 
      style={delayStyle}
    >
      {children}
    </div>
  );
};

export default FloatingElement;
