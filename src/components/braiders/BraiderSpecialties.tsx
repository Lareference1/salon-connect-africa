
interface BraiderSpecialtiesProps {
  specialties: string[];
}

const BraiderSpecialties = ({ specialties }: BraiderSpecialtiesProps) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium mb-1">Spécialités:</h4>
      <div className="flex flex-wrap gap-1">
        {specialties.map((specialty, index) => (
          <span 
            key={index}
            className="inline-block bg-salon-primary/10 text-salon-primary text-xs px-2 py-1 rounded"
          >
            {specialty}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BraiderSpecialties;
