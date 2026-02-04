import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative flex flex-col">
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-sand rounded-[2rem] premium-shadow">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-x-0 bottom-6 px-6 translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="w-full bg-silk/90 backdrop-blur-md text-charcoal py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-charcoal hover:text-silk transition-colors flex items-center justify-center gap-2 shadow-lg rounded-2xl">
                        View Product
                    </button>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-start px-2">
                <div className="flex flex-col gap-2 w-full">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-clay">
                        {product.brand}
                    </p>
                    <h3 className="text-xl font-serif text-charcoal group-hover:text-clay transition-colors leading-tight">
                        <Link href={`/product/${product._id}`}>
                            {product.name}
                        </Link>
                    </h3>
                </div>
                <div className="mt-4">
                    <p className="text-lg font-bold text-charcoal tracking-tight">
                        ${product.price}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
