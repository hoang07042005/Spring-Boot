package com.example.exam.services;

import com.example.exam.entities.Product;

import java.util.List;

public interface IProductService {
    List<Product> getAllProducts();
    Product getProductById(int id);
    Product saveProduct(Product product);
    void deleteProduct(int id);
    Product updateProduct(int id, Product product);
}

