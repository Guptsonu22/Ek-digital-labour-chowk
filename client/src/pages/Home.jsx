import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, UserPlus, ShieldCheck, CheckCircle, Briefcase, Users, Warehouse, ArrowRight, Activity, Zap, Star, MapPin, Phone, Lock, Facebook, Twitter, Instagram, Mail, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleCategoryClick = (skill) => {
        navigate(`/dashboard?skill=${skill}`);
    };

    const categories = [
        { name: 'Mason (Mistri)', skill: 'Mistri', icon: <Warehouse size={24} className="text-orange-500" /> },
        { name: 'Plumber', skill: 'Plumber', icon: <Activity size={24} className="text-blue-500" /> },
        { name: 'Electrician', skill: 'Electrician', icon: <Zap size={24} className="text-yellow-500" /> },
        { name: 'Painter', skill: 'Painter', icon: <Briefcase size={24} className="text-green-500" /> },
        { name: 'Carpenter', skill: 'Carpenter', icon: <Users size={24} className="text-amber-700" /> },
        { name: 'Driver', skill: 'Driver', icon: <Users size={24} className="text-gray-600" /> }
    ];

    return (
        <div className="min-h-screen bg-brand-light pb-20 md:pb-0">
            {/* Hero Section */}
            <section className="bg-brand-dark text-white py-20 px-4 rounded-b-[3rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
                    <svg width="400" height="400" viewBox="0 0 200 200">
                        <path fill="#EA580C" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.9,34.8C59.6,46.5,48.3,56.2,35.6,62.5C22.9,68.8,8.8,71.7,-4.3,79.1C-17.4,86.5,-29.4,98.4,-39.8,94.9C-50.2,91.4,-59,72.5,-66,57.7C-73,42.9,-78.2,32.2,-79.8,21C-81.4,9.8,-79.4,-1.9,-75.4,-12.3C-71.4,-22.7,-65.4,-31.8,-57.2,-39.7C-49,-47.6,-38.6,-54.3,-27.6,-60.8C-16.6,-67.3,-5,-73.6,5.8,-83.6L16.6,-93.6" transform="translate(100 100)" />
                    </svg>
                </div>

                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-sm font-medium mb-6 border border-white/20">
                        🇮🇳 India's First Digital Labour Chowk
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        {t('heroTitle')}
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                        {t('heroSubtitle')}
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
                        <Link to="/dashboard" className="btn-primary w-full md:w-auto px-8 py-4 text-lg shadow-orange-500/20 shadow-xl border-b-4 border-orange-700 active:border-b-0 active:translate-y-1">
                            <Search size={22} />
                            {t('hireWorker')}
                        </Link>
                        <Link to="/register-worker" className="btn-secondary bg-transparent border-white text-white hover:bg-white/10 w-full md:w-auto px-8 py-4 text-lg">
                            <UserPlus size={22} />
                            {t('registerWorker')}
                        </Link>
                    </div>

                    {/* Search Preview (Dummy) */}
                    <div className="max-w-xl mx-auto bg-white rounded-xl p-2 flex items-center gap-2 shadow-lg animate-fade-in-up md:hidden">
                        <MapPin className="text-gray-400 ml-2" size={20} />
                        <input
                            type="text"
                            placeholder="Find Mistri, Plumber in your area..."
                            className="flex-1 p-2 outline-none text-gray-700 placeholder-gray-400 text-sm"
                            readOnly
                            onClick={() => navigate('/dashboard')}
                        />
                        <button onClick={() => navigate('/dashboard')} className="bg-brand-orange text-white p-2 rounded-lg">
                            <Search size={20} />
                        </button>
                    </div>

                    {/* Trust Badges (Near Hero) */}
                    <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs md:text-sm font-medium text-orange-200 opacity-90">
                        <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                            <ShieldCheck size={16} /> Govt ID Verified
                        </span>
                        <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                            <CheckCircle size={16} /> No Middlemen
                        </span>
                        <span className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                            <Star size={16} /> Transparent Hiring
                        </span>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-12 bg-white -mt-10 relative container mx-auto rounded-xl shadow-lg border border-gray-100 z-20 max-w-5xl px-6 mb-16">
                <h2 className="text-2xl font-bold text-center mb-8">{t('howItWorks')}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-green-100 p-4 rounded-full mb-4 text-green-600">
                            <UserPlus size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">1. Register</h3>
                        <p className="text-gray-500 text-sm">{t('step1')}</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="hidden md:block absolute top-[40%] left-[30%] text-gray-300">
                            <ArrowRight size={24} />
                        </div>
                        <div className="bg-blue-100 p-4 rounded-full mb-4 text-blue-600">
                            <Search size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">2. Search</h3>
                        <p className="text-gray-500 text-sm">{t('step2')}</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="hidden md:block absolute top-[40%] right-[30%] text-gray-300">
                            <ArrowRight size={24} />
                        </div>
                        <div className="bg-brand-orange/20 p-4 rounded-full mb-4 text-brand-orange">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">3. Hire</h3>
                        <p className="text-gray-500 text-sm">{t('step3')}</p>
                    </div>
                </div>
            </section>

            {/* Worker Categories */}
            <section className="py-8 px-4">
                <div className="container mx-auto max-w-6xl">
                    <h2 className="text-3xl font-bold text-center mb-10 text-brand-dark">Worker <span className="text-brand-orange">Categories</span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((cat) => (
                            <div
                                key={cat.skill}
                                onClick={() => handleCategoryClick(cat.skill)}
                                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center cursor-pointer hover:shadow-md hover:border-brand-orange transition-all group"
                            >
                                <div className="mx-auto bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    {cat.icon}
                                </div>
                                <h3 className="font-medium text-gray-700">{cat.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Real Worker Profile Preview */}
            <section className="py-16 px-4 bg-gray-50">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('previewTitle')}</h2>
                        <p className="text-gray-600">See who you are hiring. Verified and Skilled.</p>
                    </div>

                    <div className="max-w-md mx-auto relative">
                        {/* Decorative background blob */}
                        <div className="absolute top-0 -left-4 w-72 h-72 bg-brand-orange opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 opacity-10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>

                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 relative z-10 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500">RK</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-brand-dark">Ram Kumar</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="inline-block bg-orange-100 text-brand-orange text-xs px-2 py-1 rounded-full font-semibold">
                                                Mason (Mistri)
                                            </span>
                                            <span className="flex items-center text-green-600 text-xs font-bold gap-1 bg-green-50 px-2 py-1 rounded-full">
                                                <ShieldCheck size={12} /> Verified
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star size={16} fill="currentColor" />
                                        <span className="text-lg font-bold">4.6</span>
                                    </div>
                                    <span className="text-xs text-gray-400">120 jobs done</span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center text-gray-700 text-sm">
                                    <Briefcase size={16} className="mr-3 text-gray-400" />
                                    <span>15 Years Experience</span>
                                </div>
                                <div className="flex items-center text-gray-700 text-sm">
                                    <MapPin size={16} className="mr-3 text-gray-400" />
                                    <span>Patna, Bihar</span>
                                </div>
                                <div className="flex items-center text-gray-700 text-sm">
                                    <CheckCircle size={16} className="mr-3 text-green-500" />
                                    <span>Aadhaar Verified</span>
                                </div>
                            </div>

                            <button className="w-full bg-brand-dark text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg flex items-center justify-center gap-2">
                                <Phone size={18} />
                                {t('hireNow')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust & Safety */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-bold text-center mb-12 flex justify-center items-center gap-3">
                        <Lock className="text-green-600" /> {t('trustTitle')}
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6 text-center">
                        <div className="p-4">
                            <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <ShieldCheck size={32} />
                            </div>
                            <h3 className="font-bold text-gray-800">{t('trust1')}</h3>
                        </div>
                        <div className="p-4">
                            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                                <Users size={32} />
                            </div>
                            <h3 className="font-bold text-gray-800">{t('trust2')}</h3>
                        </div>
                        <div className="p-4">
                            <div className="mx-auto w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 mb-4">
                                <Search size={32} />
                            </div>
                            <h3 className="font-bold text-gray-800">{t('trust3')}</h3>
                        </div>
                        <div className="p-4">
                            <div className="mx-auto w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 mb-4">
                                <Star size={32} />
                            </div>
                            <h3 className="font-bold text-gray-800">{t('trust4')}</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Numbers */}
            <section className="py-20 bg-brand-dark relative overflow-hidden text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-slate-900"></div>
                {/* Decorative circles */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-brand-orange opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

                <div className="container mx-auto max-w-6xl text-center relative z-10 px-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-16">{t('impact')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transform hover:-translate-y-2 transition-all duration-300 shadow-2xl">
                            <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-orange">
                                <Users size={32} />
                            </div>
                            <div className="text-5xl font-bold text-white mb-2">5,000+</div>
                            <div className="text-xl text-gray-300 font-medium">{t('workersRegistered')}</div>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transform hover:-translate-y-2 transition-all duration-300 shadow-2xl">
                            <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400">
                                <Briefcase size={32} />
                            </div>
                            <div className="text-5xl font-bold text-white mb-2">1,200+</div>
                            <div className="text-xl text-gray-300 font-medium">{t('jobsCreated')}</div>
                        </div>
                        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transform hover:-translate-y-2 transition-all duration-300 shadow-2xl">
                            <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
                                <MapPin size={32} />
                            </div>
                            <div className="text-5xl font-bold text-white mb-2">12+</div>
                            <div className="text-xl text-gray-300 font-medium">{t('citiesCovered')}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-gray-300 py-16 px-4 border-t border-gray-800">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-4 gap-12 mb-12">
                        {/* Brand */}
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6 text-white text-2xl font-bold">
                                <div className="bg-brand-orange p-2 rounded-lg">
                                    <Hammer size={24} className="text-white" />
                                </div>
                                <span>DLC</span>
                            </div>
                            <p className="text-sm leading-relaxed opacity-70 mb-6">
                                Connecting hard-working hands with the right opportunities. Fair, Transparent, and Digital.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors">
                                    <Twitter size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors">
                                    <Facebook size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange hover:text-white transition-colors">
                                    <Instagram size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-bold mb-6">Quick Links</h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link to="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
                                <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
                                <li><Link to="/dashboard" className="hover:text-brand-orange transition-colors">Find Workers</Link></li>
                                <li><Link to="/register-worker" className="hover:text-brand-orange transition-colors">Register as Worker</Link></li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h3 className="text-white font-bold mb-6">Support</h3>
                            <ul className="space-y-3 text-sm">
                                <li><a href="#" className="hover:text-brand-orange transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-brand-orange transition-colors">Safety Guidelines</a></li>
                                <li><a href="#" className="hover:text-brand-orange transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-brand-orange transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="text-white font-bold mb-6">Stay Updated</h3>
                            <p className="text-xs opacity-60 mb-4">Get the latest updates on labour laws and platform features.</p>
                            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10 focus-within:border-brand-orange transition-colors">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-transparent w-full p-2 text-sm outline-none text-white placeholder-gray-500"
                                />
                                <button className="bg-brand-orange text-white p-2 rounded-md hover:bg-orange-600 transition-colors">
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs opacity-40">&copy; 2026 Ek Digital Labour Chowk. All rights reserved.</p>
                        <p className="text-xs opacity-60 flex items-center gap-1">
                            Built with <Heart size={12} className="text-red-500 fill-red-500" /> for India's Workforce
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

function Hammer({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" /><path d="M17.64 15 22 10.64" /><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7.86c0-.55-.45-1-1-1H16.4c-.84 0-1.65-.33-2.25-.93L12.9 4.67" /><path d="M16 8 8 16" /></svg>
    )
}

export default Home;
