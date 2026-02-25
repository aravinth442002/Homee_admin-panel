import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('Ranjithramesh@gmail.com');
    const [password, setPassword] = useState('****************');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Assume successful login for now, redirect to dashboard
        console.log("Logging in with", email, password);
        navigate('/dashboard');
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat bg-[#213924] relative overflow-hidden"
        >
            {/* Dark green decorative blobs using CSS instead of an image to guarantee it shows up */}
            <div className="absolute top-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#2d4a31] rounded-full mix-blend-multiply opacity-50 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-[#1a3020] rounded-full mix-blend-multiply opacity-50 blur-3xl pointer-events-none"></div>

            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden relative z-10 min-h-[600px]">

                {/* Left Side - Illustration container */}
                <div className="w-full md:w-1/2 bg-white relative p-8 flex items-center justify-center overflow-hidden">
                    {/* Background grid pattern from the design */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

                    {/* Illustration image - Using a reliable local SVG illustration */}
                    <img
                        src="/login-hero.png"
                        alt="Login Illustration"
                        className="relative z-10 w-full max-w-sm"
                    />
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 md:p-14 flex items-center justify-center bg-white relative">
                    {/* Orange grid pattern overlay (subtle in bottom right of form side like the image) */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20" style={{ backgroundImage: "linear-gradient(#f5a623 2px, transparent 2px), linear-gradient(90deg, #f5a623 2px, transparent 2px)", backgroundSize: "16px 16px" }}></div>

                    <div className="w-full max-w-md relative z-10">
                        <h2 className="text-3xl font-bold text-primary mb-8 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                            Login to Your Account
                        </h2>

                        <form onSubmit={handleLogin} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-800">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-lg bg-[#f4f7fb] border border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium text-gray-700"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-800">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 rounded-lg bg-[#f4f7fb] border border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm font-medium text-gray-700 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center pt-2">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-gray-300 text-primary accent-primary focus:ring-primary/50 transition-colors cursor-pointer"
                                    />
                                    <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                                        Remember me
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-[#15821c] text-white font-semibold py-3.5 rounded-lg shadow-[0_8px_20px_-6px_rgba(26,156,36,0.6)] transition-all hover:-translate-y-0.5"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
