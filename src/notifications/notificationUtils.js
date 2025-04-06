import toast from 'react-hot-toast';
    export function showPriceAlert(coin, changePercent) {
    const direction = changePercent > 0 ? "📈 UP" : "📉 DOWN";
    const formattedChange = changePercent.toFixed(2);

    toast(`⚠️ ${coin.toUpperCase()} is ${direction} by ${formattedChange}%`, {
        position: "top-right",
        duration: 6000,
        id: `${coin}-price-alert`,
        type: 'price_alert',
        style: {
            background: "#000000", 
            color: "#ffffff",
            fontWeight: "bold",
        },
        icon: changePercent > 0 ? '🔼' : '🔽',
        });
    }

    


    //  Weather Alert Notification
        export function showWeatherAlert(city, type) {
            toast(`🌦️ Weather Alert in ${city}: ${type.toUpperCase()} expected!`, {
            id: `${city}-weather-${type}`, // Unique toast ID to prevent duplicates
            position: "top-right",
            duration: 6000,
            type: 'weather_alert',
            style: {
                background: "#000000", 
                color: "#ffffff",
                fontWeight: "bold",
            },
            icon: '🚨',
            });        
        }