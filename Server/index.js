const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db.js");

const app = express();

connectDB();
// Routes
const registerRoute = require("./App/routes/registerRoute");
const appoinmentRoute=require("./App/routes/appoinmentRoute");
const dashboardRoute=require("./App/routes/dashboardRoute");
const staffRoute=require("./App/routes/staffRoute")
// user by registration
const regisByUserRoute=require("./App/routes/regisByUserRoute");
const appoinmentByUserRoute=require("./App/routes/appoinmentByUserRoute");
const authRoutes = require("./App/routes/authRoutes");
const labRoutes = require("./App/routes/labRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use("/registerUser", registerRoute);
app.use("/appoinmentUser",appoinmentRoute);
app.use("/dashboard",dashboardRoute);
app.use("/staffRoute",staffRoute);
//
app.use("/",regisByUserRoute)
app.use("/appoinmentByUser",appoinmentByUserRoute);
app.use("/api/auth",authRoutes);
app.use("/api/labs",labRoutes);
// Root Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});      

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
});

// Connect to MongoDB and Start Server
// mongoose
//   .connect(process.env.DBCONNECT, {
//     useNewUrlParser: true,
   
//   })
//   .then(() => {
//     console.log("✅ Mongoose is connected");

//     app.listen(process.env.PORT, () => {
//       console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Mongoose connection failed:", err.message);
//   });
