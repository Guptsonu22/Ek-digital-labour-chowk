const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    skill: {
        type: String,
        required: true,
        enum: ['Mistri', 'Plumber', 'Electrician', 'Painter', 'Carpenter', 'Labour', 'Driver', 'Maid', 'Other']
    },
    experience: { type: String, default: '0 years' },
    location: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Worker', workerSchema);
