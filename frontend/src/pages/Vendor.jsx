import React, { useState, useRef, useEffect } from 'react';
import { FiArrowLeft, FiSearch, FiCalendar, FiFilter, FiDownload, FiEdit2, FiEye, FiTrash2, FiMoreHorizontal, FiPlus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Vendor = () => {
    const navigate = useNavigate();
    const [actionDropRow, setActionDropRow] = useState(null);
    const [filterDropOpen, setFilterDropOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'request', 'list'
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

    const [searchQuery, setSearchQuery] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const fromPickerRef = useRef(null);
    const toPickerRef = useRef(null);

    const [vendors, setVendors] = useState(Array.from({ length: 50 }).map((_, i) => {
        const isRequest = i % 2 === 0;
        return {
            id: `HFU000000${(i + 1).toString().padStart(2, '0')}`,
            slNo: (i + 1).toString().padStart(2, '0'),
            date: isRequest ? '24/10/2024' : '24/10/2025',
            name: i % 3 === 0 ? 'Ranjith' : i % 3 === 1 ? 'Aravindh' : 'Suresh',
            email: 'Ranjith@gmail.com',
            mobile: isRequest ? '9795837373' : '9991701414',
            vendorType: isRequest ? '-' : (i % 4 === 1 ? 'Home made' : 'Commercial'),
            appStatus: isRequest ? '-' : (i % 5 === 1 ? 'Offline' : 'Online'),
            lastLogin: isRequest ? '-' : '12/04/2025 18:23:03',
            status: isRequest ? 'Pending' : (i % 6 === 1 ? 'Inactive' : 'Active'),
            type: isRequest ? 'request' : 'list',
        };
    }));

    // Date and filter helpers
    const formatDateInput = (value) => {
        const numeric = value.replace(/\D/g, '');
        if (numeric.length <= 2) return numeric;
        if (numeric.length <= 4) return `${numeric.slice(0, 2)}-${numeric.slice(2)}`;
        return `${numeric.slice(0, 2)}-${numeric.slice(2, 4)}-${numeric.slice(4, 8)}`;
    };

    const handleDateInput = (setter) => (e) => {
        const val = e.target.value;
        if (e.nativeEvent.inputType === 'deleteContentBackward' && val.endsWith('-')) {
            setter(val.slice(0, -1));
        } else {
            setter(formatDateInput(val));
        }
    };

    const handlePickerChange = (setter) => (e) => {
        const val = e.target.value;
        if (val) {
            const [y, m, d] = val.split('-');
            setter(`${d}-${m}-${y}`);
        }
    };

    const parseDate = (dateStr) => {
        if (!dateStr) return null;
        try {
            const parts = dateStr.includes('/') ? dateStr.split('/') : dateStr.split('-');
            if (parts.length === 3) {
                const [d, m, y] = parts;
                const fullYear = y.length === 2 ? 2000 + parseInt(y) : parseInt(y);
                return new Date(fullYear, parseInt(m) - 1, parseInt(d));
            }
        } catch (e) {
            return null;
        }
        return null;
    };

    const filteredVendors = vendors.filter(vendor => {
        if (activeTab === 'request' && vendor.type !== 'request') return false;
        if (activeTab === 'list' && vendor.type !== 'list') return false;

        const matchesSearch =
            vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.mobile.includes(searchQuery) ||
            vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.vendorType.toLowerCase().includes(searchQuery.toLowerCase());

        const userDate = parseDate(vendor.date);
        const start = parseDate(fromDate);
        const end = parseDate(toDate);

        let matchesDate = true;
        if (start) {
            matchesDate = matchesDate && (userDate && userDate >= start);
        }
        if (end) {
            matchesDate = matchesDate && (userDate && userDate <= end);
        }

        return matchesSearch && matchesDate;
    });

    const totalPages = Math.ceil(filteredVendors.length / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedVendors = filteredVendors.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, fromDate, toDate, activeTab]);

    const toggleSelectAll = () => {
        if (selectedIds.size === filteredVendors.length && filteredVendors.length > 0) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredVendors.map(v => v.id)));
        }
    };

    const toggleSelectVendor = (id) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    return (
        <div className="w-full flex-1 flex flex-col p-2">
            {/* Header */}
            <div className="flex items-center mb-5">
                <Link to="/dashboard" className="mr-3 text-gray-800 hover:text-primary transition-colors">
                    <FiArrowLeft size={24} />
                </Link>
                <h1 className="text-[22px] font-bold text-gray-800 font-inter tracking-tight">
                    Vendor
                </h1>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 mb-3 px-2">
                <button 
                    onClick={() => setActiveTab('all')} 
                    className={`pb-1.5 text-lg font-bold transition-colors ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-gray-800 hover:text-primary/70'}`}
                >
                    All
                </button>
                <button 
                    onClick={() => setActiveTab('request')} 
                    className={`pb-1.5 text-lg font-bold transition-colors ${activeTab === 'request' ? 'text-primary border-b-2 border-primary' : 'text-gray-800 hover:text-primary/70'}`}
                >
                    Request
                </button>
                <button 
                    onClick={() => setActiveTab('list')} 
                    className={`pb-1.5 text-lg font-bold transition-colors ${activeTab === 'list' ? 'text-primary border-b-2 border-primary' : 'text-gray-800 hover:text-primary/70'}`}
                >
                    List
                </button>
            </div>

            {/* Main Card */}
            <div className="flex-1 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col border border-gray-100/50 mb-6 overflow-hidden">
                {/* Toolbox */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 text-gray-600"
                            />
                        </div>

                        {/* From Date */}
                        <div className={`relative border rounded-lg flex items-center px-3 py-2 transition-all duration-200 ${focusedInput === 'from' ? 'border-primary ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                            <FiCalendar
                                className={`mr-2 transition-colors duration-200 cursor-pointer hover:scale-110 active:scale-95 ${focusedInput === 'from' || fromDate ? 'text-primary' : 'text-gray-400'}`}
                                onClick={() => fromPickerRef.current?.showPicker()}
                            />
                            <input
                                type="date"
                                ref={fromPickerRef}
                                className="absolute opacity-0 pointer-events-none w-0 h-0"
                                onChange={handlePickerChange(setFromDate)}
                            />
                            <input
                                type="text"
                                placeholder="DD-MM-YYYY"
                                value={fromDate}
                                onChange={handleDateInput(setFromDate)}
                                onFocus={() => setFocusedInput('from')}
                                onBlur={() => setFocusedInput(null)}
                                maxLength={10}
                                className="text-sm outline-none text-gray-600 w-36 bg-transparent placeholder-gray-400"
                            />
                            <span className={`absolute -top-2.5 left-2 bg-white px-1 text-[10px] font-medium transition-colors duration-200 ${focusedInput === 'from' ? 'text-primary' : 'text-gray-500'}`}>From Date</span>
                        </div>

                        {/* To Date */}
                        <div className={`relative border rounded-lg flex items-center px-3 py-2 transition-all duration-200 ${focusedInput === 'to' ? 'border-primary ring-1 ring-primary' : 'border-gray-200 hover:border-gray-300'}`}>
                            <FiCalendar
                                className={`mr-2 transition-colors duration-200 cursor-pointer hover:scale-110 active:scale-95 ${focusedInput === 'to' || toDate ? 'text-primary' : 'text-gray-400'}`}
                                onClick={() => toPickerRef.current?.showPicker()}
                            />
                            <input
                                type="date"
                                ref={toPickerRef}
                                className="absolute opacity-0 pointer-events-none w-0 h-0"
                                onChange={handlePickerChange(setToDate)}
                            />
                            <input
                                type="text"
                                placeholder="DD-MM-YYYY"
                                value={toDate}
                                onChange={handleDateInput(setToDate)}
                                onFocus={() => setFocusedInput('to')}
                                onBlur={() => setFocusedInput(null)}
                                maxLength={10}
                                className="text-sm outline-none text-gray-600 w-36 bg-transparent placeholder-gray-400"
                            />
                            <span className={`absolute -top-2.5 left-2 bg-white px-1 text-[10px] font-medium transition-colors duration-200 ${focusedInput === 'to' ? 'text-primary' : 'text-gray-500'}`}>To Date</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 relative">
                        {/* Filter Button */}
                        <button
                            className="flex items-center space-x-2 text-primary border border-primary px-4 py-2 rounded-lg font-medium text-sm hover:bg-primary/5 transition-colors"
                            onClick={() => setFilterDropOpen(!filterDropOpen)}
                        >
                            <FiFilter size={16} />
                            <span>Filter</span>
                        </button>

                        {/* Export Button */}
                        <button className="flex items-center space-x-2 bg-primary text-white border border-transparent px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#15821c] transition-colors shadow-sm">
                            <FiDownload size={16} />
                            <span>Export</span>
                        </button>

                        {/* Add Vendor Button (only for List theoretically, but useful everywhere) */}
                        <button
                            onClick={() => navigate('/dashboard/vendor/add')}
                            className="flex items-center space-x-2 bg-secondary text-white border border-transparent px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#15821c] transition-colors shadow-sm"
                        >
                            <FiPlus size={16} />
                            <span>Add Vendor</span>
                        </button>
                    </div>
                </div>

                {/* Table wrapper */}
                <div className="flex-1 overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left min-w-[1300px] mt-2">
                        <thead>
                            <tr className="bg-secondary text-background text-[13px] font-medium tracking-wide">
                                <th className="py-4 pl-5 w-12 rounded-tl-xl text-left">
                                    <input
                                        type="checkbox"
                                        className="accent-primary w-4 h-4 cursor-pointer align-middle"
                                        checked={paginatedVendors.length > 0 && selectedIds.size === filteredVendors.length}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="py-4 px-3 w-16 whitespace-nowrap text-center">Sl.no</th>
                                <th className="py-4 px-3 whitespace-nowrap text-center">Vendor ID</th>
                                <th className="py-4 px-3 whitespace-nowrap text-center">Date</th>
                                <th className="py-4 px-3 whitespace-nowrap text-left">Name</th>
                                <th className="py-4 px-3 whitespace-nowrap text-left">Email</th>
                                <th className="py-4 px-3 whitespace-nowrap text-left">Mobile No</th>
                                <th className="py-4 px-3 whitespace-nowrap text-left">Vendor Type</th>
                                {activeTab !== 'request' && <th className="py-4 px-3 whitespace-nowrap text-left">App Status</th>}
                                {activeTab !== 'request' && <th className="py-4 px-3 whitespace-nowrap text-left">Last Login</th>}
                                <th className="py-4 px-3 text-center whitespace-nowrap">Status</th>
                                <th className="py-4 px-3 w-20 text-center rounded-tr-xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-[13px] text-gray-700 font-medium">
                            {paginatedVendors.length > 0 ? (
                                paginatedVendors.map((vendor, i) => (
                                    <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${selectedIds.has(vendor.id) ? 'bg-primary/5' : ''}`}>
                                        <td className="py-5 pl-5">
                                            <input
                                                type="checkbox"
                                                className="accent-primary w-4 h-4 cursor-pointer rounded border-gray-300"
                                                checked={selectedIds.has(vendor.id)}
                                                onChange={() => toggleSelectVendor(vendor.id)}
                                            />
                                        </td>
                                        <td className="py-4 px-3 opacity-80 text-center">{vendor.slNo}</td>
                                        <td className="py-4 px-3 opacity-80 text-center">{vendor.id}</td>
                                        <td className="py-4 px-3 opacity-80 text-center">{vendor.date}</td>
                                        <td className="py-4 px-3 opacity-90 font-bold text-gray-800">{vendor.name}</td>
                                        <td className="py-4 px-3 opacity-80">{vendor.email}</td>
                                        <td className="py-4 px-3 opacity-80">{vendor.mobile}</td>
                                        <td className="py-4 px-3 opacity-80">{vendor.vendorType}</td>
                                        
                                        {activeTab !== 'request' && (
                                            <>
                                                <td className="py-4 px-3 opacity-80">
                                                    {vendor.appStatus !== '-' && (
                                                        <span className={`flex items-center space-x-1.5 ${vendor.appStatus === 'Online' ? 'text-green-600' : 'text-gray-400'}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${vendor.appStatus === 'Online' ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                                                            <span>{vendor.appStatus}</span>
                                                        </span>
                                                    )}
                                                    {vendor.appStatus === '-' && <span>-</span>}
                                                </td>
                                                <td className="py-4 px-3 opacity-80">{vendor.lastLogin}</td>
                                            </>
                                        )}

                                        <td className="py-4 px-3 text-center">
                                            {vendor.type === 'request' ? (
                                                <button className="bg-quaternary hover:bg-secondary text-white px-5 py-2 rounded-md text-xs font-bold transition-all hover:-translate-y-1 shadow-sm active:scale-95 min-w-[90px]">
                                                    Accept
                                                </button>
                                            ) : (
                                                <span className={`inline-block px-3 py-1.5 rounded text-[11px] font-bold tracking-tight min-w-[80px] ${vendor.status === 'Active' ? 'bg-[#E6F7FF] text-[#40A9FF]' : 'bg-[#FFF4EC] text-[#FF7A00]'}`}>
                                                    {/* Changed from 'Active' to 'Accepted' matching user's spec request 'list have Accepted status' */}
                                                    {vendor.status === 'Active' ? 'Accepted' : vendor.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-4 px-3 text-center relative">
                                            <button
                                                onClick={() => setActionDropRow(actionDropRow === i ? null : i)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors p-2 action-dropdown-button"
                                            >
                                                <FiMoreHorizontal size={18} />
                                            </button>

                                            {actionDropRow === i && (
                                                <div className="absolute right-8 top-10 w-32 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-xl py-2 z-50 text-[13px] text-left action-dropdown-content">
                                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium transition-colors">
                                                        <FiEdit2 size={14} /> <span>Edit</span>
                                                    </button>
                                                    <button onClick={() => navigate(`/dashboard/vendor${vendor.type === 'request' ? '/request' : ''}/${vendor.id}`)} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium transition-colors">
                                                        <FiEye size={14} /> <span>View</span>
                                                    </button>
                                                    <button className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-500 flex items-center space-x-3 text-gray-700 font-medium transition-colors group">
                                                        <FiTrash2 size={14} className="group-hover:text-red-500 transition-colors" />
                                                        <span className="group-hover:text-red-500 transition-colors">Delete</span>
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={activeTab === 'request' ? 10 : 12} className="py-12 text-center text-gray-500 font-medium">
                                        No vendors found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600 shrink-0">
                    <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-500">Page</span>
                        <div className="relative">
                            <select
                                value={currentPage}
                                onChange={(e) => setCurrentPage(Number(e.target.value))}
                                className="appearance-none border border-gray-200 rounded-lg px-4 py-1.5 pr-8 outline-none focus:border-primary cursor-pointer font-bold text-gray-700 bg-white shadow-sm"
                            >
                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <svg className="w-4 h-4 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <span className="font-medium text-gray-500">of {totalPages}</span>
                    </div>

                    <div className="flex items-center space-x-1 font-medium bg-white p-1 rounded-lg border border-gray-100 shadow-sm">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-20 disabled:cursor-not-allowed font-bold"
                        >«</button>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-20 disabled:cursor-not-allowed font-bold"
                        >‹</button>

                        {Array.from({ length: totalPages }).map((_, i) => {
                            if (
                                i === 0 ||
                                i === totalPages - 1 ||
                                (i >= currentPage - 2 && i <= currentPage)
                            ) {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3.5 py-1.5 rounded-md transition-all duration-200 font-bold ${currentPage === i + 1 ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            }
                            if (i === 1 || i === totalPages - 2) {
                                return <span key={i} className="px-2 text-gray-300">...</span>;
                            }
                            return null;
                        })}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-20 disabled:cursor-not-allowed font-bold"
                        >›</button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all disabled:opacity-20 disabled:cursor-not-allowed font-bold"
                        >»</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vendor;
