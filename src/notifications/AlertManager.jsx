'use client';

import React, { useEffect, useRef } from 'react';
import { showPriceAlert, showWeatherAlert } from './notificationUtils';

    const SIGNIFICANT_CHANGE = 1; // percent

    export default function AlertManager() {
    const priceRef = useRef({});

    // =============================== PRICE ALERTS ===============================
    useEffect(() => {
        const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

        ws.onmessage = (msg) => {
        const data = JSON.parse(msg.data);

        Object.keys(data).forEach((coin) => {
            const newPrice = parseFloat(data[coin]);
            const oldPrice = priceRef.current[coin];

            if (oldPrice) {
            const diffPercent = ((newPrice - oldPrice) / oldPrice) * 100;
            if (Math.abs(diffPercent) >= SIGNIFICANT_CHANGE) {
                showPriceAlert(coin, diffPercent);
            }
            }

            priceRef.current[coin] = newPrice;
        });
        };

        ws.onerror = (err) => {
        console.error('WebSocket error:', err);
        };

        return () => {
        ws.close();
        };
    }, []);


  
   

    // ============================== REAL WEATHER ALERTS ==============================

    const cities = [
        { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
        { name: 'New York', lat: 40.7128, lon: -74.006 },
        { name: 'London', lat: 51.5074, lon: -0.1278 },
    ];

    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; 
    useEffect(() => {
        const fetchWeatherAlerts = async () => {
        for (const city of cities) {
            try {
            const res = await fetch(
                `https://api.openweathermap.org/data/3.0/onecall?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`
            );
            const data = await res.json();

            if (data.alerts && data.alerts.length > 0) {
                data.alerts.forEach((alert) => {
                showWeatherAlert(city.name, alert.event || 'Severe Weather');
                });
            }
            } catch (err) {
            console.error(`Failed to fetch weather alerts for ${city.name}:`, err);
            }
        }
        };

        fetchWeatherAlerts(); // fetch initially
        const interval = setInterval(fetchWeatherAlerts, 15 * 60 * 1000); // refresh every 15 min

        return () => clearInterval(interval);
    }, []);

    return null;
    }

    

    