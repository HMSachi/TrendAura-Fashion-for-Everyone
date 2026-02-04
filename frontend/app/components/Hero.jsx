import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <div className="relative bg-transparent overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-serif text-[#2D2D2D] sm:text-5xl md:text-6xl lg:text-7xl mb-12">
                                <span className="block xl:inline">Fashion that speaks</span>{' '}
                                <span className="block text-[#8D7B68] italic xl:inline">your language</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-sans leading-relaxed mb-16">
                                Discover the latest trends in clothing, accessories, and more. Upgrade your wardrobe with our curated collection of premium fashion items.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-8">
                                <div className="shadow-lg">
                                    <Link
                                        href="/shop"
                                        className="w-full flex items-center justify-center px-10 py-4 border border-transparent text-sm font-bold uppercase tracking-widest text-white bg-[#2D2D2D] hover:bg-[#8D7B68] transition-colors duration-300"
                                    >
                                        Shop Now
                                    </Link>
                                </div>
                                <div className="">
                                    <Link
                                        href="/about"
                                        className="w-full flex items-center justify-center px-10 py-4 border border-[#2D2D2D] text-sm font-bold uppercase tracking-widest text-[#2D2D2D] bg-transparent hover:bg-[#2D2D2D] hover:text-white transition-all duration-300"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <img
                    className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                    src="/girl.jpg"
                    alt="Sustainable Fashion"
                />
            </div>
        </div>
    );
};

export default Hero;
