import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCategory = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`/categories/${id}`);
                const category = response.data;
                setName(category.name);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [id]);

    const goBackToCategoryList = () => {
        navigate('/categories');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedCategory = { name };

        try {
            await axios.put(`/categories/update/${id}`, updatedCategory);
            alert('Category updated successfully!');
            // Reset form
            setName('');
            navigate('/categories');
        } catch (error) {
            console.error('Error updating category:', error);
            alert('An error occurred while updating the category!');
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Update Category</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Category Name"
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
                        Update Category
                    </button>
                    <span style={{ margin: '0 10px' }}>||</span>
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

export default UpdateCategory;
