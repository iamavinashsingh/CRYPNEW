'use client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';
import { fetchCoinMarketChart } from '../../utils/CryptoChartApi';

export default function CryptoChart({ coinId }) {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchCoinMarketChart(coinId);
            if (data) {
                const formatted = data.map(item => ({
                    time: new Date(item[0]).toLocaleTimeString(),
                    price: item[1],
                }));
                setChartData(formatted);
                setError(null);
            } else {
                setChartData([]);
                setError("Unable to fetch chart data because this coin's data is not available with free account");
            }
            setLoading(false);
        };
        loadData();
    }, [coinId]);

    return (
        <div className="w-full h-full p-4 rounded-3xl bg-transparent backdrop-blur-2xl shadow-lg shadow-black/20 ">
            {loading ? (
                <p className="text-center text-gray-500">Loading chart data...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis dataKey="time" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#4ade80"
                            dot={false}
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
