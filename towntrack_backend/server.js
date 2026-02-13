const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = require("./config/db");
connectDB();

app.get("/", (req,res)=>{
  res.send("Backend running successfully");
});

app.use("/api/", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));




