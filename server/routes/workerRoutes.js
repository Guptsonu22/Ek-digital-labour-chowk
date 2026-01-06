const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory store
let workers = [];

// POST /api/workers/register
router.post('/register', async (req, res) => {
    try {
        const { name, mobile, skill, experience, location, dailyWage } = req.body;

        // Check if worker exists
        const existing = workers.find(w => w.mobile === mobile);
        if (existing) {
            return res.status(400).json({ msg: 'Worker profile already exists', success: false });
        }

        const newWorker = {
            _id: uuidv4(),
            name,
            mobile,
            skill,
            experience,
            location,
            dailyWage,
            isAvailable: true,
            isVerified: false,
            createdAt: new Date()
        };

        workers.push(newWorker);
        console.log('Worker Registered:', newWorker);

        res.json({ msg: 'Worker profile created successfully', success: true, worker: newWorker });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', success: false });
    }
});

// GET /api/workers/search?skill=Plumber&location=Delhi
router.get('/search', async (req, res) => {
    try {
        const { skill, location } = req.query;

        let results = workers.filter(w => w.isAvailable);

        if (skill && skill !== 'All') {
            results = results.filter(w => w.skill === skill);
        }

        if (location) {
            results = results.filter(w => w.location.toLowerCase().includes(location.toLowerCase()));
        }

        res.json({ workers: results, success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', success: false });
    }
});

// PUT /api/workers/:id - Update worker profile
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const index = workers.findIndex(w => w._id === id || w.mobile === id); // Support both ID and Mobile

        if (index === -1) {
            return res.status(404).json({ msg: 'Worker not found', success: false });
        }

        workers[index] = { ...workers[index], ...updates };
        console.log('Worker Updated:', workers[index]);

        res.json({ msg: 'Profile updated', success: true, worker: workers[index] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', success: false });
    }
});

module.exports = router;
