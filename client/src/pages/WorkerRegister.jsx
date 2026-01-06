import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Smartphone, MapPin, Briefcase, CheckCircle, Lock, Mic } from 'lucide-react';

const WorkerRegister = () => {
    const { login } = useAuth();
    const [step, setStep] = useState(1); // 1: Mobile, 2: OTP, 3: Details, 4: Success
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        skill: 'Labour',
        location: '',
        experience: '',
        dailyWage: ''
    });
    const [otp, setOtp] = useState('');
    const [demoOtp, setDemoOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const skills = ['Mistri', 'Plumber', 'Electrician', 'Painter', 'Carpenter', 'Labour', 'Driver', 'Maid', 'Other'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/send-otp', { mobile: formData.mobile });
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
            const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { mobile: formData.mobile, otp, type: 'worker' });
            if (res.data.success) {
                setStep(3); // Go to details form
            }
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitDetails = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/workers/register', formData);
            if (res.data.success) {
                // Auto-login after registration
                const newUser = {
                    ...res.data.worker,
                    token: 'dummy-token-registered', // In real app, backend should return token on register too
                    type: 'worker',
                    id: res.data.worker._id // Ensure this matches backend response
                };
                login(newUser);
            }
            setStep(4); // Success
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    if (step === 4) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-2xl font-bold text-brand-dark mb-2">Registration Successful!</h2>
                    <p className="text-gray-600 mb-6">Profile created. You are now visible to Employers.</p>
                    <div className="space-y-3">
                        <button onClick={() => window.location.href = '/worker-dashboard'} className="btn-primary w-full">
                            Go to Dashboard
                        </button>
                        <button onClick={() => {
                            setStep(1);
                            setFormData({ name: '', mobile: '', skill: 'Labour', location: '', experience: '', dailyWage: '' });
                        }} className="w-full text-brand-dark font-medium py-3">Register Another</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-12 px-4 bg-brand-light min-h-[80vh]">
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-center mb-1 text-brand-dark">Worker Registration</h2>
                <p className="text-center text-gray-500 mb-8 text-sm">
                    {step === 1 && "Create your digital profile"}
                    {step === 2 && "Verify your number"}
                    {step === 3 && "Fill your details"}
                </p>

                {/* Missed Call Banner */}
                {step === 1 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6 text-center animate-pulse">
                        <p className="text-xs font-bold text-orange-800 uppercase tracking-wide mb-1">Easy Registration</p>
                        <p className="text-sm text-gray-700">Give a <span className="font-bold">Missed Call</span> to register:</p>
                        <a href="tel:1800-123-4567" className="block text-xl font-bold text-brand-orange mt-1">1800-123-4567</a>
                    </div>
                )}

                {/* DEMO OTP DISPLAY */}
                {step === 2 && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg mb-6 text-center shadow-sm animate-pulse">
                        <p className="text-sm font-semibold mb-1">🔔 DEMO MODE OTP</p>
                        <p className="text-3xl font-bold tracking-widest text-brand-dark">{demoOtp || '....'}</p>
                        <p className="text-xs mt-1 text-yellow-600">Use this code to verify</p>
                    </div>
                )}

                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center text-sm">{error}</div>}

                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div className="relative">
                            <Smartphone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="tel"
                                name="mobile"
                                placeholder="Mobile Number"
                                value={formData.mobile}
                                onChange={handleChange}
                                className="input-field pl-10"
                                maxLength="10"
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full">
                            {loading ? 'Sending OTP...' : 'Get OTP'}
                        </button>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="mb-2 text-center text-sm text-gray-600">
                            Code sent to +91 {formData.mobile}
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Enter 4-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="input-field pl-10"
                                maxLength="4"
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full">
                            {loading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                    </form>
                )}

                {step === 3 && (
                    <form onSubmit={handleSubmitDetails} className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name (Naam)"
                                value={formData.name}
                                onChange={handleChange}
                                className="input-field pl-10 pr-10"
                                required
                            />
                            <div className="absolute right-3 top-3.5 text-gray-400 cursor-pointer hover:text-brand-orange">
                                <Mic size={18} />
                            </div>
                        </div>

                        <div className="relative">
                            <Briefcase className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <select
                                name="skill"
                                value={formData.skill}
                                onChange={handleChange}
                                className="input-field pl-10 appearance-none bg-white"
                            >
                                {skills.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="relative">
                            <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location (City/Area)"
                                value={formData.location}
                                onChange={handleChange}
                                className="input-field pl-10 pr-10"
                                required
                            />
                            <div className="absolute right-3 top-3.5 text-gray-400 cursor-pointer hover:text-brand-orange">
                                <Mic size={18} />
                            </div>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                name="experience"
                                placeholder="Experience (e.g. 5 years)"
                                value={formData.experience}
                                onChange={handleChange}
                                className="input-field pr-10"
                            />
                            <div className="absolute right-3 top-3.5 text-gray-400 cursor-pointer hover:text-brand-orange">
                                <Mic size={18} />
                            </div>
                        </div>

                        <div className="relative">
                            <span className="absolute left-3 top-3.5 text-gray-500 font-bold">₹</span>
                            <input
                                type="number"
                                name="dailyWage"
                                placeholder="Expected Daily Wage (e.g. 500)"
                                value={formData.dailyWage}
                                onChange={handleChange}
                                className="input-field pl-8"
                            />
                        </div>

                        {/* Gov ID Stub */}
                        <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                            <p className="text-sm text-gray-500">Upload Aadhaar / Govt ID (Optional)</p>
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
                            {loading ? 'Registering...' : 'Complete Registration'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default WorkerRegister;
