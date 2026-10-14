
// ==========================================
// IMPORT REACT HOOKS
// ==========================================

// useState -> stores employee data
// useEffect -> runs code when component loads
import { useEffect, useState } from "react";


// ==========================================
// EMPLOYEE LIST COMPONENT
// ==========================================

function EmployeeList() {

  // ==========================================
  // EMPLOYEE STATE
  // ==========================================

  // Initially, there are no employees.
  // Later, data received from MongoDB will
  // be stored here.

  const [employees, setEmployees] = useState([]);


  // ==========================================
  // GET EMPLOYEES FROM BACKEND
  // ==========================================

  useEffect(() => {

    // This function gets employees from backend
    const getEmployees = async () => {

      try {

        // Send GET request to Express backend
        const response = await fetch(
          "http://localhost:4000/api/employees"
        );


        // Convert response into JavaScript data
        const data = await response.json();


        // Check whether API request was successful
        if (!response.ok) {

          throw new Error(
            data.message || "Failed to fetch employees"
          );
        }


        // Store employees in React state
        setEmployees(data);

      } catch (error) {

        // Display error in browser console
        console.error(
          "Error fetching employees:",
          error.message
        );
      }
    };


    // Call the API function
    getEmployees();

  }, []);


  // ==========================================
  // DISPLAY EMPLOYEES
  // ==========================================

  return (
    <div>

      <h2>Employee List</h2>


      {/* ======================================
          CHECK IF EMPLOYEE LIST IS EMPTY
          ====================================== */}

      {employees.length === 0 ? (

        <p>No employees found.</p>

      ) : (

        <table border="1">

          {/* ====================================
              TABLE HEADER
              ==================================== */}

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Salary</th>
            </tr>

          </thead>


          {/* ====================================
              TABLE BODY
              ==================================== */}

          <tbody>

            {employees.map((employee) => (

              <tr key={employee._id}>

                <td>{employee.name}</td>

                <td>{employee.email}</td>

                <td>{employee.phone}</td>

                <td>{employee.department}</td>

                <td>{employee.designation}</td>

                <td>{employee.salary}</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  );
}


// ==========================================
// EXPORT COMPONENT
// ==========================================

export default EmployeeList;