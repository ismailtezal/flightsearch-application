import { useEffect, useState } from 'react';
import axios from 'axios';

export interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
}

const useAirports = () => {
    const [airports, setAirports] = useState<Airport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAirports = async () => {
            try {
                const response = await axios.get('https://run.mocky.io/v3/f2d026f3-a0b3-4d26-8083-565aee87f6e0');
                setAirports(response.data.airports);
                setLoading(false);
            } catch (error) {
                setError('Error fetching airports');
                setLoading(false);
            }
        };

        fetchAirports();
    }, []);

    return { airports, loading, error };
};

export default useAirports;
