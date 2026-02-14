const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    eligibility: {
        type: String, // e.g., "All Citizens", "Below Poverty Line", etc.
        default: "All Citizens"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Service", serviceSchema);
