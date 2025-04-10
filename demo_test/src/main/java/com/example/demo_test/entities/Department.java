package com.example.demo_test.entities;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;

@Entity
@Data
@Table(name = "departments")
public class Department {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long departmentId;

    private String departmentName;
    private String location;

    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Employee> employees;
}