package com.example.exam.services;

import com.example.exam.entities.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategories();
    Category getCategoryById(int id);
    Category saveCategory(Category category);
    void deleteCategory(int id);
    Category updateCategory(int id, Category category);
}

