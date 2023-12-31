import { useEffect, useState } from 'react';
import useFlights, { Flight } from '@/hooks/use-flights';

export interface FlightSearchResultsProps {
    departure: string;
    arrival: string;
    departureDate: string;
    returnDate: string;
}

const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({
    departure,
    arrival,
    departureDate,
    returnDate,
}) => {
    const [loading, setLoading] = useState(true);
    const [flights, setFlights] = useState<Flight[]>([]);
    const { flights: allFlights, loading: flightsLoading, error: flightsError } = useFlights();

    useEffect(() => {
        console.log(departureDate);
        const filteredFlights = allFlights.filter((flight) => {
            const isMatch =
                flight.departureAirport === departure &&
                flight.arrivalAirport === arrival &&
                new Date(flight.departureTime).toISOString().split("T")[0] === departureDate;
            return isMatch;
        });
        setFlights(filteredFlights);
        setLoading(false);
    }, [allFlights, departure, arrival, departureDate, returnDate]);



    if (loading || flightsLoading) {
        return <div>Loading...</div>;
    }

    if (flightsError) {
        return <div>Error loading flights</div>;
    }

    if (flights.length === 0) {
        return <div>No matching flights found for the given criteria</div>;
    }

    return (
        <div className='flex'>
            <div className='bg-white p-4 drop-shadow-2xl rounded-md'>
                {flights.map((flight) => (
                    <div key={flight.id}>
                        <p>{flight.airline}</p>
                        <p>Departure: {flight.departureAirport}</p>
                        <p>Arrival: {flight.arrivalAirport}</p>
                        <p>Departure Time: {flight.departureTime}</p>
                        <p>Arrival Time: {flight.arrivalTime}</p>
                        <p>Duration: {flight.duration}</p>
                        <p>Price: {flight.price}</p>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default FlightSearchResults;
