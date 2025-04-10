import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
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
                const departmentResponse = await axios.get('/departments');
                setDepartments(departmentResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load departments.');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!employeeName || !email || !departmentId) {
            setError('Please fill in all fields correctly.');
            return;
        }

        const newEmployee = {
            employeeName, 
            email,
            department: { departmentId: parseInt(departmentId) }, 
        };

      
        console.log('Data being sent:', JSON.stringify(newEmployee, null, 2));

        setLoading(true);
        setError('');

        try {
            await axios.post('/employees/save', newEmployee);
            alert('Employee added successfully!');
            setEmployeeName('');
            setEmail('');
            setDepartmentId('');
            navigate('/employees');
        } catch (error) {
            console.error('Error adding employee:', error);
            setError('An error occurred while adding the employee!');
        } finally {
            setLoading(false);
        }
    };

    const goBackToEmployeeList = () => {
        navigate('/employees');
    };

    return (
        <div className="container">
            <h2 className="my-4">Add Employee</h2>
            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <input
                        type="text"
                        id="name"
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
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        <option value="">Select Department</option>
                        {departments.map((department) => (
                            <option key={department.departmentId} value={department.departmentId}>
                                {department.departmentName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="d-flex">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Adding Employee...' : 'Add Employee'}
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

export default AddEmployee;