"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Edit, Truck, CheckCircle } from 'lucide-react';

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
            if (activeTab === 'products') {
                const res = await fetch('http://localhost:5000/api/products', { cache: 'no-store' });
                setProducts(await res.json());
            } else if (activeTab === 'orders') {
                // Needs auth
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const res = await fetch('http://localhost:5000/api/orders', {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                setOrders(await res.json());
            } else if (activeTab === 'users') {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const res = await fetch('http://localhost:5000/api/users', {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                });
                setUsers(await res.json());
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    // --- Product Handlers ---
    const handleProductChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const deleteProduct = async (id) => {
        if (!window.confirm('Are you sure?')) return;
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

            // For POST, we first hit the endpoint to create sample, then update. 
            // But my controller for POST creates sample. So if POST:
            let targetId = editingProduct ? editingProduct._id : null;

            if (!editingProduct) {
                const createRes = await fetch(url, {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${userData.token}` }
                });
                const created = await createRes.json();
                targetId = created._id;
            }

            // Now Update with form data
            await fetch(`http://localhost:5000/api/products/${targetId}`, {
                method: 'PUT',
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

    // --- Order Handlers ---
    const markDelivered = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/orders/${id}/deliver`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${userData.token}` }
            });
            fetchData();
        } catch (error) { console.error(error); }
    };

    // --- User Handlers ---
    const deleteUser = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await fetch(`http://localhost:5000/api/users/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${userData.token}` }
            });
            fetchData();
        } catch (error) { console.error(error); }
    };

    if (loading && !products.length && !orders.length && !users.length) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="bg-white min-h-screen">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                </div>
            </header>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        {['products', 'orders', 'users'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`${activeTab === tab
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                {activeTab === 'products' && (
                    <div>
                        <div className="mb-4 flex justify-end">
                            <button
                                onClick={() => { setEditingProduct(null); setProductForm({ name: '', price: '', image: '', brand: '', category: '', description: '', countInStock: '' }); setShowProductForm(true); }}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                <Plus className="mr-2 h-5 w-5" /> Add Product
                            </button>
                        </div>

                        {showProductForm && (
                            <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-inner">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                                <form onSubmit={saveProduct} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input name="name" placeholder="Name" value={productForm.name} onChange={handleProductChange} className="p-2 border rounded" required />
                                        <input name="price" type="number" placeholder="Price" value={productForm.price} onChange={handleProductChange} className="p-2 border rounded" required />
                                        <input name="image" placeholder="Image URL" value={productForm.image} onChange={handleProductChange} className="p-2 border rounded" required />
                                        <input name="brand" placeholder="Brand" value={productForm.brand} onChange={handleProductChange} className="p-2 border rounded" required />
                                        <input name="category" placeholder="Category" value={productForm.category} onChange={handleProductChange} className="p-2 border rounded" required />
                                        <input name="countInStock" type="number" placeholder="Stock" value={productForm.countInStock} onChange={handleProductChange} className="p-2 border rounded" required />
                                        <textarea name="description" placeholder="Description" value={productForm.description} onChange={handleProductChange} className="p-2 border rounded md:col-span-2" required />
                                    </div>
                                    <div className="flex justify-end space-x-3">
                                        <button type="button" onClick={() => setShowProductForm(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product._id.substring(0, 10)}...</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => startEditProduct(product)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit className="h-5 w-5" /></button>
                                                <button onClick={() => deleteProduct(product._id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-5 w-5" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user && order.user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.totalPrice}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {order.isPaid ? <span className="text-green-600">Paid</span> : <span className="text-red-600">Not Paid</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {order.isDelivered ? <span className="text-green-600">Delivered</span> : <span className="text-red-600">Pending</span>}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {!order.isDelivered && (
                                                <button onClick={() => markDelivered(order._id)} className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end">
                                                    Mark Delivered
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.isAdmin ? <CheckCircle className="h-5 w-5 text-green-500" /> : 'No'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            {!user.isAdmin && (
                                                <button onClick={() => deleteUser(user._id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-5 w-5" /></button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminPage;
