package com.guardines.backend.controllers;

import com.guardines.backend.models.Note;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/notes")
public class NoteController {

  private List<Note> notes = new ArrayList<>();

  @GetMapping("/{noteId}")
  public Note getNoteById(@PathVariable("noteId") Long id){
    return notes.stream()
        .filter(note -> note.getId().equals(id))
        .findFirst()
        .orElse(null);
  }

  @GetMapping
  public List<Note> getNotes(){
    return notes;
  }

  @PostMapping
  public void createNote(@RequestBody Note note){
    note.setId((long) (notes.size() + 1));
    notes.add(note);
    System.out.println("Note created successfully: " + note.getTitle());
  }

  @PutMapping("/{noteId}")
  public void updateNote(@PathVariable("noteId") Long id, @RequestBody Note updateNote){
    notes.stream()
        .filter(note -> note.getId().equals(id))
        .findFirst()
        .ifPresent(note -> {
          note.setTitle(updateNote.getTitle());
          note.setContent(updateNote.getContent());
          System.out.println("Note updated successfully: " + note.getTitle());
        });
  }

  @DeleteMapping("/{noteId}")
  public void deleteNote(@PathVariable("noteId") Long id){
    boolean removed = notes.removeIf(note -> note.getId().equals(id));

    if(removed){
      System.out.println("Note deleted successfully with ID: " + id);
    }else{
      System.out.println("Note not found with ID: " + id);
    }
  }


  @PutMapping("/{noteId}/archive")
  public void archiveNote(@PathVariable("noteId") Long id){
    notes.stream()
        .filter(note -> note.getId().equals(id))
        .findFirst()
        .ifPresent(note -> {
          note.setArchived(true);
          System.out.println("Note archived successfully: " + note.getTitle());
        });
  }

  @PutMapping("/{noteId}/unarchive")
  public void unarchiveNote(@PathVariable("noteId") Long id){
    notes.stream()
        .filter(note -> note.getId().equals(id))
        .findFirst()
        .ifPresent(note -> {
          note.setArchived(false);
          System.out.println("Note unarchive successfully: " + note.getTitle());
        });
  }

  @GetMapping("/archive")
  public List<Note> getArchive(){
    return notes.stream()
        .filter(note -> note.isArchived())
        .collect(Collectors.toList());
  }

  @GetMapping("/active")
  public List<Note> getActive(){
    return notes.stream()
        .filter(note -> !note.isArchived())
        .collect(Collectors.toList());
  }
}