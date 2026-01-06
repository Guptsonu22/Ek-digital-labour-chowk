import React from 'react';
import { Hammer, Heart, Shield, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-brand-dark text-white py-20 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('aboutHeroTitle')}</h1>
                    <p className="text-xl md:text-2xl text-gray-300">
                        {t('aboutHeroSubtitle')}
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="md:w-1/2">
                            <div className="bg-orange-50 p-8 rounded-2xl border border-orange-100">
                                <h2 className="text-3xl font-bold text-brand-dark mb-4">{t('ourMission')}</h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {t('missionDesc1')}
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    {t('missionDesc2')}
                                </p>
                            </div>
                        </div>
                        <div className="md:w-1/2 grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Shield size={24} />
                                </div>
                                <h3 className="font-bold text-gray-800">{t('aboutTrust')}</h3>
                                <p className="text-sm text-gray-500">{t('aboutTrustDesc')}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Users size={24} />
                                </div>
                                <h3 className="font-bold text-gray-800">{t('aboutCommunity')}</h3>
                                <p className="text-sm text-gray-500">{t('aboutCommunityDesc')}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Heart size={24} />
                                </div>
                                <h3 className="font-bold text-gray-800">{t('aboutDignity')}</h3>
                                <p className="text-sm text-gray-500">{t('aboutDignityDesc')}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                                <div className="w-12 h-12 bg-brand-orange bg-opacity-20 text-brand-orange rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Hammer size={24} />
                                </div>
                                <h3 className="font-bold text-gray-800">{t('aboutImpact')}</h3>
                                <p className="text-sm text-gray-500">{t('aboutImpactDesc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why We Started */}
            <div className="bg-gray-50 py-16 px-4">
                <div className="container mx-auto max-w-4xl text-center">
                    <h2 className="text-3xl font-bold text-brand-dark mb-8">Why We Started</h2>
                    <div className="bg-white p-8 rounded-2xl shadow-sm text-left border-l-4 border-brand-orange">
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            Every morning, millions of daily wage workers in India gather at physical "Labour Chowks", waiting for work.
                            They face <span className="font-bold text-gray-800">uncertainty, exploitation by middlemen, and a lack of dignity</span>.
                            Many return home empty-handed after waiting for hours in the sun or rain.
                        </p>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            On the other side, homeowners and businesses struggle to find reliable, verified workers when they need them.
                            The trust gap is huge.
                        </p>
                        <p className="text-gray-800 font-bold text-lg leading-relaxed">
                            We built <span className="text-brand-orange">Ek Digital Labour Chowk</span> to bridge this gap.
                            We believe that technology can bring dignity to labour.
                            By creating a direct, transparent connection, we empower workers to find work on their terms and help employers find trusted hands instantly.
                        </p>
                    </div>

                    <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">
                        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold text-gray-700">Aligned with Govt Skill India Mission</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
                            <Heart size={16} className="text-red-500 fill-red-500" />
                            <span className="text-sm font-bold text-gray-700">Social Impact First</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
