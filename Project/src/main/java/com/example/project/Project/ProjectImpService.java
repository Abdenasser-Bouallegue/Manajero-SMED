package com.example.project.Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ProjectImpService implements IProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    private TaskRepository taskRepository;


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

    public Project update(Project project){
        return projectRepository.save(project);
    }

    public void deleteProject(String id) {

        projectRepository.deleteById(id);
    }

    @Autowired
    public void ProjectService(ProjectRepository projectRepository, TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
    }

    public List<Task> getTasksByProjectId(String idProject) {
        Project project = projectRepository.findById(idProject).orElse(null);
        if (project != null) {
            return taskRepository.findByProjectId(idProject);
        }
        return null;
    }
    public List<ProjectStat> countByDate() {
        return projectRepository.countByDate();
    }


}
