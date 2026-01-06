import React from 'react';
import { Phone, MapPin, Briefcase, Star, ShieldCheck, Circle } from 'lucide-react';

const WorkerCard = ({ worker, onHire, isHired }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                        {worker.name}
                        {worker.isVerified && <ShieldCheck size={16} className="text-green-500" />}
                    </h3>
                    <div className="flex gap-2 mt-1">
                        <span className="inline-block bg-orange-100 text-brand-orange text-xs px-2 py-1 rounded-full font-semibold">
                            {worker.skill}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-semibold border border-green-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Available
                        </span>
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-semibold">
                            &lt; 3 km
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={16} fill="currentColor" />
                    <span className="text-sm font-bold">4.8</span>
                </div>
            </div>

            <div className="space-y-2 mb-6">
                <div className="flex items-center text-gray-600 text-sm">
                    <Briefcase size={16} className="mr-2" />
                    <span>{worker.experience} Experience</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={16} className="mr-2" />
                    <span>{worker.location}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                    <Phone size={16} className="mr-2" />
                    <span className={isHired ? "font-bold text-gray-800" : "text-gray-400 italic"}>
                        {isHired ? `+91 ${worker.mobile}` : "Hire to view contact"}
                    </span>
                </div>
            </div>

            <button
                onClick={() => onHire(worker)}
                className="w-full bg-brand-dark text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
                Hire Now
            </button>
        </div>
    );
};

export default WorkerCard;
