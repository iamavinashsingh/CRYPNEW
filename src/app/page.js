'use client';

import Navbar from '../components/Navbar';
import CryptoDetails from '../components/CryptoDetails';
import WeatherDetails from '../components/WeatherDetails';
import NewsDetails from '../components/NewsDetails';
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen p-4 bg-cover bg-center bg-no-repeat bg-fixed" 
      style={{ backgroundImage: "url('/crypnew-bg.jpg')" }}>
      <Navbar />
      
      {/* Main Dashboard Container */}
      <div className="grid mx-4 md:mx-8 sm:grid-cols-1 md:grid-cols-6 gap-6 mt-6">
        
        {/* Weather Section */}
        <div className="WeatherDetails sm:col-span-1 md:col-span-1 flex flex-col gap-6">
          <WeatherDetails city="Tokyo" />
          <WeatherDetails city="New York" />
          <WeatherDetails city="London" />
        </div>

        {/* Crypto Section */}
        <div className="CryptoDetails sm:col-span-1 md:col-span-2 flex flex-col gap-6">
          <CryptoDetails coinId='bitcoin'/>
          <CryptoDetails coinId='ethereum'/>
          <CryptoDetails coinId='dogecoin'/>
        </div>

        {/* News Section */}
        <div className="NewsDetails sm:col-span-1 md:col-span-3">
          <NewsDetails />
        </div>

      </div>
    </main>
  )
}

