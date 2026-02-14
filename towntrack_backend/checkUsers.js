const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");
        try {
            const users = await User.find({}, "name email role");
            console.log("--- Registered Users ---");
            console.table(users.map(u => ({ id: u._id.toString(), name: u.name, email: u.email, role: u.role })));
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
