import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-[#DBC8C0] mt-40">
            <div className="max-w-7xl mx-auto py-32 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
                    <div className="col-span-1 md:col-span-1">
                        <span className="text-3xl font-serif tracking-tighter text-[#2D2D2D]">
                            Trend<span className="text-[#8D7B68] italic">Aura.</span>
                        </span>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-[#8D7B68]">Shop</h4>
                        <ul className="space-y-5 text-sm text-gray-500 font-sans">
                            <li><Link href="/shop" className="hover:text-[#2D2D2D] transition-colors">New Arrivals</Link></li>
                            <li><Link href="/shop" className="hover:text-[#2D2D2D] transition-colors">Accessories</Link></li>
                            <li><Link href="/shop" className="hover:text-[#2D2D2D] transition-colors">Men</Link></li>
                            <li><Link href="/shop" className="hover:text-[#2D2D2D] transition-colors">Women</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-[#8D7B68]">About</h4>
                        <ul className="space-y-5 text-sm text-gray-500 font-sans">
                            <li><Link href="/about" className="hover:text-[#2D2D2D] transition-colors">Our Story</Link></li>
                            <li><Link href="/about" className="hover:text-[#2D2D2D] transition-colors">Sustainability</Link></li>
                            <li><Link href="/about" className="hover:text-[#2D2D2D] transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-[#8D7B68]">Support</h4>
                        <ul className="space-y-5 text-sm text-gray-500 font-sans">
                            <li><Link href="#" className="hover:text-[#2D2D2D] transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-[#2D2D2D] transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-[#2D2D2D] transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#DBC8C0]/50 pt-12 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-sans">
                    <p className="tracking-widest uppercase">&copy; {new Date().getFullYear()} TrendAura. All rights reserved.</p>
                    <div className="flex space-x-10 mt-6 md:mt-0">
                        <Link href="#" className="hover:text-[#2D2D2D] transition-all">Privacy Policy</Link>
                        <Link href="#" className="hover:text-[#2D2D2D] transition-all">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
