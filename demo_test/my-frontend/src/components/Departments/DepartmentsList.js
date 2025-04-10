    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { Link } from 'react-router-dom';

    const DepartmentsList = () => {
        const [departments, setDepartment] = useState([]);
        const [loading, setLoading] = useState(true); 
        const [error, setError] = useState(null); 

        const fetchDepartment = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/departments');
                console.log('Fetched Department:', response.data);
                setDepartment(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching department:', error);
                setError(`Error: ${error.response?.status || '500'} - ${error.response?.data || 'Unable to connect to server!'}`);
            } finally {
                setLoading(false);
            }
        };
        

        useEffect(() => {
            fetchDepartment();
        }, []);

        const handleDelete = async (departmentId) => {
            try {
                await axios.delete(`/departments/delete/${departmentId}`);
                alert('Department has been deleted!');
                fetchDepartment();
            } catch (error) {
                console.error('Error deleting department:', error);
                alert('An error occurred while deleting the department.!');
            }
        };



        if (loading) {
            return <div>Loading catalog...</div>;
        }

        if (error) {
            return <div>{error}</div>;
        }

        return (
            <div className="container mt-4">
                <h3>Department</h3>
                <Link to="/add-department" className="btn btn-primary mb-3">Create</Link>
                {departments.length > 0 ? (
                    <table className="table table-bordered ">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map(department => (
                                <tr key={department.departmentId}>
                                    <td>{department.departmentName || 'Chưa có tên'}</td>
                                    <td>{department.location || 'Chưa có vị trí'}</td>
                                    <td>
                                    <Link to={`/edit-department/${department.departmentId}`} className="btn btn-warning btn-sm me-2">Edit</Link>

    ||
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => handleDelete(department.departmentId)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>There are no departments to display.</p>
                )}
            </div>
        );
    };

    export default DepartmentsList;
