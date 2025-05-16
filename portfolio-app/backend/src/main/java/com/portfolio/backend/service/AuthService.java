package com.portfolio.backend.service;

import com.portfolio.backend.dto.LoginRequest;
import com.portfolio.backend.dto.RegisterRequest;
import com.portfolio.backend.dto.UserDto;

public interface AuthService {
    String login(LoginRequest loginRequest);
    UserDto register(RegisterRequest registerRequest);
    UserDto getCurrentUser();
} 