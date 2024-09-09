package com.guardines.backend.controllers;

import com.guardines.backend.models.AuthResponse;
import com.guardines.backend.models.LoginRequest;
import com.guardines.backend.models.RegisterRequest;
import com.guardines.backend.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/")
@RequiredArgsConstructor
public class AuthController {

  @Autowired
  private AuthService authService;

  @PostMapping(value = "login")
  public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
    return ResponseEntity.ok(authService.login(request));
  }

  @PostMapping(value = "register")
  public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request){
    return ResponseEntity.ok(authService.register(request));
  }
}