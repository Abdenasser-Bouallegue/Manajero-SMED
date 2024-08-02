package com.example.project.Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskImpService implements ITaskService {
    @Autowired
    private TaskRepository taskRepository;
    @Override
    public Task createTask(Task task) {

       return taskRepository.save(task);
    }

    public Task getTaskById(String id) {

        return taskRepository.findById(id).orElse(null);
    }
    public Task update(Task task){
        return taskRepository.save(task);
    }

    public void deleteTask(String id) {

        taskRepository.deleteById(id);
    }

}
