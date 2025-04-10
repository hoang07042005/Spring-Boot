import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import AddDepartment from "./components/Departments/AddDepartment";
import DepartmentsList from "./components/Departments/DepartmentsList";
import UpdateDepartment from "./components/Departments/UpdateDepartment";
import AddEmployee from "./components/Employess/AddEmployee";
import EmployeesList from "./components/Employess/EmployessList";
import UpdateEmployee from "./components/Employess/UpdateEmployee";
import AddProject from "./components/Projects/AddProject";
import ProjectsList from "./components/Projects/ProjectsList";
import UpdateProject from "./components/Projects/UpdateProject";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/departments">Departments</Link></li>
            <li><Link to="/employees">Employees</Link></li>
            <li><Link to="/projects">Projects</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/departments" element={<DepartmentsList />} />
          <Route path="/add-department" element={<AddDepartment />} />
          <Route path="/edit-department/:departmentId" element={<UpdateDepartment />} />
          
          <Route path="/employees" element={<EmployeesList />} />
          <Route path="/add-employees" element={<AddEmployee />} />
          <Route path="/edit-employees/:employeeId" element={<UpdateEmployee />} />
          
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/add-projects" element={<AddProject />} />
          <Route path="/edit-projects/:projectId" element={<UpdateProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
