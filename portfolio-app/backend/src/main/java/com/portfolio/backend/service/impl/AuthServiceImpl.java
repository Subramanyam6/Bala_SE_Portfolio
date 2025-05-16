package com.portfolio.backend.service.impl;

import com.portfolio.backend.dto.LoginRequest;
import com.portfolio.backend.dto.RegisterRequest;
import com.portfolio.backend.dto.UserDto;
import com.portfolio.backend.security.JwtTokenProvider;
import com.portfolio.backend.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    
    public AuthServiceImpl(AuthenticationManager authenticationManager, 
                          JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return jwtTokenProvider.generateToken(authentication);
    }

    @Override
    public UserDto register(RegisterRequest registerRequest) {
        // For testing, return a mock registered user
        UserDto userDto = new UserDto();
        userDto.setId(1L);
        userDto.setUsername(registerRequest.getUsername());
        userDto.setEmail(registerRequest.getEmail());
        userDto.setFirstName(registerRequest.getFirstName());
        userDto.setLastName(registerRequest.getLastName());
        userDto.setRole("ROLE_USER");
        return userDto;
    }

    @Override
    public UserDto getCurrentUser() {
        // For testing, return a mock current user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        UserDto userDto = new UserDto();
        userDto.setId(1L);
        userDto.setUsername(username);
        userDto.setEmail("test@example.com");
        userDto.setFirstName("Test");
        userDto.setLastName("User");
        userDto.setRole("ROLE_USER");
        return userDto;
    }
} 