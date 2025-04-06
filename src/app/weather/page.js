
'use client';
import React from 'react';
import WeatherHome from './WeatherHome'; 
import Navbar from '../../components/Navbar';

export default function WeatherPage() {
    return (
        <main className="min-h-screen p-4 bg-cover bg-center bg-no-repeat bg-fixed" 
            style={{ backgroundImage: "url('/crypnew-bg.jpg')" }}>
            <Navbar />
            <WeatherHome />
        </main>
    );
}
