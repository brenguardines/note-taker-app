package com.guardines.backend.controllers;

import com.guardines.backend.models.Note;
import com.guardines.backend.models.User;
import com.guardines.backend.repositories.UserRepository;
import com.guardines.backend.services.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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

  @Autowired
  private UserRepository userRepository;

  private User getUserFromDetails(UserDetails userDetails){
    return userRepository.findByUsername(userDetails.getUsername())
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
  }

  @GetMapping("/{noteId}")
  public ResponseEntity<Note> getNoteById(@PathVariable("noteId") Long id, @AuthenticationPrincipal UserDetails userDetails){
    User user = getUserFromDetails(userDetails);
    Note note = noteService.getNoteById(id);

    if(note.getUser().getId().equals(user.getId())){
      return ResponseEntity.ok(note);
    }else{
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
  }

  @GetMapping
  public List<Note> getNotes(@AuthenticationPrincipal UserDetails userDetails){
    User user = getUserFromDetails(userDetails);
    return noteService.getAllNotesByUser(user);
  }

  @PostMapping
  public ResponseEntity<Note> createNote (@RequestBody Note note, @AuthenticationPrincipal UserDetails userDetails){
    User user = getUserFromDetails(userDetails);
    return ResponseEntity.ok(noteService.createNote(note, user));
  }

  @PutMapping("/{noteId}")
  public ResponseEntity<Note> updateNote (@PathVariable("noteId") Long id, @RequestBody Note updateNote, @AuthenticationPrincipal UserDetails userDetails){
    User user = getUserFromDetails(userDetails);
    Note note = noteService.getNoteById(id);

    if(note.getUser().getId().equals(user.getId())){
      return ResponseEntity.ok(noteService.updateNote(id, updateNote));
    }else{
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
  }

  @DeleteMapping("/{noteId}")
  public ResponseEntity<Void> deleteNote (@PathVariable("noteId") Long id, @AuthenticationPrincipal UserDetails userDetails){
    User user = getUserFromDetails(userDetails);
    Note note = noteService.getNoteById(id);

    if(note.getUser().getId().equals(user.getId())){
      noteService.deleteNote(id);
      return ResponseEntity.noContent().build();
    }else{
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
  }


  @PutMapping("/{noteId}/archive")
  public ResponseEntity<Void> archiveNote(@PathVariable("noteId") Long id, @AuthenticationPrincipal UserDetails userDetails){
    User user = getUserFromDetails(userDetails);
    Note note = noteService.getNoteById(id);

    if(note.getUser().getId().equals(user.getId())){
      noteService.archiveNote(id);
      return ResponseEntity.noContent().build();
    }else{
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
  }

  @PutMapping("/{noteId}/unarchive")
  public ResponseEntity<Void> unarchiveNote(@PathVariable("noteId") Long id, @AuthenticationPrincipal UserDetails userDetails){
    User user = getUserFromDetails(userDetails);
    Note note = noteService.getNoteById(id);

    if(note.getUser().getId().equals(user.getId())){
      noteService.unarchiveNote(id);
      return ResponseEntity.noContent().build();
    }else{
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
  }

  @GetMapping("/archive")
  public List<Note> getArchive(@AuthenticationPrincipal UserDetails userDetails){
    User user = getUserFromDetails(userDetails);
    return noteService.getActiveNotesByUser(user);
  }

  @GetMapping("/active")
  public List<Note> getActive(@AuthenticationPrincipal UserDetails userDetails){
    User user = getUserFromDetails(userDetails);
    return noteService.getActiveNotesByUser(user);
  }

  @GetMapping("/category")
  public List<Note> getNoteByCategory(@RequestParam("category") String category, @AuthenticationPrincipal UserDetails userDetails){
    User user = getUserFromDetails(userDetails);
    return noteService.getNotesByCategoryByUser(category,user);
  }
}