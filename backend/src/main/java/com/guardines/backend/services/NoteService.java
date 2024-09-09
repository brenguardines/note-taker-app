package com.guardines.backend.services;

import com.guardines.backend.exceptions.NoteNotFoundException;
import com.guardines.backend.models.Note;
import com.guardines.backend.models.User;
import com.guardines.backend.repositories.NoteRepository;
import com.guardines.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteService {

  @Autowired
  private NoteRepository noteRepository;

  public Note getNoteById(Long id){
    return noteRepository.findById(id)
        .orElseThrow(() -> new NoteNotFoundException("Note not found"));
  }

  public List<Note> getAllNotesByUser(User user){
    return noteRepository.findAll().stream()
        .filter(note -> note.getUser().getId().equals(user.getId()))
        .collect(Collectors.toList());
  }

  public Note createNote(Note note, User user){
    note.setUser(user);
    return noteRepository.save(note);
  }

  public Note updateNote(Long id, Note updatedNote){
    Note existsNote = getNoteById(id);
    existsNote.setTitle(updatedNote.getTitle());
    existsNote.setContent(updatedNote.getContent());
    existsNote.setCategory(updatedNote.getCategory());
    return noteRepository.save(existsNote);
  }

  public void deleteNote(Long id){
    noteRepository.deleteById(id);
  }

  public void archiveNote(Long id){
    Note note = getNoteById(id);
    note.setArchived(true);
    noteRepository.save(note);
  }

  public void unarchiveNote(Long id){
    Note note = getNoteById(id);
    note.setArchived(false);
    noteRepository.save(note);
  }

  public List<Note> getArchivedNotesByUser(User user){
    return noteRepository.findAll().stream()
        .filter(note -> note.isArchived() && note.getUser().getId().equals(user.getId()))
        .collect(Collectors.toList());
  }

  public List<Note> getActiveNotesByUser(User user){
    return noteRepository.findAll().stream()
        .filter(note -> !note.isArchived()  & note.getUser().getId().equals(user.getId()))
        .collect(Collectors.toList());
  }

  public List<Note> getNotesByCategoryByUser(String category, User user){
    return noteRepository.findAll().stream()
        .filter(note -> note.getCategory().equalsIgnoreCase(category) && note.getUser().getId().equals(user.getId()))
        .collect(Collectors.toList());
  }
}