import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="mb-8 md:mb-0">
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Style<span className="text-indigo-600">Sphere</span>
                        </span>
                        <p className="mt-4 text-gray-400 text-sm">
                            Your one-stop destination for modern fashion. Discover the latest trends and elevate your style with StyleSphere.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Shop</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="/shop" className="text-base text-gray-400 hover:text-white">
                                    All Products
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-400 hover:text-white">
                                    Men
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-400 hover:text-white">
                                    Women
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Support</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="#" className="text-base text-gray-400 hover:text-white">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-400 hover:text-white">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-400 hover:text-white">
                                    Shipping & Returns
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Stay Connected</h3>
                        <ul className="mt-4 space-y-4">
                            <li>
                                <a href="#" className="text-base text-gray-400 hover:text-white">
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-400 hover:text-white">
                                    Twitter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-base text-gray-400 hover:text-white">
                                    Facebook
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8">
                    <p className="text-base text-gray-500 text-center">
                        &copy; {new Date().getFullYear()} StyleSphere. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
