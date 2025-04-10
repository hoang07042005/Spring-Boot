import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProject = () => {
    const [projectName, setProjectName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [managerId, setManagerId] = useState('');
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { projectId } = useParams(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeeResponse = await axios.get('/employees');
                setEmployees(employeeResponse.data);

                const projectResponse = await axios.get(`/projects/${projectId}`);
                const project = projectResponse.data;
                setProjectName(project.projectName);
                setStartDate(project.startDate ? new Date(project.startDate).toISOString().split('T')[0] : '');
                setEndDate(project.endDate ? new Date(project.endDate).toISOString().split('T')[0] : '');
                setManagerId(project.manager ? project.manager.employeeId : '');
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load project or employees.');
            }
        };

        fetchData();
    }, [projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!projectName || !startDate || !managerId) {
            setError('Please fill in all required fields.');
            return;
        }

        const updatedProject = {
            projectName,
            startDate: new Date(startDate).toISOString(),
            endDate: endDate ? new Date(endDate).toISOString() : null,
            manager: { employeeId: parseInt(managerId) },
        };

        console.log('Data being sent:', JSON.stringify(updatedProject, null, 2));

        setLoading(true);
        setError('');

        try {
            await axios.put(`/projects/update/${projectId}`, updatedProject);
            alert('Project updated successfully!');
            navigate('/projects');
        } catch (error) {
            console.error('Error updating project:', error);
            setError('An error occurred while updating the project!');
        } finally {
            setLoading(false);
        }
    };

    const goBackToProjectList = () => {
        navigate('/projects');
    };

    return (
        <div className="container">
            <h2 className="my-4">Edit Project</h2>
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
                        {loading ? 'Updating Project...' : 'Update Project'}
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

export default EditProject;