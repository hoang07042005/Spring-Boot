import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams();
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

                const productResponse = await axios.get(`/products/${id}`);
                const product = productResponse.data;
                setName(product.name);
                setPrice(product.price);
                setCategoryId(product.category.id);
                setSupplierId(product.supplier.id);


                const categoryResponse = await axios.get('/categories');
                const supplierResponse = await axios.get('/suppliers');
                setCategories(categoryResponse.data);
                setSuppliers(supplierResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load categories, suppliers, or product details.');
            }
        };

        fetchData();
    }, [id]);

    const goBackToProductList = () => {
        navigate('/');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !categoryId || !supplierId || price <= 0) {
            setError('Please fill in all fields correctly!');
            return;
        }

        const updatedProduct = {
            name,
            price: parseFloat(price),
            category: { id: parseInt(categoryId) },
            supplier: { id: parseInt(supplierId) },
        };

        setLoading(true);
        setError('');

        try {
            await axios.put(`/products/update/${id}`, updatedProduct);
            alert('Product updated successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error updating product:', error);
            setError('An error occurred while updating the product!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-4">Update Product</h2>
            {error && <p className="text-danger">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
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
                        className="form-control"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        min="0"
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

                <div className="col-12">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Updating Product...' : 'Update Product'}
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

export default UpdateProduct;
