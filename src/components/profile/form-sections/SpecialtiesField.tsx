
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, X } from 'lucide-react';
import { Control, useFormContext } from 'react-hook-form';

interface SpecialtiesFieldProps {
  control: Control<any>;
}

const SpecialtiesField = ({ control }: SpecialtiesFieldProps) => {
  const [newSpecialty, setNewSpecialty] = useState("");
  const { getValues, setValue } = useFormContext();
  
  const handleAddSpecialty = () => {
    if (!newSpecialty.trim()) return;
    
    const currentSpecialties = getValues("specialties") || [];
    if (!currentSpecialties.includes(newSpecialty.trim())) {
      setValue("specialties", [...currentSpecialties, newSpecialty.trim()]);
    }
    setNewSpecialty("");
  };

  const handleRemoveSpecialty = (specialty: string) => {
    const currentSpecialties = getValues("specialties") || [];
    setValue(
      "specialties",
      currentSpecialties.filter((s: string) => s !== specialty)
    );
  };

  return (
    <FormField
      control={control}
      name="specialties"
      render={() => (
        <FormItem>
          <FormLabel>Specialties</FormLabel>
          <div className="space-y-2">
            <div className="flex">
              <Input 
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="Add a specialty (e.g., Box Braids, Cornrows)"
                className="flex-1 rounded-r-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSpecialty();
                  }
                }}
              />
              <Button 
                type="button" 
                onClick={handleAddSpecialty}
                className="rounded-l-none"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {getValues("specialties")?.map((specialty: string, index: number) => (
                <div 
                  key={index} 
                  className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center"
                >
                  <span>{specialty}</span>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="h-5 w-5 ml-1 p-0 hover:bg-transparent"
                    onClick={() => handleRemoveSpecialty(specialty)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {specialty}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SpecialtiesField;
