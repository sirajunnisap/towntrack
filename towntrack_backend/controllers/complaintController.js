const Complaint = require("../models/Complaint");


exports.createComplaint = async (req, res) => {
  try {
    const complaint = new Complaint({
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image
    });

    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("userId", "name email").sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate("userId", "name email");
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateStatus = async (req, res) => {
  try {
    const { status, priority } = req.body;
    let complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ msg: "Complaint not found" });

    if (status) complaint.status = status;
    if (priority) complaint.priority = priority;

    await complaint.save();
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
