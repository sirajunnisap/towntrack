const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  complaintId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Complaint",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// prevent same user voting twice on same complaint
voteSchema.index({ userId: 1, complaintId: 1 }, { unique: true });

module.exports = mongoose.model("Vote", voteSchema);
