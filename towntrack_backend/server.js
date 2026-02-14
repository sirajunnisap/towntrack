const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use("/api/auth", require("./routes/userRoutes")); // This handles login/signup
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api", require("./routes/userRoutes")); // For profile
app.use("/api/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));