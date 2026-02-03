"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, LayoutDashboard } from 'lucide-react';

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
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-gray-900 tracking-tight">
                                Style<span className="text-indigo-600">Sphere</span>
                            </span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href="/"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                href="/shop"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Shop
                            </Link>
                            <Link
                                href="/about"
                                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                About Us
                            </Link>
                            {userInfo && userInfo.isAdmin && (
                                <Link
                                    href="/admin"
                                    className="border-transparent text-indigo-600 hover:border-indigo-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                                >
                                    Admin
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <Link href="/cart" className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative">
                            <span className="sr-only">View cart</span>
                            <ShoppingCart className="h-6 w-6" aria-hidden="true" />
                            {/* Cart badge logic here */}
                        </Link>
                        <div className="ml-3 relative">
                            {userInfo ? (
                                <Link href="/profile" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                                    <User className="h-6 w-6 mr-1" />
                                    {userInfo.name}
                                </Link>
                            ) : (
                                <Link href="/login" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                                    <User className="h-6 w-6 mr-1" />
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <Menu className="block h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            href="/"
                            className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        >
                            Shop
                        </Link>
                        {userInfo && userInfo.isAdmin && (
                            <Link
                                href="/admin"
                                className="border-transparent text-indigo-600 hover:bg-gray-50 hover:border-indigo-300 hover:text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Admin Dashboard
                            </Link>
                        )}
                        <Link
                            href="/cart"
                            className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        >
                            Cart
                        </Link>
                        {userInfo ? (
                            <div className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500">
                                Signed in as {userInfo.name}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
