import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDepartment = () => {
    const { departmentId } = useParams();
    const [departmentName, setDepartmentName] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const response = await axios.get(`/departments/${departmentId}`);
                const department = response.data;
                setDepartmentName(department.departmentName);
                setLocation(department.location);
            } catch (error) {
                console.error('Error fetching department:', error);
            }
        };

        fetchDepartment();
    }, [departmentId]);

    const goBackToDepartmentList = () => {
        navigate('/departments');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedDepartment = { departmentName, location };

        try {
            await axios.put(`/departments/update/${departmentId}`, updatedDepartment);
            alert('Department updated successfully!');
            // Reset form
            setDepartmentName('');
            setLocation('');
            navigate('/departments');
        } catch (error) {
            console.error('Error updating department:', error);
            alert('An error occurred while updating the department!');
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Update Department</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        required
                        style={{ width: '450px' }}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        style={{ width: '450px' }}
                    />
                </div>

                <div className="col-12">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Update Department
                    </button>
                    <span style={{ margin: '0 10px' }}>||</span>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={goBackToDepartmentList}
                    >
                        Back to Department List
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateDepartment;
