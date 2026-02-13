const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  signup,
  login,
  userProfile,
  profileUpdate
} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/login", login);

router.get("/profile", auth, userProfile);
router.put("/updateProfile", auth, profileUpdate);

module.exports = router;
