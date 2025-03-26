
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';

interface BraiderAvailabilityFieldsProps {
  control: Control<any>;
}

const BraiderAvailabilityFields = ({ control }: BraiderAvailabilityFieldsProps) => {
  const availability = control._formValues.availability;

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
            name="availableDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Available from</FormLabel>
                <div className="relative">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          onClick={(e) => {
                            e.preventDefault(); // Prevent default button behavior
                          }}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-auto p-0" 
                      align="start" 
                      sideOffset={5}
                      onOpenAutoFocus={(e) => e.preventDefault()} // Prevent auto focus that can cause scrolling
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormDescription>
                  When will you be available again for bookings?
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
