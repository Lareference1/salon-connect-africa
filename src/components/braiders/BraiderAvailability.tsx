
import { Check, Clock } from 'lucide-react';

interface BraiderAvailabilityProps {
  status: 'available' | 'soon' | 'unavailable';
  availability: string;
  experience: string;
}

const BraiderAvailability = ({ status, availability, experience }: BraiderAvailabilityProps) => {
  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-500';
      case 'soon':
        return 'text-amber-500';
      case 'unavailable':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getAvailabilityIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <Check className="h-4 w-4 mr-1" />;
      case 'soon':
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center mb-3 ${getAvailabilityColor(status)}`}>
      {getAvailabilityIcon(status)}
      <span className="text-sm">{availability} · {experience} d'expérience</span>
    </div>
  );
};

export default BraiderAvailability;
