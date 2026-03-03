import React, { useState, useRef } from 'react';
import { FiArrowLeft, FiSearch, FiCalendar, FiFilter, FiDownload, FiEdit2, FiEye, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [actionDropRow, setActionDropRow] = useState(null);
    const [filterDropOpen, setFilterDropOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const fromPickerRef = useRef(null);
    const toPickerRef = useRef(null);

    const [vendors, setVendors] = useState(Array.from({ length: 14 }).map((_, i) => ({
        id: `HFU000000${(i + 1).toString().padStart(2, '0')}`,
        slNo: (i + 1).toString().padStart(2, '0'),
        name: 'Ranjith',
        email: 'Ranjith@gmail.com',
        mobile: '9795837373',
        registered: '24/10/04',
    })));

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

    const parseDate = (dateStr, format) => {
        if (!dateStr) return null;
        try {
            if (format === 'DD/MM/YY') {
                const [d, m, y] = dateStr.split('/');
                return new Date(2000 + parseInt(y), parseInt(m) - 1, parseInt(d));
            }
            if (format === 'DD-MM-YYYY') {
                const parts = dateStr.split('-');
                if (parts.length !== 3) return null;
                const [d, m, y] = parts;
                if (y.length !== 4) return null;
                return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            }
        } catch (e) {
            return null;
        }
        return null;
    };

    const filteredVendors = vendors.filter(vendor => {
        // Search Filter
        const matchesSearch =
            vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.mobile.includes(searchQuery) ||
            vendor.email.toLowerCase().includes(searchQuery.toLowerCase());

        // Date Filter
        const userDate = parseDate(vendor.registered, 'DD/MM/YY');
        const start = parseDate(fromDate, 'DD-MM-YYYY');
        const end = parseDate(toDate, 'DD-MM-YYYY');

        let matchesDate = true;
        if (start) {
            matchesDate = matchesDate && (userDate && userDate >= start);
        }
        if (end) {
            matchesDate = matchesDate && (userDate && userDate <= end);
        }

        return matchesSearch && matchesDate;
    });

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
            <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3 text-gray-800 hover:text-primary transition-colors">
                    <FiArrowLeft size={24} />
                </button>
                <h1 className="text-[22px] font-bold text-gray-800 font-inter tracking-tight">
                    Vendor Request
                </h1>
            </div>

            {/* Main Card */}
            <div className="flex-1 bg-background rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col border border-gray-100/50 mb-6 overflow-hidden">
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
                            <span className={`absolute -top-2.5 left-2 bg-background px-1 text-[10px] font-medium transition-colors duration-200 ${focusedInput === 'from' ? 'text-primary' : 'text-gray-500'}`}>From Date</span>
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
                            <span className={`absolute -top-2.5 left-2 bg-background px-1 text-[10px] font-medium transition-colors duration-200 ${focusedInput === 'to' ? 'text-primary' : 'text-gray-500'}`}>To Date</span>
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
                    </div>
                </div>

                {/* Table wrapper */}
                <div className="flex-1 overflow-x-auto w-full custom-scrollbar p-5 pt-0">
                    <table className="w-full text-left min-w-[1000px] mt-4">
                        <thead>
                            <tr className="bg-[#284B30] text-white text-[13px] font-medium tracking-wide border-b-0">
                                <th className="py-4 pl-5 w-12 rounded-tl-lg">
                                    <input
                                        type="checkbox"
                                        className="accent-primary w-4 h-4 cursor-pointer align-middle"
                                        checked={selectedIds.size === filteredVendors.length && filteredVendors.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="py-4 px-3 w-16">Sl.no</th>
                                <th className="py-4 px-3">Vendor ID</th>
                                <th className="py-4 px-3">Name</th>
                                <th className="py-4 px-3">E mail</th>
                                <th className="py-4 px-3">Mobile No</th>
                                <th className="py-4 px-3 w-32 text-center">Status</th>
                                <th className="py-4 px-3 w-20 text-center rounded-tr-lg">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-[13px] text-gray-600 font-medium">
                            {filteredVendors.length > 0 ? (
                                filteredVendors.map((vendor, i) => (
                                    <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${selectedIds.has(vendor.id) ? 'bg-primary/5' : ''}`}>
                                        <td className="py-5 pl-5">
                                            <input
                                                type="checkbox"
                                                className="accent-primary w-4 h-4 cursor-pointer rounded border-gray-300"
                                                checked={selectedIds.has(vendor.id)}
                                                onChange={() => toggleSelectVendor(vendor.id)}
                                            />
                                        </td>
                                        <td className="py-4 px-3 opacity-80">
                                            <div className="flex items-center space-x-2">
                                                <span>{vendor.slNo}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-3 opacity-80">{vendor.id}</td>
                                        <td className="py-4 px-3 opacity-90">{vendor.name}</td>
                                        <td className="py-4 px-3 opacity-80">{vendor.email}</td>
                                        <td className="py-4 px-3 opacity-80">{vendor.mobile}</td>
                                        <td className="py-4 px-3 text-center">
                                            <button className="bg-secondary hover:bg-primary-hover text-white px-5 py-2 rounded-md text-xs font-semibold transition-colors min-w-[90px]">
                                                Accept
                                            </button>
                                        </td>
                                        <td className="py-4 px-3 text-center relative">
                                            <button
                                                onClick={() => setActionDropRow(actionDropRow === i ? null : i)}
                                                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                                            >
                                                <FiMoreHorizontal size={18} />
                                            </button>

                                            {/* Action Dropdown per row */}
                                            {actionDropRow === i && (
                                                <div className="absolute right-8 top-10 w-32 bg-background border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-xl py-2 z-50 text-[13px] text-left">
                                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium transition-colors">
                                                        <FiEdit2 size={14} /> <span>Edit</span>
                                                    </button>
                                                    <button onClick={() => navigate('/dashboard/vendor/' + vendor.id)} className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium transition-colors">
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
                                    <td colSpan="8" className="py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <FiSearch size={40} className="mb-4 opacity-50 text-primary" />
                                            <p className="text-base font-medium">No data available</p>
                                            <p className="text-sm opacity-60">Try adjusting your search query or date range</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600 shrink-0">
                    <div className="flex items-center space-x-3">
                        <span className="font-medium">Page</span>
                        <div className="relative">
                            <select className="appearance-none border border-gray-200 rounded-lg px-4 py-1.5 pr-8 outline-none focus:border-primary cursor-pointer font-medium bg-background">
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

                    <div className="flex items-center space-x-1 font-medium bg-background p-1 rounded-lg border border-gray-100">
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
        </div>
    );
};

export default Admin;
