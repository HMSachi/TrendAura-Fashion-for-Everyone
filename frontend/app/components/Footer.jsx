import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-silk border-t border-clay/10 mt-40">
            <div className="max-w-7xl mx-auto py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20">

                    <div className="md:col-span-4">
                        <span className="text-3xl font-serif tracking-tighter text-charcoal">
                            Trend<span className="text-clay italic">Aura.</span>
                        </span>
                        <p className="mt-6 text-stone/60 text-sm max-w-xs leading-relaxed font-light">
                            Consciously crafted essentials for the modern wardrobe. Sustainable by nature, elegant by design.
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-clay">Shop</h4>
                        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-stone/70">
                            <li><Link href="/shop" className="hover:text-charcoal transition-colors">New Arrivals</Link></li>
                            <li><Link href="/shop" className="hover:text-charcoal transition-colors">Accessories</Link></li>
                            <li><Link href="/shop" className="hover:text-charcoal transition-colors">Men</Link></li>
                            <li><Link href="/shop" className="hover:text-charcoal transition-colors">Women</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-clay">About</h4>
                        <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-stone/70">
                            <li><Link href="/about" className="hover:text-charcoal transition-colors">Our Story</Link></li>
                            <li><Link href="/about" className="hover:text-charcoal transition-colors">Sustainability</Link></li>
                            <li><Link href="/about" className="hover:text-charcoal transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 text-clay">Newsletter</h4>
                        <p className="text-stone/60 text-xs mb-6 font-light">Join our list for early access and editorial updates.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Email" className="bg-white/50 border border-clay/10 px-4 py-3 rounded-xl text-xs flex-grow focus:outline-none focus:ring-1 focus:ring-clay/30" />
                            <button className="bg-charcoal text-silk px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-clay transition-all">Join</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-clay/10 pt-10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-stone/40">
                    <p>&copy; {new Date().getFullYear()} TrendAura. All rights reserved.</p>
                    <div className="flex space-x-10 mt-6 md:mt-0">
                        <Link href="#" className="hover:text-charcoal transition-all">Privacy</Link>
                        <Link href="#" className="hover:text-charcoal transition-all">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
