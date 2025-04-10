import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeesList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/employees');
            setEmployees(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            await axios.delete(`/employees/delete/${employeeId}`);
            alert('Deleted successfully!');
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting:', error);
            alert('An error occurred while deleting.');
        }
    };

    if (loading) return <p>Loading employees...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Employees</h1>
            <Link to="/add-employees" className="btn btn-primary mb-3">Create</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.employeeId}>
                            <td>{employee.employeeId}</td>
                            <td>{employee.employeeName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department?.departmentName}</td>
                            <td>
                                <Link 
                                    to={`/edit-employees/${employee.employeeId}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(employee.employeeId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeesList;