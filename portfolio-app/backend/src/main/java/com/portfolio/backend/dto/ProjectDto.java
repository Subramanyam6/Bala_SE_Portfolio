package com.portfolio.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

public class ProjectDto {
    private Long id;
    
    @NotBlank(message = "Title is required")
    @Size(max = 255)
    private String title;
    
    private String slug;
    
    private String description;
    
    @NotBlank(message = "Content is required")
    private String content;
    
    private String thumbnail;
    private String githubUrl;
    private String liveUrl;
    private Boolean featured;
    private Boolean published;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
    private Long userId;
    private String username;
    
    private Set<TechnologyDto> technologies = new HashSet<>();
    private Set<TagDto> tags = new HashSet<>();
    private Set<VideoDto> videos = new HashSet<>();
    private Set<ProjectImageDto> images = new HashSet<>();
    
    // Constructors
    public ProjectDto() {
    }
    
    public ProjectDto(Long id, String title, String slug, String description, String content, String thumbnail,
                     String githubUrl, String liveUrl, Boolean featured, Boolean published, ZonedDateTime createdAt,
                     ZonedDateTime updatedAt, Long userId, String username, Set<TechnologyDto> technologies,
                     Set<TagDto> tags, Set<VideoDto> videos, Set<ProjectImageDto> images) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.content = content;
        this.thumbnail = thumbnail;
        this.githubUrl = githubUrl;
        this.liveUrl = liveUrl;
        this.featured = featured;
        this.published = published;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.userId = userId;
        this.username = username;
        this.technologies = technologies;
        this.tags = tags;
        this.videos = videos;
        this.images = images;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getSlug() {
        return slug;
    }
    
    public void setSlug(String slug) {
        this.slug = slug;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public String getThumbnail() {
        return thumbnail;
    }
    
    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
    
    public String getGithubUrl() {
        return githubUrl;
    }
    
    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }
    
    public String getLiveUrl() {
        return liveUrl;
    }
    
    public void setLiveUrl(String liveUrl) {
        this.liveUrl = liveUrl;
    }
    
    public Boolean getFeatured() {
        return featured;
    }
    
    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }
    
    public Boolean getPublished() {
        return published;
    }
    
    public void setPublished(Boolean published) {
        this.published = published;
    }
    
    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public ZonedDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(ZonedDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public Set<TechnologyDto> getTechnologies() {
        return technologies;
    }
    
    public void setTechnologies(Set<TechnologyDto> technologies) {
        this.technologies = technologies;
    }
    
    public Set<TagDto> getTags() {
        return tags;
    }
    
    public void setTags(Set<TagDto> tags) {
        this.tags = tags;
    }
    
    public Set<VideoDto> getVideos() {
        return videos;
    }
    
    public void setVideos(Set<VideoDto> videos) {
        this.videos = videos;
    }
    
    public Set<ProjectImageDto> getImages() {
        return images;
    }
    
    public void setImages(Set<ProjectImageDto> images) {
        this.images = images;
    }
} 