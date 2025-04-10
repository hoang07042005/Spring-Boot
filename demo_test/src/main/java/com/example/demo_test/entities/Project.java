package com.example.demo_test.entities;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.Date;

@Entity
@Data
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    private String projectName;
    private Date startDate;
    private Date endDate;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    @JsonBackReference
    private Employee manager;
}
