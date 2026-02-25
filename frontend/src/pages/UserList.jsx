import React, { useState } from 'react';
import { FiArrowLeft, FiSearch, FiCalendar, FiFilter, FiDownload, FiEdit2, FiEye, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const UserList = () => {
    const navigate = useNavigate();
    const [actionDropRow, setActionDropRow] = useState(null);
    const [filterDropOpen, setFilterDropOpen] = useState(false);

    const users = Array.from({ length: 13 }).map((_, i) => ({
        id: `HFU0000000${i + 1}`,
        slNo: (i + 1).toString().padStart(2, '0'),
        name: 'Ranjith',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600001',
        mobile: '9991701414',
        registered: '24/10/04',
        status: i % 2 !== 0 ? 'Preparing' : 'On Delivery',
    }));

    return (
        <div className="w-full flex-1 flex flex-col">
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
            <div className="flex-1 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col border border-gray-100/50 mb-6">
                {/* Toolbox */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                    <div className="flex items-center space-x-4">
                        {/* Search */}
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 text-gray-600"
                            />
                        </div>

                        {/* From Date */}
                        <div className="relative border border-gray-200 rounded-lg flex items-center px-3 py-2 text-gray-500 hover:border-gray-300 transition-colors">
                            <FiCalendar className="mr-2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="From Date DD-MM-YYYY"
                                className="text-sm outline-none text-gray-600 w-36 bg-transparent placeholder-gray-400"
                            />
                            {/* Visual floating label like image */}
                            <span className="absolute -top-2.5 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">From Date</span>
                        </div>

                        {/* To Date */}
                        <div className="relative border border-gray-200 rounded-lg flex items-center px-3 py-2 text-gray-500 hover:border-gray-300 transition-colors">
                            <FiCalendar className="mr-2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="To Date DD-MM-YYYY"
                                className="text-sm outline-none text-gray-600 w-36 bg-transparent placeholder-gray-400"
                            />
                            {/* Visual floating label */}
                            <span className="absolute -top-2.5 left-2 bg-white px-1 text-[10px] text-gray-500 font-medium">To Date</span>
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
                            <tr className="bg-[#2E4A35] text-white text-[13px] font-medium tracking-wide">
                                <th className="py-4 pl-5 w-12 rounded-tl-xl"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer align-middle" /></th>
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
                            {users.map((user, i) => (
                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                    <td className="py-5 pl-5"><input type="checkbox" className="accent-primary w-4 h-4 cursor-pointer rounded border-gray-300" /></td>
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
                                            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                                        >
                                            <FiMoreHorizontal size={18} />
                                        </button>

                                        {/* Action Dropdown per row */}
                                        {actionDropRow === i && (
                                            <div className="absolute right-8 top-10 w-32 bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-xl py-2 z-50 text-[13px]">
                                                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium transition-colors">
                                                    <FiEdit2 size={14} /> <span>Edit</span>
                                                </button>
                                                <button
                                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 text-gray-700 font-medium transition-colors"
                                                    onClick={() => navigate(`/dashboard/user/${user.id}`)}
                                                >
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
                        <button className="px-3.5 py-1.5 bg-[#39B54A] text-white rounded-md shadow-sm transition-all">1</button>
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

export default UserList;
