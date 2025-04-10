package com.example.demo_test.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo_test.entities.Department;
import com.example.demo_test.repositories.DepartmentRepository;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    private DepartmentRepository departmentRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id).orElse(null);
    }

    public Department createDepartment(Department department) {
        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, Department updatedDepartment) {
        Department existingDepartment = departmentRepository.findById(id).orElse(null);
        if (existingDepartment != null) {
            existingDepartment.setDepartmentName(updatedDepartment.getDepartmentName());
            existingDepartment.setLocation(updatedDepartment.getLocation());
            return departmentRepository.save(existingDepartment);
        }
        return null;
    }

    public void deleteDepartment(Long id) {
        departmentRepository.deleteById(id);
    }
}