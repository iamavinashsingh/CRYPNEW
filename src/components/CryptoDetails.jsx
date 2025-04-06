'use client';

import React, { useState, useEffect } from 'react';
import { fetchCoinDetails } from '../utils/CryptoApi';
import CryptoChart from '../app/crypto/CryptoChart';

export default function CryptoDetails({ coinId }) {
    const [cryptoData, setCryptoData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchCoinDetails(coinId);
                if (data) {
                    setCryptoData(data);
                    setError(null);
                } else {
                    setError('Coin not found!!!');
                    setCryptoData(null);
                }
            } catch (err) {
                setError('Something went wrong!');
            }
        };

        getData();
    }, [coinId]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!cryptoData) return <p className="text-white">Loading...</p>;

    let cryptoImg = '';
    if (cryptoData.name.toLowerCase() === 'bitcoin') {
        cryptoImg = '/bitcoin.png';
    } else if (cryptoData.name.toLowerCase() === 'ethereum') {
        cryptoImg = '/ethereum.png';
    } else if (cryptoData.name.toLowerCase() === 'dogecoin') {
        cryptoImg = '/dogecoin.png';
    }

    return (
        <div className="bg-transparent backdrop-blur-2xl shadow-lg shadow-black/20 border border-white/10 p-4 sm:p-6 rounded-3xl hover:border-[#1CA8E8] hover:bg-white/10">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
                <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                        <img src={cryptoImg} alt="logo" className="w-8 sm:w-10 h-8 sm:h-10" />
                        <h1 className="text-base sm:text-lg">{cryptoData.name}</h1>
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-4xl mt-2 sm:mt-4">${cryptoData.market_data.current_price.usd}</h2>
                        <p
                            className={`mt-2 text-sm sm:text-base font-bold ${
                                cryptoData.market_data.price_change_percentage_24h >= 0 ? 'text-[#39FF14]' : 'text-red-500'
                            }`}
                        >
                            {cryptoData.market_data.price_change_percentage_24h.toFixed(2)}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
