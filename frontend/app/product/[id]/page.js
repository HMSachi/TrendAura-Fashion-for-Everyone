import React from 'react';
import Link from 'next/link';
import { Leaf, RefreshCcw } from 'lucide-react';

async function getProduct(id) {
    const res = await fetch(`http://localhost:5000/api/products/${id}`, { cache: 'no-store' });
    if (!res.ok) {
        return null;
    }
    return res.json();
}

export default async function ProductPage({ params }) {
    // Await params as required in Next.js 15+ (if using latest) or just safe practice
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
                <h1 className="text-3xl font-extrabold text-gray-900">Product Not Found</h1>
                <p className="mt-4 text-gray-500">The product you are looking for does not exist.</p>
                <Link href="/shop" className="mt-8 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                    Back to Shop
                </Link>
            </div>
        )
    }

    return (
        <div className="bg-transparent">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
                    {/* Image gallery */}
                    <div className="flex-col-reverse">
                        <div className="w-full aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-[#EADCD6] shadow-sm sm:aspect-w-2 sm:aspect-h-3">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-center object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-12 px-4 sm:px-0 lg:mt-0">
                        <h1 className="text-4xl font-serif tracking-tight text-[#2D2D2D] md:text-5xl lg:text-6xl">{product.name}</h1>

                        <div className="mt-4 flex items-center justify-between border-b border-[#DBC8C0] pb-6">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-[#8D7B68] font-sans tracking-tight">${product.price}</p>

                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <svg
                                            key={rating}
                                            className={`h-4 w-4 flex-shrink-0 ${product.rating > rating ? 'text-[#8D7B68]' : 'text-gray-300'
                                                }`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                            />
                                        </svg>
                                    ))}
                                </div>
                                <span className="ml-2 text-sm text-gray-500 font-sans tracking-wider uppercase">{product.numReviews} Reviews</span>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-sm font-bold text-[#8D7B68] uppercase tracking-widest mb-6">Description</h3>
                            <div
                                className="text-base text-gray-600 space-y-6 leading-relaxed font-sans"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>

                        <div className="mt-16">
                            <button
                                type="button"
                                className="w-full bg-[#2D2D2D] border border-transparent py-4 px-8 flex items-center justify-center text-sm font-bold uppercase tracking-widest text-white hover:bg-[#8D7B68] transition-colors focus:outline-none sm:w-80"
                            >
                                Add to bag
                            </button>
                        </div>

                        <div className="mt-10 border-t border-[#DBC8C0] pt-8">
                            <div className="flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
                                <span className="flex items-center gap-2"><Leaf className="w-4 h-4" /> Eco Friendly</span>
                                <span className="flex items-center gap-2"><RefreshCcw className="w-4 h-4" /> 30 Day Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
