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
                const response = await axios.get('https://run.mocky.io/v3/02d18779-8cd2-4097-af1b-61198153e940');
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
