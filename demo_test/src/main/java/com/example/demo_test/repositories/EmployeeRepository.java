package com.example.demo_test.repositories;




import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo_test.entities.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}