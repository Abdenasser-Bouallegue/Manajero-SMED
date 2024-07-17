package com.example.project;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@NoArgsConstructor
@AllArgsConstructor
@RequestMapping("/tuto")
@CrossOrigin("*")

public class TutoController {
    @Autowired
    private ITutoService tutoService;


    @PostMapping("/addTuto")
    public ResponseEntity<Tuto> createTuto(@RequestParam("how") String how,
                                           @RequestParam("what") String what,
                                           @RequestParam("why") String why ,
                                           @RequestParam("what_if") String what_if,
                                           @RequestParam("image_how") MultipartFile file_how,
                                           @RequestParam("image_what") MultipartFile file_what)  throws IOException {

        Tuto tuto=new Tuto();
        tuto.setImage_how(file_how.getBytes());
        tuto.setImage_what(file_what.getBytes());
        tuto.setHow(how);
        tuto.setWhat(what);
        tuto.setWhy(why);
        tuto.setWhat_if(what_if);
        Tuto savedTuto = tutoService.createTuto(tuto);
        return ResponseEntity.ok(savedTuto);

    }
    @GetMapping("/getAllTutos")
    public List<Tuto> getAllTutos() {
        return tutoService.getAllTutos();
    }

    @PutMapping("/update")
    public Tuto update(@RequestBody Tuto tuto){

        return tutoService.update(tuto);
    }

    @DeleteMapping("/remove/{tuto-id}")
    public void removeTuto(@PathVariable("tuto-id")String id){

        tutoService.deleteTuto(id);
    }
    @GetMapping("/latest")
    public ResponseEntity<Tuto> getLatestTuto() {
        Tuto latestTuto = tutoService.getLatestTuto();
        return ResponseEntity.ok(latestTuto);
    }




}
