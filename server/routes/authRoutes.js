const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Mock OTP Store (in memory)
const otpStore = {};

// POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ msg: 'Mobile number required' });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    otpStore[mobile] = otp;
    console.log(`>>> 🔔 OTP for ${mobile}: ${otp} <<<`);

    // FOR DEMO ONLY: Return OTP to frontend so user can login without SMS
    res.json({ msg: 'OTP sent', success: true, otp: otp });
});

// POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
    const { mobile, otp, type } = req.body;

    if (otpStore[mobile] === otp) {
        delete otpStore[mobile];
        const token = jwt.sign({ mobile, type }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token, isNewUser: true, success: true });
    } else {
        res.status(400).json({ msg: 'Invalid OTP', success: false });
    }
});

module.exports = router;
