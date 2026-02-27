import React from 'react';
import { useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Topbar = () => {
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    return (
        <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
            {/* Left Greeting */}
            <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                    Hey Ranjith,
                </h1>
                <p className="text-sm font-medium text-gray-500 mt-1">
                    Glad to see you back in Ramesh Admin!
                </p>
            </div>

            {/* Right Search Input - Only visible on Dashboard */}
            {isDashboard && (
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="block w-72 pl-11 pr-4 py-2.5 outline-none bg-[#F3F4F6] border border-transparent rounded-xl text-sm focus:bg-white focus:border-gray-200 focus:ring-2 focus:ring-primary/10 transition-all text-gray-700 placeholder-gray-400 font-medium"
                    />
                </div>
            )}
        </header>
    );
};

export default Topbar;
