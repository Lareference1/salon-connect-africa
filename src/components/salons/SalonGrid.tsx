
import SalonCard, { SalonData } from './SalonCard';

interface SalonGridProps {
  salons: SalonData[];
}

const SalonGrid = ({ salons }: SalonGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {salons.map((salon) => (
        <SalonCard key={salon.id} salon={salon} />
      ))}
    </div>
  );
};

export default SalonGrid;
