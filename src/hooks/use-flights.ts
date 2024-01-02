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
                const response = await axios.get('https://run.mocky.io/v3/f2d026f3-a0b3-4d26-8083-565aee87f6e0');
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
