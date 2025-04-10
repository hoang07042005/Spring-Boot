package com.example.demo_test.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo_test.entities.Project;
import com.example.demo_test.repositories.ProjectRepository;

import java.util.List;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElse(null);
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project updatedProject) {
        Project existingProject = projectRepository.findById(id).orElse(null);
        if (existingProject != null) {
            existingProject.setProjectName(updatedProject.getProjectName());
            existingProject.setStartDate(updatedProject.getStartDate());
            existingProject.setEndDate(updatedProject.getEndDate());
            existingProject.setManager(updatedProject.getManager());
            return projectRepository.save(existingProject);
        }
        return null;
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}