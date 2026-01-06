import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const StickyCTA = () => {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling down 100px
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Only show on mobile (md:hidden) and when scrolled
    return (
        <div className={`fixed bottom-0 left-0 w-full z-40 md:hidden bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
            <Link to="/register-worker" className="flex-1 py-4 flex flex-col items-center justify-center text-brand-dark hover:bg-gray-50 active:bg-gray-100 border-r border-gray-100">
                <UserPlus size={20} className="mb-1 text-gray-500" />
                <span className="text-xs font-bold">{t('stickyRegister')}</span>
            </Link>
            <Link to="/dashboard" className="flex-1 py-4 flex flex-col items-center justify-center bg-brand-orange text-white hover:bg-orange-700 active:bg-orange-800">
                <Search size={20} className="mb-1" />
                <span className="text-xs font-bold">{t('stickyHire')}</span>
            </Link>
        </div>
    );
};

export default StickyCTA;
