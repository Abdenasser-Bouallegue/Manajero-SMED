package com.example.project.Project;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.*;
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
@Document(value = "Tuto")
@Data
@Builder
public class Tuto implements Serializable {
    @Id
    private String idTuto;
    private String why;
    private String what;
    private String how;
    private String what_if;
    private LocalDateTime createdDate=LocalDateTime.now();
    @Lob
    @Column(length = 209715200)
    private byte[] image_what;
    @Lob
    @Column(length = 209715200)
    private byte[] image_how;




}
