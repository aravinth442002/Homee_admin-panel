import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
    FiGrid, FiMap, FiCoffee, FiPrinter, FiCheckSquare,
    FiSettings, FiChevronsLeft, FiChevronsRight, FiChevronDown
} from 'react-icons/fi';
import { HiMiniUserGroup } from 'react-icons/hi2';
import { PiCubeFocusBold } from 'react-icons/pi';
import { TbTruckDelivery } from "react-icons/tb";
import { LuCookingPot } from 'react-icons/lu';
import { BiBookBookmark } from 'react-icons/bi';

const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
    { name: 'User', path: '/dashboard/user', icon: HiMiniUserGroup },
    { name: 'Map View', path: '/dashboard/map', icon: FiMap },
    {
        name: 'Vendor', path: '/dashboard/vendor', icon: PiCubeFocusBold, hasSub: true, subItems: [
            { name: 'Vendor Request', path: '/dashboard/vendor/request', icon: LuCookingPot },
            { name: 'Vendor List', path: '/dashboard/vendor/list', icon: BiBookBookmark }
        ]
    },
    { name: 'Delivery', path: '/dashboard/delivery', icon: TbTruckDelivery, hasSub: true },
    { name: 'Shipping & Kilo...', path: '/dashboard/shipping', icon: FiPrinter, hasSub: true },
    { name: 'Admin', path: '/dashboard/admin', icon: FiCheckSquare, hasSub: true },
    { name: 'Profile Settings', path: '/dashboard/settings', icon: FiSettings },
];

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState({});
    const location = useLocation();

    return (
        <aside className={`${isCollapsed ? 'w-24' : 'w-72'} h-screen bg-[#1F2C23] flex flex-col text-[#C4CFC8] border-r border-[#152018] shrink-0 sticky top-0 font-inter transition-all duration-300`}>
            {/* Logo Section */}
            <div className={`h-32 flex items-center justify-center shrink-0 w-full pt-4 pb-2 transition-all duration-300 ${isCollapsed ? '' : 'space-x-4'}`}>
                {!isCollapsed && (
                    <div className="bg-background p-3 rounded-2xl w-36 h-24 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100 shrink-0">
                        <img
                            src="/logo.png"
                            alt="Homee Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}

                {/* Collapse Button - Octagon */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`bg-[#324538] flex items-center justify-center text-[#93A59A] hover:text-white transition-all shadow-md shrink-0 ${isCollapsed ? 'w-10 h-10' : 'w-10 h-10'}`}
                    style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
                >
                    {isCollapsed ? <FiChevronsRight size={20} /> : <FiChevronsLeft size={18} />}
                </button>
            </div>

            {/* Navigation Elements */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar px-3 pb-2 space-y-2 mt-4">
                {navItems.map((item, idx) => {
                    // Check if current route matches item path exactly, or is a sub-route
                    const isActive = item.path === '/dashboard'
                        ? location.pathname === item.path
                        : location.pathname.startsWith(item.path);

                    const isExpanded = expandedMenus[item.name] !== undefined
                        ? expandedMenus[item.name]
                        : isActive;

                    const handleMenuClick = (e) => {
                        if (item.subItems) {
                            if (item.path === '#') {
                                e.preventDefault();
                            }
                            setExpandedMenus(prev => ({ ...prev, [item.name]: !isExpanded }));
                        }
                    };

                    return (
                        <div key={idx} className="flex flex-col">
                            <Link
                                to={item.path}
                                onClick={handleMenuClick}
                                className={`w-full flex items-center px-4 py-2.5 rounded-lg group transition-all duration-200
                                    ${isActive ? 'bg-primary text-tertiary font-medium shadow-sm' : 'hover:bg-secondary hover:text-primary-hover'}
                                    ${isCollapsed ? 'justify-center' : 'justify-between'}`}
                                title={isCollapsed ? item.name : ""}
                            >
                                <div className={`flex items-center ${isCollapsed ? 'justify-center space-x-0' : 'space-x-4'}`}>
                                    <item.icon size={20} className={isActive ? 'text-white' : 'text-[#8EA295] group-hover:text-tertiary'} />
                                    {!isCollapsed && <span className="text-sm truncate w-36 text-left transition-all duration-200">{item.name}</span>}
                                </div>
                                {!isCollapsed && item.hasSub && (
                                    <FiChevronDown size={16} className={`transition-transform duration-200 ${isActive ? 'text-white' : 'text-[#63756A] group-hover:text-[#8EA295]'} ${isExpanded ? 'rotate-180' : ''}`} />
                                )}
                            </Link>

                            {/* Submenu Items */}
                            {!isCollapsed && item.subItems && isExpanded && (
                                <div className="flex flex-col mt-1 space-y-2 bg-[#1A251D] rounded-lg py-2 px-1">
                                    {item.subItems.map((sub, i) => {
                                        const isVendorDetail = location.pathname.startsWith('/dashboard/vendor/') && !['/dashboard/vendor/request', '/dashboard/vendor/list', '/dashboard/vendor/add'].includes(location.pathname);
                                        const isSubActive = location.pathname === sub.path || location.pathname.startsWith(sub.path + '/') || (sub.name === 'Vendor List' && (location.pathname.includes('/vendor/add') || isVendorDetail));
                                        return (
                                            <Link
                                                key={i}
                                                to={sub.path}
                                                className={`flex items-center px-4 py-2 text-sm transition-all duration-200 rounded-md
                                                    ${isSubActive ? 'text-primary font-medium' : 'text-white hover:text-primary'}`}
                                            >
                                                <div className="w-8 flex justify-center mr-3">
                                                    <sub.icon size={20} className={isSubActive ? 'text-white' : 'text-white'} />
                                                </div>
                                                <span>{sub.name}</span>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer Bottom Brand Info */}
            {!isCollapsed && (
                <div className="px-6 py-5 shrink-0 transition-opacity duration-300">
                    <h4 className="text-white text-xs font-bold mb-1 tracking-wide">Brand Restaurant Admin</h4>
                    <p className="text-[10px] text-[#73887B] mb-3">2023 All Rights Reserved</p>
                    <p className="text-[9px] text-[#55695C] mt-2">Made with <span className="text-red-500">❤️</span> by Keera</p>
                </div>
            )}

            {isCollapsed && (
                <div className="py-5 shrink-0 flex justify-center w-full transition-opacity duration-300">
                    <p className="text-[9px] text-[#55695C]">❤️</p>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
