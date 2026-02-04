import React from 'react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
    return (
        <div className="group relative flex flex-col">
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#EADCD6] rounded-2xl shadow-sm">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-white/90 backdrop-blur-md text-[#2D2D2D] py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#2D2D2D] hover:text-white transition-colors flex items-center justify-center gap-2 shadow-sm rounded-xl">
                        Quick Add
                    </button>
                </div>
            </div>

            <div className="mt-8 flex flex-col items-start px-1">
                <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-serif text-[#2D2D2D] group-hover:text-[#8D7B68] transition-colors leading-tight">
                        <Link href={`/product/${product._id}`}>
                            {product.name}
                        </Link>
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                        {product.brand}
                    </p>
                </div>
                <div className="mt-6">
                    <p className="text-base font-sans font-medium text-[#8D7B68] tracking-tight">
                        ${product.price}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
