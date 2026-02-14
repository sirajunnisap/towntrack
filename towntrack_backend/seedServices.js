const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Service = require("./models/Service");

dotenv.config();

const services = [
    {
        name: "Seed Distribution",
        description: "Distribution of high-quality, subsidized seeds to local farmers to promote agriculture and food security. Includes paddy, vegetable, and fruit seeds.",
        eligibility: "Registered Farmers",
        isAvailable: true
    },
    {
        name: "Water Tanker Supply",
        description: "Request for emergency water tanker supply in areas facing acute water shortage. Priority given to residential areas and hospitals.",
        eligibility: "Residents in drought areas",
        isAvailable: true
    },
    {
        name: "Birth Certificate",
        description: "Application for new birth certificates or name corrections in existing certificates. Processing time is usually 7 working days.",
        eligibility: "All Citizens",
        isAvailable: true
    },
    {
        name: "Waste Collection Registration",
        description: "Register for daily door-to-door waste collection service. Segregation of waste into wet and dry is mandatory.",
        eligibility: "Households & Businesses",
        isAvailable: true
    },
    {
        name: "Street Light Maintenance",
        description: "Request repair or installation of street lights in your locality. Ensure to provide exact pole number if available.",
        eligibility: "All Citizens",
        isAvailable: true
    },
    {
        name: "Building Permit",
        description: "Apply for construction or renovation permits for residential and commercial buildings.",
        eligibility: "Property Owners",
        isAvailable: true
    }
];

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");
        try {
            await Service.deleteMany({});
            console.log("Cleared existing services");

            await Service.insertMany(services);
            console.log("Services seeded successfully");

            process.exit();
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
