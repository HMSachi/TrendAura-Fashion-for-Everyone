"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Edit, Truck, CheckCircle, X, LayoutDashboard, ShoppingBag, Users as UsersIcon, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

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
            {/* Sidebar / Top Nav */}
            <aside className="w-full lg:w-80 bg-charcoal text-silk p-8 flex flex-col gap-12 z-20 lg:h-screen lg:sticky lg:top-0">
                <div className="flex justify-between items-center lg:block">
                    <div>
                        <Link href="/">
                            <h1 className="text-3xl font-serif tracking-tighter mb-2 hover:opacity-80 transition-opacity">Trend<span className="text-clay italic">Aura.</span></h1>
                        </Link>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-silk/50 font-bold font-sans">Admin Control Center</p>
                    </div>
                </div>

                <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar pb-4 lg:pb-0">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all whitespace-nowrap lg:whitespace-normal group ${activeTab === tab.id
                                ? 'bg-clay text-silk shadow-lg shadow-clay/20'
                                : 'text-silk/40 hover:text-silk hover:bg-white/5'}`}
                        >
                            {tab.icon}
                            <span className="text-sm font-bold uppercase tracking-widest">{tab.name}</span>
                            <ChevronRight className={`ml-auto w-4 h-4 transition-transform hidden lg:block ${activeTab === tab.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:opacity-40'}`} />
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-white/10 flex flex-col gap-6">
                    <Link href="/" className="flex items-center gap-4 px-6 py-3 rounded-xl text-silk/40 hover:text-silk hover:bg-white/5 transition-all">
                        <LayoutDashboard className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Return to Shop</span>
                    </Link>

                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-clay flex items-center justify-center text-xs font-bold uppercase shadow-inner">
                                {userData?.name?.charAt(0)}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-xs font-bold truncate max-w-[100px]">{userData?.name}</p>
                                <p className="text-[9px] text-silk/40 uppercase tracking-widest">Admin</p>
                            </div>
                        </div>
                        <button
                            onClick={logoutHandler}
                            className="p-3 text-silk/40 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                            title="Sign Out"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-4 lg:p-12 h-screen overflow-y-auto relative">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h2 className="text-4xl font-serif text-charcoal capitalize mb-2">{activeTab}</h2>
                        <p className="text-stone/60 text-sm">Manage your store's {activeTab} effortlessly.</p>
                    </div>
                    {activeTab === 'products' && (
                        <button
                            onClick={() => { setEditingProduct(null); setProductForm({ name: '', price: '', image: '', brand: '', category: '', description: '', countInStock: '' }); setShowProductForm(true); }}
                            className="flex items-center gap-3 bg-charcoal text-silk px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-clay transition-all shadow-xl shadow-charcoal/10"
                        >
                            <Plus className="w-4 h-4" /> Add New Product
                        </button>
                    )}
                </header>

                {/* Dashboard Stats (Placeholder for future expansion) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {['Total Revenue', 'Active Orders', 'Total Stocks'].map((stat, i) => (
                        <div key={i} className="glass p-8 rounded-3xl premium-shadow">
                            <p className="text-stone/50 text-[10px] uppercase font-bold tracking-[0.3em] mb-4">{stat}</p>
                            <p className="text-3xl font-serif text-charcoal">{i === 0 ? '$12,450' : i === 1 ? '24' : '1,204'}</p>
                        </div>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <div className="glass rounded-[2rem] overflow-hidden premium-shadow">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-charcoal/5">
                                                {activeTab === 'products' && (
                                                    <>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60">Product</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60">Details</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60">Price</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60 text-right">Actions</th>
                                                    </>
                                                )}
                                                {activeTab === 'orders' && (
                                                    <>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60">ID & Date</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60">Customer</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60">Total</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60">Status</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60 text-right">Actions</th>
                                                    </>
                                                )}
                                                {activeTab === 'users' && (
                                                    <>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60">User</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60">Email</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60">Role</th>
                                                        <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-stone/60 text-right">Actions</th>
                                                    </>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-clay/10">
                                            {activeTab === 'products' && products.map((product) => (
                                                <tr key={product._id} className="hover:bg-white/30 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-20 bg-sand rounded-xl overflow-hidden relative border border-clay/10">
                                                                <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
                                                            </div>
                                                            <div>
                                                                <p className="font-serif text-lg text-charcoal">{product.name}</p>
                                                                <p className="text-[10px] uppercase font-bold tracking-widest text-clay">{product.brand}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-xs text-stone/70">Category: <span className="text-charcoal font-medium">{product.category}</span></p>
                                                        <p className="text-xs text-stone/70">Stock: <span className={`${product.countInStock < 10 ? 'text-red-500 font-bold' : 'text-charcoal'}`}>{product.countInStock}</span></p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-lg font-bold text-charcoal">${product.price}</p>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button onClick={() => startEditProduct(product)} className="p-3 rounded-full hover:bg-clay hover:text-silk transition-all"><Edit className="w-4 h-4" /></button>
                                                            <button onClick={() => deleteProduct(product._id)} className="p-3 rounded-full hover:bg-red-500 hover:text-silk transition-all"><Trash2 className="w-4 h-4" /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                            {activeTab === 'orders' && orders.map((order) => (
                                                <tr key={order._id} className="hover:bg-white/30 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <p className="text-xs font-bold font-mono text-stone/50">{order._id.substring(0, 8)}...</p>
                                                        <p className="text-xs mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="font-serif text-charcoal">{order.user?.name || 'Guest'}</p>
                                                        <p className="text-[10px] text-stone/50">{order.user?.email}</p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-base font-bold text-charcoal">${order.totalPrice}</p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex flex-col gap-2">
                                                            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest w-fit ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                                {order.isPaid ? 'Paid' : 'Unpaid'}
                                                            </span>
                                                            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest w-fit ${order.isDelivered ? 'bg-clay text-silk' : 'bg-sand text-stone'}`}>
                                                                {order.isDelivered ? 'Delivered' : 'Pending'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        {!order.isDelivered && (
                                                            <button
                                                                onClick={() => markDelivered(order._id)}
                                                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-clay hover:text-charcoal"
                                                            >
                                                                Mark Delivered
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}

                                            {activeTab === 'users' && users.map((user) => (
                                                <tr key={user._id} className="hover:bg-white/30 transition-colors group">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-full bg-clay/20 flex items-center justify-center text-clay font-bold uppercase">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                            <p className="font-serif text-charcoal">{user.name}</p>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <p className="text-sm text-stone/70">{user.email}</p>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${user.isAdmin ? 'bg-charcoal text-silk' : 'bg-clay/10 text-clay'}`}>
                                                            {user.isAdmin ? 'Admin' : 'Customer'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        {!user.isAdmin && (
                                                            <button
                                                                onClick={() => deleteUser(user._id)}
                                                                className="p-3 rounded-full hover:bg-red-500 hover:text-silk transition-all opacity-0 group-hover:opacity-100"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        )}
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

                {/* Product Form Modal */}
                <AnimatePresence>
                    {showProductForm && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowProductForm(false)}
                                className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative bg-silk w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-10 lg:p-14 overflow-hidden"
                            >
                                <button
                                    onClick={() => setShowProductForm(false)}
                                    className="absolute top-8 right-8 p-3 hover:bg-charcoal/5 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <h3 className="text-3xl font-serif text-charcoal mb-8">{editingProduct ? 'Update Product' : 'Create Product'}</h3>

                                <form onSubmit={saveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone/60 px-1">Product Name</label>
                                        <input name="name" value={productForm.name} onChange={handleProductChange} className="bg-white border border-clay/10 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-clay/20 transition-all shadow-sm" required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone/60 px-1">Price ($)</label>
                                        <input name="price" type="number" value={productForm.price} onChange={handleProductChange} className="bg-white border border-clay/10 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-clay/20 transition-all shadow-sm" required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone/60 px-1">Image URL</label>
                                        <input name="image" value={productForm.image} onChange={handleProductChange} className="bg-white border border-clay/10 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-clay/20 transition-all shadow-sm" required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone/60 px-1">Stock Quantity</label>
                                        <input name="countInStock" type="number" value={productForm.countInStock} onChange={handleProductChange} className="bg-white border border-clay/10 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-clay/20 transition-all shadow-sm" required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone/60 px-1">Brand</label>
                                        <input name="brand" value={productForm.brand} onChange={handleProductChange} className="bg-white border border-clay/10 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-clay/20 transition-all shadow-sm" required />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone/60 px-1">Category</label>
                                        <input name="category" value={productForm.category} onChange={handleProductChange} className="bg-white border border-clay/10 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-clay/20 transition-all shadow-sm" required />
                                    </div>
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone/60 px-1">Description</label>
                                        <textarea name="description" value={productForm.description} onChange={handleProductChange} rows={3} className="bg-white border border-clay/10 px-6 py-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-clay/20 transition-all shadow-sm resize-none" required />
                                    </div>
                                    <div className="md:col-span-2 mt-4">
                                        <button type="submit" className="w-full bg-charcoal text-silk py-6 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-clay transition-all shadow-xl shadow-charcoal/10">
                                            {editingProduct ? 'Save Changes' : 'Publish Product'}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default AdminPage;
