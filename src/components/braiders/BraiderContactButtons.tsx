
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar } from 'lucide-react';

interface BraiderContactButtonsProps {
  isAvailable: boolean;
}

const BraiderContactButtons = ({ isAvailable }: BraiderContactButtonsProps) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant="default" 
        size="sm" 
        className="flex-1 bg-salon-primary hover:bg-salon-primary/90"
        disabled={!isAvailable}
      >
        <MessageSquare className="h-4 w-4 mr-1" />
        Contacter
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex-1 border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10"
        disabled={!isAvailable}
      >
        <Calendar className="h-4 w-4 mr-1" />
        Planifier
      </Button>
    </div>
  );
};

export default BraiderContactButtons;
