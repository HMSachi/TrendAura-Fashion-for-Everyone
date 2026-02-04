"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                if (data.isAdmin) {
                    router.push('/admin');
                } else {
                    router.push('/');
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-24 sm:px-6 lg:px-8 bg-transparent">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-4xl font-serif text-[#2D2D2D] tracking-tight">Welcome Back</h2>
                <p className="mt-4 text-center text-sm font-sans text-gray-500 uppercase tracking-widest font-bold">
                    New to TrendAura?{' '}
                    <Link href="/register" className="text-[#8D7B68] hover:text-[#2D2D2D] transition-colors border-b border-[#8D7B68]">
                        Join us today
                    </Link>
                </p>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white/50 backdrop-blur-md py-10 px-6 shadow-sm border border-[#DBC8C0]/50 sm:rounded-3xl sm:px-12">
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-[#8D7B68] mb-2">
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 bg-white border border-[#DBC8C0] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8D7B68] focus:border-[#8D7B68] sm:text-sm transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-[#8D7B68] mb-2">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 bg-white border border-[#DBC8C0] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8D7B68] focus:border-[#8D7B68] sm:text-sm transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-sm font-bold uppercase tracking-widest text-white bg-[#2D2D2D] hover:bg-[#8D7B68] focus:outline-none transition-all duration-300"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
