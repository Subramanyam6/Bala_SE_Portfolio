package com.portfolio.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration}")
    private int jwtExpiration;
    
    // Generate token for testing
    public String generateToken(Authentication authentication) {
        // For testing, return a mock token
        return "mock-jwt-token-" + authentication.getName();
    }
    
    // Extract username from token
    public String getUsernameFromToken(String token) {
        // For testing, extract username from mock token
        if (token.startsWith("mock-jwt-token-")) {
            return token.substring("mock-jwt-token-".length());
        }
        return "unknown";
    }
    
    // Validate token
    public boolean validateToken(String token, UserDetails userDetails) {
        // For testing, all tokens are valid
        final String username = getUsernameFromToken(token);
        return username.equals(userDetails.getUsername());
    }
} 