import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CrypNew",
  description: "A Crypto, Weather and News Dashboard",
  icons: {
    icon: "/Sign-Crypnew.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Toaster 
          position="top-right" 
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '10px',
              padding: '10px 20px',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
