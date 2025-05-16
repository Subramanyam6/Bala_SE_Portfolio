package com.portfolio.backend.dto;

import java.time.ZonedDateTime;

public class ProjectImageDto {
    private Long id;
    private String url;
    private String altText;
    private Integer orderIndex;
    private ZonedDateTime createdAt;
    private Long projectId;
    
    // Constructors
    public ProjectImageDto() {
    }
    
    public ProjectImageDto(Long id, String url, String altText, Integer orderIndex, 
                          ZonedDateTime createdAt, Long projectId) {
        this.id = id;
        this.url = url;
        this.altText = altText;
        this.orderIndex = orderIndex;
        this.createdAt = createdAt;
        this.projectId = projectId;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUrl() {
        return url;
    }
    
    public void setUrl(String url) {
        this.url = url;
    }
    
    public String getAltText() {
        return altText;
    }
    
    public void setAltText(String altText) {
        this.altText = altText;
    }
    
    public Integer getOrderIndex() {
        return orderIndex;
    }
    
    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }
    
    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public Long getProjectId() {
        return projectId;
    }
    
    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
} 