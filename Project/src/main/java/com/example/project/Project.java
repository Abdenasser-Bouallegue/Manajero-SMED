package com.example.project;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(value = "Project")
@Data
@Builder
public class Project implements Serializable {
    @Id
    private String idProject;


    @Field(name="project-name")
    private String nameProject;
    private LocalDateTime createdDate=LocalDateTime.now();

    private Long estimatedTime;


    @JsonFormat(pattern = "yyyy-MM-dd")

    private  Date deadline;




}
