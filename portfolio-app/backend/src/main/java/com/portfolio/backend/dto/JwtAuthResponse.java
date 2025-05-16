package com.portfolio.backend.dto;

public class JwtAuthResponse {
    private String token;
    private String tokenType = "Bearer";
    
    public JwtAuthResponse() {
    }
    
    public JwtAuthResponse(String token) {
        this.token = token;
    }
    
    public JwtAuthResponse(String token, String tokenType) {
        this.token = token;
        this.tokenType = tokenType;
    }
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getTokenType() {
        return tokenType;
    }
    
    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
} 