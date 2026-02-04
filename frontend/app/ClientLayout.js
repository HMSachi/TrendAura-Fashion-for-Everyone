"use client";
import { usePathname } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';

export default function ClientLayout({ children }) {
    const pathname = usePathname();
    const isAdminPath = pathname.startsWith('/admin');

    return (
        <>
            {!isAdminPath && <Header />}
            <main className="flex-grow">{children}</main>
            {!isAdminPath && <Footer />}
        </>
    );
}
