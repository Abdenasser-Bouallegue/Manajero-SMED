package com.example.project.Project;

import java.util.Date;
import java.util.List;

public interface IProjectService {
  Project createProject(Project project);
  public List<Project> getAllProjects();
  public Project getProjectById(String id);
  public Project update( Project project);
  public void deleteProject(String id);
  List<Task> getTasksByProjectId(String idProject);
  public  List<ProjectStat> countByDate();
}
