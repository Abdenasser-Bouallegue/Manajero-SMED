package com.example.project.Project;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectStat {
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date deadline;
    private long count;

    public ProjectStat(long count, Date deadline) {
        this.count = count;
        this.deadline = deadline;
    }
}
