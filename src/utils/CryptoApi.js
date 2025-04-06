import axios from 'axios';
const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchCoinDetails = async (coinId) => {
    try {
        const response = await axios.get(`${BASE_URL}/coins/${coinId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for ${coinId}:`, error.message);
        return null;
    }
};

