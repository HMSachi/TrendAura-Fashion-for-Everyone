import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from '../context/CartContext';
import "./globals.css";

export const metadata = {
  title: "StyleSphere",
  description: "Modern Fashion for Everyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <CartProvider>
          <Header />
          <main className="flex-grow bg-gray-50">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
