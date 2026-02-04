"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    return (
        <nav className="bg-[var(--background)]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#DBC8C0]/30 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo & Desktop Nav */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-3xl font-serif text-[#2D2D2D] tracking-tighter">
                                Trend<span className="text-[#8D7B68] italic">Aura.</span>
                            </span>
                        </Link>
                        <div className="hidden sm:ml-20 sm:flex sm:space-x-12">
                            {['Home', 'Shop', 'About Us'].map((item) => (
                                <Link
                                    key={item}
                                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                    className="relative group text-gray-500 hover:text-[#2D2D2D] inline-flex items-center px-1 pt-1 text-sm font-medium uppercase tracking-wider transition-colors h-full"
                                >
                                    {item}
                                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#8D7B68] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                                </Link>
                            ))}
                            {userInfo && userInfo.isAdmin && (
                                <Link
                                    href="/admin"
                                    className="border-transparent text-[#8D7B68] hover:text-[#6D5B4F] inline-flex items-center px-1 pt-1 text-sm font-medium uppercase tracking-wider"
                                >
                                    Admin
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Icons */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-10">
                        {/* Search could go here */}

                        <div className="relative">
                            {userInfo ? (
                                <Link href="/profile" className="flex items-center text-sm font-medium text-gray-500 hover:text-[#2D2D2D]">
                                    <User className="h-5 w-5" strokeWidth={1.5} />
                                </Link>
                            ) : (
                                <Link href="/login" className="flex items-center text-sm font-medium text-gray-500 hover:text-[#2D2D2D]">
                                    <User className="h-5 w-5" strokeWidth={1.5} />
                                </Link>
                            )}
                        </div>

                        <Link href="/cart" className="group p-1 rounded-full text-gray-400 hover:text-[#2D2D2D] relative">
                            <ShoppingCart className="h-5 w-5 text-gray-500 group-hover:text-[#2D2D2D] transition-colors" strokeWidth={1.5} />
                            {/* Simple dot for cart state if needed */}
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            <Menu className="block h-6 w-6" aria-hidden="true" strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden bg-[var(--background)] border-b border-[#DBC8C0]">
                    <div className="pt-2 pb-3 space-y-1">
                        {['Home', 'Shop', 'About Us', 'Cart', 'Login'].map((item) => (
                            <Link
                                key={item}
                                href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                className="border-transparent text-gray-600 hover:bg-[#EADCD6] hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};


export default Header;
