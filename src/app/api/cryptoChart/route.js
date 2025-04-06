// Proxy to bypass CORS and handle CoinGecko API key
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const coinId = searchParams.get('coinId');
    const API_KEY = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;

    try {
        const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`, // Reduced days to avoid 429
        {
            headers: {
            'x-cg-pro-api-key': API_KEY,
            },
        }
        );
        const data = await response.json();
        return NextResponse.json(data.prices);
    } catch (error) {
        return NextResponse.json(
        { error: "Failed to fetch chart data"},
        { status: 500 }
        );
    }
    }