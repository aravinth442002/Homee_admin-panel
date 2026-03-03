import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi2';

const Vendor = () => {
    const navigate = useNavigate();

    return (
        <div className="p-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <HiArrowLeft size={24} className="text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">Vendor</h1>
            </div>
            <p className="mt-4 text-gray-600">This is a dummy page for Vendor main content.</p>
        </div>
    );
};

export default Vendor;
