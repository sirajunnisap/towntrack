const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  category: {
    type: String, 
    required: true
  },

  image: String, 
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Solved"],
    default: "Pending"
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low"
  },
  
  votes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Complaint", complaintSchema);
