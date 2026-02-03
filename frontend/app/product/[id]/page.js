import React from 'react';
import Link from 'next/link';

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
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                    {/* Image gallery */}
                    <div className="flex-col-reverse">
                        <div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-center object-cover"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">${product.price}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div
                                className="text-base text-gray-700 space-y-6"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <svg
                                            key={rating}
                                            className={`h-5 w-5 flex-shrink-0 ${product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
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
                                <p className="sr-only">{product.rating} out of 5 stars</p>
                                <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {product.numReviews} reviews
                                </a>
                            </div>
                        </div>

                        <div className="mt-10 flex sm:flex-col1">
                            <button
                                type="button"
                                className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                            >
                                Add to bag
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
