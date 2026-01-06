import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { User, Briefcase, Phone, AlertTriangle, ShieldCheck, Star, IndianRupee, Clock, Check, X, MessageCircle, Send } from 'lucide-react';

const WorkerDashboard = () => {
    const { t } = useLanguage();
    const { user } = useAuth();

    const [jobs, setJobs] = useState([]);
    const [activeTab, setActiveTab] = useState('requests');
    const [chatOpen, setChatOpen] = useState(null); // Job ID for open chat
    const [messageText, setMessageText] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        name: '',
        skill: '',
        location: '',
        dailyWage: ''
    });

    const skills = ['Mistri', 'Plumber', 'Electrician', 'Painter', 'Carpenter', 'Labour', 'Driver', 'Maid', 'Other'];

    const [isAvailable, setIsAvailable] = useState(user?.isAvailable ?? true);

    const workerProfile = {
        name: user?.name || (user?.mobile ? `Worker ${user.mobile.slice(-4)}` : "Guest Worker"),
        skill: user?.skill || "General",
        location: user?.location || "On Site",
        mobile: user?.mobile || "+91 98765 43210",
        verified: user?.isVerified || false,
        earningsCombined: user?.earnings || 0,
        jobsDone: user?.jobsDone || 0
    };

    const fetchJobs = async () => {
        if (!user?.id) return;
        try {
            const res = await axios.get(`http://localhost:5000/api/jobs/worker/${user.id}`);
            if (res.data.success) {
                setJobs(res.data.jobs.reverse());
            }
        } catch (err) {
            console.error("Failed to fetch jobs");
        }
    };

    useEffect(() => {
        fetchJobs();
        const interval = setInterval(fetchJobs, 5000); // Poll for new messages
        return () => clearInterval(interval);
    }, [user]);

    const updateStatus = async (jobId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/jobs/${jobId}/status`, { status: newStatus });
            fetchJobs();
            alert(`Job marked as ${newStatus}`);
        } catch (err) {
            console.error("Failed to update status");
        }
    };

    const sendMessage = async (jobId, text) => {
        if (!text.trim()) return;
        try {
            await axios.post(`http://localhost:5000/api/jobs/${jobId}/message`, {
                sender: 'worker',
                text: text
            });
            setMessageText('');
            fetchJobs(); // Refresh to see new message
        } catch (err) {
            console.error("Failed to send message");
        }
    };

    const handleEditClick = () => {
        setEditForm({
            name: user?.name || '',
            skill: user?.skill || '',
            location: user?.location || '',
            dailyWage: user?.dailyWage || ''
        });
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/workers/${user.id}`, editForm);
            if (res.data.success) {
                // Update local user context
                // Note: user object in context needs to be updated. 
                // Since we don't have a direct updateUser function exposed from context yet, 
                // we might need to rely on re-fetching or manually updating if login() accepts updates.
                // For MVP, simplistic reload or alert.
                // Ideally: updateUser(res.data.worker);
                alert("Profile Updated!");
                setIsEditing(false);
                window.location.reload(); // Simple refresh to fetch fresh data into context on mount
            }
        } catch (err) {
            console.error("Failed to update profile", err);
            alert("Failed to update profile");
        }
    };

    const toggleAvailability = async () => {
        const newStatus = !isAvailable;
        setIsAvailable(newStatus);
        try {
            await axios.put(`http://localhost:5000/api/workers/${user.id}`, { isAvailable: newStatus });
        } catch (err) {
            console.error("Failed to update availability");
            setIsAvailable(!newStatus); // Revert on failure
        }
    };

    const newRequests = jobs.filter(j => j.status === 'REQUESTED');
    const activeJobs = jobs.filter(j => ['ACCEPTED', 'IN_PROGRESS'].includes(j.status));
    const pastJobs = jobs.filter(j => ['COMPLETED', 'CANCELLED'].includes(j.status));

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-brand-dark text-white p-6 rounded-b-3xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <User size={100} />
                </div>

                {/* Availability Toggle */}
                <div className="absolute top-6 right-6 z-20 flex flex-col items-end">
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" className="sr-only" checked={isAvailable} onChange={toggleAvailability} />
                            <div className={`block w-14 h-8 rounded-full transition-colors ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${isAvailable ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                    </label>
                    <span className="text-xs font-bold mt-1">{isAvailable ? 'Available' : 'Busy'}</span>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-brand-dark font-bold text-2xl border-4 border-brand-orange">
                        {workerProfile.name.charAt(0)}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">{workerProfile.name}</h1>
                        <p className="text-orange-200 text-sm flex items-center gap-1">
                            {workerProfile.skill} • {workerProfile.location}
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="flex gap-4 mt-6">
                    <div className="flex-1 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                        <p className="text-xs text-orange-200 mb-1">Total Earnings</p>
                        <p className="text-xl font-bold">₹{workerProfile.earningsCombined}</p>
                    </div>
                    <div className="flex-1 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                        <p className="text-xs text-orange-200 mb-1">Jobs Done</p>
                        <p className="text-xl font-bold">{workerProfile.jobsDone}</p>
                    </div>
                </div>
            </div>

            <div className="px-4 mt-6">
                {/* Verification Badge */}
                {workerProfile.verified && (
                    <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex items-center gap-3 mb-6">
                        <div className="bg-green-100 p-2 rounded-full text-green-600">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-green-800 text-sm">Skill Verified</h3>
                            <p className="text-xs text-green-600">Documents & Skill approved by Admin</p>
                        </div>
                    </div>
                )}

                {/* Job Sections */}
                <div className="mb-8">
                    {/* Tabs */}
                    <div className="flex gap-4 border-b border-gray-200 mb-4">
                        <button
                            className={`pb-2 px-1 font-bold ${activeTab === 'requests' ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-gray-400'}`}
                            onClick={() => setActiveTab('requests')}
                        >
                            Requests ({newRequests.length})
                        </button>
                        <button
                            className={`pb-2 px-1 font-bold ${activeTab === 'active' ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-gray-400'}`}
                            onClick={() => setActiveTab('active')}
                        >
                            Active ({activeJobs.length})
                        </button>
                        <button
                            className={`pb-2 px-1 font-bold ${activeTab === 'history' ? 'text-brand-orange border-b-2 border-brand-orange' : 'text-gray-400'}`}
                            onClick={() => setActiveTab('history')}
                        >
                            History
                        </button>
                    </div>

                    <div className="space-y-4">
                        {activeTab === 'requests' && newRequests.map(job => (
                            <div key={job._id} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-yellow-400 flex flex-col gap-3 animate-fade-in-up">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg">{job.employerName || 'Employer'}</h4>
                                        <p className="text-sm text-gray-600 font-medium">{job.jobDetails}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                                                <IndianRupee size={12} /> {job.wage || 'Negotiable'}
                                            </span>
                                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                                                <Clock size={12} /> {job.duration || '1 Day'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">{new Date(job.createdAt).toLocaleString()}</p>
                                    </div>
                                    <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full font-bold">New Offer</span>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <button onClick={() => updateStatus(job._id, 'ACCEPTED')} className="flex-1 bg-brand-dark text-white py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                                        <Check size={16} /> Accept
                                    </button>
                                    <button onClick={() => updateStatus(job._id, 'CANCELLED')} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg font-bold text-sm flex items-center justify-center gap-2">
                                        <X size={16} /> Decline
                                    </button>
                                </div>
                            </div>
                        ))}

                        {activeTab === 'active' && activeJobs.map(job => (
                            <div key={job._id} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-500 flex flex-col gap-3">
                                <div>
                                    <h4 className="font-bold text-gray-800 text-lg">{job.jobDetails}</h4>
                                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-bold">In Progress</span>
                                </div>

                                {/* Chat Section */}
                                <div className="border-t border-gray-100 pt-3">
                                    <button
                                        onClick={() => setChatOpen(chatOpen === job._id ? null : job._id)}
                                        className="w-full flex items-center justify-center gap-2 text-brand-orange font-bold text-sm mb-2"
                                    >
                                        <MessageCircle size={18} />
                                        {chatOpen === job._id ? 'Close Chat' : `Chat (${job.messages ? job.messages.length : 0})`}
                                    </button>

                                    {chatOpen === job._id && (
                                        <div className="bg-gray-50 p-3 rounded-lg">
                                            <div className="max-h-40 overflow-y-auto mb-3 space-y-2">
                                                {job.messages && job.messages.length > 0 ? (
                                                    job.messages.map((msg, idx) => (
                                                        <div key={idx} className={`flex ${msg.sender === 'worker' ? 'justify-end' : 'justify-start'}`}>
                                                            <div className={`max-w-[80%] p-2 rounded-lg text-xs ${msg.sender === 'worker' ? 'bg-orange-100 text-orange-900 rounded-tr-none' : 'bg-white border text-gray-800 rounded-tl-none'}`}>
                                                                {msg.text}
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-center text-xs text-gray-400">No messages yet.</p>
                                                )}
                                            </div>

                                            {/* Quick Replies */}
                                            <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
                                                {['I am coming', 'Call me', 'Work Done'].map(txt => (
                                                    <button key={txt} onClick={() => sendMessage(job._id, txt)} className="whitespace-nowrap bg-white border border-gray-200 text-xs px-2 py-1 rounded-full text-gray-600 hover:bg-orange-50">
                                                        {txt}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={messageText}
                                                    onChange={(e) => setMessageText(e.target.value)}
                                                    placeholder="Type message..."
                                                    className="flex-1 text-xs p-2 rounded-lg border border-gray-300"
                                                />
                                                <button onClick={() => sendMessage(job._id, messageText)} className="text-brand-orange p-2">
                                                    <Send size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button onClick={() => updateStatus(job._id, 'COMPLETED')} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-green-200">
                                    Mark as Completed
                                </button>
                            </div>
                        ))}

                        {activeTab === 'history' && pastJobs.map(job => (
                            <div key={job._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center opacity-75">
                                <div>
                                    <h4 className="font-bold text-gray-800">{job.jobDetails}</h4>
                                    <p className="text-xs text-gray-500">{new Date(job.date).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${job.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {job.status}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {jobs.length === 0 && (
                            <div className="text-center py-10 text-gray-400 italic">
                                No jobs found in this category.
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={handleEditClick} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 text-gray-600 hover:bg-gray-50">
                        <User size={24} />
                        <span className="text-xs font-medium">Edit Profile</span>
                    </button>
                    <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 text-gray-600 hover:bg-gray-50">
                        <Briefcase size={24} />
                        <span className="text-xs font-medium">My Jobs</span>
                    </button>
                </div>

            </div>

            {/* Emergency Button (Floating) */}
            <div className="fixed bottom-20 right-4">
                <button className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg shadow-red-500/40 flex items-center justify-center gap-2 animate-bounce">
                    <AlertTriangle size={24} />
                    <span className="font-bold text-sm">HELP / मदद</span>
                </button>
            </div>

            {/* Edit Profile Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-slide-up">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-gray-800">Edit Profile</h3>
                            <button onClick={() => setIsEditing(false)} className="text-gray-400">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Name</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 mt-1"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Skill</label>
                                <select
                                    value={editForm.skill}
                                    onChange={(e) => setEditForm({ ...editForm, skill: e.target.value })}
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 mt-1"
                                >
                                    {skills.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase">Location</label>
                                <input
                                    type="text"
                                    value={editForm.location}
                                    onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                                    className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 mt-1"
                                />
                            </div>
                            <button onClick={handleSaveProfile} className="w-full bg-brand-dark text-white py-3 rounded-lg font-bold mt-4">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WorkerDashboard;
