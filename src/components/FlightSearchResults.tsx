import React, { useEffect, useState } from 'react';
import useFlights, { Flight } from '@/hooks/use-flights';

interface FlightSearchResultsProps {
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


    const formatTime = (time: string) => {
        return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };


    useEffect(() => {
        const filterFlights = (flight: Flight, from: string, to: string, date: string) => {
            return (
                flight.departureAirport === from &&
                flight.arrivalAirport === to &&
                new Date(flight.departureTime).toISOString().split('T')[0] === date
            );
        };

        const filteredOutboundFlights = allFlights.filter((flight) =>
            filterFlights(flight, departure, arrival, departureDate)
        );
        setOutboundFlights(filteredOutboundFlights);

        if (returnDate) {
            const filteredReturnFlights = allFlights.filter((flight) =>
                filterFlights(flight, arrival, departure, returnDate)
            );
            setReturnFlights(filteredReturnFlights);
        }
    }, [allFlights, departure, arrival, departureDate, returnDate]);

    if (flightsError) {
        return <div role="alert">Error loading flights</div>;
    }

    if (!outboundFlights.length) {
        return null;
    }

    const FlightList = ({ flights }: { flights: Flight[] }) => (
        <>
            {flights.map((flight) => (
                <div key={flight.id} className="mb-4 border-b pb-2">
                    <p className="text-lg font-semibold">{flight.airline}</p>
                    <p>Departure: {flight.departureAirport}</p>
                    <p>Arrival: {flight.arrivalAirport}</p>
                    <p>Departure Time: {formatTime(flight.departureTime)}</p>
                    <p>Arrival Time: {formatTime(flight.arrivalTime)}</p>
                    <p>Duration: {flight.duration}</p>
                    <p>Price: {flight.price} TRY</p>
                </div>
            ))}
        </>
    );

    return (
        <div className="flex flex-col space-y-4">
            <div className="bg-white p-4 drop-shadow-2xl rounded-md">
                <h2 className="text-2xl font-bold mb-4">Giden Uçuşlar</h2>
                {outboundFlights.length === 0 ? (
                    <p>No matching outbound flights found</p>
                ) : (
                    <FlightList flights={outboundFlights} />
                )}
            </div>

            {returnDate && returnFlights.length > 0 && (
                <div className="bg-white p-4 drop-shadow-2xl rounded-md">
                    <h2 className="text-2xl font-bold mb-4">Dönen Uçuşlar</h2>
                    <FlightList flights={returnFlights} />
                </div>
            )}
        </div>
    );
};

export default FlightSearchResults;
