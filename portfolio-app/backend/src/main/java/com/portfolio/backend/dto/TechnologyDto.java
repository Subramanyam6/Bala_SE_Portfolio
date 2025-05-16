package com.portfolio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TechnologyDto {
    private Long id;
    
    @NotBlank(message = "Technology name is required")
    @Size(max = 100)
    private String name;
    
    private String icon;
    
    // Constructors
    public TechnologyDto() {
    }
    
    public TechnologyDto(Long id, String name, String icon) {
        this.id = id;
        this.name = name;
        this.icon = icon;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getIcon() {
        return icon;
    }
    
    public void setIcon(String icon) {
        this.icon = icon;
    }
} 