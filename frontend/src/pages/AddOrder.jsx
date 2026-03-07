import React, { useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

const AddOrder = () => {
    const navigate = useNavigate();
    const { id: vendorId } = useParams();

    // Mock data for Account Details (Menu Items) as it looks like a list/table
    const [menuItems, setMenuItems] = useState([
        { id: 1, item: 'Curd Rice', qty: 1, price: 60, total: 60 },
        { id: 2, item: 'Sambar Rice', qty: 1, price: 60, total: 60 },
        { id: 3, item: 'Brinji Rice', qty: 1, price: 60, total: 60 },
        { id: 4, item: 'Lemon Rice', qty: 1, price: 60, total: 60 }
    ]);

    return (
        <div className="w-full flex-1 flex flex-col p-2">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(`/dashboard/vendor/${vendorId}`, { state: { activeTab: 'Order List' } })}
                    className="mr-3 text-gray-800 hover:text-primary transition-colors outline-none"
                >
                    <FiArrowLeft size={24} />
                </button>
                <h1 className="text-[22px] font-bold text-gray-800 font-inter tracking-tight">
                    Add Order
                </h1>
            </div>

            {/* Main Card */}
            <div className="flex-1 bg-background rounded-2xl min-h-[70vh] shadow-[0_4px_24px_rgba(0,0,0,0.02)] mb-6 flex flex-col overflow-hidden border border-gray-100/50">
                <div className="flex-1 flex flex-col relative overflow-y-auto custom-scrollbar p-6">
                    <form className="space-y-8">
                        {/* Order Details */}
                        <div>
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Order Details</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Order No <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter order number" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">User Name <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter user name" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Shipping Charge <span className="text-red-500">*</span></label>
                                    <input type="number" placeholder="Enter shipping charge" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Total Amount <span className="text-red-500">*</span></label>
                                    <input type="number" placeholder="Enter total amount" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Net Amount <span className="text-red-500">*</span></label>
                                    <input type="number" placeholder="Enter net amount" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Order Status <span className="text-red-500">*</span></label>
                                    <select className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full appearance-none cursor-pointer">
                                        <option>Select Status..</option>
                                        <option>Pending</option>
                                        <option>Accepted</option>
                                        <option>Delivered</option>
                                        <option>Cancelled</option>
                                    </select>
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Vendor Name <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter vendor name" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Account Details (Items Table) */}
                        <div>
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Account Details</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="py-3 text-[16px] font-bold text-gray-900">Menu Item</th>
                                            <th className="py-3 text-[16px] font-bold text-gray-900">Quantity</th>
                                            <th className="py-3 text-[16px] font-bold text-gray-900">Price</th>
                                            <th className="py-3 text-[16px] font-bold text-gray-900">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {menuItems.map((item) => (
                                            <tr key={item.id} className="border-b border-gray-100">
                                                <td className="py-3 text-[15px] font-medium text-gray-800">{item.item}</td>
                                                <td className="py-3 text-[15px] font-medium text-gray-800">{item.qty}</td>
                                                <td className="py-3 text-[15px] font-medium text-gray-800">{item.price}</td>
                                                <td className="py-3 text-[15px] font-medium text-gray-800">{item.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div>
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Delivery Address</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Door/ Flat No <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter door / flat no" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Apartment Name/ Block <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter apartment / block info" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Street <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter street" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Area <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter area" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">City/District <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter city / district" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Pin code <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter pin code" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Delivery Boy */}
                        <div>
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Delivery Boy</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Delivery Boy Name <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter delivery boy name" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Distance <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter distance" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Amount <span className="text-red-500">*</span></label>
                                    <input type="number" placeholder="Enter amount" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Payment Status <span className="text-red-500">*</span></label>
                                    <select className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full appearance-none cursor-pointer">
                                        <option>Select Payment Status..</option>
                                        <option>Paid</option>
                                        <option>Not Paid</option>
                                    </select>
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Delivery Status <span className="text-red-500">*</span></label>
                                    <select className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full appearance-none cursor-pointer">
                                        <option>Select Delivery Status..</option>
                                        <option>Assigned</option>
                                        <option>Out for Delivery</option>
                                        <option>Delivered</option>
                                    </select>
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Pin code <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter pin code" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-6 flex justify-end">
                            <button type="submit" className="bg-secondary text-white px-8 py-2.5 rounded-lg text-[15px] font-semibold hover:bg-primary transition-all duration-300 shadow-sm">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddOrder;
