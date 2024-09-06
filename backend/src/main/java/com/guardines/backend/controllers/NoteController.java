package com.guardines.backend.controllers;

import com.guardines.backend.models.Note;
import com.guardines.backend.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

  @Autowired
  private NoteService noteService;

  @GetMapping("/{noteId}")
  public ResponseEntity<Note> getNoteById(@PathVariable("noteId") Long id){
    return ResponseEntity.ok(noteService.getNoteById(id));
  }

  @GetMapping
  public List<Note> getNotes(){
    return noteService.getAllNotes();
  }

  @PostMapping
  public ResponseEntity<Note> createNote (@RequestBody Note note){
    return ResponseEntity.ok(noteService.createNote(note));
  }

  @PutMapping("/{noteId}")
  public ResponseEntity<Note> updateNote (@PathVariable("noteId") Long id, @RequestBody Note updateNote){
    return ResponseEntity.ok(noteService.updateNote(id, updateNote));
  }

  @DeleteMapping("/{noteId}")
  public ResponseEntity<Void> deleteNote (@PathVariable("noteId") Long id){
    noteService.deleteNote(id);
    return ResponseEntity.noContent().build();
  }


  @PutMapping("/{noteId}/archive")
  public ResponseEntity<Void> archiveNote(@PathVariable("noteId") Long id){
    noteService.archiveNote(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/{noteId}/unarchive")
  public ResponseEntity<Void> unarchiveNote(@PathVariable("noteId") Long id){
    noteService.unarchiveNote(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/archive")
  public List<Note> getArchive(){
    return noteService.getArchivedNotes();
  }

  @GetMapping("/active")
  public List<Note> getActive(){
    return noteService.getActiveNotes();
  }

  @GetMapping("/category")
  public List<Note> getNoteByCategory(@RequestParam("category") String category){
    return noteService.getNotesByCategory(category);
  }
}