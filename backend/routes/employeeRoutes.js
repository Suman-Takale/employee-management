const express = require("express");
const Employee = require("../models/Employee");

const router = express.Router();


// ===============================
// CREATE - Add New Employee
// POST /api/employees
// ===============================
router.post("/", async (req, res) => {
    try {
        // Get employee data from request
        const employeeData = req.body;

        // Create new employee
        const employee = new Employee(employeeData);

        // Save employee to MongoDB
        const savedEmployee = await employee.save();

        // Send saved employee as response
        res.status(201).json(savedEmployee);

    } catch (error) {
        res.status(500).json({
            message: "Error adding employee",
            error: error.message
        });
    }
});


// ===============================
// READ - Get All Employees
// GET /api/employees
// ===============================
router.get("/", async (req, res) => {
    try {
        // Get all employees from MongoDB
        const employees = await Employee.find();

        // Send employees as response
        res.status(200).json(employees);

    } catch (error) {
        res.status(500).json({
            message: "Error getting employees",
            error: error.message
        });
    }
});


// ===============================
// READ - Get One Employee
// GET /api/employees/:id
// ===============================
router.get("/:id", async (req, res) => {
    try {
        // Get employee ID from URL
        const id = req.params.id;

        // Find employee by ID
        const employee = await Employee.findById(id);

        // If employee doesn't exist
        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        // Send employee
        res.status(200).json(employee);

    } catch (error) {
        res.status(500).json({
            message: "Error getting employee",
            error: error.message
        });
    }
});


// ===============================
// UPDATE - Update Employee
// PUT /api/employees/:id
// ===============================
router.put("/:id", async (req, res) => {
    try {
        // Get employee ID
        const id = req.params.id;

        // Get updated data
        const updatedData = req.body;

        // Update employee
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        // If employee doesn't exist
        if (!updatedEmployee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        // Send updated employee
        res.status(200).json(updatedEmployee);

    } catch (error) {
        res.status(500).json({
            message: "Error updating employee",
            error: error.message
        });
    }
});


// ===============================
// DELETE - Delete Employee
// DELETE /api/employees/:id
// ===============================
router.delete("/:id", async (req, res) => {
    try {
        // Get employee ID
        const id = req.params.id;

        // Delete employee
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        // If employee doesn't exist
        if (!deletedEmployee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        // Send success message
        res.status(200).json({
            message: "Employee deleted successfully",
            employee: deletedEmployee
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting employee",
            error: error.message
        });
    }
});


// Export router
module.exports = router;