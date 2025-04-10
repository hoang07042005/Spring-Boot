import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
    const [projectName, setProjectName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [managerId, setManagerId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeeResponse = await axios.get('/employees');
                setEmployees(employeeResponse.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
                setError('Failed to load employees.');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!projectName || !startDate || !managerId) {
            setError('Please fill in all required fields.');
            return;
        }

        const newProject = {
            projectName,
            startDate: new Date(startDate).toISOString(), 
            endDate: endDate ? new Date(endDate).toISOString() : null,
            manager: { employeeId: parseInt(managerId) },
        };

        console.log('Data being sent:', JSON.stringify(newProject, null, 2));

        setLoading(true);
        setError('');

        try {
            await axios.post('/projects/save', newProject);
            alert('Project added successfully!');
            setProjectName('');
            setStartDate('');
            setEndDate('');
            setManagerId('');
            navigate('/projects');
        } catch (error) {
            console.error('Error adding project:', error);
            setError('An error occurred while adding the project!');
        } finally {
            setLoading(false);
        }
    };

    const goBackToProjectList = () => {
        navigate('/projects');
    };

    return (
        <div className="container">
            <h2 className="my-4">Add Project</h2>
            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <input
                        type="text"
                        id="projectName"
                        className="form-control"
                        placeholder="Project Name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                        style={{ width: '450px' }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="startDate" className="form-label">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        style={{ width: '450px' }}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="endDate" className="form-label">End Date (Optional)</label>
                    <input
                        type="date"
                        id="endDate"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ width: '450px' }}
                    />
                </div>
                <div className="mb-3">
                    <select
                        id="managerId"
                        className="form-control"
                        value={managerId}
                        onChange={(e) => setManagerId(e.target.value)}
                        required
                        style={{ width: '450px' }}
                    >
                        <option value="">Select Manager</option>
                        {employees.map((employee) => (
                            <option key={employee.employeeId} value={employee.employeeId}>
                                {employee.employeeName}
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
                        {loading ? 'Adding Project...' : 'Add Project'}
                    </button>
                    <span style={{ margin: '0 10px' }}>||</span>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={goBackToProjectList}
                    >
                        Back to Project List
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProject;