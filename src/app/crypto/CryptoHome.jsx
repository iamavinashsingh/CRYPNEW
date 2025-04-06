'use client';

import axios from 'axios';
import React,{useState , useEffect} from 'react';
import {fetchCoinDetails} from '../../utils/CryptoApi';
import CryptoCards from '../../components/CryptoCards';
import CryptoList from './CryptoList';
import CryptoChart from './CryptoChart';

function CryptoHome() {
    const [query, setQuery] = useState('');
    const [cryptoData, setCryptoData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!query) return;
        const data = await fetchCoinDetails(query.toLowerCase());
        if (data) {
            setCryptoData(data);
            console.log(data);
            setError(null);
        } else {    
            setError('Coin not found !!!');
            setCryptoData(null);
        }
    }

    useEffect(() => {
            handleSearch(); // default search for Bitcoin
    }, []);

    return (
        <div className="flex flex-col lg:flex-row gap-6 mx-4 my-3 items-center justify-center">
            <div className="w-full lg:w-1/3 p-6 border border-white/10 rounded-3xl bg-transparent backdrop-blur-2xl shadow-lg shadow-black/20">
                <input
                    type="text"
                    className="bg-[#3FB9FF]/20 backdrop-blur-3xl px-4 py-2 mb-4 rounded-3xl w-full shadow-2xl shadow-black/30"
                    placeholder="Search Crypto"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <CryptoList />
            </div>
            {cryptoData && (
                <div className="relative w-full lg:w-2/3">
                    <div className="w-full h-64 sm:h-80 p-4 rounded-3xl bg-transparent backdrop-blur-2xl shadow-lg shadow-black/20 border border-white/10">
                        <CryptoChart coinId={cryptoData?.id} />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 mt-4">
                        <div className="w-full h-60 overflow-auto sm:w-1/2 p-6  bg-transparent backdrop-blur-2xl shadow-lg shadow-black/20 border border-white/10 rounded-3xl">
                            <h1 className="text-2xl sm:text-4xl  font-bold text-white">{cryptoData.name}</h1>
                            <p className="text-sm sm:text-base text-white mt-4 overflow-auto">{cryptoData.description.en}</p>
                        </div>
                        <div className="w-full sm:w-1/2 p-6 bg-transparent backdrop-blur-2xl shadow-lg shadow-black/20 border border-white/10 rounded-3xl">
                            <h2 className="text-2xl sm:text-4xl">${cryptoData.market_data.current_price.usd}</h2>
                            <p
                                className={`mt-2 text-sm sm:text-base font-bold ${
                                    cryptoData.market_data.price_change_percentage_24h >= 0 ? 'text-[#39FF14]' : 'text-red-500'
                                }`}
                            >
                                {cryptoData.market_data.price_change_percentage_24h.toFixed(2)}%
                            </p>
                            <h3 className="text-xs sm:text-sm text-white">Symbol: {cryptoData.symbol.toUpperCase()}</h3>
                            <h3 className="text-xs sm:text-sm text-white">Rank: #{cryptoData.market_cap_rank}</h3>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-6 m-4 w-full lg:w-1/3">
                <CryptoCards coinId="bitcoin" />
                <CryptoCards coinId="ethereum" />
                <CryptoCards coinId="dogecoin" />
            </div>
        </div>
    )
}
export default CryptoHome;