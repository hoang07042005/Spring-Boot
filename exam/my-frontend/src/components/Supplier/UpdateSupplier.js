import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateSupplier = () => {
    const { id } = useParams();  // Get the ID from the URL
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`/suppliers/${id}`);
                const supplier = response.data;
                setName(supplier.name);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [id]);


    const goBackToCategoryList = () => {
        navigate('/suppliers');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedSupplier = { name };

        try {
            await axios.put(`/suppliers/update/${id}`, updatedSupplier);
            alert('Supplier has been updated!');
            // Reset form
            setName('');
        } catch (error) {
            console.error('Error updating category:', error);
            alert('An error occurred while updating. !');
        }
    };

    return (
        <div className="container">
            <h2 className=" mb-4">Update supplier</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Supplier Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        required    
                        style={{ width: '450px' }}
                    />
                </div>
                
                <div className="col-12">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                    >
                        Update supplier
                            
                    </button>
                    ||
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={goBackToCategoryList}
                    >
                        Back to Supplier List
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateSupplier;
