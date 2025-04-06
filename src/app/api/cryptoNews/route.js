import { NextResponse } from "next/server";

    export async function GET() {
    const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=cryptocurrency&language=en&category=business,technology`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
        }

        const data = await response.json();
        return NextResponse.json(data.results); // Only sending articles
    } catch (error) {
        console.error("Error fetching news:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
    }
