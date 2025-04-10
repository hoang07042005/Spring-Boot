import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployessList from "./components/Employess/EmployessList";
import AddEmployee from "./components/Employess/AddEmployee";
import UpdateEmployee from "./components/Employess/UpdateEmployee";




function App() {
  return (
      <Router>
          <div>
              <Routes>
                <Route path="/" element={<EmployessList />} />
                <Route path="/add-employee" element={<AddEmployee />} />
                <Route path="/edit-employee/:id" element={<UpdateEmployee />} />

              </Routes>
          </div>
      </Router>
  );
}

export default App;
