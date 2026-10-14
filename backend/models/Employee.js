const mongoose = require("mongoose");

// Employee structure
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    phone: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    designation: {
      type: String,
      required: true
    },

    salary: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Create Employee model
const Employee = mongoose.model("Employee", employeeSchema);

// Export model
module.exports = Employee;