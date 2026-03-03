import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = () => {
    return (
        <div className="flex h-screen bg-[#F4F7FB] overflow-hidden font-inter">
            {/* Dark Sidebar Layer */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                <Topbar />

                {/* Interactive Nested Route Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F4F7FB] p-4 pt-2">
                    {/* The nested dashboard routes (like Dashboard, Vendor, etc.) render here */}
                    <Outlet />
                </main>

                {/* Bottom Footer Band */}
                <div className="absolute bottom-0 w-full bg-[#18231C] py-1.5 flex justify-center items-center shrink-0 z-50">
                    <p className="text-[10px] text-white font-medium uppercase tracking-widest opacity-90 text-center">
                        HOMEE PLATFORM © 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Layout;
