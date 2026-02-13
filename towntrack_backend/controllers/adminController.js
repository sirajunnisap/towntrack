const Complaint = require("../models/Complaint");


exports.getAllComplaints = async (req, res) => {
  const complaints = await Complaint.find()
    .populate("userId", "name email address");

  res.json(complaints);
};


exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  const complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(complaint);
};



exports.filterByCategory = async (req, res) => {
  const complaints = await Complaint.find({
    category: req.params.category
  });

  res.json(complaints);
};
