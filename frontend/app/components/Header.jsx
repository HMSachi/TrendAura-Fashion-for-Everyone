"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);

        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass h-16 shadow-sm border-b' : 'bg-transparent h-24'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo & Desktop Nav */}
                    <div className="flex items-center gap-16">
                        <Link href="/" className="flex-shrink-0 group">
                            <span className="text-2xl md:text-3xl font-serif text-charcoal tracking-tighter transition-all group-hover:tracking-normal">
                                Trend<span className="text-clay italic">Aura.</span>
                            </span>
                        </Link>
                        <div className="hidden lg:flex items-center space-x-10">
                            {['Home', 'Shop', 'About Us'].map((item) => (
                                <Link
                                    key={item}
                                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    className="relative group text-stone/70 hover:text-charcoal text-xs font-bold uppercase tracking-[0.2em] transition-colors"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-clay transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6">
                        {userInfo && userInfo.isAdmin && (
                            <Link
                                href="/admin"
                                className="hidden md:block text- clay text-[10px] font-bold uppercase tracking-widest border border-clay px-4 py-1.5 rounded-full hover:bg-clay hover:text-silk transition-all"
                            >
                                Dashboard
                            </Link>
                        )}

                        <div className="flex items-center space-x-4">
                            <Link href={userInfo ? "/profile" : "/login"} className="text-stone hover:text-charcoal transition-colors">
                                <User className="h-5 w-5" strokeWidth={1.5} />
                            </Link>

                            <Link href="/cart" className="relative group text-stone hover:text-charcoal transition-colors">
                                <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-clay rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
                            </Link>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden p-2 text-stone hover:text-charcoal"
                            >
                                <Menu className="h-6 w-6" strokeWidth={1.5} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 glass border-t border-clay/10 py-6 px-4 flex flex-col gap-4 shadow-xl">
                    {['Home', 'Shop', 'About Us', 'Cart', 'Login'].map((item) => (
                        <Link
                            key={item}
                            href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-stone hover:text-clay text-sm font-bold uppercase tracking-widest py-2 border-b border-transparent hover:border-clay/20"
                        >
                            {item}
                        </Link>
                    ))}
                    {userInfo && userInfo.isAdmin && (
                        <Link
                            href="/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-clay text-sm font-bold uppercase tracking-widest py-2"
                        >
                            Admin Dashboard
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};


export default Header;
