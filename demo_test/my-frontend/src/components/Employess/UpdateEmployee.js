import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEmployee = () => {
    const { employeeId } = useParams();
    const [employeeName, setEmployeeName] = useState('');
    const [email, setEmail] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [departments, setDepartments] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {

                const employeeResponse = await axios.get(`/employees/${employeeId}`);
                const employee = employeeResponse.data;
                setEmployeeName(employee.employeeName);
                setEmail(employee.email);
                setDepartmentId(employee.department?.departmentId);

                const departmentResponse = await axios.get('/departments');
                setDepartments(departmentResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load departments details.');
            }
        };

        fetchData();
    }, [employeeId]);

    const goBackToEmployeeList = () => {
        navigate('/employees');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employeeName || !email || !departmentId) {
            setError('Please fill in all fields correctly!');
            return;
        }

        const updatedEmployee = {
            employeeName, 
            email,
            department: { departmentId: parseInt(departmentId) }, 
        };

        console.log('Data being sent:', JSON.stringify(updatedEmployee, null, 2));

        setLoading(true);
        setError('');

        try {
            await axios.put(`/employees/update/${employeeId}`, updatedEmployee);
            alert('Employee updated successfully!');
            navigate('/employees');
        } catch (error) {
            console.error('Error updating Employee:', error);
            setError('An error occurred while updating the Employee!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Update Employee</h2>
            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={employeeName}
                        onChange={(e) => setEmployeeName(e.target.value)}
                        required
                        style={{ width: '450px' }}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        min="0"
                        style={{ width: '450px' }}
                    />
                </div>

                <div className="mb-3">
                    <select
                        id="categoryId"
                        className="form-control"
                        value={departmentId}
                        onChange={(e) => setDepartmentId(e.target.value)}
                        required
                        style={{ width: '450px' }}
                    >
                        <option value="">Select Employee</option>
                        {departments.map((department) => (
                            <option key={department.departmentId} value={department.departmentId}>
                                {department.departmentName}
                            </option>
                        ))}
                    </select>
                </div>

            

                <div className="col-12">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Updating Employee...' : 'Update Employee'}
                    </button>
                    <span style={{ margin: '0 10px' }}>||</span>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={goBackToEmployeeList}
                    >
                        Back to Employee List
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployee;
