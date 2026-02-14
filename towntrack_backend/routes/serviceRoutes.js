const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
    getAllServices,
    createService,
    updateService,
    deleteService
} = require("../controllers/serviceController");

// Public
router.get("/", getAllServices);

// Admin only
router.post("/", auth, admin, createService);
router.put("/:id", auth, admin, updateService);
router.delete("/:id", auth, admin, deleteService);

module.exports = router;
