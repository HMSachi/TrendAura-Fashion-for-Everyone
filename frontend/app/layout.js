import { CartProvider } from '../context/CartContext';
import { Outfit, Tenor_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const tenorSans = Tenor_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata = {
  title: "StyleSphere",
  description: "Modern Fashion for Everyone",
};

import ClientLayout from './ClientLayout';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${tenorSans.variable} antialiased flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]`}>
        <CartProvider>
          <ClientLayout>{children}</ClientLayout>
        </CartProvider>
      </body>
    </html>
  );
}

