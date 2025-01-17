import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SupplierList = () => {
    const [suppliers, setSupplier] = useState([]); // Lưu trữ danh sách sản phẩm
    const [loading, setLoading] = useState(true); // Trạng thái đang tải
    const [error, setError] = useState(null); // Trạng thái lỗi

    const fetchSupplier = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/suppliers');
            console.log('Fetched Suppliers:', response.data);
            setSupplier(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching supplier:', error);
            setError(`Error: ${error.response?.status || '500'} - ${error.response?.data || 'Unable to connect to server!'}`);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchSupplier();
    }, []);

    const handleDelete = async (supplierId) => {
        try {
            await axios.delete(`/suppliers/delete/${supplierId}`);
            alert('The provider has been removed.!');
            fetchSupplier();
        } catch (error) {
            console.error('Error deleting supplier:', error);
            alert('An error occurred while deleting the provider.!');
        }
    };



    if (loading) {
        return <div>Loading supplier list...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h3>Supplier List</h3>
            <Link to="/add-suppliers" className="btn btn-primary mb-3">Create</Link>
            {suppliers.length > 0 ? (
                <table className="table table-bordered ">
                    <thead>
                        <tr>
                            <th>Supplier</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map(supplier => (
                            <tr key={supplier.id}>
                                <td>{supplier.name || 'Chưa có tên'}</td>
                                
                                <td>
                                <Link to={`/edit-suppliers/${supplier.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>

||
                                    <button 
                                        className="btn btn-danger btn-sm" 
                                        onClick={() => handleDelete(supplier.id)}
                                    >
                                       Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Không có sản phẩm nào để hiển thị.</p>
            )}
        </div>
    );
};

export default SupplierList;
