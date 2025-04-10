import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/projects');
            console.log('Projects data:', JSON.stringify(response.data, null, 2));
            setProjects(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (projectId) => {
        try {
            await axios.delete(`/projects/delete/${projectId}`);
            alert('Project deleted successfully!');
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('An error occurred while deleting.');
        }
    };

    if (loading) return <p>Loading projects...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Projects</h1>
            <Link to="/add-projects" className="btn btn-primary mb-3">Create Project</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Project Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Manager</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.projectId}>
                            <td>{project.projectId}</td>
                            <td>{project.projectName}</td>
                            <td>{project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</td>
                            <td>{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</td>
                            <td>{project.manager?.employeeName || 'N/A'}</td>
                            <td>
                                <Link
                                    to={`/edit-projects/${project.projectId}`}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(project.projectId)}
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

export default ProjectsList;