const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    location: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employer', employerSchema);
