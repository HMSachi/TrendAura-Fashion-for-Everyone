"use client";
import React, { useState, useContext } from 'react';
import CartContext from '../../context/CartContext';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
    const { state } = useContext(CartContext);
    const { cartItems } = state;
    const router = useRouter();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();

        // Mock Order Placement
        const orderData = {
            orderItems: cartItems,
            shippingAddress: { address, city, postalCode, country },
            paymentMethod: 'PayPal',
            itemsPrice: cartItems.reduce((acc, item) => acc + item.price, 0),
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: cartItems.reduce((acc, item) => acc + item.price, 0),
        };

        const userData = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

        if (!userData) {
            alert('Please login to place order');
            router.push('/login');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`,
                },
                body: JSON.stringify(orderData),
            });

            if (res.ok) {
                alert('Order Placed Successfully!');
                router.push('/');
                // In a real app, clear cart here
            } else {
                const data = await res.json();
                alert(data.message || 'Order failed');
            }
        } catch (error) {
            console.error(error);
            alert('Error placing order');
        }
    };

    return (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Checkout</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                            <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                            <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                            <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                            <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
