package com.example.project.Project;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;


@RestController
@NoArgsConstructor
@AllArgsConstructor
@RequestMapping("/project")
@CrossOrigin("*")

public class ProjectController {
    @Autowired
    private  IProjectService projectService;


    @PostMapping("/addProject")
    public Project createProject(@RequestBody Project project) {
        return projectService.createProject(project);

    }
    @GetMapping("/getAllProject")
    public List<Project> getAllProjects() {

        return projectService.getAllProjects();
    }
    @GetMapping("/getProjectById/{id}")
    public Project getProjectById(@PathVariable String id) {

        return projectService.getProjectById(id);
    }

    @PutMapping("/update")
    public Project update(@RequestBody Project project){

        return projectService.update(project);
    }

    @DeleteMapping("/remove/{project-id}")
    public void removeProject(@PathVariable("project-id")String id){

        projectService.deleteProject(id);
    }
    @GetMapping("/{idProject}/tasks")
    public List<Task> getTasksByProjectId(@PathVariable String idProject) {
        return projectService.getTasksByProjectId(idProject);
    }
    @GetMapping("/countbydate")
    public List<ProjectStat> countByDate() {
        return projectService.countByDate();
    }



}
