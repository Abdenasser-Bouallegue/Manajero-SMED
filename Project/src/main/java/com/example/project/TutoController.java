package com.example.project;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public Tuto createTuto(@RequestBody Tuto tuto) {
        return tutoService.createTuto(tuto);

    }
    @GetMapping("/getAllTutos")
    public List<Tuto> getAllTutos() {
        return tutoService.getAllTutos();
    }
    @GetMapping("/getTutoById/{id}")
    public Tuto getTutoById(@PathVariable String id) {

        return tutoService.getTutoById(id);
    }

    @PutMapping("/update")
    public Tuto update(@RequestBody Tuto tuto){

        return tutoService.update(tuto);
    }

    @DeleteMapping("/remove/{tuto-id}")
    public void removeTuto(@PathVariable("tuto-id")String id){

        tutoService.deleteTuto(id);
    }




}
