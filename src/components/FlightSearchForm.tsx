import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import useAirports from "@/hooks/use-airports";
import { useState } from "react";
import FlightSearchResults, { FlightSearchResultsProps } from "./FlightSearchResults";
import { Separator } from "./ui/separator";
import DepartureField from "./DepartureField";
import ArrivalField from "./ArrivalField";
import DepartureDateField from "./DepartureDateField";
import ReturnDateField from "./ReturnDateField";
import { Form } from "./ui/form";
import FlightTypeField from "./FlightTypeField";

const initialState: FlightSearchResultsProps = {
  departure: "",
  arrival: "",
  departureDate: "",
  returnDate: "",
};

export const FormSchema = z.object({
  departure: z.string({
    required_error: "Lütfen Kalkış noktası seçiniz.",
  }),
  arrival: z.string({
    required_error: "Lütfen Varış noktası seçiniz.",
  }),
  departureDate: z.date({
    required_error: "Lütfen gidiş tarihi seçiniz.",
  }),
  returnDate: z.date().optional(),
  flightType: z.enum(["oneway", "roundtrip"], {
    required_error: "Bilet tipi seçiniz.",
  }),
});

const modifyDate = (date: Date, daysToAdd: number): string => {
  const modifiedDate = new Date(date);
  modifiedDate.setDate(modifiedDate.getDate() + daysToAdd);
  return modifiedDate.toISOString().split("T")[0];
};

const FlightSearchForm = () => {
  const { airports, loading: airportsLoading, error: airportsError } = useAirports();
  const [flights, setFlights] = useState<FlightSearchResultsProps>(initialState);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const modifiedDepartureDate = modifyDate(new Date(data.departureDate), 1);

    const modifiedReturnDate = data.returnDate
      ? modifyDate(new Date(data.returnDate), 1)
      : "";

    setFlights({
      ...data,
      departureDate: modifiedDepartureDate,
      returnDate: modifiedReturnDate,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 rounded bg-blue-50 p-5"
        role="search"
        aria-label="Flight Search Form"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <DepartureField control={form.control} form={form} airports={airports} />
          <ArrivalField control={form.control} form={form} airports={airports} />
          <DepartureDateField control={form.control} />
          <ReturnDateField control={form.control} form={form} />
          <FlightTypeField control={form.control} form={form} />
        </div>
        <div className="flex justify-end">
          <Button type="submit" className="w-32">
            Uçuş ara
          </Button>
        </div>
        <Separator />
        <div className="h-full">
          <FlightSearchResults {...flights} />
        </div>
      </form>
    </Form>
  );
};

export default FlightSearchForm;
