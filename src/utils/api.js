'use client';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCity = async (cityName) => {
    try {
        const response = await fetch(`${BASE_URL}?q=${cityName}&appid=${API_KEY}&units=metric`);
        if (!response.ok) throw new Error('City not found!');
        const data = await response.json();
        console.log("Weather Data:", data);
        return data;
    } catch (error) {
        console.error("Weather API Error:", error.message);
        return null;
    }
};


