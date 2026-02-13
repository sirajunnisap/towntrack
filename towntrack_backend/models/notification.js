const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },

  type: {
    type: String 
  },

  wardNumber: String,
  district: String,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
