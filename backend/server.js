// ==========================================
// IMPORT PACKAGES
// ==========================================

// Import Express
// Express is used to create the backend server and APIs
const express = require("express");

// Import CORS
// CORS allows React frontend to communicate with our backend
const cors = require("cors");

// Import Mongoose
// Mongoose helps Node.js communicate with MongoDB
const mongoose = require("mongoose");

// Import dotenv
// dotenv loads variables from the .env file
require("dotenv").config();

// Import employee routes
// Contains CREATE, READ, UPDATE and DELETE APIs
const employeeRoutes = require("./routes/employeeRoutes");


// ==========================================
// CREATE EXPRESS APPLICATION
// ==========================================

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

// Enable CORS
// Allows requests from the React frontend
app.use(cors());

// Allows Express to read JSON data
app.use(express.json());


// ==========================================
// EMPLOYEE ROUTES
// ==========================================

// All employee APIs will start with /api/employees
app.use("/api/employees", employeeRoutes);


// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
  .connect(process.env.MONGO_URI)

  // This runs when MongoDB connection is successful
  .then(() => {
    console.log("MongoDB connected successfully");
  })

  // This runs when MongoDB connection fails
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {

  // Send response to browser
  res.send("Employee Management API is working!");
});


// ==========================================
// SERVER PORT
// ==========================================

// Get PORT from .env
// If PORT is not found, use 4000
const PORT = process.env.PORT || 4000;


// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

  // Display message in terminal
  console.log(`Server running on http://localhost:${PORT}`);
});