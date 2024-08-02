package com.example.project.Project;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@NoArgsConstructor
@AllArgsConstructor
@RequestMapping("/task")
@CrossOrigin("*")
public class TaskController {
    @Autowired
private  ITaskService iTaskService;
    @PostMapping("/addTask")
    public Task createTask(@RequestBody Task task) {
        return iTaskService.createTask(task);

    }
    @GetMapping("/getTaskById/{id}")
    public Task getTaskById(@PathVariable String id) {

        return iTaskService.getTaskById(id);
    }
    @PutMapping("/update")
    public Task update(@RequestBody Task task){

        return iTaskService.update(task);
    }

    @DeleteMapping("/remove/{id}")
    public void removeTask(@PathVariable("id")String id){

        iTaskService.deleteTask(id);
    }

}
