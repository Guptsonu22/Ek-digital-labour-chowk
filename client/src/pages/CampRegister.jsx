import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, MapPin, Phone, Briefcase, CheckCircle, Save } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CampRegister = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        skill: '',
        location: '',
        dailyWage: ''
    });
    const [recentReg, setRecentReg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const skills = ['Mistri', 'Plumber', 'Electrician', 'Painter', 'Carpenter', 'Labour', 'Driver', 'Maid', 'Other'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMsg('');

        try {
            // Using existing register endpoint. In real app, might separate "camp" source.
            const res = await axios.post('http://localhost:5000/api/workers/register', {
                ...formData,
                experience: '0', // Default
                isAvailable: true
            });

            if (res.data.success) {
                setMsg(`✅ Registered: ${formData.name}`);
                setRecentReg([formData, ...recentReg]);
                setFormData({
                    name: '',
                    mobile: '',
                    skill: '',
                    location: '',
                    dailyWage: ''
                });
            }
        } catch (err) {
            setMsg('❌ Registration Failed: Mobile might be duplicate');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-brand-dark text-white p-6 rounded-xl shadow-lg mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <span className="bg-white text-brand-dark px-2 rounded">OFFLINE</span>
                            Camp Mode
                        </h1>
                        <p className="text-gray-300 text-sm">Rapid Bulk Registration for Volunteers</p>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-4xl font-bold text-brand-orange">{recentReg.length}</p>
                        <p className="text-xs uppercase tracking-wider">Registered this Session</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Form */}
                    <div className="bg-white p-6 rounded-xl shadow-md h-fit">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <UserPlus className="text-brand-orange" />
                            New Worker Entry
                        </h2>

                        {msg && (
                            <div className={`p-3 rounded-lg mb-4 font-bold text-center ${msg.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                                <input name="name" value={formData.name} onChange={handleChange} required className="input-field" placeholder="Ram Kumar" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mobile Number</label>
                                <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                                    <span className="pl-3 text-gray-500 font-bold">+91</span>
                                    <input name="mobile" value={formData.mobile} onChange={handleChange} required maxLength="10" className="w-full p-3 bg-transparent outline-none" placeholder="9876543210" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Skill</label>
                                    <select name="skill" value={formData.skill} onChange={handleChange} required className="input-field bg-white">
                                        <option value="">Select...</option>
                                        {skills.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                                    <input name="location" value={formData.location} onChange={handleChange} required className="input-field" placeholder="Patna, Bihar" />
                                </div>
                            </div>

                            <button disabled={loading} className="w-full bg-brand-dark text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors flex justify-center items-center gap-2">
                                {loading ? 'Saving...' : <><Save size={20} /> Register & Next</>}
                            </button>
                        </form>
                    </div>

                    {/* Recent List */}
                    <div className="bg-white p-6 rounded-xl shadow-md h-fit">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <CheckCircle className="text-green-600" />
                            Recent Registrations
                        </h2>

                        {recentReg.length === 0 ? (
                            <p className="text-gray-400 italic text-center py-10">No workers registered in this session yet.</p>
                        ) : (
                            <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                {recentReg.map((w, idx) => (
                                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center animate-fade-in">
                                        <div>
                                            <p className="font-bold text-gray-800">{w.name}</p>
                                            <p className="text-xs text-gray-500">{w.skill} • {w.mobile}</p>
                                        </div>
                                        <div className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-bold">Done</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampRegister;
