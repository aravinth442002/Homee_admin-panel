import React, { useState, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AddVendor = () => {
    const navigate = useNavigate();

    const aadharRef = useRef(null);
    const fssaiRef = useRef(null);
    const profileRef = useRef(null);

    const [aadharFile, setAadharFile] = useState(null);
    const [fssaiFile, setFssaiFile] = useState(null);
    const [profileFile, setProfileFile] = useState(null);

    return (
        <div className="w-full flex-1 flex flex-col p-2">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="mr-3 text-gray-800 hover:text-primary transition-colors outline-none">
                    <FiArrowLeft size={24} />
                </button>
                <h1 className="text-[22px] font-bold text-gray-800 font-inter tracking-tight">
                    Add Vendor
                </h1>
            </div>

            {/* Main Card */}
            <div className="flex-1 bg-background rounded-2xl min-h-[70vh] shadow-[0_4px_24px_rgba(0,0,0,0.02)] mb-6 flex flex-col overflow-hidden border border-gray-100/50">
                <div className="flex-1 flex flex-col relative overflow-y-auto custom-scrollbar p-6">
                    <form className="space-y-8">
                        {/* Vendor Details */}
                        <div>
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Vendor Details</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Vendor Name <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter vendor name" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">E mail <span className="text-red-500">*</span></label>
                                    <input type="email" placeholder="Enter email address" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Mobile No <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter mobile number" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Commission Percentage <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter commission %" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Cost for Two <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter cost for two" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Delivery Offer <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter delivery offer amount" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col md:col-span-1">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Vendor Type</label>
                                    <select className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full appearance-none cursor-pointer">
                                        <option>Select..</option>
                                        <option>Home made</option>
                                        <option>Restaurant</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="mt-8">
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Address</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Latitude <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter latitude" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Longitude <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter longitude" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Door/Flat No <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter door / flat no" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Apartment Name <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter apartment name" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Block No <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter block no" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Street <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter street name" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Area <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter area" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">City/District <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter city / district" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col md:col-span-1">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Pin Code <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter pin code" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Account Details */}
                        <div className="mt-8">
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Account Details</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">A/c No <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter account number" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">A/c Holder Name <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter account holder name" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Bank <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter bank name" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Branch <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter branch name" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col md:col-span-1">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">IFSC Code <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter IFSC code" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Document Proofs */}
                        <div className="mt-8">
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-gray-900">Document Proofs</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Aadhar Proof <span className="text-red-500">*</span></label>
                                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white mt-1">
                                        <span className="flex-1 py-2 px-3 text-[15px] text-gray-400 bg-transparent border-none truncate">
                                            {aadharFile ? aadharFile.name : 'No file Chosen'}
                                        </span>
                                        <input type="file" ref={aadharRef} onChange={(e) => setAadharFile(e.target.files[0])} className="hidden" />
                                        <button type="button" onClick={() => aadharRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 text-[15px] font-medium border-l border-gray-300 hover:bg-gray-200 transition-colors">Browse</button>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Fssai Certificate <span className="text-red-500">*</span></label>
                                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white mt-1">
                                        <span className="flex-1 py-2 px-3 text-[15px] text-gray-400 bg-transparent border-none truncate">
                                            {fssaiFile ? fssaiFile.name : 'No file Chosen'}
                                        </span>
                                        <input type="file" ref={fssaiRef} onChange={(e) => setFssaiFile(e.target.files[0])} className="hidden" />
                                        <button type="button" onClick={() => fssaiRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 text-[15px] font-medium border-l border-gray-300 hover:bg-gray-200 transition-colors">Browse</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile Picture */}
                        <div className="mt-8">
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-gray-900">Profile Picture</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Profile Picture <span className="text-red-500">*</span></label>
                                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white mt-1">
                                        <span className="flex-1 py-2 px-3 text-[15px] text-gray-400 bg-transparent border-none truncate">
                                            {profileFile ? profileFile.name : 'No file Chosen'}
                                        </span>
                                        <input type="file" ref={profileRef} onChange={(e) => setProfileFile(e.target.files[0])} className="hidden" accept="image/*" />
                                        <button type="button" onClick={() => profileRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 text-[15px] font-medium border-l border-gray-300 hover:bg-gray-200 transition-colors">Browse</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-6 flex justify-end">
                            <button type="submit" className="bg-secondary text-white px-8 py-2.5 rounded-lg text-[15px] font-semibold hover:bg-primary transition-all duration-300 shadow-sm">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddVendor;
