package com.example.demo_test.repositories;




import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo_test.entities.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}