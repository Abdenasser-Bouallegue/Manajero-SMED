package com.example.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Project updateForum(Project project) {

        return projectRepository.save(project);
    }

    public void deleteProject(String id) {

        projectRepository.deleteById(id);
    }


}
