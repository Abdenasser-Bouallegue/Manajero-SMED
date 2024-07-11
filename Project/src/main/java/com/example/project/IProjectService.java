package com.example.project;

import java.util.List;

public interface IProjectService {
  Project createProject(Project project);
  public List<Project> getAllProjects();
  public Project getProjectById(String id);
  public Project updateProject(String id, Project project);
  public void deleteProject(String id);
}
