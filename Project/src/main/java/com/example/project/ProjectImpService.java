package com.example.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectImpService implements IProjectService {
    @Autowired
    private ProjectRepository projectRepository;


    @Override
    public Project createProject(Project project) {
        return projectRepository.save(project);
    }
}
