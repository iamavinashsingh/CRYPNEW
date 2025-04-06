'use client';
import React, { useEffect, useState } from 'react';

    const CryptoNews = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('/api/cryptoNews')
        .then(res => res.json())
        .then(data => setNews(data))
        .catch(err => console.error("News fetch error:", err));
    }, []);

    return (
        <div className="p-4 h-150 rounded-3xl bg-transparent backdrop-blur-2xl shadow-lg shadow-black/20 overflow-hidden">
        <h2 className="text-xl font-bold mb-4">📰 Latest Crypto News</h2>
        {news.length === 0 && <p>Loading news...</p>}
        <ul className="space-y-4">
            {news.map((article, index) => (
            <li key={index} className="p-3 rounded-lg shadow  hover:bg-white/20 transition duration-300 ease-in-out">
                <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-300 font-medium hover:underline hover:text-blue-700">
                {article.title}
                </a>
                <p className="text-sm text-gray-600">{article.pubDate}</p>
            </li>
            ))}
        </ul>
        </div>
    );
    };

export default CryptoNews;
