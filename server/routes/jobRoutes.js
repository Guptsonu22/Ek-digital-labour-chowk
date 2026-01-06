const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory store for jobs/hires
let jobs = [];

// POST /api/jobs/create (Hire Worker)
router.post('/create', (req, res) => {
    try {
        const { employerId, workerId, jobDetails, date, employerName, wage, duration } = req.body;

        if (!employerId || !workerId) {
            return res.status(400).json({ msg: 'Employer and Worker IDs required', success: false });
        }

        const newJob = {
            _id: uuidv4(),
            employerId,
            workerId,
            employerName: employerName || 'Employer',
            jobDetails: jobDetails || 'General Labour',
            wage: wage || 'Negotiable',
            duration: duration || '1 Day',
            date: date || new Date().toISOString(),
            status: 'REQUESTED', // REQUESTED, ACCEPTED, COMPLETED, CANCELLED
            messages: [], // { sender: 'employer'|'worker', text: '', time: '' }
            createdAt: new Date()
        };

        jobs.push(newJob);
        console.log('New Job Created:', newJob);

        res.json({ success: true, job: newJob });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', success: false });
    }
});

// GET /api/jobs/employer/:employerId
router.get('/employer/:employerId', (req, res) => {
    const employerJobs = jobs.filter(j => j.employerId === req.params.employerId);
    res.json({ success: true, jobs: employerJobs });
});

// GET /api/jobs/worker/:workerId
router.get('/worker/:workerId', (req, res) => {
    const workerJobs = jobs.filter(j => j.workerId === req.params.workerId);
    res.json({ success: true, jobs: workerJobs });
});

// PUT /api/jobs/:id/status
router.put('/:id/status', (req, res) => {
    const { status } = req.body;
    const jobIndex = jobs.findIndex(j => j._id === req.params.id);

    if (jobIndex === -1) {
        return res.status(404).json({ msg: 'Job not found', success: false });
    }

    jobs[jobIndex].status = status;
    console.log(`Job ${req.params.id} status updated to ${status}`);
    res.json({ success: true, job: jobs[jobIndex] });
});

// POST /api/jobs/:id/message
router.post('/:id/message', (req, res) => {
    const { sender, text } = req.body; // sender: 'employer' or 'worker'
    const jobIndex = jobs.findIndex(j => j._id === req.params.id);

    if (jobIndex === -1) {
        return res.status(404).json({ msg: 'Job not found', success: false });
    }

    const newMessage = {
        sender,
        text,
        time: new Date().toISOString()
    };

    if (!jobs[jobIndex].messages) {
        jobs[jobIndex].messages = [];
    }

    jobs[jobIndex].messages.push(newMessage);
    res.json({ success: true, messages: jobs[jobIndex].messages });
});

module.exports = router;
