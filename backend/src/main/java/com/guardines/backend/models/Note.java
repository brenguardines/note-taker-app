package com.guardines.backend.models;

import lombok.Data;

@Data
public class Note {
  private Long id;
  private String title;
  private String content;
  private boolean archived = false;

}