const Service = require("../models/Service");

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json(services);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};


exports.createService = async (req, res) => {
    const { name, description, isAvailable, eligibility } = req.body;

    try {
        let service = await Service.findOne({ name });
        if (service) {
            return res.status(400).json({ msg: "Service already exists" });
        }

        service = new Service({
            name,
            description,
            isAvailable,
            eligibility
        });

        await service.save();
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};


exports.updateService = async (req, res) => {
    const { name, description, isAvailable, eligibility } = req.body;

    try {
        let service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ msg: "Service not found" });

        if (name) service.name = name;
        if (description) service.description = description;
        if (isAvailable !== undefined) service.isAvailable = isAvailable;
        if (eligibility) service.eligibility = eligibility;

        await service.save();
        res.json(service);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};


exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ msg: "Service not found" });

        await Service.findByIdAndDelete(req.params.id);
        res.json({ msg: "Service removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};
