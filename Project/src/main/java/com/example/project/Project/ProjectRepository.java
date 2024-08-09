package com.example.project.Project;


import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Date;
import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {

    @Aggregation(pipeline = {
            "{ '$match': { 'deadline': ?0 } }",
            "{ '$group': { '_id': '$deadline', 'count': { '$sum': 1 } } }",
            "{ '$project': { 'count': 1, 'deadline': '$_id' } }"
    })
    List<ProjectStat> countByDate();
}