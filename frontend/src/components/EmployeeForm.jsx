
// ==========================================
// IMPORT REACT HOOK
// ==========================================

import { useState } from "react";


// ==========================================
// EMPLOYEE FORM COMPONENT
// ==========================================

function EmployeeForm({ selectedEmployee, onEmployeeUpdated }) {


  // ==========================================
  // FORM DATA
  // ==========================================

  // If an employee is selected for editing,
  // use that employee's data.
  //
  // Otherwise, start with empty fields.

  const [employee, setEmployee] = useState(() => {

    if (selectedEmployee) {

      return {
        name: selectedEmployee.name,
        email: selectedEmployee.email,
        phone: selectedEmployee.phone,
        department: selectedEmployee.department,
        designation: selectedEmployee.designation,
        salary: selectedEmployee.salary
      };

    }


    return {
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      salary: ""
    };

  });


  // ==========================================
  // HANDLE INPUT CHANGES
  // ==========================================

  const handleChange = (event) => {

    // Get input name and value
    const { name, value } = event.target;


    // Update the changed field
    setEmployee({
      ...employee,
      [name]: value
    });

  };


  // ==========================================
  // HANDLE FORM SUBMISSION
  // ==========================================

  const handleSubmit = async (event) => {

    // Prevent page refresh
    event.preventDefault();


    try {

      // ========================================
      // UPDATE EMPLOYEE
      // ========================================

      if (selectedEmployee) {

        // Send PUT request
        const response = await fetch(
          `http://localhost:4000/api/employees/${selectedEmployee._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type": "application/json"
            },

            // Convert JavaScript object to JSON
            body: JSON.stringify(employee)
          }
        );


        // Convert response into JavaScript object
        const data = await response.json();


        // Check for error
        if (!response.ok) {

          throw new Error(
            data.message || "Failed to update employee"
          );

        }


        // Show success message
        alert("Employee updated successfully!");


        // Tell App.jsx that update is complete
        onEmployeeUpdated(data);

      }


      // ========================================
      // CREATE EMPLOYEE
      // ========================================

      else {

        // Send POST request
        const response = await fetch(
          "http://localhost:4000/api/employees",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            // Convert JavaScript object to JSON
            body: JSON.stringify(employee)
          }
        );


        // Convert response into JavaScript object
        const data = await response.json();


        // Check for error
        if (!response.ok) {

          throw new Error(
            data.message || "Failed to add employee"
          );

        }


        // Show success message
        alert("Employee added successfully!");

      }


      // ========================================
      // CLEAR FORM
      // ========================================

      setEmployee({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: ""
      });


    } catch (error) {

      // Display error in console
      console.error(
        "Error:",
        error.message
      );


      // Display error message
      alert(error.message);

    }

  };


  // ==========================================
  // FORM UI
  // ==========================================

  return (

    <div>

      {/* ====================================
          FORM HEADING
          ==================================== */}

      <h2>
        {selectedEmployee
          ? "Edit Employee"
          : "Add New Employee"}
      </h2>


      <form onSubmit={handleSubmit}>


        {/* ====================================
            NAME
            ==================================== */}

        <div>

          <label>Name:</label>

          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            placeholder="Enter employee name"
            required
          />

        </div>


        {/* ====================================
            EMAIL
            ==================================== */}

        <div>

          <label>Email:</label>

          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />

        </div>


        {/* ====================================
            PHONE
            ==================================== */}

        <div>

          <label>Phone:</label>

          <input
            type="text"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />

        </div>


        {/* ====================================
            DEPARTMENT
            ==================================== */}

        <div>

          <label>Department:</label>

          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            placeholder="Enter department"
            required
          />

        </div>


        {/* ====================================
            DESIGNATION
            ==================================== */}

        <div>

          <label>Designation:</label>

          <input
            type="text"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            placeholder="Enter designation"
            required
          />

        </div>


        {/* ====================================
            SALARY
            ==================================== */}

        <div>

          <label>Salary:</label>

          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            placeholder="Enter salary"
            required
          />

        </div>


        {/* ====================================
            SUBMIT BUTTON
            ==================================== */}

        <button type="submit">

          {selectedEmployee
            ? "Update Employee"
            : "Add Employee"}

        </button>


      </form>

    </div>

  );
}


// ==========================================
// EXPORT COMPONENT
// ==========================================

export default EmployeeForm;
