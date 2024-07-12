package com.example.project;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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




}
