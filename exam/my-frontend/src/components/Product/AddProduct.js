import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [supplierId, setSupplierId] = useState('');

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await axios.get('/categories');
                const supplierResponse = await axios.get('/suppliers');
                setCategories(categoryResponse.data);
                setSuppliers(supplierResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load categories or suppliers.');
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !categoryId || !supplierId || price <= 0) {
            setError('Please fill in all fields correctly.');
            return;
        }

        const newProduct = {
            name,
            price: parseFloat(price),
            category: { id: parseInt(categoryId) },
            supplier: { id: parseInt(supplierId) },
        };
        setLoading(true);
        setError('');

        try {
            await axios.post('/products/save', newProduct);
            alert('Product added successfully!');
            // Reset form
            setName('');
            setPrice('');
            setCategoryId('');
            setSupplierId('');
        } catch (error) {
            console.error('Error adding product:', error);
            setError('An error occurred while adding the product!');
        } finally {
            setLoading(false);
        }
    };

    const goBackToProductList = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <h2 className="my-4">Add Product</h2>
            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        style={{ width: '450px' }}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        id="price"
                        className="form-control"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        min="1"
                        style={{ width: '450px' }}
                    />
                </div>

                <div className="mb-3">
                    <select
                        id="categoryId"
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                        style={{ width: '450px' }}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <select
                        id="supplierId"
                        className="form-control"
                        value={supplierId}
                        onChange={(e) => setSupplierId(e.target.value)}
                        required
                        style={{ width: '450px' }}
                    >
                        <option value="">Select Supplier</option>
                        {suppliers.map((supplier) => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="d-flex">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Adding Product...' : 'Add Product'}
                    </button>
                    <span style={{ margin: '0 10px' }}>||</span>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={goBackToProductList}
                    >
                        Back to Product List
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
