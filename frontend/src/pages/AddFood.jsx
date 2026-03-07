import React, { useState, useRef } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

const AddFood = () => {
    const navigate = useNavigate();
    const { id: vendorId } = useParams();

    const foodImageRef = useRef(null);
    const [foodImage, setFoodImage] = useState(null);

    return (
        <div className="w-full flex-1 flex flex-col p-2">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={() => navigate(`/dashboard/vendor/${vendorId}`, { state: { activeTab: 'Food List' } })} className="mr-3 text-gray-800 hover:text-primary transition-colors outline-none">
                    <FiArrowLeft size={24} />
                </button>
                <h1 className="text-[22px] font-bold text-gray-800 font-inter tracking-tight">
                    Add Food Item
                </h1>
            </div>

            {/* Main Card */}
            <div className="flex-1 bg-background rounded-2xl min-h-[70vh] shadow-[0_4px_24px_rgba(0,0,0,0.02)] mb-6 flex flex-col overflow-hidden border border-gray-100/50">
                <div className="flex-1 flex flex-col relative overflow-y-auto custom-scrollbar p-6">
                    <form className="space-y-8">
                        {/* Cook Details */}
                        <div>
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Cook Details</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Vendor Id <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter vendor ID" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Vendor Name <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter vendor name" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Food Name (Multi-language) */}
                        <div>
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Food Name (Multi-language)</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">English <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter food name in English" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Tamil <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="உணவு பெயரை தமிழில் உள்ளிடுக" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Hindi</label>
                                    <input type="text" placeholder="हिंदी में भोजन का नाम दर्ज करें" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Telungu</label>
                                    <input type="text" placeholder="తెలుగులో ఆహార పేరును నమోదు చేయండి" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Malayalam</label>
                                    <input type="text" placeholder="ഭക്ഷണത്തിന്റെ പേര് മലയാളത്തിൽ നൽകുക" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Kannadam</label>
                                    <input type="text" placeholder="ಆಹಾರದ ಹೆಸರನ್ನು ಕನ್ನಡದಲ್ಲಿ ನಮೂದಿಸಿ" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Food Settings */}
                        <div>
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Food Settings</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Cuisine Type <span className="text-red-500">*</span></label>
                                    <select className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full appearance-none cursor-pointer">
                                        <option>Select Cuisine..</option>
                                        <option>South-Indian</option>
                                        <option>North-Indian</option>
                                        <option>Chinese</option>
                                        <option>Italian</option>
                                    </select>
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Food Type <span className="text-red-500">*</span></label>
                                    <select className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full appearance-none cursor-pointer">
                                        <option>Select Food Type..</option>
                                        <option>Pure-veg</option>
                                        <option>Non-veg</option>
                                    </select>
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Categories <span className="text-red-500">*</span></label>
                                    <select className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full appearance-none cursor-pointer">
                                        <option>Select Category..</option>
                                        <option>Main-Course</option>
                                        <option>Starter</option>
                                        <option>Dessert</option>
                                        <option>Beverage</option>
                                    </select>
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Order Type <span className="text-red-500">*</span></label>
                                    <select className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full appearance-none cursor-pointer">
                                        <option>Select Order Type..</option>
                                        <option>Instant</option>
                                        <option>Pre-order</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Timings & Price */}
                        <div>
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Timings & Price</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Food Timing (Quantity) <span className="text-red-500">*</span></label>
                                    <input type="number" placeholder="Enter quantity" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Food Timing (Schedule) <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="e.g. Lunch : 12:00:00 - 15:00:00" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Final Amount(₹) <span className="text-red-500">*</span></label>
                                    <input type="number" placeholder="Enter price" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Preparation Time (Mins) <span className="text-red-500">*</span></label>
                                    <input type="number" placeholder="Enter preparation time" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Media & Others */}
                        <div>
                            <div className="bg-primary-light px-4 py-3 rounded-lg flex items-center mb-6">
                                <h3 className="text-[17px] font-bold text-secondary">Media & Others</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                <div className="flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Food Image <span className="text-red-500">*</span></label>
                                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white mt-1">
                                        <span className="flex-1 py-2 px-3 text-[15px] text-gray-400 bg-transparent border-none truncate">
                                            {foodImage ? foodImage.name : 'No file Chosen'}
                                        </span>
                                        <input type="file" ref={foodImageRef} onChange={(e) => setFoodImage(e.target.files[0])} className="hidden" accept="image/*" />
                                        <button type="button" onClick={() => foodImageRef.current?.click()} className="bg-gray-100 text-gray-700 px-4 py-2 text-[15px] font-medium border-l border-gray-300 hover:bg-gray-200 transition-colors">Browse</button>
                                    </div>
                                </div>
                                <div className="border-b border-gray-200 pb-2 flex flex-col">
                                    <label className="text-[16px] font-bold text-gray-900 mb-1.5">Availability Days <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="e.g. Monday, Tuesday, ..." className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400" />
                                </div>
                            </div>
                            <div className="mt-6 border-b border-gray-200 pb-2 flex flex-col">
                                <label className="text-[16px] font-bold text-gray-900 mb-1.5">Description</label>
                                <textarea placeholder="Enter your ...." rows="3" className="text-[15px] font-medium text-gray-800 bg-transparent outline-none w-full placeholder-gray-400 resize-none"></textarea>
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

export default AddFood;
