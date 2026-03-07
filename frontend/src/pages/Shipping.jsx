import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex-1 flex flex-col p-2">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3 text-gray-800 hover:text-primary transition-colors">
                    <FiArrowLeft size={24} />
                </button>
                <h1 className="text-[22px] font-bold text-gray-800 font-inter tracking-tight">
                    Shipping
                </h1>
            </div>

            {/* Main Card */}
            <div className="flex-1 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col border border-gray-100/50 mb-6 overflow-hidden items-center justify-center">
                <div className="text-gray-400 font-medium text-lg">Shipping content coming soon...</div>
            </div>
        </div>
    );
};

export default Shipping;
