import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Flight {
    id:number,
    airline: string;
    departureAirport: string;
    arrivalAirport: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
}

const useFlights = () => {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('https://run.mocky.io/v3/02d18779-8cd2-4097-af1b-61198153e940');
                setFlights(response.data.flights);
                setLoading(false);
            } catch (error) {
                setError('Error fetching flights');
                setLoading(false);
            }
        };

        fetchFlights();
    }, []);

    return { flights, loading, error };
};

export default useFlights;
