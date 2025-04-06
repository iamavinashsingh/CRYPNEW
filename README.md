# CrypNew

CrypNew is a **Next.js** application that serves as a dashboard for tracking **cryptocurrency prices**, **weather updates**, and **news alerts**. It integrates real-time data fetching, WebSocket communication, and notification alerts using `react-hot-toast`. The project is designed to be responsive and user-friendly, with a modern UI powered by **Tailwind CSS**.

---

## **Technologies Used**
1. **Frontend Framework**: [Next.js](https://nextjs.org) (React-based framework for server-side rendering and static site generation).
2. **Styling**: Tailwind CSS for responsive and modern UI design.
3. **WebSocket**: Real-time updates for cryptocurrency prices using CoinCap WebSocket API.
4. **APIs**:
   - **OpenWeatherMap API**: For weather data and alerts.
   - **CoinGecko API**: For cryptocurrency details and market data.
5. **Notifications**: `react-hot-toast` for user alerts (price changes, weather alerts).
6. **Charts**: `recharts` for rendering cryptocurrency price charts.
7. **Backend Proxy**: API routes in Next.js for securely fetching data from third-party APIs.
8. **Environment Variables**: `.env` file for storing sensitive API keys.

---

## **Data Flow in the Application**

### **1. Home Page (`src/app/page.js`)**
- **Purpose**: Serves as the main dashboard, displaying weather, cryptocurrency, and news sections.
- **Components Used**:
  - `AlertManager`: Manages real-time alerts for price changes and weather notifications.
  - `Navbar`: Navigation bar for switching between pages.
  - `WeatherDetails`: Displays weather data for predefined cities (Tokyo, New York, London).
  - `CryptoDetails`: Shows cryptocurrency details for selected coins (Bitcoin, Ethereum, Dogecoin).
  - `NewsDetails`: Displays the latest cryptocurrency-related news.
- **Data Flow**:
  - Weather data is fetched using `fetchWeatherByCity` from `api.js`.
  - Cryptocurrency data is fetched using `fetchCoinDetails` from `CryptoApi.js`.
  - News data is fetched from a custom API route (`/api/cryptoNews`).

---

### **2. Weather Page (`src/app/weather/page.js`)**
- **Purpose**: Dedicated page for weather updates.
- **Components Used**:
  - `Navbar`: Navigation bar.
  - `WeatherHome`: Main component for weather data.
- **Data Flow**:
  - `WeatherHome` fetches weather data for a user-specified city using `fetchWeatherByCity`.
  - Displays additional weather details like temperature, humidity, wind speed, and pressure.
  - Uses `WeatherDetails` to show weather data for predefined cities.

---

### **3. Weather Alerts**
- **Managed By**: `AlertManager` (`src/notifications/AlertManager.jsx`).
- **How It Works**:
  - Fetches weather alerts for predefined cities (Tokyo, New York, London) using OpenWeatherMap's One Call API.
  - If alerts are found, `showWeatherAlert` from `notificationUtils.js` is triggered to display a toast notification.
  - Notifications are refreshed every 15 minutes using `setInterval`.

---

### **4. Crypto Page (`src/app/crypto/page.js`)**
- **Purpose**: Dedicated page for cryptocurrency tracking.
- **Components Used**:
  - `Navbar`: Navigation bar.
  - `CryptoHome`: Main component for cryptocurrency data.
- **Data Flow**:
  - `CryptoHome` fetches cryptocurrency details using `fetchCoinDetails` and displays them in `CryptoCards`.
  - Real-time price updates are handled by `CryptoList` using WebSocket communication with CoinCap API.
  - `CryptoChart` renders a line chart for historical price data using `fetchCoinMarketChart`.

---

### **5. Cryptocurrency Alerts**
- **Managed By**: `AlertManager` (`src/notifications/AlertManager.jsx`).
- **How It Works**:
  - Establishes a WebSocket connection with CoinCap API to receive real-time price updates for Bitcoin and Ethereum.
  - Compares the new price with the previous price stored in `priceRef`.
  - If the price change exceeds a significant threshold (1%), `showPriceAlert` from `notificationUtils.js` is triggered to display a toast notification.

---

### **6. Notifications (`src/notifications/notificationUtils.js`)**
- **Toast Notifications**:
  - `showPriceAlert`: Displays alerts for significant cryptocurrency price changes.
  - `showWeatherAlert`: Displays alerts for severe weather conditions.
- **Customization**:
  - Notifications are styled with a dark theme and bold text.
  - Icons and unique IDs are used to differentiate alerts.

---

### **7. Shared Components**
- **Navbar (`src/components/Navbar.jsx`)**:
  - Provides navigation links to Home, Crypto, and Weather pages.
  - Highlights the active page using dynamic styling based on the current pathname.
- **WeatherDetails (`src/components/WeatherDetails.jsx`)**:
  - Displays weather data for a specific city.
  - Fetches data using `fetchWeatherByCity`.
- **CryptoDetails (`src/components/CryptoDetails.jsx`)**:
  - Displays cryptocurrency details like price, percentage change, and rank.
  - Fetches data using `fetchCoinDetails`.

---

## **How Alerts Work**
1. **Price Alerts**:
   - WebSocket connection receives real-time price updates.
   - If the price change exceeds 1%, a toast notification is triggered.
2. **Weather Alerts**:
   - Periodically fetches weather alerts for predefined cities.
   - Displays a toast notification for severe weather conditions.

---

## **How Data Flows**
1. **Weather Data**:
   - Fetched using `fetchWeatherByCity` in `api.js`.
   - Displayed in `WeatherDetails` and `WeatherHome`.
2. **Cryptocurrency Data**:
   - Fetched using `fetchCoinDetails` in `CryptoApi.js`.
   - Displayed in `CryptoDetails`, `CryptoCards`, and `CryptoHome`.
3. **News Data**:
   - Fetched from a custom API route (`/api/cryptoNews`).
   - Displayed in `NewsDetails`.

---

## **Key Features**
1. **Real-Time Updates**:
   - Cryptocurrency prices are updated in real-time using WebSocket.
   - Weather alerts are fetched periodically.
2. **Responsive Design**:
   - Fully responsive layout using Tailwind CSS.
   - Optimized for both desktop and mobile devices.
3. **Interactive Charts**:
   - Cryptocurrency price trends are visualized using `recharts`.
4. **Custom Notifications**:
   - Alerts for significant price changes and severe weather conditions.
   - Styled toast notifications with icons and unique IDs.
5. **API Integration**:
   - Securely fetches data from OpenWeatherMap and CoinGecko APIs using Next.js API routes.

---

## **File Structure**
```
src/
├── app/
│   ├── crypto/
│   │   ├── CryptoHome.jsx
│   │   ├── CryptoList.jsx
│   │   ├── CryptoChart.jsx
│   │   └── page.js
│   ├── weather/
│   │   ├── WeatherHome.jsx
│   │   └── page.js
│   ├── layout.js
│   └── page.js
├── components/
│   ├── Navbar.jsx
│   ├── WeatherDetails.jsx
│   ├── CryptoDetails.jsx
│   ├── CryptoCards.jsx
│   └── NewsDetails.jsx
├── notifications/
│   ├── AlertManager.jsx
│   └── notificationUtils.js
├── utils/
│   ├── api.js
│   ├── CryptoApi.js
│   └── CryptoChartApi.js
└── public/
    ├── crypnew-bg.jpg
    ├── bitcoin.png
    ├── ethereum.png
    ├── dogecoin.png
    └── weather icons...
```

## **Conclusion**
CrypNew is a comprehensive dashboard that combines real-time data, responsive design, and interactive features to provide users with up-to-date information on cryptocurrency prices, weather conditions, and news. It leverages modern web technologies like Next.js, Tailwind CSS, and WebSocket to deliver a seamless user experience.