import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Briefcase, Clock, CheckCircle, XCircle } from 'lucide-react';
import WorkerCard from '../components/WorkerCard';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const EmployerDashboard = () => {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const initialSkill = searchParams.get('skill') || '';

    const [workers, setWorkers] = useState([]);
    const [myJobs, setMyJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hiringWorker, setHiringWorker] = useState(null); // Worker being hired for modal
    const [jobForm, setJobForm] = useState({
        duration: '1 Day',
        wage: '',
        startDate: ''
    });
    const [filters, setFilters] = useState({
        skill: initialSkill,
        location: ''
    });

    const skills = ['All', 'Mistri', 'Plumber', 'Electrician', 'Painter', 'Carpenter', 'Labour', 'Driver', 'Maid', 'Other'];

    const fetchWorkers = async () => {
        setLoading(true);
        try {
            const params = {};
            if (filters.skill && filters.skill !== 'All') params.skill = filters.skill;
            if (filters.location) params.location = filters.location;

            const res = await axios.get('http://localhost:5000/api/workers/search', { params });
            if (res.data.success) {
                setWorkers(res.data.workers);
            }
        } catch (err) {
            console.error('Error fetching workers', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyJobs = async () => {
        if (!user?.id) return;
        try {
            const res = await axios.get(`http://localhost:5000/api/jobs/employer/${user.id}`);
            if (res.data.success) {
                setMyJobs(res.data.jobs.reverse());
            }
        } catch (err) {
            console.error('Error fetching my jobs', err);
        }
    };

    useEffect(() => {
        fetchWorkers();
        fetchMyJobs();
    }, [filters.skill, user]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWorkers();
    };

    const openHireModal = (worker) => {
        if (!user) {
            window.location.href = '/employer-login';
            return;
        }
        setHiringWorker(worker);
        setJobForm({ duration: '1 Day', wage: worker.dailyWage || '', startDate: new Date().toISOString().split('T')[0] });
    };

    const confirmHire = async () => {
        if (!hiringWorker) return;

        try {
            const res = await axios.post('http://localhost:5000/api/jobs/create', {
                employerId: user.id,
                workerId: hiringWorker._id,
                employerName: user.name || 'Employer', // Send Name
                jobDetails: `Hiring for ${hiringWorker.skill} (${jobForm.duration})`,
                wage: jobForm.wage, // Send Wage
                duration: jobForm.duration, // Send Duration
                date: new Date().toISOString(),
            });

            if (res.data.success) {
                alert(`✅ Request Sent to ${hiringWorker.name}! Check 'My Requests' below.`);
                // SIMULATION: SMS Alert
                const toast = document.createElement('div');
                toast.innerText = `📲 SMS Sent to ${hiringWorker.name}: "New Job Offer: Rs.${jobForm.wage}"`;
                toast.style.position = 'fixed';
                toast.style.bottom = '20px';
                toast.style.left = '50%';
                toast.style.transform = 'translateX(-50%)';
                toast.style.backgroundColor = '#333';
                toast.style.color = 'white';
                toast.style.padding = '12px 24px';
                toast.style.borderRadius = '8px';
                toast.style.zIndex = '9999';
                document.body.appendChild(toast);
                setTimeout(() => document.body.removeChild(toast), 4000);

                fetchMyJobs();
                setHiringWorker(null);
            }
        } catch (err) {
            alert('Failed to send request');
        }
    };

    return (
        <div className="min-h-screen bg-brand-light p-4 md:p-8">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-brand-dark mb-8 flex items-center gap-2">
                    <Briefcase className="text-brand-orange" />
                    {t('dashboard')}
                </h2>

                {/* Search Bar */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-10">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Filter className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <select
                                value={filters.skill}
                                onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
                                className="input-field pl-10 appearance-none bg-white cursor-pointer"
                            >
                                <option value="" disabled>Select Skill</option>
                                {skills.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder={t('searchPlaceholder')}
                                value={filters.location}
                                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                                className="input-field pl-10"
                            />
                        </div>
                        <button type="submit" className="btn-primary md:w-48 shadow-lg shadow-orange-500/30">
                            {t('searchBtn')}
                        </button>
                    </form>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="text-center py-20 text-gray-500 text-lg">Loading workers...</div>
                ) : (
                    <>
                        {workers.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                                <p className="text-gray-500 text-lg">No workers found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {workers.map(worker => {
                                    // Check if we have already hired/requested this worker
                                    // Simplistic check: if any ACTIVE job exists for this worker from THIS employer
                                    const isHired = myJobs.some(job => job.workerId === worker._id && ['ACCEPTED', 'IN_PROGRESS', 'COMPLETED'].includes(job.status));

                                    return (
                                        <WorkerCard
                                            key={worker._id}
                                            worker={{ ...worker, isVerified: true }} // Mocking verified for now 
                                            onHire={openHireModal}
                                            isHired={isHired}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </>
                )}

                {/* My Job Requests Section */}
                {user && (
                    <div className="mt-16 border-t border-gray-200 pt-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Clock className="text-brand-orange" transform="translate(0, 2)" />
                            My Job Requests
                        </h3>

                        <div className="space-y-4">
                            {myJobs.length === 0 ? (
                                <p className="text-gray-500">No active job requests.</p>
                            ) : (
                                myJobs.map(job => (
                                    <div key={job._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                                        <div>
                                            <p className="font-bold text-gray-800">{job.jobDetails}</p>
                                            <p className="text-xs text-gray-500">{new Date(job.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                            ${job.status === 'REQUESTED' ? 'bg-yellow-100 text-yellow-700' : ''}
                                            ${job.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700' : ''}
                                            ${job.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : ''}
                                        `}>
                                                {job.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Hiring Modal */}
                {hiringWorker && (
                    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4 animate-fade-in">
                        <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-slide-up shadow-2xl">
                            <div className="flex justify-between items-center mb-6 border-b pb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-brand-dark">Hire {hiringWorker.name}</h3>
                                    <p className="text-sm text-gray-500">{hiringWorker.skill}</p>
                                </div>
                                <button onClick={() => setHiringWorker(null)} className="text-gray-400 hover:text-red-500">
                                    <XCircle size={28} />
                                </button>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Job Duration</label>
                                    <select
                                        className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-brand-orange"
                                        value={jobForm.duration}
                                        onChange={(e) => setJobForm({ ...jobForm, duration: e.target.value })}
                                    >
                                        <option>1 Day</option>
                                        <option>2 Days</option>
                                        <option>1 Week</option>
                                        <option>1 Month</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Start Date</label>
                                        <input
                                            type="date"
                                            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-brand-orange"
                                            value={jobForm.startDate}
                                            onChange={(e) => setJobForm({ ...jobForm, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Offered Wage (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="e.g. 500"
                                            className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 outline-none focus:border-brand-orange"
                                            value={jobForm.wage}
                                            onChange={(e) => setJobForm({ ...jobForm, wage: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700 flex gap-2">
                                    <CheckCircle size={16} className="text-blue-500 shrink-0" />
                                    <p>Worker's phone number will be visible after your request is accepted.</p>
                                </div>

                                <button
                                    onClick={confirmHire}
                                    className="w-full bg-brand-orange text-white py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all active:scale-95"
                                >
                                    Send Hiring Request
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboard;
