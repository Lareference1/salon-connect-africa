
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

interface DateSelectorProps {
  control: Control<any>;
}

const DateSelector = ({ control }: DateSelectorProps) => {
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
        .filter((d: unknown) => d instanceof Date && !isNaN((d as Date).getTime()))
        .map((d: unknown) => new Date(d as Date)); // Convert to Date objects to ensure consistency
      
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
                    // Handle dates safely with proper type checking
                    if (dates === undefined) {
                      setSelectedDates([]);
                      return;
                    }
                    
                    if (Array.isArray(dates)) {
                      // Filter out invalid dates from the array
                      const validDates = dates.filter((date: unknown): date is Date => {
                        return date instanceof Date && !isNaN((date as Date).getTime());
                      });
                      setSelectedDates(validDates);
                    } else if (dates instanceof Date && !isNaN(dates.getTime())) {
                      // Single date case
                      setSelectedDates([dates]);
                    } else {
                      // Fallback for unexpected cases
                      setSelectedDates([]);
                    }
                  }}
                  disabled={(date) => date < new Date()}
                  className="p-3 pointer-events-auto"
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
  );
};

export default DateSelector;
