import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const AddSupplier = () => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!name ) {
            setError('Please fill in all fields correctly.');
            return;
        }

        const newSupplier = { name };
        setLoading(true);
        setError('');

        try {
            await axios.post('/suppliers/save', newSupplier);
            alert('Supplier has been added!');
            setName('');
            
        } catch (error) {
            console.error('Error adding category:', error);
            setError('An error occurred while adding the supplier.!');
        } finally {
            setLoading(false);
        }
    };

    const goBackToSupplierList = () => {
        navigate('/suppliers');
    };

    return (
        <div className="container">
            <h2 className="my-4">Create</h2>
            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <input 
                        type="text" 
                        id="name"
                        className="form-control" 
                        placeholder="Supplier Name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
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
                        {loading ? 'Adding supplier...' : 'Adding supplier'}
                    </button>
                    ||
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={goBackToSupplierList}
                    >
                        Back to Supplier List
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSupplier;
