'use client';
import React, { useState, useEffect } from 'react';
import WeatherDetails from '../../components/WeatherDetails';
import { fetchWeatherByCity } from '../../utils/api';

function WeatherHome() {
    const [city, setCity] = useState('Tokyo');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (!city) return;
        const data = await fetchWeatherByCity(city);
        if (data) {
            setWeatherData(data);
            setError('');
        } else {
            setError('City not found !!!');
            setWeatherData(null);
        }
    };

    const icon = weatherData?.weather?.[0]?.icon;
    useEffect(() => {
        handleSearch(); // default Tokyo
    }, []);

    const currentDate = new Date().toLocaleString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    return (
        <div className="flex flex-col md:flex-row gap-6 mx-6 my-2 rounded-3xl p-6">
            {/* Left Section */}
            <div className="flex flex-col gap-6 w-full md:w-1/3">
                <WeatherDetails city="Tokyo" />
                <WeatherDetails city="New York" />
                <WeatherDetails city="London" />
            </div>

            {/* Right Section */}
            <div className="w-full md:w-2/3 md:h-145 rounded-3xl px-6 py-6 text-white flex flex-col gap-6 items-center bg-transparent backdrop-blur-2xl shadow-md shadow-black/20 border border-white/10">
                {/* Input Field */}
                <input
                    type="text"
                    className="bg-[#3FB9FF]/20 backdrop-blur-3xl px-4 py-2 rounded-3xl w-full shadow-2xl shadow-black/30"
                    placeholder="Enter location...."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />

                {/* Error Message */}
                {error && <p className="text-red-400">{error}</p>}

                {/* Weather Data */}
                {weatherData && (
                    <div className="flex flex-col gap-6 sm:h-full md:h-110 items-center justify-center w-full">
                        <h2 className="text-2xl md:mt-6 font-bold text-center">
                            {weatherData.name}, {weatherData.sys.country}
                        </h2>
                        <h3 className="text-center">{currentDate}</h3>

                        {/* Weather Icon and Description */}
                        <div className="flex flex-col items-center justify-center gap-2">
                            <img
                                src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                                alt="weather icon"
                                className="w-24 h-24 shadow-2xl shadow-black/10"
                                style={{ filter: 'drop-shadow(0 0 10px #FFFFFF)' }}
                            />
                            <h4 className="bg-amber-300/15 rounded-2xl px-2 py-1 text-center">
                                {weatherData.weather[0].main}
                            </h4>
                        </div>

                        {/* Temperature */}
                        <h2 className="text-4xl text-center">{weatherData.main.temp}°C</h2>

                        {/* Min and Max Temperature */}
                        <div className="flex gap-4 justify-around w-full text-center">
                            <h3>Min: {weatherData.main.temp_min}°C</h3>
                            <h3>Max: {weatherData.main.temp_max}°C</h3>
                        </div>

                        {/* Additional Weather Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                            {/* Feels Like */}
                            <div className="flex gap-4 items-center">
                                <img src="/temperature.png" alt="" className="w-10 h-10" />
                                <div>
                                    <h3 className="text-xs text-gray-400">Feels Like</h3>
                                    <h3 className="text-2xl">{weatherData.main.feels_like}°C</h3>
                                </div>
                            </div>

                            {/* Humidity */}
                            <div className="flex gap-4 items-center">
                                <img src="/humidity.png" alt="" className="w-10 h-10" />
                                <div>
                                    <h3 className="text-xs text-gray-400">Humidity</h3>
                                    <h3 className="text-2xl">{weatherData.main.humidity}%</h3>
                                </div>
                            </div>

                            {/* Wind */}
                            <div className="flex gap-4 items-center">
                                <img src="/wind.png" alt="" className="w-10 h-10" />
                                <div>
                                    <h3 className="text-xs text-gray-400">Wind</h3>
                                    <h3 className="text-2xl">{weatherData.wind.speed} km/h</h3>
                                </div>
                            </div>

                            {/* Pressure */}
                            <div className="flex gap-4 items-center">
                                <img src="/barometer.png" alt="" className="w-10 h-10" />
                                <div>
                                    <h3 className="text-xs text-gray-400">Pressure</h3>
                                    <h3 className="text-2xl">{weatherData.main.pressure} hPa</h3>
                                </div>
                            </div>

                            {/* Sea Level */}
                            <div className="flex gap-4 items-center">
                                <img src="/aqi.png" alt="" className="w-10 h-10" />
                                <div>
                                    <h3 className="text-xs text-gray-400">Sea Level</h3>
                                    <h3 className="text-2xl">{weatherData.main.sea_level} m</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherHome;
