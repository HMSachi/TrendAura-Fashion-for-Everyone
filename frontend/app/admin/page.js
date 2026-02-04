"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Edit, Truck, CheckCircle, X, LayoutDashboard, ShoppingBag, Users as UsersIcon, ChevronRight, Eye, ShieldAlert, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [userData, setUserData] = useState(null);

    // Product Form state
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '', price: '', image: '', brand: '', category: '', description: '', countInStock: ''
    });

    // Order Detail state
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (!storedUserInfo) {
            router.push('/login');
            return;
        }
        const parsedUser = JSON.parse(storedUserInfo);
        setUserData(parsedUser);

        if (!parsedUser.isAdmin) {
            router.push('/');
            return;
        }

        fetchData();
    }, [activeTab, router]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const headers = { Authorization: `Bearer ${userInfo.token}` };
            const API_BASE = 'http://localhost:5000/api';

            if (activeTab === 'products') {
                const res = await fetch(`${API_BASE}/products`, { cache: 'no-store' });
                setProducts(await res.json());
            } else if (activeTab === 'orders') {
                const res = await fetch(`${API_BASE}/orders`, { headers });
                setOrders(await res.json());
            } else if (activeTab === 'users') {
                const res = await fetch(`${API_BASE}/users`, { headers });
                setUsers(await res.json());
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleProductChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${userData.token}` }
            });
            fetchData();
        } catch (error) { console.error(error); }
    };

    const startEditProduct = (product) => {
        setEditingProduct(product);
        setProductForm({ ...product });
        setShowProductForm(true);
    };

    const saveProduct = async (e) => {
        e.preventDefault();
        try {
            const url = editingProduct
                ? `http://localhost:5000/api/products/${editingProduct._id}`
                : 'http://localhost:5000/api/products';

            const method = editingProduct ? 'PUT' : 'POST';

            await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                },
                body: JSON.stringify(productForm)
            });

            setShowProductForm(false);
            setEditingProduct(null);
            setProductForm({ name: '', price: '', image: '', brand: '', category: '', description: '', countInStock: '' });
            fetchData();
        } catch (error) { console.error(error); }
    };

    const markDelivered = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/orders/${id}/deliver`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${userData.token}` }
            });
            fetchData();
            if (selectedOrder) setSelectedOrder(null);
        } catch (error) { console.error(error); }
    };

    const toggleAdminStatus = async (user) => {
        if (!window.confirm(`Change ${user.name}'s role to ${user.isAdmin ? 'Customer' : 'Admin'}?`)) return;
        try {
            await fetch(`http://localhost:5000/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                },
                body: JSON.stringify({ isAdmin: !user.isAdmin })
            });
            fetchData();
        } catch (error) { console.error(error); }
    };

    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${userData.token}` }
            });
            fetchData();
        } catch (error) { console.error(error); }
    };

    const logoutHandler = () => {
        localStorage.removeItem('userInfo');
        router.push('/login');
    };

    const tabs = [
        { id: 'products', name: 'Products', icon: <ShoppingBag className="w-5 h-5" /> },
        { id: 'orders', name: 'Orders', icon: <Truck className="w-5 h-5" /> },
        { id: 'users', name: 'Users', icon: <UsersIcon className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-silk flex flex-col lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full lg:w-80 bg-charcoal text-silk p-8 flex flex-col gap-12 z-20 lg:h-screen lg:sticky lg:top-0 shadow-2xl">
                <div className="flex justify-between items-center lg:block">
                    <div>
                        <Link href="/">
                            <h1 className="text-3xl font-serif tracking-tighter mb-2 hover:text-clay transition-all duration-300">Trend<span className="text-clay italic">Aura.</span></h1>
                        </Link>
                        <p className="text-[10px] uppercase tracking-[0.4em] text-silk/40 font-bold font-sans">Management Suite</p>
                    </div>
                </div>

                <nav className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible no-scrollbar pb-4 lg:pb-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setSelectedOrder(null); }}
                            className={`flex items-center gap-5 px-7 py-5 rounded-2xl transition-all whitespace-nowrap lg:whitespace-normal group border border-transparent ${activeTab === tab.id
                                ? 'bg-clay text-silk shadow-xl shadow-clay/20 border-clay/20'
                                : 'text-silk/40 hover:text-silk hover:bg-white/5 hover:border-white/10'}`}
                        >
                            {tab.icon}
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">{tab.name}</span>
                            <ChevronRight className={`ml-auto w-4 h-4 transition-all duration-300 hidden lg:block ${activeTab === tab.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:opacity-40'}`} />
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-4 px-6 py-4 rounded-xl text-silk/40 hover:text-silk hover:bg-white/5 transition-all text-[10px] font-bold uppercase tracking-widest">
                        <LayoutDashboard className="w-4 h-4" />
                        Return to Shop
                    </Link>

                    <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-clay flex items-center justify-center text-sm font-bold uppercase shadow-lg shadow-clay/20">
                                {userData?.name?.charAt(0)}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-xs font-bold truncate max-w-[120px]">{userData?.name}</p>
                                <p className="text-[9px] text-silk/40 uppercase tracking-[0.2em]">Full Admin</p>
                            </div>
                        </div>
                        <button onClick={logoutHandler} className="p-3 text-silk/40 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all active:scale-95">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-5 lg:p-14 min-h-screen bg-silk relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-clay/5 rounded-full blur-[120px] -z-10" />

                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-3 text-clay text-[10px] font-bold uppercase tracking-[0.4em] mb-3">
                            <div className="w-10 h-px bg-clay/30" />
                            Overview
                        </div>
                        <h2 className="text-6xl font-serif text-charcoal capitalize tracking-tighter">{activeTab}</h2>
                    </div>
                    {activeTab === 'products' && (
                        <button
                            onClick={() => { setEditingProduct(null); setProductForm({ name: '', price: '', image: '', brand: '', category: '', description: '', countInStock: '' }); setShowProductForm(true); }}
                            className="flex items-center gap-4 bg-charcoal text-silk px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-clay transition-all shadow-2xl shadow-charcoal/20 active:scale-95"
                        >
                            <Plus className="w-4 h-4" /> Add New Entry
                        </button>
                    )}
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    >
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                                <div className="w-12 h-12 border-[3px] border-clay border-t-transparent rounded-full animate-spin" />
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-clay animate-pulse">Synchronizing Data</p>
                            </div>
                        ) : (
                            <div className="glass rounded-[3rem] overflow-hidden premium-shadow border border-white/20">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-charcoal/[0.03]">
                                                {activeTab === 'products' && (
                                                    <>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50">Product Identity</th>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50">Classification</th>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50">Price</th>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50 text-right">Actions</th>
                                                    </>
                                                )}
                                                {activeTab === 'orders' && (
                                                    <>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50">Reference</th>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50">Client Info</th>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50">Final Total</th>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50">Status</th>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50 text-right">Actions</th>
                                                    </>
                                                )}
                                                {activeTab === 'users' && (
                                                    <>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50">User Profile</th>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50">Contact Email</th>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50">Privilege</th>
                                                        <th className="px-10 py-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone/50 text-right">Actions</th>
                                                    </>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-clay/5">
                                            {activeTab === 'products' && products.map((product) => (
                                                <tr key={product._id} className="hover:bg-white/40 transition-all group">
                                                    <td className="px-10 py-8">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-20 h-24 bg-sand rounded-3xl overflow-hidden relative border border-clay/10 shadow-sm group-hover:scale-105 transition-transform duration-500">
                                                                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                                                            </div>
                                                            <div>
                                                                <p className="font-serif text-2xl text-charcoal mb-1">{product.name}</p>
                                                                <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-clay/60 underline decoration-clay/20 underline-offset-4">{product.brand}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <span className="text-xs font-bold uppercase tracking-widest text-charcoal/40 bg-charcoal/5 px-4 py-2 rounded-full">{product.category}</span>
                                                        <p className="text-[11px] mt-4 font-bold tracking-widest text-stone/60">Stock: <span className={`${product.countInStock < 10 ? 'text-red-500 font-black' : 'text-charcoal'}`}>{product.countInStock}</span></p>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <p className="text-2xl font-serif text-charcoal tracking-tighter">${product.price}</p>
                                                    </td>
                                                    <td className="px-10 py-8 text-right">
                                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                                                            <button onClick={() => startEditProduct(product)} className="p-4 rounded-2xl bg-white border border-clay/10 hover:bg-clay hover:text-silk transition-all shadow-sm"><Edit className="w-5 h-5" /></button>
                                                            <button onClick={() => deleteProduct(product._id)} className="p-4 rounded-2xl bg-white border border-clay/10 hover:bg-red-500 hover:text-silk transition-all shadow-sm"><Trash2 className="w-5 h-5" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                            {activeTab === 'orders' && orders.map((order) => (
                                                <tr key={order._id} className="hover:bg-white/40 transition-all group">
                                                    <td className="px-10 py-8">
                                                        <p className="text-[11px] font-bold font-mono text-charcoal tracking-tight">#{order._id.slice(-8).toUpperCase()}</p>
                                                        <p className="text-[10px] mt-2 text-stone/50 uppercase tracking-widest font-bold">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <p className="font-serif text-xl text-charcoal">{order.user?.name || 'Guest Checkout'}</p>
                                                        <p className="text-[10px] text-stone/50 font-bold uppercase tracking-widest mt-1">{order.user?.email || 'No email'}</p>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <p className="text-2xl font-serif text-charcoal tracking-tighter">${order.totalPrice}</p>
                                                    </td>
                                                    <td className="px-10 py-8 text-xs font-bold uppercase tracking-[0.2em] space-y-2">
                                                        <div className={`px-4 py-1.5 rounded-full w-fit ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                            {order.isPaid ? 'Fulfilled' : 'Unpaid'}
                                                        </div>
                                                        <div className={`px-4 py-1.5 rounded-full w-fit ${order.isDelivered ? 'bg-clay text-silk' : 'bg-sand text-stone'}`}>
                                                            {order.isDelivered ? 'Delivered' : 'Awaiting Delivery'}
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8 text-right">
                                                        <button onClick={() => setSelectedOrder(order)} className="p-4 rounded-2xl bg-white border border-clay/10 hover:bg-charcoal hover:text-silk transition-all shadow-sm">
                                                            <Eye className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}

                                            {activeTab === 'users' && users.map((user) => (
                                                <tr key={user._id} className="hover:bg-white/40 transition-all group">
                                                    <td className="px-10 py-8">
                                                        <div className="flex items-center gap-6">
                                                            <div className="w-14 h-14 rounded-2xl bg-clay/10 flex items-center justify-center text-clay font-serif text-2xl border border-clay/10 shadow-inner group-hover:bg-clay group-hover:text-silk transition-all duration-500">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                            <p className="font-serif text-2xl text-charcoal">{user.name}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <p className="text-sm font-bold text-stone/60 tracking-tight">{user.email}</p>
                                                    </td>
                                                    <td className="px-10 py-8">
                                                        <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-2 ${user.isAdmin ? 'bg-charcoal text-silk' : 'bg-clay/10 text-clay'}`}>
                                                            {user.isAdmin ? <ShieldCheck className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3 opacity-50" />}
                                                            {user.isAdmin ? 'Administrator' : 'Customer'}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-8 text-right">
                                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                            <button
                                                                onClick={() => toggleAdminStatus(user)}
                                                                className={`p-4 rounded-2xl border border-clay/10 transition-all shadow-sm ${user.isAdmin ? 'bg-white hover:bg-stone-100' : 'bg-white hover:bg-charcoal hover:text-silk'}`}
                                                                title={user.isAdmin ? "Revoke Admin Access" : "Grant Admin Access"}
                                                            >
                                                                <Plus className={`w-5 h-5 ${user.isAdmin ? 'rotate-45 text-red-500' : ''}`} />
                                                            </button>
                                                            {!user.isAdmin && (
                                                                <button onClick={() => deleteUser(user._id)} className="p-4 rounded-2xl bg-white border border-clay/10 hover:bg-red-500 hover:text-silk transition-all shadow-sm">
                                                                    <Trash2 className="w-5 h-5" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Modals & Forms */}
                <AnimatePresence>
                    {showProductForm && (
                        <Modal title={editingProduct ? 'Refine Product Identity' : 'Establish New Product'} onClose={() => setShowProductForm(false)}>
                            <form onSubmit={saveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <FormInput label="Product Name" name="name" value={productForm.name} onChange={handleProductChange} placeholder="e.g., Silk Evening Gown" />
                                <FormInput label="Price Valutation ($)" name="price" type="number" value={productForm.price} onChange={handleProductChange} placeholder="0.00" />
                                <FormInput label="Visual Identifier (URL)" name="image" value={productForm.image} onChange={handleProductChange} placeholder="/images/collection/item.jpg" />
                                <FormInput label="Inventory Reserve" name="countInStock" type="number" value={productForm.countInStock} onChange={handleProductChange} placeholder="0" />
                                <FormInput label="Brand Authority" name="brand" value={productForm.brand} onChange={handleProductChange} placeholder="TrendAura Couture" />
                                <FormInput label="Strategic Category" name="category" value={productForm.category} onChange={handleProductChange} placeholder="Essentials" />
                                <div className="md:col-span-2 flex flex-col gap-3">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone/40 px-2 italic">Narrative Description</label>
                                    <textarea name="description" value={productForm.description} onChange={handleProductChange} rows={4} className="bg-silk/50 border border-clay/10 px-8 py-5 rounded-[1.5rem] text-sm focus:outline-none focus:ring-[3px] focus:ring-clay/10 transition-all resize-none shadow-inner" required />
                                </div>
                                <div className="md:col-span-2 pt-6">
                                    <button type="submit" className="w-full bg-charcoal text-silk py-7 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-clay transition-all shadow-2xl shadow-charcoal/30 active:scale-[0.98]">
                                        {editingProduct ? 'Commit Changes' : 'Publish to Collection'}
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    )}

                    {selectedOrder && (
                        <Modal title={`Audit Manifest #${selectedOrder._id.slice(-8).toUpperCase()}`} onClose={() => setSelectedOrder(null)}>
                            <div className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-white/40 p-8 rounded-[2rem] border border-clay/5">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-clay mb-6">Dispatch Destination</p>
                                        <div className="text-sm space-y-2 text-charcoal/80 font-medium">
                                            <p className="text-lg text-charcoal font-black mb-1">{selectedOrder.user?.name}</p>
                                            <p>{selectedOrder.shippingAddress.address}</p>
                                            <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                                            <p className="uppercase tracking-widest text-[11px] font-bold text-stone/40">{selectedOrder.shippingAddress.country}</p>
                                        </div>
                                    </div>
                                    <div className="bg-white/40 p-8 rounded-[2rem] border border-clay/5 flex flex-col justify-center">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-clay mb-6">Financial Summary</p>
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone/40"><span>Subtotal</span><span>${selectedOrder.totalPrice - selectedOrder.taxPrice - selectedOrder.shippingPrice}</span></div>
                                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone/40"><span>Shipping</span><span>${selectedOrder.shippingPrice}</span></div>
                                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone/40"><span>Taxation</span><span>${selectedOrder.taxPrice}</span></div>
                                            <div className="h-px bg-clay/10 pt-4" />
                                            <div className="flex justify-between text-2xl font-serif text-charcoal"><span>Total Payable</span><span>${selectedOrder.totalPrice}</span></div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-clay mb-6 px-2">Purchase Manifest</p>
                                    <div className="space-y-4">
                                        {selectedOrder.orderItems.map((item, i) => (
                                            <div key={i} className="flex items-center gap-6 p-4 bg-white/20 border border-clay/5 rounded-2xl">
                                                <div className="w-16 h-20 bg-sand rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-serif text-lg text-charcoal">{item.name}</p>
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone/40 mt-1">{item.qty} Unit(s) at ${item.price}</p>
                                                </div>
                                                <p className="text-xl font-serif text-charcoal pr-4">${item.qty * item.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {!selectedOrder.isDelivered && (
                                    <button
                                        onClick={() => markDelivered(selectedOrder._id)}
                                        className="w-full bg-clay text-silk py-7 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-charcoal transition-all shadow-xl shadow-clay/20"
                                    >
                                        Execute Delivery & Close Manifest
                                    </button>
                                )}
                            </div>
                        </Modal>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

// Subcomponents
const Modal = ({ children, title, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-charcoal/60 backdrop-blur-xl" />
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }} transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }} className="relative bg-silk w-full max-w-3xl rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(45,45,45,0.4)] overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar border border-white/30">
            <div className="p-12 lg:p-16">
                <button onClick={onClose} className="absolute top-10 right-10 p-4 hover:bg-charcoal/5 rounded-full transition-all group active:scale-95"><X className="w-6 h-6 text-charcoal/40 group-hover:text-charcoal" /></button>
                <div className="flex items-center gap-4 text-clay text-[9px] font-black uppercase tracking-[0.5em] mb-4"><div className="w-8 h-px bg-clay/40" /> Administrative Action</div>
                <h3 className="text-4xl font-serif text-charcoal mb-12 tracking-tight">{title}</h3>
                {children}
            </div>
        </motion.div>
    </div>
);

const FormInput = ({ label, ...props }) => (
    <div className="flex flex-col gap-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone/40 px-2 italic">{label}</label>
        <input {...props} className="bg-white/50 border border-clay/10 px-8 py-5 rounded-[1.5rem] text-sm focus:outline-none focus:ring-[3px] focus:ring-clay/10 transition-all shadow-sm" required />
    </div>
);

export default AdminPage;
