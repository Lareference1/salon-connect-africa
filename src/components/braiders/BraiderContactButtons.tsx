
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface BraiderContactButtonsProps {
  isAvailable: boolean;
}

const BraiderContactButtons = ({ isAvailable }: BraiderContactButtonsProps) => {
  const { toast } = useToast();

  const handleContactClick = () => {
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé au tresseur. Il vous contactera bientôt.",
    });
  };

  const handleScheduleClick = () => {
    toast({
      title: "Rendez-vous",
      description: "Votre demande de rendez-vous a été enregistrée. Vous recevrez une confirmation bientôt.",
    });
  };

  return (
    <div className="flex space-x-2">
      <Button 
        variant="default" 
        size="sm" 
        className="flex-1 bg-salon-primary hover:bg-salon-primary/90"
        disabled={!isAvailable}
        onClick={handleContactClick}
      >
        <MessageSquare className="h-4 w-4 mr-1" />
        Contacter
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex-1 border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10"
        disabled={!isAvailable}
        onClick={handleScheduleClick}
      >
        <Calendar className="h-4 w-4 mr-1" />
        Planifier
      </Button>
    </div>
  );
};

export default BraiderContactButtons;
