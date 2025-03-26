
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FormSubmitButtonProps {
  isSubmitting: boolean;
  text: string;
  loadingText?: string;
}

const FormSubmitButton = ({ isSubmitting, text, loadingText = "Creating..." }: FormSubmitButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full bg-gradient-to-r from-salon-primary to-salon-primary/90 hover:from-salon-primary/80 hover:to-salon-primary hover:scale-105 shadow-md"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
};

export default FormSubmitButton;
