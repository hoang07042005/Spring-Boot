package com.example.demo_test.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo_test.entities.Employee;
import com.example.demo_test.repositories.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
        if (existingEmployee != null) {
            existingEmployee.setEmployeeName(updatedEmployee.getEmployeeName());
            existingEmployee.setEmail(updatedEmployee.getEmail());
            existingEmployee.setDepartment(updatedEmployee.getDepartment());
            return employeeRepository.save(existingEmployee);
        }
        return null;
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}