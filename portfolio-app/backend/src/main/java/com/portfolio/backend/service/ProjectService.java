package com.portfolio.backend.service;

import com.portfolio.backend.dto.ProjectDto;
import java.util.List;

public interface ProjectService {
    List<ProjectDto> getAllProjects(int page, int size, boolean onlyPublished);
    ProjectDto getProjectBySlug(String slug);
    List<ProjectDto> getFeaturedProjects();
    List<ProjectDto> searchProjects(String keyword, int page, int size);
    ProjectDto createProject(ProjectDto projectDto);
    ProjectDto updateProject(Long id, ProjectDto projectDto);
    void deleteProject(Long id);
}
