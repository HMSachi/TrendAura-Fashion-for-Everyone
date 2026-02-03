import React from 'react';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Link from 'next/link';

// Data fetching function for Server Components
async function getProducts() {
  const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  let products = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    // Fallback or empty state if API is not running yet during build/dev
    products = [];
  }

  return (
    <div>
      <Hero />

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Featured Products</h2>
            <Link href="/shop" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all products <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <section className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-200">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
