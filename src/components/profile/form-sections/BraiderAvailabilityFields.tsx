
import React, { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Control, useController } from 'react-hook-form';
import { Badge } from '@/components/ui/badge';

interface BraiderAvailabilityFieldsProps {
  control: Control<any>;
}

const BraiderAvailabilityFields = ({ control }: BraiderAvailabilityFieldsProps) => {
  const availability = control._formValues?.availability || 'available';
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  
  // Use useController instead of directly accessing internal properties
  const { field: unavailableDatesField } = useController({
    name: 'unavailableDates',
    control
  });

  // Initialize selectedDates from form value if it exists
  useEffect(() => {
    if (unavailableDatesField.value && Array.isArray(unavailableDatesField.value)) {
      // Ensure all items in the array are valid Date objects
      const validDates = unavailableDatesField.value
        .filter(d => d instanceof Date && !isNaN(d.getTime()))
        .map(d => new Date(d)); // Convert to Date objects to ensure consistency
      
      setSelectedDates(validDates);
    }
  }, [unavailableDatesField.value]); // Add unavailableDatesField.value as a dependency

  // Update form value when selected dates change
  useEffect(() => {
    unavailableDatesField.onChange(selectedDates);
  }, [selectedDates, unavailableDatesField]);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDates(current => {
      // Check if date already exists in the array
      const dateExists = current.some(
        d => d instanceof Date && date instanceof Date && 
             d.toDateString() === date.toDateString()
      );
      
      // If it exists, remove it, otherwise add it
      if (dateExists) {
        return current.filter(
          d => d instanceof Date && date instanceof Date && 
               d.toDateString() !== date.toDateString()
        );
      } else {
        return [...current, date];
      }
    });
  };

  const removeDate = (dateToRemove: Date) => {
    if (!(dateToRemove instanceof Date)) return;
    
    setSelectedDates(current => 
      current.filter(date => 
        date instanceof Date && 
        dateToRemove instanceof Date && 
        date.toDateString() !== dateToRemove.toDateString()
      )
    );
  };

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="availability"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Availability</FormLabel>
            <FormControl>
              <div className="flex gap-4">
                <div 
                  className={`flex-1 border rounded-md p-4 cursor-pointer transition-colors ${field.value === "available" ? "border-green-500 bg-green-50 dark:bg-green-900/20" : "border-muted"}`}
                  onClick={() => field.onChange("available")}
                >
                  <div className="font-medium mb-1 text-green-600 dark:text-green-400">Available</div>
                  <div className="text-sm text-muted-foreground">I'm currently available for bookings</div>
                </div>
                <div 
                  className={`flex-1 border rounded-md p-4 cursor-pointer transition-colors ${field.value === "unavailable" ? "border-red-500 bg-red-50 dark:bg-red-900/20" : "border-muted"}`}
                  onClick={() => field.onChange("unavailable")}
                >
                  <div className="font-medium mb-1 text-red-600 dark:text-red-400">Not Available</div>
                  <div className="text-sm text-muted-foreground">I'm not currently taking bookings</div>
                </div>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
      
      {availability === "unavailable" && (
        <div className="pt-2">
          <FormField
            control={control}
            name="unavailableDates"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Unavailable Days</FormLabel>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !selectedDates.length && "text-muted-foreground"
                          )}
                        >
                          {selectedDates.length > 0 ? (
                            `${selectedDates.length} day${selectedDates.length > 1 ? 's' : ''} selected`
                          ) : (
                            <span>Select days you're unavailable</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-auto p-0" 
                      align="start"
                      side="bottom"
                      sideOffset={5}
                    >
                      <Calendar
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={(dates) => {
                          // Need to use a type assertion to help TypeScript understand the structure
                          if (dates) {
                            if (Array.isArray(dates)) {
                              // Filter valid dates from the array
                              const validDates = dates
                                .filter((d): d is Date => d instanceof Date && !isNaN(d.getTime()));
                              setSelectedDates(validDates);
                            } else if (dates instanceof Date && !isNaN(dates.getTime())) {
                              // Single date case
                              setSelectedDates([dates]);
                            }
                          } else {
                            setSelectedDates([]);
                          }
                        }}
                        disabled={(date) => date < new Date()}
                        className="p-3"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {selectedDates.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedDates
                      .filter(date => date instanceof Date && !isNaN(date.getTime()))
                      .sort((a, b) => a.getTime() - b.getTime())
                      .map((date, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="flex items-center gap-1 py-1 px-2"
                        >
                          {format(date, "PPP")}
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-destructive" 
                            onClick={() => removeDate(date)}
                          />
                        </Badge>
                      ))}
                  </div>
                )}
                
                <FormDescription>
                  Select specific days when you'll be unavailable for bookings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default BraiderAvailabilityFields;
