import { useEffect, useState } from 'react';
import useFlights, { Flight } from '@/hooks/use-flights';

export interface FlightSearchResultsProps {
    departure: string;
    arrival: string;
    departureDate: string;
    returnDate?: string;
}

const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({
    departure,
    arrival,
    departureDate,
    returnDate,
}) => {
    const { flights: allFlights, loading: flightsLoading, error: flightsError } = useFlights();
    const [outboundFlights, setOutboundFlights] = useState<Flight[]>([]);
    const [returnFlights, setReturnFlights] = useState<Flight[]>([]);

    useEffect(() => {
        const filteredOutboundFlights = allFlights.filter((flight) => {
            let isMatch =
                flight.departureAirport === departure &&
                flight.arrivalAirport === arrival &&
                new Date(flight.departureTime).toISOString().split("T")[0] === departureDate;

            return isMatch;
        });

        setOutboundFlights(filteredOutboundFlights);

        if (returnDate) {
            const filteredReturnFlights = allFlights.filter((flight) => {
                let isMatch =
                    flight.departureAirport === arrival &&
                    flight.arrivalAirport === departure &&
                    new Date(flight.departureTime).toISOString().split("T")[0] === returnDate;

                return isMatch;
            });

            setReturnFlights(filteredReturnFlights);
        }
    }, [allFlights, departure, arrival, departureDate, returnDate]);

    if (flightsError) {
        return <div>Error loading flights</div>;
    }

    if (!outboundFlights) {
        return null;
    }

    return (
        <>
            {outboundFlights.length > 0 &&
                (<div className="flex flex-col space-y-4">
                    <div className="bg-white p-4 drop-shadow-2xl rounded-md">
                        <h2 className="text-2xl font-bold mb-4">Giden Uçuşlar</h2>
                        {outboundFlights.length === 0 ? (
                            <p>No matching outbound flights found</p>
                        ) : (
                            outboundFlights.map((flight) => (
                                <div key={flight.id} className="mb-4 border-b pb-2">
                                    <p className="text-lg font-semibold">{flight.airline}</p>
                                    <p>Departure: {flight.departureAirport}</p>
                                    <p>Arrival: {flight.arrivalAirport}</p>
                                    <p>Departure Time: {flight.departureTime}</p>
                                    <p>Arrival Time: {flight.arrivalTime}</p>
                                    <p>Duration: {flight.duration}</p>
                                    <p>Price: {flight.price}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {returnDate && returnFlights.length > 0 && (
                        <div className="bg-white p-4 drop-shadow-2xl rounded-md">
                            <h2 className="text-2xl font-bold mb-4">Dönen Uçuşlar</h2>
                            {returnFlights.map((flight) => (
                                <div key={flight.id} className="mb-4 border-b pb-2">
                                    <p className="text-lg font-semibold">{flight.airline}</p>
                                    <p>Departure: {flight.departureAirport}</p>
                                    <p>Arrival: {flight.arrivalAirport}</p>
                                    <p>Departure Time: {flight.departureTime}</p>
                                    <p>Arrival Time: {flight.arrivalTime}</p>
                                    <p>Duration: {flight.duration}</p>
                                    <p>Price: {flight.price}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                )
            }
        </>

    );
};

export default FlightSearchResults;
