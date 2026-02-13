const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  getAllComplaints,
  updateStatus,
  filterByCategory
} = require("../controllers/adminController");


// Only logged in + admin
router.get("/complaints", auth, admin, getAllComplaints);
router.put("/complaint/:id", auth, admin, updateStatus);
router.get("/filter/:category", auth, admin, filterByCategory);

module.exports = router;
