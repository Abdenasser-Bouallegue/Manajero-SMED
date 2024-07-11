package com.example.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectImpService implements IProjectService {
    @Autowired
    private ProjectRepository projectRepository;


    @Override
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
    public List<Project> getAllProjects() {

        return projectRepository.findAll();
    }

    public Project getProjectById(String id) {

        return projectRepository.findById(id).orElse(null);
    }

    public Project updateProject(String id, Project project) {
        Optional<Project> optionalProject = projectRepository.findById(id);
        if (optionalProject.isPresent()) {
            Project existingProject = optionalProject.get();
            existingProject.setNameProject(project.getNameProject());
            existingProject.setDeadline(project.getDeadline());
            existingProject.setEstimatedTime(project.getEstimatedTime());

            return projectRepository.save(existingProject);
        } else {
            throw new RuntimeException("Project not found with id " + id);
        }
    }

    public void deleteProject(String id) {

        projectRepository.deleteById(id);
    }


}
