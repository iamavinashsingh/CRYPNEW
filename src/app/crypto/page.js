'user client';
import React from 'react';
import CryptoHome from './CryptoHome';
import Navbar from '../../components/Navbar';

export default function CryptoPage() {
    return (
        <main className="min-h-screen p-4 bg-cover bg-center bg-no-repeat bg-fixed" 
            style={{ backgroundImage: "url('/crypnew-bg.jpg')" }}>
            <Navbar />
            <CryptoHome />
        </main>
);
}
