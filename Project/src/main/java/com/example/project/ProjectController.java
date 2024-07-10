package com.example.project;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


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
}
