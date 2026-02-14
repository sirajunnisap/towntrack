const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("123456", salt);

            const emailsToReset = ["sirajunnisa@gmail.com", "siraju@gmail.com"];

            const result = await User.updateMany(
                { email: { $in: emailsToReset } },
                { $set: { password: hashedPassword } }
            );

            console.log(`Updated ${result.modifiedCount} users. Password set to: 123456`);
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
