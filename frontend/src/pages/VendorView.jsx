import React, { useState, useRef, useEffect } from 'react';
import { FiArrowLeft, FiEdit2, FiEye, FiTrash2, FiMoreHorizontal, FiSearch, FiPlus } from 'react-icons/fi';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const VendorView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const isViewMode = !!id; // true when accessed via /vendor/:id (View button)

    // File input refs
    const aadharRef = useRef(null);
    const fssaiRef = useRef(null);
    const profileRef = useRef(null);

    // File state
    const [aadharFile, setAadharFile] = useState(null);
    const [fssaiFile, setFssaiFile] = useState(null);
    const [profileFile, setProfileFile] = useState(null);

    // Tab state
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'Vendor Details');

    // Search state
    const [searchQuery, setSearchQuery] = useState('');

    // Dropdown state
    const [actionDropRow, setActionDropRow] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.action-dropdown-content') && !event.target.closest('.action-dropdown-button')) {
                setActionDropRow(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Mock data for Food List
    const foods = Array.from({ length: 25 }).map((_, i) => ({
        slNo: (i + 1).toString().padStart(2, '0'),
        name: i % 2 !== 0 ? 'Dosa' : 'Carrot Rice',
        category: 'Main-Course',
        price: '₹60',
        status: 'Active',
    }));

    const orders = Array.from({ length: 25 }).map((_, i) => ({
        slNo: (i + 1).toString().padStart(2, '0'),
        orderId: `OD00001258`,
        customerName: 'Ranjith',
        date: '2025-12-18 13:31:21.000',
        amount: '₹275',
        foods: ['curd Rice', 'Brinji Rice', 'Sambar Rice', 'Lemon Rice'],
    }));

    const transactions = Array.from({ length: 8 }).map((_, i) => ({
        slNo: (i + 1).toString().padStart(2, '0'),
        date: '2025-12-18 13:31:21.000',
        type: 'Subscription',
        orderId: 'Null',
        status: 'Debit',
        amount: '₹275',
        balance: '₹275'
    }));

    const subscriptions = [
        { slNo: '01', name: 'Free Subscription', amount: 'Free', startDate: '2025-12-18 13:31:21.000', endDate: '2025-12-18 13:31:21.000' },
        { slNo: '02', name: 'Paid Subscription', amount: '999', startDate: '2025-12-18 13:31:21.000', endDate: '2025-12-18 13:31:21.000' },
    ];

    // Pagination logic
    const getCurrentData = () => {
        if (activeTab === 'Food List') return foods;
        if (activeTab === 'Order List') return orders;
        if (activeTab === 'Transaction List') return transactions || [];
        if (activeTab === 'Vendor Subscription') return subscriptions || [];
        return [];
    };

    const currentData = getCurrentData();
    // Reset pagination and search on tab change
    useEffect(() => {
        setCurrentPage(1);
        setSearchQuery('');
    }, [activeTab]);

    const isListTab = activeTab !== 'Vendor Details';

    // Page title — show tab name for list tabs
    const pageTitle = activeTab === 'Vendor Details' ? 'Vendor Detail' : activeTab;

    // Filter data by search query
    const filteredData = getCurrentData().filter(item => {
        const q = searchQuery.toLowerCase();
        return Object.values(item).some(v => String(v).toLowerCase().includes(q));
    });
    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="w-full flex-1 flex flex-col p-2">
            {/* Dynamic Header */}
            <div className="flex items-center justify-between mb-6">
                {/* Left: back arrow + title */}
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="mr-3 text-gray-800 hover:text-primary transition-colors outline-none">
                        <FiArrowLeft size={24} />
                    </button>
                    <h1 className="text-[22px] font-bold text-gray-800 font-inter tracking-tight">
                        {pageTitle}
                    </h1>
                </div>

                {/* Right: search + Add New (only on list tabs) */}
                {isListTab && (
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary w-52 text-gray-600"
                            />
                        </div>
                        <button
                            onClick={() => {
                                if (activeTab === 'Food List') {
                                    navigate(`/dashboard/vendor/${id}/food/add`);
                                } else if (activeTab === 'Order List') {
                                    navigate(`/dashboard/vendor/${id}/order/add`);
                                }
                            }}
                            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-all shadow-sm"
                        >
                            <FiPlus size={16} />
                            <span>Add New</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Main Card */}
            <div className="flex-1 bg-background rounded-2xl min-h-[70vh] shadow-[0_4px_24px_rgba(0,0,0,0.02)] mb-6 flex flex-col overflow-hidden border border-gray-100/50">
                {/* Tabs Header */}
                <div className="flex items-center bg-primary-light px-8 pt-6 rounded-t-2xl border-b border-gray-200 overflow-x-auto hide-scrollbar">
                    <button
                        className={`pb-4 font-bold text-[18px] mr-10 whitespace-nowrap transition-colors relative ${activeTab === 'Vendor Details' ? 'text-primary' : 'text-secondary hover:text-primary/80'}`}
                        onClick={() => setActiveTab('Vendor Details')}
                    >
                        Vendor Details
                        {activeTab === 'Vendor Details' && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-md z-10"></div>}
                    </button>
                    <button
                        className={`pb-4 font-bold text-[18px] mr-10 whitespace-nowrap transition-colors relative ${activeTab === 'Food List' ? 'text-primary' : 'text-secondary hover:text-primary/80'}`}
                        onClick={() => setActiveTab('Food List')}
                    >
                        Food List
                        {activeTab === 'Food List' && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-md z-10"></div>}
                    </button>
                    <button
                        className={`pb-4 font-bold text-[18px] mr-10 whitespace-nowrap transition-colors relative ${activeTab === 'Order List' ? 'text-primary' : 'text-secondary hover:text-primary/80'}`}
                        onClick={() => setActiveTab('Order List')}
                    >
                        Order List
                        {activeTab === 'Order List' && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-md z-10"></div>}
                    </button>
                    <button
                        className={`pb-4 font-bold text-[18px] mr-10 whitespace-nowrap transition-colors relative ${activeTab === 'Transaction List' ? 'text-primary' : 'text-secondary hover:text-primary/80'}`}
                        onClick={() => setActiveTab('Transaction List')}
                    >
                        Transaction List
                        {activeTab === 'Transaction List' && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-md z-10"></div>}
                    </button>
                    <button
                        className={`pb-4 font-bold text-[18px] mr-10 whitespace-nowrap transition-colors relative ${activeTab === 'Vendor Subscription' ? 'text-primary' : 'text-secondary hover:text-primary/80'}`}
                        onClick={() => setActiveTab('Vendor Subscription')}
                    >
                        Vendor Subscription
                        {activeTab === 'Vendor Subscription' && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-primary rounded-t-md z-10"></div>}
                    </button>
                </div>

                <div className="flex-1 flex flex-col relative overflow-y-auto custom-scrollbar">
                    {activeTab === 'Vendor Details' && (
                        <div className="space-y-6 p-6">
                            {/* Vendor Details */}
                            <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Vendor Name</h4>
                                    <p className="text-[15px] font-medium text-gray-800">Malar</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">E mail</h4>
                                    <p className="text-[15px] font-medium text-gray-800">Malar@gmail.com</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Mobile No</h4>
                                    <p className="text-[15px] font-medium text-gray-800">9795849295</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Commission Percentage</h4>
                                    <p className="text-[15px] font-medium text-gray-800">37%</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Cost for Two</h4>
                                    <p className="text-[15px] font-medium text-gray-800">₹200</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Delivery Offer</h4>
                                    <p className="text-[15px] font-medium text-gray-800">₹30</p>
                                </div>
                                <div className="border-b border-gray-200 pb-2">
                                    <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Vendor Type</h4>
                                    <p className="text-[15px] font-medium text-gray-800">Home made</p>
                                </div>
                            </div>

                            {/* Address Section */}
                            <div className="mt-8">
                                <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                    <h3 className="text-[17px] font-bold text-secondary">Address</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Latitude</h4>
                                        <p className="text-[15px] font-medium text-gray-800">13.0827</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Longitude</h4>
                                        <p className="text-[15px] font-medium text-gray-800">80.2707</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Door/Flat No</h4>
                                        <p className="text-[15px] font-medium text-gray-800">12</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Apartment Name</h4>
                                        <p className="text-[15px] font-medium text-gray-800">India Builder</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Block No</h4>
                                        <p className="text-[15px] font-medium text-gray-800">W-112</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Street</h4>
                                        <p className="text-[15px] font-medium text-gray-800">Anna Street</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Area</h4>
                                        <p className="text-[15px] font-medium text-gray-800">Anna Nagar</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">City/District</h4>
                                        <p className="text-[15px] font-medium text-gray-800">Chennai</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Pin Code</h4>
                                        <p className="text-[15px] font-medium text-gray-800">600040</p>
                                    </div>
                                </div>
                            </div>


                            {/* Account Details */}
                            <div className="mt-8">
                                <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                    <h3 className="text-[17px] font-bold text-secondary">Account Details</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">A/c No</h4>
                                        <p className="text-[15px] font-medium text-gray-800">0806857647</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">A/c Holder Name</h4>
                                        <p className="text-[15px] font-medium text-gray-800">Malar</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Bank</h4>
                                        <p className="text-[15px] font-medium text-gray-800">Indian Bank</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">Branch</h4>
                                        <p className="text-[15px] font-medium text-gray-800">Chennai</p>
                                    </div>
                                    <div className="border-b border-gray-200 pb-2">
                                        <h4 className="text-[16px] font-bold text-gray-900 mb-1.5">IFSC Code</h4>
                                        <p className="text-[15px] font-medium text-gray-800">INDC0000003</p>
                                    </div>
                                </div>
                            </div>

                            {/* Proof Document */}
                            <div className="mt-6">
                                <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                    <h3 className="text-[17px] font-bold text-gray-900">Proof Document</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-x-12">
                                    <div>
                                        <h4 className="text-[16px] font-semibold text-gray-900 mb-3">Aadhar Proof</h4>
                                        <div className="w-[150px] h-[180px] bg-white border border-gray-200 shadow-sm p-1 rounded overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400" alt="Aadhar Proof" className="w-full h-full object-cover rounded-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-[16px] font-semibold text-gray-900 mb-3">Fssai Proof</h4>
                                        <div className="w-[150px] h-[180px] bg-white border border-gray-200 shadow-sm p-1 rounded overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1586282391129-76a6df230234?auto=format&fit=crop&q=80&w=400" alt="Fssai Proof" className="w-full h-full object-cover rounded-sm" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Picture */}
                            <div className="mt-8">
                                <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                    <h3 className="text-[17px] font-bold text-gray-900">Profile Picture</h3>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 flex-shrink-0">
                                        <img src="https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&q=80&w=400" alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[15px] font-bold text-gray-900">Malar</p>
                                        <p className="text-[13px] text-gray-500 mt-1">Home made Vendor</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Food List' && (
                        <div className="flex-1 flex flex-col w-full h-full bg-white relative">
                            {/* Table area with vertical and horizontal scrolling */}
                            <div className="flex-1 overflow-auto w-full custom-scrollbar mt-2">
                                <table className="w-full text-left min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-secondary text-background text-[14px] font-medium tracking-wide">
                                            <th className="py-4 pl-6 w-12 rounded-tl-xl"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer align-middle" /></th>
                                            <th className="py-4 px-4 w-20 font-semibold">Sl.no</th>
                                            <th className="py-4 px-4 font-semibold text-center w-32">Food Image</th>
                                            <th className="py-4 px-4 font-semibold w-48">Food Name</th>
                                            <th className="py-4 px-4 font-semibold w-48">Food Category</th>
                                            <th className="py-4 px-4 font-semibold w-32">Amount(₹)</th>
                                            <th className="py-4 px-4 font-semibold w-32">Status</th>
                                            <th className="py-4 px-4 w-24 text-center rounded-tr-xl">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[13px] text-gray-700 font-medium">
                                        {paginatedData.map((food, i) => (
                                            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3 pl-6"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer rounded border-gray-300 align-middle" /></td>
                                                <td className="py-3 px-4">{food.slNo}</td>
                                                <td className="py-2 px-4">
                                                    <div className="w-11 h-11 mx-auto rounded overflow-hidden bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                                                        <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400" alt="Food" className="w-full h-full object-cover" />
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">{food.name}</td>
                                                <td className="py-3 px-4">{food.category}</td>
                                                <td className="py-3 px-4">{food.price}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-4 py-1.5 rounded-sm text-[11px] font-bold tracking-wider capitalize ${food.status === 'Active' ? 'bg-[#e5f7e8] text-primary' : 'bg-red-100 text-red-700'}`}>
                                                        {food.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-center relative">
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
                                        <select
                                            value={currentPage}
                                            onChange={(e) => setCurrentPage(Number(e.target.value))}
                                            className="appearance-none border border-gray-200 rounded-lg px-4 py-1.5 pr-8 outline-none focus:border-primary cursor-pointer font-medium bg-white"
                                        >
                                            {Array.from({ length: totalPages }).map((_, i) => (
                                                <option key={i} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <svg className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <span className="font-medium">of {totalPages}</span>
                                </div>
                                <div className="flex items-center space-x-1 font-medium bg-white p-1 rounded-lg border border-gray-100">
                                    <button
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30"
                                    >«</button>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30"
                                    >‹</button>

                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={`px-3.5 py-1.5 rounded-md transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30"
                                    >›</button>
                                    <button
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30"
                                    >»</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Order List' && (
                        <div className="flex-1 flex flex-col w-full h-full bg-white relative">
                            <div className="flex-1 overflow-auto w-full custom-scrollbar mt-2">
                                <table className="w-full text-left min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-secondary text-background text-[13px] font-medium tracking-wide">
                                            <th className="py-4 pl-6 w-12 rounded-tl-xl">
                                                <input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer align-middle" />
                                            </th>
                                            <th className="py-4 px-4 w-16 text-center font-semibold text-[14px]">Sl.no</th>
                                            <th className="py-4 px-4 font-semibold text-[14px]">Date</th>
                                            <th className="py-4 px-4 font-semibold text-[14px]">Order Id</th>
                                            <th className="py-4 px-4 font-semibold text-[14px]">Customer Name</th>
                                            <th className="py-4 px-4 font-semibold text-[14px]">FOOD</th>
                                            <th className="py-4 px-4 font-semibold text-[14px]">Amount(₹)</th>
                                            <th className="py-4 px-4 w-24 text-center rounded-tr-xl font-semibold text-[14px]">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[13px] text-gray-700 font-medium">
                                        {paginatedData.map((order, i) => (
                                            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3 pl-6"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer rounded border-gray-300 align-middle" /></td>
                                                <td className="py-4 px-4 text-center opacity-80">{order.slNo}</td>
                                                <td className="py-4 px-4 opacity-80 text-[13px]">{order.date}</td>
                                                <td className="py-4 px-4 text-primary font-bold">{order.orderId}</td>
                                                <td className="py-4 px-4 font-bold text-gray-800">{order.customerName}</td>
                                                <td className="py-4 px-4">
                                                    <div className="flex flex-col text-[12px] text-gray-700 font-medium leading-[1.4]">
                                                        {order.foods.map((food, idx) => (
                                                            <span key={idx}>{food}</span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 font-bold text-gray-800">{order.amount}</td>
                                                <td className="py-3 px-4 text-center relative">
                                                    <button onClick={() => setActionDropRow(actionDropRow === i ? null : i)} className="text-gray-400 hover:text-gray-600 transition-colors p-2 action-dropdown-button">
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
                                        <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))} className="appearance-none border border-gray-200 rounded-lg px-4 py-1.5 pr-8 outline-none focus:border-primary cursor-pointer font-medium bg-white">
                                            {Array.from({ length: totalPages }).map((_, i) => (
                                                <option key={i} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <svg className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <span className="font-medium">of {totalPages}</span>
                                </div>
                                <div className="flex items-center space-x-1 font-medium bg-white p-1 rounded-lg border border-gray-100">
                                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">«</button>
                                    <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">‹</button>
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3.5 py-1.5 rounded-md transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}>{i + 1}</button>
                                    ))}
                                    <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">›</button>
                                    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">»</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Transaction List' && (
                        <div className="flex-1 flex flex-col w-full h-full bg-white relative">
                            <div className="flex-1 overflow-auto w-full custom-scrollbar mt-2">
                                <table className="w-full text-left min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-secondary text-background text-[14px] font-medium tracking-wide">
                                            <th className="py-4 pl-6 w-12 rounded-tl-xl"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer align-middle" /></th>
                                            <th className="py-4 px-4 font-semibold text-center">Sl.no</th>
                                            <th className="py-4 px-4 font-semibold text-center">Date</th>
                                            <th className="py-4 px-4 font-semibold text-center">Type</th>
                                            <th className="py-4 px-4 font-semibold text-center">Order ID</th>
                                            <th className="py-4 px-4 font-semibold text-center">Status</th>
                                            <th className="py-4 px-4 font-semibold text-center">Amount(₹)</th>
                                            <th className="py-4 px-4 font-semibold text-center rounded-tr-xl">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[13px] text-gray-700 font-medium">
                                        {paginatedData.map((txn, i) => (
                                            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3 pl-6"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer rounded border-gray-300 align-middle" /></td>
                                                <td className="py-3 px-4 text-center opacity-80">{txn.slNo}</td>
                                                <td className="py-3 px-4 text-center opacity-80">{txn.date}</td>
                                                <td className="py-3 px-4 text-center opacity-80">{txn.type}</td>
                                                <td className="py-3 px-4 text-center opacity-80">{txn.orderId}</td>
                                                <td className="py-3 px-4 text-center">
                                                    <span className={`font-bold ${txn.status === 'Debit' ? 'text-red-500' : 'text-primary'}`}>
                                                        {txn.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-center font-medium opacity-80">{txn.amount}</td>
                                                <td className="py-3 px-4 text-center font-medium opacity-80">{txn.balance}</td>
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
                                        <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))} className="appearance-none border border-gray-200 rounded-lg px-4 py-1.5 pr-8 outline-none focus:border-primary cursor-pointer font-medium bg-white">
                                            {Array.from({ length: totalPages }).map((_, i) => (
                                                <option key={i} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <svg className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <span className="font-medium">of {totalPages}</span>
                                </div>
                                <div className="flex items-center space-x-1 font-medium bg-white p-1 rounded-lg border border-gray-100">
                                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">«</button>
                                    <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">‹</button>
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3.5 py-1.5 rounded-md transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}>{i + 1}</button>
                                    ))}
                                    <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">›</button>
                                    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">»</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'Vendor Subscription' && (
                        <div className="flex-1 flex flex-col w-full h-full bg-white relative">
                            <div className="flex-1 overflow-auto w-full custom-scrollbar mt-2">
                                <table className="w-full text-left min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-secondary text-background text-[14px] font-medium tracking-wide">
                                            <th className="py-4 pl-6 w-12 rounded-tl-xl"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer align-middle" /></th>
                                            <th className="py-4 px-4 font-semibold text-center">Sl.no</th>
                                            <th className="py-4 px-4 font-semibold text-center uppercase">Subscription Name</th>
                                            <th className="py-4 px-4 font-semibold text-center uppercase">Amount(₹)</th>
                                            <th className="py-4 px-4 font-semibold text-center uppercase">Start Date</th>
                                            <th className="py-4 px-4 font-semibold text-center uppercase rounded-tr-xl">End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-[13px] text-gray-700 font-medium">
                                        {paginatedData.map((sub, i) => (
                                            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                                <td className="py-3 pl-6"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer rounded border-gray-300 align-middle" /></td>
                                                <td className="py-3 px-4 text-center opacity-80">{sub.slNo}</td>
                                                <td className="py-3 px-4 text-center opacity-80">{sub.name}</td>
                                                <td className="py-3 px-4 text-center opacity-80">{sub.amount}</td>
                                                <td className="py-3 px-4 text-center opacity-80">{sub.startDate}</td>
                                                <td className="py-3 px-4 text-center opacity-80">{sub.endDate}</td>
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
                                        <select value={currentPage} onChange={(e) => setCurrentPage(Number(e.target.value))} className="appearance-none border border-gray-200 rounded-lg px-4 py-1.5 pr-8 outline-none focus:border-primary cursor-pointer font-medium bg-white">
                                            {Array.from({ length: totalPages }).map((_, i) => (
                                                <option key={i} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <svg className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <span className="font-medium">of {totalPages}</span>
                                </div>
                                <div className="flex items-center space-x-1 font-medium bg-white p-1 rounded-lg border border-gray-100">
                                    <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">«</button>
                                    <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">‹</button>
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <button key={i} onClick={() => setCurrentPage(i + 1)} className={`px-3.5 py-1.5 rounded-md transition-all ${currentPage === i + 1 ? 'bg-primary text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}>{i + 1}</button>
                                    ))}
                                    <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">›</button>
                                    <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-30">»</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorView;
