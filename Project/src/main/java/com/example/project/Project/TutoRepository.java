package com.example.project.Project;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutoRepository extends MongoRepository<Tuto,String> {
    Tuto findTopByOrderByCreatedDateDesc();
}
