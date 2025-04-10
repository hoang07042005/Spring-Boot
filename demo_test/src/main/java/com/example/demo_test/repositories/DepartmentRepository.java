package com.example.demo_test.repositories;



import com.example.demo_test.entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
}