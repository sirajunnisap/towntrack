const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["citizen", "admin"],
    default: "citizen"
  },
  address: {
    houseName: String,
    wardNumber: String,
    postOffice: String,
    pinCode: String,
    city: String,
    district: String,
    state: {
      type: String,
      default: "Kerala"
    }
  },

});

module.exports = mongoose.model("User", userSchema);
