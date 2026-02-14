
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");



exports.signup = async (req, res) => {
  try {
    const { name, email, phone, password, role, address } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
      address
    });

    await user.save();


    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userPayload = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address
    };

    res.json({ token, user: userPayload });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.profileUpdate = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true }
    ).select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
