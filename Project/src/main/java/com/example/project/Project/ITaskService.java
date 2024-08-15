package com.example.project.Project;

import java.util.List;

public interface ITaskService {
    Task createTask(Task task);

    Task getTaskById(String id);
    Task update(Task task);
    public void deleteTask(String id);
    public List<Task> getAllTasks();
}
