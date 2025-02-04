import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/products');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/products/delete/${id}`);
            alert('Deleted successfully!');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting:', error);
            alert('An error occurred while deleting.');
        }
    };

    if (loading) {
        return <p>Loading products...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Products</h1>
            <Link to="/add-product" className="btn btn-primary mb-3">Create</Link>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Supplier</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.category.name}</td>
                        <td>{product.supplier.name}</td>
                        <td>
                            <Link to={`/edit-product/${product.id}`}
                                  className="btn btn-warning btn-sm me-2">Edit</Link>

                            ||
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(product.id)}
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

export default ProductList;
