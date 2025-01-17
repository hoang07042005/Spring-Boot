package com.example.exam.controllers;

import com.example.exam.entities.Supplier;
import com.example.exam.services.ISupplierService;
import org.springframework.web.bind.annotation.*;
import java.util.List;



@RestController
@RequestMapping("/suppliers")
public class SupplierController {

    private final ISupplierService supplierService;

    public SupplierController(ISupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping
    public List<Supplier> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    @GetMapping("/{id}")
    public Supplier getSupplierById(@PathVariable int id) {
        return supplierService.getSupplierById(id);
    }

    @PostMapping("/save")
    public Supplier createSupplier(@RequestBody Supplier supplier) {
        return supplierService.saveSupplier(supplier);
    }

    @PutMapping("/update/{id}")
    public Supplier updateSupplier(@PathVariable int id, @RequestBody Supplier supplier) {
        return supplierService.updateSupplier(id, supplier); // Gọi phương thức update
    }

    @DeleteMapping("/delete/{id}")
    public void deleteSupplier(@PathVariable int id) {
        supplierService.deleteSupplier(id);
    }
}


