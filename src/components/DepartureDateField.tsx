import React from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { X, CalendarSearchIcon } from "lucide-react";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Button } from './ui/button';
import { PopoverClose } from '@radix-ui/react-popover';
import { Calendar } from './ui/calendar';

interface DepartureDateFieldProps {
    control: any;
}

const DepartureDateField: React.FC<DepartureDateFieldProps> = ({ control }) => {
    return (
        <FormField
            control={control}
            name="departureDate"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel htmlFor="departureDateInput">Gidiş tarihi</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full h-[50px] pl-3 text-left text-lg font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    aria-haspopup="dialog"
                                    aria-expanded={field.value ? "true" : "false"}
                                    id="departureDateInput"
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarSearchIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start" aria-hidden={field.value ? "false" : "true"}>
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date: Date) =>
                                    date < new Date()
                                }
                                initialFocus
                                aria-label="Calendar"
                            />
                            <div className="flex justify-end p-2">
                                <PopoverClose>
                                    <X className=" hover:bg-blue-600 drop-shadow rounded text-white bg-blue-500" />
                                </PopoverClose>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DepartureDateField;
