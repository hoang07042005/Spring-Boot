package com.example.demo_test.entities;

import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    private String employeeName;
    private String email;

    @ManyToOne
    @JoinColumn(name = "department_id")
    @JsonBackReference
    private Department department;

    @OneToMany(mappedBy = "manager", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Project> projects;
}