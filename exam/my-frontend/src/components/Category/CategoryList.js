import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const [categories, setCategories] = useState([]); // Lưu trữ danh sách sản phẩm
    const [loading, setLoading] = useState(true); // Trạng thái đang tải
    const [error, setError] = useState(null); // Trạng thái lỗi

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/categories');
            console.log('Fetched Products:', response.data);
            setCategories(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(`Error: ${error.response?.status || '500'} - ${error.response?.data || 'Unable to connect to server!'}`);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (categoryId) => {
        try {
            await axios.delete(`/categories/delete/${categoryId}`);
            alert('Category has been deleted!');
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('An error occurred while deleting the category.!');
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
            <h3>Category</h3>
            <Link to="/add-category" className="btn btn-primary mb-3">Create</Link>
            {categories.length > 0 ? (
                <table className="table table-bordered ">
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.name || 'Chưa có tên'}</td>
                                
                                <td>
                                <Link to={`/edit-category/${category.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>

||
                                    <button 
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => handleDelete(category.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>There are no categories to display.</p>
            )}
        </div>
    );
};

export default CategoryList;
