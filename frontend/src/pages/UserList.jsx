import React, { useState, useRef, useEffect } from 'react';
import { FiArrowLeft, FiSearch, FiCalendar, FiFilter, FiDownload, FiEdit2, FiEye, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const UserList = () => {
    const navigate = useNavigate();
    const [actionDropRow, setActionDropRow] = useState(null);
    const [filterDropOpen, setFilterDropOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.action-dropdown-content') && !event.target.closest('.action-dropdown-button')) {
                setActionDropRow(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.action-dropdown-content') && !event.target.closest('.action-dropdown-button')) {
                setActionDropRow(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [focusedInput, setFocusedInput] = useState(null);
    const [selectedIds, setSelectedIds] = useState(new Set());
    const fromPickerRef = useRef(null);
    const toPickerRef = useRef(null);

    const [users, setUsers] = useState(Array.from({ length: 13 }).map((_, i) => ({
        id: `HFU0000000${i + 1}`,
        slNo: (i + 1).toString().padStart(2, '0'),
        name: 'Ranjith',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001',
        mobile: '9991701414',
        registered: '24/10/04',
        status: i % 2 !== 0 ? 'Preparing' : 'On Delivery',
    })));

    const handleDeleteUser = () => {
        if (userToDelete) {
            setUsers(users.filter(user => user.id !== userToDelete.id));
            setShowDeleteModal(false);
            setUserToDelete(null);
        }
    };

    const formatDateInput = (value) => {
        // Remove non-numeric characters
        const numeric = value.replace(/\D/g, '');

        // Format as DD-MM-YYYY
        if (numeric.length <= 2) return numeric;
        if (numeric.length <= 4) return `${numeric.slice(0, 2)}-${numeric.slice(2)}`;
        return `${numeric.slice(0, 2)}-${numeric.slice(2, 4)}-${numeric.slice(4, 8)}`;
    };

    const handleDateInput = (setter) => (e) => {
        const val = e.target.value;
        // Allow deleting hyphens by checking if it's a delete operation
        if (e.nativeEvent.inputType === 'deleteContentBackward' && (val.endsWith('-'))) {
            setter(val.slice(0, -1));
        } else {
            setter(formatDateInput(val));
        }
    };

    const handlePickerChange = (setter) => (e) => {
        const val = e.target.value; // YYYY-MM-DD
        if (val) {
            const [y, m, d] = val.split('-');
            setter(`${d}-${m}-${y}`);
        }
    };

    const formatDateForPicker = (dateStr) => {
        if (!dateStr || dateStr.length !== 10) return '';
        const [d, m, y] = dateStr.split('-');
        return `${y}-${m}-${d}`;
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

    const filteredUsers = users.filter(user => {
        // Search Filter
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.mobile.includes(searchQuery) ||
            user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.pincode.includes(searchQuery);

        // Date Filter
        const userDate = parseDate(user.registered, 'DD/MM/YY');
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
        if (selectedIds.size === filteredUsers.length && filteredUsers.length > 0) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredUsers.map(u => u.id)));
        }
    };

    const toggleSelectUser = (id) => {
        const newSelected = new Set(selectedIds);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const handleBulkDelete = () => {
        setUsers(users.filter(user => !selectedIds.has(user.id)));
        setSelectedIds(new Set());
    };

    return (
        <div className="w-full flex-1 flex flex-col p-2">
            {/* Header */}
            <div className="flex items-center mb-6">
                <Link to="/dashboard" className="mr-3 text-gray-800 hover:text-primary transition-colors">
                    <FiArrowLeft size={24} />
                </Link>
                <h1 className="text-[22px] font-bold text-gray-800 font-inter tracking-tight">
                    User List
                </h1>
            </div>

            {/* Main Card */}
            <div className="flex-1 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col border border-gray-100/50 mb-6 relative overflow-hidden">
                {/* Selection Header (Bulk Actions) */}
                {selectedIds.size > 1 && (
                    <div className="absolute top-0 left-0 right-0 h-[73px] bg-white border-b border-gray-100 z-[60] flex items-center justify-between px-6 animate-in slide-in-from-top duration-300">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setSelectedIds(new Set())}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                                >
                                    <FiArrowLeft size={20} />
                                </button>
                                <span className="text-base font-semibold text-gray-900">{selectedIds.size} {selectedIds.size === 1 ? 'User' : 'Users'} Selected</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleBulkDelete}
                                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium text-sm transition-colors text-white shadow-sm shadow-red-200"
                            >
                                <FiTrash2 size={16} />
                                <span>Delete Selected</span>
                            </button>
                            <button
                                onClick={() => setSelectedIds(new Set())}
                                className="text-sm font-medium text-gray-500 hover:text-gray-700 px-2 transition-colors"
                            >
                                Deselect All
                            </button>
                        </div>
                    </div>
                )}

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
                                max={formatDateForPicker(toDate)}
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
                                min={formatDateForPicker(fromDate)}
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
                            <FiFilter />
                            <span>Filter</span>
                        </button>

                        {/* Filter Dropdown */}
                        {filterDropOpen && (
                            <div className="absolute top-12 left-0 w-36 bg-white border border-gray-100 shadow-xl rounded-lg py-2 z-50 text-sm">
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                                    <span className="font-semibold tracking-widest text-[10px] text-gray-500 uppercase">City</span>
                                </button>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                                    <span className="font-semibold tracking-widest text-[10px] text-gray-500 uppercase">State</span>
                                </button>
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-2">
                                    <span className="font-semibold tracking-widest text-[10px] text-gray-500 uppercase">Pin code</span>
                                </button>
                            </div>
                        )}

                        {/* Export Button */}
                        <button className="flex items-center space-x-2 bg-primary text-white border border-transparent px-4 py-2 rounded-lg font-medium text-sm hover:bg-[#15821c] transition-colors shadow-sm">
                            <FiDownload />
                            <span>Export</span>
                        </button>
                    </div>
                </div>

                {/* Table wrapper for scrolling */}
                <div className="flex-1 overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left min-w-[1200px]">
                        <thead>
                            <tr className="bg-secondary text-background text-[13px] font-medium tracking-wide">
                                <th className="py-4 pl-5 w-12 rounded-tl-xl">
                                    <input
                                        type="checkbox"
                                        className="accent-primary w-4 h-4 cursor-pointer align-middle"
                                        checked={filteredUsers.length > 0 && selectedIds.size === filteredUsers.length}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="py-4 px-3 w-16">Sl.no</th>
                                <th className="py-4 px-3">User ID</th>
                                <th className="py-4 px-3">Name</th>
                                <th className="py-4 px-3">City</th>
                                <th className="py-4 px-3">State</th>
                                <th className="py-4 px-3">Pin code</th>
                                <th className="py-4 px-3">Mobile No</th>
                                <th className="py-4 px-3">registered ON</th>
                                <th className="py-4 px-3 w-32 text-center">Status</th>
                                <th className="py-4 px-3 w-20 text-center rounded-tr-xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-[13px] text-gray-600 font-medium">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, i) => (
                                    <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${selectedIds.has(user.id) ? 'bg-primary/5' : ''}`}>
                                        <td className="py-5 pl-5">
                                            <input
                                                type="checkbox"
                                                className="accent-primary w-4 h-4 cursor-pointer rounded border-gray-300"
                                                checked={selectedIds.has(user.id)}
                                                onChange={() => toggleSelectUser(user.id)}
                                            />
                                        </td>
                                        <td className="py-4 px-3 opacity-80">{user.slNo}</td>
                                        <td className="py-4 px-3 opacity-80">{user.id}</td>
                                        <td className="py-4 px-3 opacity-90">{user.name}</td>
                                        <td className="py-4 px-3 opacity-80">{user.city}</td>
                                        <td className="py-4 px-3 opacity-80">{user.state}</td>
                                        <td className="py-4 px-3 opacity-80">{user.pincode}</td>
                                        <td className="py-4 px-3 opacity-80">{user.mobile}</td>
                                        <td className="py-4 px-3 opacity-80">{user.registered}</td>
                                        <td className="py-4 px-3 text-center">
                                            {user.status === 'Preparing' ? (
                                                <span className="inline-block px-4 py-1.5 rounded-md bg-[#FFF0E6] text-[#FF7A45] font-semibold text-[11px] min-w-[90px]">
                                                    {user.status}
                                                </span>
                                            ) : (
                                                <span className="inline-block px-4 py-1.5 rounded-md bg-[#E6F7FF] text-[#40A9FF] font-semibold text-[11px] min-w-[90px]">
                                                    {user.status}
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

                                            {/* Action Dropdown per row */}
                                            {actionDropRow === i && (
                                                <div className="absolute right-8 top-10 w-32 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-xl py-2 z-50 text-[13px] action-dropdown-content">
                                                    <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium transition-colors">
                                                        <FiEdit2 size={14} /> <span>Edit</span>
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium transition-colors"
                                                        onClick={() => navigate(`/dashboard/user/${user.id}`)}
                                                    >
                                                        <FiEye size={14} /> <span>View</span>
                                                    </button>
                                                    <button
                                                        className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-500 flex items-center space-x-3 text-gray-700 font-medium transition-colors group"
                                                        onClick={() => {
                                                            setUserToDelete(user);
                                                            setShowDeleteModal(true);
                                                            setActionDropRow(null);
                                                        }}
                                                    >
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
                                    <td colSpan="11" className="py-12 text-center">
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

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-[400px] shadow-2xl transform transition-all">
                        <div className="flex flex-col items-center text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 mb-5">
                                <FiTrash2 className="h-8 w-8 text-red-500" />
                            </div>
                            <h3 className="text-[20px] font-bold text-gray-900 mb-2 font-inter tracking-tight">Delete User</h3>
                            <p className="text-sm text-gray-500 mb-8 max-w-[280px]">
                                Are you sure you want to delete <span className="font-semibold text-gray-800">{userToDelete?.name}</span>? This action cannot be undone.
                            </p>

                            <div className="flex w-full space-x-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 px-5 py-2.5 rounded-xl font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteUser}
                                    className="flex-1 px-5 py-2.5 rounded-xl font-medium text-white bg-red-500 hover:bg-red-400 transition-colors shadow-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserList;
