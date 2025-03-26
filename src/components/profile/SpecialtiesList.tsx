
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SpecialtiesListProps {
  specialties: string[];
  onSpecialtiesChange: (specialties: string[]) => void;
}

const SpecialtiesList = ({ specialties, onSpecialtiesChange }: SpecialtiesListProps) => {
  const [specialtyInput, setSpecialtyInput] = useState("");

  const handleAddSpecialty = () => {
    if (specialtyInput.trim() && !specialties.includes(specialtyInput.trim())) {
      const newSpecialties = [...specialties, specialtyInput.trim()];
      onSpecialtiesChange(newSpecialties);
      setSpecialtyInput("");
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    const newSpecialties = specialties.filter(s => s !== specialty);
    onSpecialtiesChange(newSpecialties);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {specialties.map((specialty, index) => (
          <div key={index} className="flex items-center bg-salon-primary/10 text-salon-primary text-xs px-2 py-1 rounded">
            {specialty}
            <button 
              type="button" 
              className="ml-2 text-salon-primary hover:text-red-500"
              onClick={() => handleRemoveSpecialty(specialty)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input 
          placeholder="Add a specialty" 
          value={specialtyInput} 
          onChange={(e) => setSpecialtyInput(e.target.value)} 
        />
        <Button type="button" size="sm" onClick={handleAddSpecialty}>Add</Button>
      </div>
    </div>
  );
};

export default SpecialtiesList;
