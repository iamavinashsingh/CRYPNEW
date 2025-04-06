'use client';

import { useEffect, useState } from 'react';

export default function LiveCryptoPrices() {
    const [prices, setPrices] = useState({});

    useEffect(() => {
        const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,dogecoin,solana');

        socket.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            setPrices((prevPrices) => ({ ...prevPrices, ...data }));
        };

        socket.onerror = (error) => {
            console.error('WebSocket Error 😣:', error);
        };

        return () => socket.close(); // cleanup
    }, []);

    return (
        <div className="p-6 text-white space-y-4">
            <h1 className="text-xl font-bold text-yellow-400">📢 Live Crypto Prices</h1>

            <div className="space-y-4">
                {Object.entries(prices).map(([coin, price]) => (
                    <div
                        key={coin}
                        className="p-4 flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-xl shadow-md border border-white/10"
                    >
                        <h2 className="text-xl font-bold capitalize">{coin}</h2>
                        <p className="text-lg  font-mono">
                            ${parseFloat(price).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
