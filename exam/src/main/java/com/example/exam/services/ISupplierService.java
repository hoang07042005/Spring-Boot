package com.example.exam.services;

import com.example.exam.entities.Supplier;

import java.util.List;

public interface ISupplierService {
    List<Supplier> getAllSuppliers();
    Supplier getSupplierById(int id);
    Supplier saveSupplier(Supplier supplier);
    void deleteSupplier(int id);
    Supplier updateSupplier(int id, Supplier supplier);
}
