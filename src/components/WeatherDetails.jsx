'use client';

import React, { useState, useEffect } from 'react';
import { fetchWeatherByCity } from '../utils/api';

export default function WeatherDetails({ city, iconSize = 'w-24 h-24'}) {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchWeatherByCity(city);
            setWeatherData(data);
        };
        getData();
    }, [city]);

    if (!weatherData) return null;

    const icon = weatherData?.weather?.[0]?.icon;
    const temp = weatherData?.main?.temp;
    const humidity = weatherData?.main?.humidity;
    const wind = weatherData?.wind?.speed;
    const description = weatherData?.weather?.[0]?.main;
    
    return (
        <div className="bg-transparent backdrop-blur-2xl shadow-lg shadow-black/20 border border-white/10 p-4 md:p-6 rounded-3xl hover:border-[#1CA8E8] hover:bg-white/10">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between">
                <div>
                    <h2 className="text-xl md:text-sm font-bold">{city}</h2>
                    <h2 className="text-2xl md:text-4xl">{temp}°C</h2>
                    <div className="flex flex-col gap-1 justify-between mt-2 md:mt-4">
                        <h2 className="text-xs md:text-sm text-gray-400">Humidity: {humidity}%</h2>
                        <h2 className="text-xs md:text-sm text-gray-400">Wind : {wind} km/h</h2>
                    </div>
                </div>
                <div className="flex gap-1 flex-col items-center justify-center">
                    {icon && (
                        <img
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                            alt="weather icon"
                            className={`${iconSize} shadow-2xl shadow-black/10`}
                            style={{ filter: 'drop-shadow(0 0 10px #FFFFFF)' }}
                        />
                    )}
                    <h2 className="text-xs md:text-sm">{description}</h2>
                </div>
            </div>
        </div>
    );
}