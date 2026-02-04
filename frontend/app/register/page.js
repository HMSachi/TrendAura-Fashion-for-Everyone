"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('userInfo', JSON.stringify(data));
                router.push('/');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Registration failed');
        }
    };

    return (
        <div className="min-h-[90vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-transparent">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="mt-6 text-center text-5xl font-serif text-charcoal tracking-tight">Create <br /> Account</h2>
                    <p className="mt-6 text-center text-[10px] font-bold text-stone/50 uppercase tracking-[0.3em]">
                        Already part of the family?{' '}
                        <Link href="/login" className="text-clay hover:text-charcoal transition-colors border-b border-clay/30">
                            Sign in
                        </Link>
                    </p>
                </motion.div>
            </div>

            <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass py-12 px-8 shadow-2xl premium-shadow sm:rounded-[2.5rem] sm:px-12"
                >
                    <form className="space-y-6" onSubmit={submitHandler}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-clay px-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-white/50 border border-clay/10 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-clay/20 transition-all shadow-sm"
                                placeholder="Jane Doe"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-clay px-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-white/50 border border-clay/10 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-clay/20 transition-all shadow-sm"
                                placeholder="jane@example.com"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-clay px-1">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-white/50 border border-clay/10 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-clay/20 transition-all shadow-sm"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="confirmPassword" className="text-[10px] font-bold uppercase tracking-widest text-clay px-1">
                                    Confirm
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="bg-white/50 border border-clay/10 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-clay/20 transition-all shadow-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-charcoal text-silk py-6 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-clay transition-all shadow-xl shadow-charcoal/10"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default RegisterPage;
