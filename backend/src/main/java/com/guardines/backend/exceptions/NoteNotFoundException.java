package com.guardines.backend.exceptions;

public class NoteNotFoundException extends RuntimeException{
  public NoteNotFoundException(String message){
    super(message);
  }
}