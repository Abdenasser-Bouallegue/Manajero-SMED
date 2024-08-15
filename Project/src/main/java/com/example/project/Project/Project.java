package com.example.project.Project;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "Project")
public class Project implements Serializable {
    @Id
    private String idProject;

    @Field(name="project-name")
    private String nameProject;

    private String projectOwner = "IPact";
    private LocalDateTime createdDate = LocalDateTime.now();
    private Long estimatedTime;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date deadline;
    private boolean archived=false;
    private List<Task> taskIds;
}
