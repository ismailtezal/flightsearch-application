import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Navigation, LocateFixed, CalendarSearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useAirports from "@/hooks/use-airports";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import React, { useState } from "react";
import FlightSearchResults, { FlightSearchResultsProps } from "./FlightSearchResults";

const FormSchema = z.object({
  departure: z.string({
    required_error: "Lütfen Kalkış noktası seçiniz.",
  }),
  arrival: z.string({
    required_error: "Lütfen Varış noktası seçiniz.",
  }),
  departureDate: z.date({
    required_error: "Lütfen gidiş tarihi seçiniz.",
  }),
  returnDate: z.date({
    required_error: "Lütfen dönüş tarihi seçiniz.",
  }),
});

export function FlightSearchForm() {
  const { airports, loading: airportsLoading, error: airportsError } = useAirports();
  const [flights, setFlights] = useState<FlightSearchResultsProps>({
    departure: "",
    arrival: "",
    departureDate: "",
    returnDate: "",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {

    // TODO DEBUG THE 1 DAY BEFORE PROBLEM
    const modifiedDepartureDate = new Date(data.departureDate);
    modifiedDepartureDate.setDate(modifiedDepartureDate.getDate() + 1);

    setFlights({
      ...data,
      departureDate: modifiedDepartureDate.toISOString().split("T")[0],
      returnDate: data.returnDate ? new Date(data.returnDate).toISOString() : "",
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded bg-blue-50 p-5"
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <FormField
              control={form.control}
              name="departure"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel>Kalkış havaalanı</FormLabel>
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
                            : "Kalkış havaalanı seçiniz"}
                          <Navigation className="ml-2 h-5 w-5 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 ">
                      <Command>
                        <CommandInput placeholder="Şehir veya havaalanı yazın..." />
                        <CommandEmpty>Havaalanı Bulunamadı...</CommandEmpty>
                        <CommandGroup>
                          {airports.map((airport) => (
                            <CommandItem
                              value={airport.name}
                              className="text-lg"
                              key={airport.code}
                              onSelect={() => {
                                form.setValue("departure", airport.code);
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
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
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
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departureDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Gidiş tarihi</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-[50px] pl-3 text-left text-lg font-normal",
                            !field.value && "text-muted-foreground"
                          )}
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="returnDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Dönüş tarihi</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-[50px] pl-3 text-left text-lg font-normal",
                            !field.value && "text-muted-foreground"
                          )}
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
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-32">
              Uçuş ara
            </Button>
          </div>
          <FlightSearchResults
            departure={flights.departure}
            arrival={flights.arrival}
            departureDate={flights.departureDate}
            returnDate={flights.returnDate}
          />
        </form>
      </Form>
    </>
  );
}

export default FlightSearchForm;
