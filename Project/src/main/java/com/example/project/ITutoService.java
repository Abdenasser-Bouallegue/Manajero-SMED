package com.example.project;

import java.util.List;

public interface ITutoService {
  Tuto createTuto(Tuto project);
  public List<Tuto> getAllTutos();
  public Tuto getLatestTuto();
  public Tuto update(Tuto project);
  public void deleteTuto(String id);
}
