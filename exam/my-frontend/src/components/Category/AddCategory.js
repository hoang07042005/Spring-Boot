import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const AddCategory = () => {
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

        const newCategory = { name };
        setLoading(true);
        setError('');

        try {
            await axios.post('/categories/save', newCategory);
            alert('Category has been added!');
            setName('');
            
        } catch (error) {
            console.error('Error adding category:', error);
            setError('An error occurred while adding the category.!');
        } finally {
            setLoading(false);
        }
    };

    const goBackToCategoryList = () => {
        navigate('/categories');
    };

    return (
        <div className="container">
            <h2 className="my-4">Create Category</h2>
            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <input 
                        type="text" 
                        id="name"
                        className="form-control" 
                        placeholder="Category Name"
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
                        {loading ? 'Adding category...' : 'Adding category'}
                    </button>
                    ||
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={goBackToCategoryList}
                    >
                        Back to Category List
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCategory;
