import React from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormControl} from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from './ui/calendar';  // varsayalım ki Calendar componenti aynı dizin içindedir
import { X, CalendarSearchIcon } from "lucide-react";
import { useForm, UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PopoverClose } from '@radix-ui/react-popover';
import { Button } from './ui/button';

interface ReturnDateFieldProps {
    control: any;
    form: any; 
}

const ReturnDateField: React.FC<ReturnDateFieldProps> = ({ control, form }) => {
    return (
        <FormField
            control={control}
            name="returnDate"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel htmlFor="returnDate">Dönüş tarihi</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full h-[50px] pl-3 text-left text-lg font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    disabled={form.watch("flightType") === "oneway"}
                                    aria-haspopup="true"
                                    aria-expanded={field.value ? "true" : "false"}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>Dönüş tarihi seçiniz</span>
                                    )}
                                    <CalendarSearchIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value === null ? undefined : field.value}
                                onSelect={field.onChange}
                                disabled={(date: Date) =>
                                    date < new Date()
                                }
                                initialFocus
                                aria-label="Calendar"
                            />
                            <div className="flex justify-end p-4">
                                <PopoverClose>
                                    <X className=" hover:bg-blue-600 drop-shadow rounded text-white bg-blue-500" />
                                </PopoverClose>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <FormMessage role="alert" />
                </FormItem>
            )}
        />
    );
};

export default ReturnDateField;
