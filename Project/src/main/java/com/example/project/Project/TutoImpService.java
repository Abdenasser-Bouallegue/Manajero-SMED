package com.example.project.Project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutoImpService implements ITutoService {
    @Autowired
    private TutoRepository tutoRepository;


    @Override
    public Tuto createTuto(Tuto tuto) {
        return tutoRepository.save(tuto);
    }
    public List<Tuto> getAllTutos() {

        return tutoRepository.findAll();
    }


    public Tuto update(Tuto tuto){
        return tutoRepository.save(tuto);
    }

    public void deleteTuto(String id) {

        tutoRepository.deleteById(id);
    }
    public Tuto getLatestTuto() {
        return tutoRepository.findTopByOrderByCreatedDateDesc();
    }

}
