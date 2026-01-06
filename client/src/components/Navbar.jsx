import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Hammer, User, Search, Globe, LayoutDashboard, ChevronDown, LogIn } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    const toggleLang = () => {
        setLanguage(language === 'hi' ? 'en' : 'hi');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-brand-orange p-2 rounded-lg text-white">
                            <Hammer size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-brand-dark leading-tight">Ek Digital</h1>
                            <span className="text-xs text-brand-orange font-semibold tracking-wider">LABOUR CHOWK</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="font-medium text-gray-600 hover:text-brand-orange">
                            {t('home')}
                        </Link>
                        <Link to="/about" className="font-medium text-gray-600 hover:text-brand-orange">
                            {t('about')}
                        </Link>

                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1 text-sm font-medium hover:bg-gray-50"
                        >
                            <Globe size={16} />
                            {language === 'hi' ? 'English' : 'हिंदी'}
                        </button>

                        {/* Login Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLoginOpen(!isLoginOpen)}
                                className="flex items-center gap-1 font-medium text-gray-600 hover:text-brand-orange"
                            >
                                <LogIn size={18} />
                                {t('login')}
                                <ChevronDown size={14} />
                            </button>

                            {isLoginOpen && (
                                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-fade-in-down">
                                    <Link
                                        to="/employer-login"
                                        onClick={() => setIsLoginOpen(false)}
                                        className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                                    >
                                        {t('loginEmployer')}
                                    </Link>
                                    <Link
                                        to="/worker-login"
                                        onClick={() => setIsLoginOpen(false)}
                                        className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                                    >
                                        {t('loginWorker')}
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link to="/register-worker" className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
                            <User size={18} />
                            {t('registerWorker')}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-600 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col gap-4 mt-4">
                            <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-gray-600 border-b border-gray-100">{t('home')}</Link>

                            <div className="py-2 border-b border-gray-100">
                                <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">{t('login')}</p>
                                <Link to="/employer-login" onClick={() => setIsOpen(false)} className="block py-1 text-brand-dark font-medium">{t('loginEmployer')}</Link>
                                <Link to="/worker-login" onClick={() => setIsOpen(false)} className="block py-1 text-brand-dark font-medium">{t('loginWorker')}</Link>
                            </div>

                            <button
                                onClick={() => { toggleLang(); setIsOpen(false); }}
                                className="flex items-center gap-2 py-2 text-gray-600 border-b border-gray-100"
                            >
                                <Globe size={20} />
                                Switch to {language === 'hi' ? 'English' : 'हिंदी'}
                            </button>

                            <Link to="/register-worker" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center justify-center">
                                {t('registerWorker')}
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
