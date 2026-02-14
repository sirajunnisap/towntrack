const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  getComplaintById,
  updateStatus
} = require("../controllers/complaintController");

// Public or Auth generic routes
router.get("/all", getAllComplaints); // Publicly visible or auth? user requirements said "Fetch from API: /api/complaints" which implies listing. 
// Standard REST: GET /
router.get("/", getAllComplaints);

// Protected
router.post("/", auth, createComplaint);
router.get("/my", auth, getMyComplaints);
router.get("/:id", auth, getComplaintById); // Specific ID route must be last to avoid collision if strict
router.put("/:id/status", auth, updateStatus); // Keep specifically for status update

module.exports = router;