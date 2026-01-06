import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Smartphone, Lock, User } from 'lucide-react';

const EmployerLogin = () => {
    const [step, setStep] = useState(1); // 1: Mobile, 2: OTP
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [demoOtp, setDemoOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/send-otp', { mobile });
            if (res.data.success) {
                // DEMO ONLY: Show OTP to user
                if (res.data.otp) {
                    setDemoOtp(res.data.otp);
                }
                setStep(2);
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // For MVP, we're assuming the user is an employer.
            // In a real app, we'd check if they are registered as employer.
            // But per requirements, "First time -> Employer Signup", so we might need a name input if not exists.
            // Standardizing flows: verify OTP first.
            const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { mobile, otp, type: 'employer' });

            if (res.data.success) {
                // Check if we need to register (name) or just login
                // For MVP simplicity, if isNewUser is true, we might ask for name, 
                // but let's just log them in and default name to "Employer".
                // OR we can make a split 3rd step for Name if needed. 

                // Let's autopopulate a dummy employer profile if not explicitly registering

                const userData = {
                    token: res.data.token,
                    mobile: mobile,
                    type: 'employer',
                    id: mobile // Using mobile as ID for MVP simplicity
                };

                login(userData);
                navigate('/employer-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-brand-orange bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="text-brand-orange" size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-dark">Employer Login</h2>
                    <p className="text-gray-500 text-sm">Hire verified workers instantly</p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center text-sm">{error}</div>}

                {/* DEMO OTP DISPLAY */}
                {demoOtp && step === 2 && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-6 text-center shadow-sm animate-pulse">
                        <p className="text-sm font-semibold mb-1">🔔 DEMO MODE OTP</p>
                        <p className="text-3xl font-bold tracking-widest text-brand-dark">{demoOtp}</p>
                        <p className="text-xs mt-1 text-yellow-600">Use this code to verify</p>
                    </div>
                )}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div className="relative">
                            <Smartphone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="tel"
                                placeholder="Mobile Number"
                                className="input-field pl-10"
                                value={mobile}
                                onChange={e => setMobile(e.target.value)}
                                required
                                maxLength="10"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full">
                            {loading ? 'Sending OTP...' : 'Get OTP'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="mb-4 text-center">
                            <p className="text-sm text-gray-600">OTP sent to +91 {mobile}</p>
                            <button type="button" onClick={() => setStep(1)} className="text-brand-orange text-xs underline">Change Number</button>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Enter 4-digit OTP"
                                className="input-field pl-10"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                                required
                                maxLength="4"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full">
                            {loading ? 'Verifying...' : 'Login'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default EmployerLogin;
