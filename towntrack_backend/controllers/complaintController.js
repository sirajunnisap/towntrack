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


exports.myComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.user.id });
    res.json(complaints);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
