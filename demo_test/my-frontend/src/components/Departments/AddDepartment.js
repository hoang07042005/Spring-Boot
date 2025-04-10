import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const AddDepartment = () => {
    const [departmentName, setDepartmentName] = useState('');
    const [location, setLocation] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!departmentName || !location) {
            setError('Please fill in all fields correctly.');
            return;
        }

        const newDepartment = { departmentName, location };
        setLoading(true);
        setError('');

        try {
            await axios.post('/departments/save', newDepartment);
            alert('Department has been added!');
            setDepartmentName('');
            setLocation('');
            navigate('/departments');
            
        } catch (error) {
            console.error('Error adding department:', error);
            setError('An error occurred while adding the department.!');
        } finally {
            setLoading(false);
        }
    };

    const goBackToDepartmentList = () => {
        navigate('/departments');
    };

    return (
        <div className="container">
            <h2 className="my-4">Create Department</h2>
            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <input 
                        type="text" 
                        id="name"
                        className="form-control" 
                        placeholder="Department Name"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)} 
                        required 
                        style={{ width: '450px' }}
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        id="name"
                        className="form-control" 
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required 
                        style={{ width: '450px' }}
                    />
                </div>
                
                <div className="d-flex ">
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        disabled={loading}
                    >
                        {loading ? 'Adding department...' : 'Adding department'}
                    </button>
                    ||
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

export default AddDepartment;
