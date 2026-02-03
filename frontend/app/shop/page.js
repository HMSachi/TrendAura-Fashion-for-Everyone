import React from 'react';
import ProductCard from '../components/ProductCard';

async function getProducts() {
    const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}

export default async function Shop() {
    let products = [];
    try {
        products = await getProducts();
    } catch (error) {
        console.error(error);
    }

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="pb-10 border-b border-gray-200">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Shop All Products</h1>
                    <p className="mt-4 text-base text-gray-500">
                        Check out our latest collection of premium clothing and accessories.
                    </p>
                </div>

                <div className="py-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
