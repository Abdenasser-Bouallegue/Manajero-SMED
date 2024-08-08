package com.example.project.Project;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Task")
@Data
@Builder
public class Task implements Serializable {
    @Id
    private String idTask;
    private String taskName;
    private String manager = "Ipact";
    private String desc;
    private LocalDateTime createdDate = LocalDateTime.now();
    private Long estimatedTime;
    private Date deadline;
    private String employer;
    @Enumerated(EnumType.STRING)
    private taskType taskType;
    private String projectId;
    private  Status status= Status.valueOf("StandBy");
}
