import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
function App() {
  return (
    <div>
      <h1>Employee Management System</h1>
      <p>Manage your employees easily.</p>
      <hr></hr>
      <EmployeeForm />
      <hr></hr>
      <EmployeeList/>
    </div>
  );
}

export default App;