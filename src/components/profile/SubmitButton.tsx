
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ 
  isLoading, 
  loadingText = "Saving...", 
  children 
}: SubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/80 hover:to-salon-primary hover:scale-105 shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 border-0 rounded-full text-sm"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
