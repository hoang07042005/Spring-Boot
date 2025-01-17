import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryList from "./components/Category/CategoryList";
import AddCategory from "./components/Category/AddCategory";
import UpdateCategory from "./components/Category/UpdateCategory";

import ProductList from "./components/Product/ProductList";
import AddProduct from "./components/Product/AddProduct";
import UpdateProduct from "./components/Product/UpdateProduct";

import SupplierList from "./components/Supplier/SupplierList";
import AddSupplier from "./components/Supplier/AddSupplier";
import UpdateSupplier from "./components/Supplier/UpdateSupplier";

import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
      <Router>
          <Navbar />
          <div>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/edit-product/:id" element={<UpdateProduct />} />

                <Route path="/categories" element={<CategoryList />} />
                <Route path="/add-category" element={<AddCategory />} />
                <Route path="/edit-category/:id" element={<UpdateCategory />} />

                <Route path="/suppliers" element={<SupplierList />} />
                <Route path="/add-suppliers" element={<AddSupplier />} />
                <Route path="/edit-suppliers/:id" element={<UpdateSupplier />} />


              </Routes>
          </div>
      </Router>
  );
}

export default App;
