
import React from 'react';
import { Control } from 'react-hook-form';
import AvailabilitySelector from './availability/AvailabilitySelector';
import DateSelector from './availability/DateSelector';

interface BraiderAvailabilityFieldsProps {
  control: Control<any>;
}

const BraiderAvailabilityFields = ({ control }: BraiderAvailabilityFieldsProps) => {
  const availability = control._formValues?.availability || 'available';

  return (
    <div className="space-y-6">
      <AvailabilitySelector control={control} />
      
      {availability === "unavailable" && (
        <div className="pt-2">
          <DateSelector control={control} />
        </div>
      )}
    </div>
  );
};

export default BraiderAvailabilityFields;
