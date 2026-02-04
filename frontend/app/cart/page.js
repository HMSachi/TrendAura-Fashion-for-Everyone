"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import CartContext from '../../context/CartContext';

const CartPage = () => {
    const { state, dispatch } = useContext(CartContext);
    const { cartItems } = state;

    const removeFromCartHandler = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    };

    const checkoutHandler = () => {
        // Handle checkout redirection or logic
        window.location.href = '/login?redirect=shipping';
    };

    return (
        <div className="bg-transparent min-h-screen">
            <div className="max-w-2xl mx-auto pt-24 pb-32 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-4xl font-serif tracking-tight text-[#2D2D2D] sm:text-6xl border-b border-[#DBC8C0] pb-12">Shopping Bag</h1>
                <div className="mt-20 lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start xl:gap-x-24">
                    <section aria-labelledby="cart-heading" className="lg:col-span-7">
                        <h2 id="cart-heading" className="sr-only">Items in your shopping bag</h2>

                        {cartItems.length === 0 ? (
                            <div className="text-center py-20 bg-white/30 backdrop-blur-sm rounded-3xl border border-[#DBC8C0]/50">
                                <p className="text-xl font-serif text-gray-500">Your bag is currently empty</p>
                                <Link href="/shop" className="mt-6 inline-block text-sm font-bold uppercase tracking-widest text-[#8D7B68] hover:text-[#2D2D2D] transition-colors border-b border-[#8D7B68]">Continue Shopping</Link>
                            </div>
                        ) : (
                            <ul role="list" className="divide-y divide-[#DBC8C0]/50">
                                {cartItems.map((product) => (
                                    <li key={product._id} className="flex py-12 sm:py-16">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-24 h-24 rounded-2xl object-center object-cover sm:w-48 sm:h-48 bg-[#EADCD6] shadow-sm"
                                            />
                                        </div>

                                        <div className="ml-6 flex-1 flex flex-col justify-between">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-lg">
                                                            <Link href={`/product/${product._id}`} className="font-serif text-[#2D2D2D] hover:text-[#8D7B68] transition-colors">
                                                                {product.name}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    <div className="mt-1 flex text-sm">
                                                        <p className="text-gray-400 font-sans uppercase tracking-widest text-xs font-bold">{product.brand}</p>
                                                    </div>
                                                    <p className="mt-4 text-lg font-sans text-[#8D7B68] tracking-tight">${product.price}</p>
                                                </div>

                                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                                    <div className="absolute top-0 right-0">
                                                        <button
                                                            onClick={() => removeFromCartHandler(product._id)}
                                                            type="button"
                                                            className="-m-2 p-2 inline-flex text-gray-300 hover:text-red-400 transition-colors"
                                                        >
                                                            <span className="sr-only">Remove</span>
                                                            <Trash2 className="h-5 w-5" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 bg-white/50 backdrop-blur-md rounded-3xl px-6 py-8 sm:p-10 lg:mt-0 lg:col-span-5 border border-[#DBC8C0]/50 shadow-sm"
                    >
                        <h2 id="summary-heading" className="text-2xl font-serif text-[#2D2D2D]">Order Summary</h2>

                        <dl className="mt-8 space-y-6">
                            <div className="flex items-center justify-between border-t border-[#DBC8C0] pt-6">
                                <dt className="text-base font-bold uppercase tracking-widest text-gray-500">Total Amount</dt>
                                <dd className="text-2xl font-sans font-medium text-[#2D2D2D] tracking-tight">
                                    ${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                                </dd>
                            </div>
                        </dl>

                        <div className="mt-10">
                            <button
                                onClick={checkoutHandler}
                                disabled={cartItems.length === 0}
                                type="button"
                                className="w-full bg-[#2D2D2D] border border-transparent py-4 px-6 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#8D7B68] transition-colors focus:outline-none disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
                            >
                                Secure Checkout
                            </button>
                            <p className="mt-4 text-center text-xs text-gray-400 uppercase tracking-widest font-bold">Shipping & taxes calculated at checkout</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
