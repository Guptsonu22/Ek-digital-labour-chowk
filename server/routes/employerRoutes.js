const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory store
let employers = [];

// POST /api/employers/register
router.post('/register', (req, res) => {
    try {
        const { mobile, name, email } = req.body;

        let employer = employers.find(e => e.mobile === mobile);
        if (employer) {
            return res.status(400).json({ msg: 'Employer already registered', success: false });
        }

        employer = {
            _id: uuidv4(),
            name,
            mobile,
            email,
            createdAt: new Date()
        };
        employers.push(employer);
        console.log('Employer Registered:', employer);

        res.json({ success: true, employer });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', success: false });
    }
});

module.exports = router;
