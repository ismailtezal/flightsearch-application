import React from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Check, LocateFixed, X } from "lucide-react";
import { cn } from '@/lib/utils';
import { Airport } from '@/hooks/use-airports';
import { useForm, UseFormReturn } from 'react-hook-form';
import { Button } from './ui/button';
import { PopoverClose } from '@radix-ui/react-popover';
import { FormSchema } from './FlightSearchForm';

interface ArrivalFieldProps {
    control: any;
    form: any;
    airports: Airport[];
}

const ArrivalField: React.FC<ArrivalFieldProps> = ({ control, form, airports }) => {
    return (
        <FormField
            control={control}
            name="arrival"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Varış havaalanı</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full h-[50px] justify-between text-lg",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? airports.find(
                                            (airport) => airport.code === field.value
                                        )?.name
                                        : "Varış havaalanı seçiniz"}
                                    <LocateFixed className="ml-2 h-5 w-5 shrink-0 opacity-50 " />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput placeholder="Şehir veya havaalanı yazın..." />
                                <CommandEmpty>Havaalanı Bulunamadı...</CommandEmpty>
                                <CommandGroup>
                                    {airports.map((airport) => (
                                        <CommandItem
                                            value={airport.name}
                                            key={airport.code}
                                            className="text-lg"
                                            onSelect={() => {
                                                form.setValue("arrival", airport.code);
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    airport.code === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {`${airport.name} (${airport.code})`}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                            <div className="flex  justify-end p-4">
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

export default ArrivalField;
