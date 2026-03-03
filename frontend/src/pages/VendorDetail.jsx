import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiEdit2, FiEye, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

const VendorDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('Vendor Details');
    const [actionDropRow, setActionDropRow] = useState(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.action-dropdown-content') && !event.target.closest('.action-dropdown-button')) {
                setActionDropRow(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const transactions = Array.from({ length: 5 }).map((_, i) => ({
        slNo: (i + 1).toString().padStart(2, '0'),
        subscriptionName: 'Free Plan',
        amount: 'Free',
        startDate: '2025-12-11  12:45:03',
        endDate: '2026-12-11  12:45:03',
        status: i % 2 === 0 ? 'Active' : 'Deactive',
    }));

    return (
        <div className="w-full flex-1 flex flex-col">
            <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3 text-gray-800 hover:text-primary transition-colors outline-none">
                    <FiArrowLeft size={24} />
                </button>
                <h1 className="text-[22px] font-bold text-dark font-inter tracking-tight">
                    {activeTab}
                </h1>
            </div>

            <div className="flex-1 bg-background rounded-2xl min-h-[70vh] shadow-[0_4px_24px_rgba(0,0,0,0.02)] mb-6 flex flex-col overflow-hidden border border-gray-100/50">
                {/* Tabs Header */}
                <div className="flex items-center bg-primary-light px-8 pt-6 rounded-t-2xl border-b border-gray-200">
                    <button
                        className={`pb-4 font-bold text-[18px] mr-10 transition-colors relative ${activeTab === 'Vendor Details' ? 'text-primary' : 'text-secondary hover:text-primary/80'}`}
                        onClick={() => setActiveTab('Vendor Details')}
                    >
                        Vendor Details
                        {activeTab === 'Vendor Details' && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-md z-10"></div>}
                    </button>
                    <button
                        className={`pb-4 font-bold text-[18px] transition-colors relative ${activeTab === 'Vendor Subscriptions' ? 'text-primary' : 'text-secondary hover:text-primary/80'}`}
                        onClick={() => setActiveTab('Vendor Subscriptions')}
                    >
                        Vendor Subscriptions
                        {activeTab === 'Vendor Subscriptions' && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-md z-10"></div>}
                    </button>
                </div>

                {/* Content */}
                <div className={`flex-1 flex flex-col relative ${activeTab === 'Vendor Details' ? 'p-6 overflow-y-auto' : ''}`}>
                    {activeTab === 'Vendor Details' && (
                        <div className="space-y-6">
                            {/* Personal Info */}
                            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Vendor Id</h4>
                                    <p className="text-[15px] font-medium text-gray-800">{id || 'HF00000643'}</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Vendor Name</h4>
                                    <p className="text-[15px] font-medium text-gray-800">Ranjith Ramesh</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Email</h4>
                                    <p className="text-[15px] font-medium text-gray-800">ranjith@gmail.com</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Mobile Number</h4>
                                    <p className="text-[15px] font-medium text-gray-800">97967585346</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Commission Percentage</h4>
                                    <p className="text-[15px] font-medium text-gray-800">10%</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Cost for two</h4>
                                    <p className="text-[15px] font-medium text-gray-800">100</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Delivery Notes</h4>
                                    <p className="text-[15px] font-medium text-gray-800">20</p>
                                </div>
                            </div>

                            {/* Address 01 */}
                            <div className="mt-8">
                                <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                    <h3 className="text-[17px] font-bold text-secondary">Address-01</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Door/ Flat No</h4>
                                        <p className="text-[15px] font-medium text-gray-800">01</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Apartment Name/ Block</h4>
                                        <p className="text-[15px] font-medium text-gray-800">India Builder</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Street</h4>
                                        <p className="text-[15px] font-medium text-gray-800">Anna Street</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Area</h4>
                                        <p className="text-[15px] font-medium text-gray-800">Chennai</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">City/District</h4>
                                        <p className="text-[15px] font-medium text-gray-800">ranjith@gmail.com</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Pin code</h4>
                                        <p className="text-[15px] font-medium text-gray-800">600040</p>
                                    </div>
                                </div>
                            </div>

                            {/* Account Details */}
                            <div className="mt-8">
                                <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                    <h3 className="text-[17px] font-bold text-secondary">Account Details</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-x-10 gap-y-6">
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">A/C No</h4>
                                        <p className="text-[15px] font-medium text-gray-800">66554202321455</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">A/C Name</h4>
                                        <p className="text-[15px] font-medium text-gray-800">Ranjith Ramesh</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Bank</h4>
                                        <p className="text-[15px] font-medium text-gray-800">Paytm</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Branch</h4>
                                        <p className="text-[15px] font-medium text-gray-800">Chennai</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">IFSC Code</h4>
                                        <p className="text-[15px] font-medium text-gray-800">PAYTM123456</p>
                                    </div>
                                </div>
                            </div>

                            {/* Proof Document */}
                            <div className="mt-6">
                                <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                    <h3 className="text-[17px] font-bold text-gray-900">Proof Document</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-x-12">
                                    {/* Aadhar Proof */}
                                    <div>
                                        <h4 className="text-[16px] font-semibold text-gray-900 mb-3">Aadhar Proof</h4>
                                        <div className="w-[150px] h-[180px] bg-white border border-gray-200 shadow-sm p-1 rounded overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400"
                                                alt="Aadhar Proof"
                                                className="w-full h-full object-cover rounded-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Fssai Proof */}
                                    <div>
                                        <h4 className="text-[16px] font-semibold text-gray-900 mb-3">Fssai Proof</h4>
                                        <div className="w-[150px] h-[180px] bg-white border border-gray-200 shadow-sm p-1 rounded overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1586282391129-76a6df230234?auto=format&fit=crop&q=80&w=400"
                                                alt="Fssai Proof"
                                                className="w-full h-full object-cover rounded-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Accept Button */}
                            <div className="pt-6 pb-4 flex justify-center">
                                <button className="w-[70vw] bg-quaternary hover:-translate-y-1 hover:shadow-lg hover:shadow-dark/30 hover:opacity-90 text-white py-2.5 rounded-lg text-[15px] font-semibold transition-all duration-300 shadow-sm tracking-wide active:scale-[0.98]">
                                    Accept
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Vendor Subscriptions' && (
                        <div className="flex-1 flex flex-col w-full h-full bg-white relative">
                            {/* Table area with vertical and horizontal scrolling */}
                            <div className="flex-1 overflow-auto w-full custom-scrollbar mt-2">
                                <table className="w-full text-center min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-secondary text-background text-[14px] font-medium tracking-wide">
                                            <th className="py-4 pl-5 w-12 rounded-tl-xl"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer align-middle" /></th>
                                            <th className="py-4 px-3 w-16">Sl.no</th>
                                            <th className="py-4 px-3">Subscription Name</th>
                                            <th className="py-4 px-3">Amount(₹)</th>
                                            <th className="py-4 px-3">Start Date</th>
                                            <th className="py-4 px-3">End Date</th>
                                            <th className="py-4 px-3">Status</th>
                                            <th className="py-4 px-3 w-20 text-center rounded-tr-xl">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[13px] text-gray-600 font-medium">
                                        {transactions.map((tx, i) => (
                                            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                                <td className="py-5 pl-5"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer rounded border-gray-300" /></td>
                                                <td className="py-3 px-2 opacity-80">{tx.slNo}</td>
                                                <td className="py-3 px-2 opacity-80">{tx.subscriptionName}</td>
                                                <td className="py-3 px-2 opacity-90">{tx.amount}</td>
                                                <td className="py-3 px-2 opacity-80 text-green-600">{tx.startDate}</td>
                                                <td className="py-3 px-2 opacity-80 text-red-600">{tx.endDate}</td>
                                                <td className="py-3 px-2">
                                                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase ${tx.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 text-center relative">
                                                    <button
                                                        onClick={() => setActionDropRow(actionDropRow === i ? null : i)}
                                                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 action-dropdown-button"
                                                    >
                                                        <FiMoreHorizontal size={18} />
                                                    </button>

                                                    {actionDropRow === i && (
                                                        <div className="absolute right-8 top-10 w-32 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-xl py-2 z-50 text-[13px] action-dropdown-content">
                                                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium transition-colors">
                                                                <FiEdit2 size={14} /> <span>Edit</span>
                                                            </button>
                                                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium transition-colors">
                                                                <FiEye size={14} /> <span>View</span>
                                                            </button>
                                                            <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium transition-colors">
                                                                <FiTrash2 size={14} /> <span>Delete</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600 shrink-0 bg-white">
                                <div className="flex items-center space-x-3">
                                    <span className="font-medium">Page</span>
                                    <div className="relative">
                                        <select className="appearance-none border border-gray-200 rounded-lg px-4 py-1.5 pr-8 outline-none focus:border-primary cursor-pointer font-medium bg-white">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                        <svg className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <span className="font-medium">of 10</span>
                                </div>

                                <div className="flex items-center space-x-1 font-medium bg-white p-1 rounded-lg border border-gray-100">
                                    <button className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all">«</button>
                                    <button className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all">‹</button>
                                    <button className="px-3.5 py-1.5 bg-primary text-white rounded-md shadow-sm transition-all">1</button>
                                    <button className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-all">2</button>
                                    <button className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-all">3</button>
                                    <span className="px-2 py-1.5 text-gray-400">...</span>
                                    <button className="px-3.5 py-1.5 text-gray-600 hover:bg-gray-50 rounded-md transition-all">10</button>
                                    <button className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all">›</button>
                                    <button className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all">»</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorDetail;
