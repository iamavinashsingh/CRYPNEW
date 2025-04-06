// utils/CryptoChartApi.js (updated)
import axios from 'axios';

    export const fetchCoinMarketChart = async (coinId) => {
    try {
        // 1. Call your Next.js API proxy instead of CoinGecko directly
        const response = await axios.get(`/api/cryptoChart?coinId=${coinId}`);
        
        // 2. Return parsed data from the proxy
        return response.data;
    } catch (error) {
        console.error("Error fetching chart data:", error.message);
        return null;
    }
    };
