package com.example.demo_test.entities;

import jakarta.persistence.*;
import lombok.Data;


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

    @ManyToOne(fetch = FetchType.EAGER) // Luôn fetch manager
    @JoinColumn(name = "manager_id")
    private Employee manager;
}
