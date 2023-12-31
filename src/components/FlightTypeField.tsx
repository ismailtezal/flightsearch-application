import React from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface FlightTypeFieldProps {
    control: any;
    form: any;
}

const FlightTypeField: React.FC<FlightTypeFieldProps> = ({ control, form }) => {
    return (
        <FormField
            control={control}
            name="flightType"
            defaultValue="oneway"
            render={({ field }) => (
                <FormItem className="space-y-1">
                    <FormLabel htmlFor="flightType">Bilet tipi</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row items-center"
                        >
                            <FormItem className="flex py-2 items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value="oneway" id="oneway" />
                                </FormControl>
                                <FormLabel htmlFor="oneway" className="font-normal">
                                    Tek yön
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <RadioGroupItem value="roundtrip" id="roundtrip" />
                                </FormControl>
                                <FormLabel htmlFor="roundtrip" className="font-normal">
                                    Gidiş-Dönüş
                                </FormLabel>
                            </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FlightTypeField;
