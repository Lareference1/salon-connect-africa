
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";
import { addDays, format } from "date-fns";

interface BraiderContactButtonsProps {
  isAvailable: boolean;
}

const BraiderContactButtons = ({ isAvailable }: BraiderContactButtonsProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleContactClick = () => {
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé au tresseur. Il vous contactera bientôt.",
    });
  };

  const handleScheduleClick = () => {
    if (date) {
      toast({
        title: "Rendez-vous confirmé",
        description: `Votre rendez-vous le ${format(date, 'PPP', { locale: fr })} a été enregistré. Vous recevrez une confirmation bientôt.`,
      });
      setIsPopoverOpen(false);
    } else {
      setIsPopoverOpen(true);
    }
  };

  // Calculate disabled dates based on availability
  const getDisabledDates = () => {
    if (!isAvailable) return [{ from: new Date(), to: addDays(new Date(), 365) }];
    // If status is "soon", disable only the next few days
    return [{ from: new Date(), to: addDays(new Date(), 2) }];
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
      
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-salon-accent1 text-salon-accent1 hover:bg-salon-accent1/10"
            disabled={!isAvailable}
            onClick={() => !date && setIsPopoverOpen(true)}
          >
            <Calendar className="h-4 w-4 mr-1" />
            {date ? format(date, 'dd/MM/yyyy') : 'Planifier'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3">
            <h3 className="font-medium mb-2">Choisissez une date</h3>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={getDisabledDates()}
              locale={fr}
              className="rounded-md border"
            />
            <div className="mt-4 flex justify-end">
              <Button size="sm" onClick={handleScheduleClick} disabled={!date}>
                Confirmer
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BraiderContactButtons;
