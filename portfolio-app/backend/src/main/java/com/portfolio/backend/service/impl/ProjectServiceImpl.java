package com.portfolio.backend.service.impl;

import com.portfolio.backend.dto.ProjectDto;
import com.portfolio.backend.dto.TagDto;
import com.portfolio.backend.dto.TechnologyDto;
import com.portfolio.backend.service.ProjectService;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ProjectServiceImpl implements ProjectService {

    // No dependencies
    
    @Override
    public List<ProjectDto> getAllProjects(int page, int size, boolean onlyPublished) {
        List<ProjectDto> projects = new ArrayList<>();
        
        // Add more mock projects
        projects.add(createMockProject(1L, "Professional Portfolio Website"));
        projects.add(createMockProject(2L, "E-commerce Platform"));
        projects.add(createMockProject(3L, "Real-time Chat Application"));
        projects.add(createMockProject(4L, "Task Management System"));
        projects.add(createMockProject(5L, "Weather Forecast App"));
        projects.add(createMockProject(6L, "Recipe Sharing Platform"));
        
        return paginate(projects, page, size);
    }

    @Override
    public ProjectDto getProjectBySlug(String slug) {
        // Return a mock project based on the slug
        String title = slug.replace("-", " ");
        title = title.substring(0, 1).toUpperCase() + title.substring(1);
        return createMockProject(1L, title);
    }

    @Override
    public List<ProjectDto> getFeaturedProjects() {
        List<ProjectDto> projects = new ArrayList<>();
        projects.add(createMockProject(1L, "Featured Project: Portfolio Website"));
        projects.add(createMockProject(2L, "Featured Project: E-commerce Platform"));
        return projects;
    }

    @Override
    public List<ProjectDto> searchProjects(String keyword, int page, int size) {
        List<ProjectDto> projects = new ArrayList<>();
        projects.add(createMockProject(1L, "Search Result: " + keyword));
        projects.add(createMockProject(2L, "Another Result: " + keyword));
        
        return paginate(projects, page, size);
    }

    @Override
    public ProjectDto createProject(ProjectDto projectDto) {
        return createMockProject(1L, projectDto.getTitle());
    }

    @Override
    public ProjectDto updateProject(Long id, ProjectDto projectDto) {
        return createMockProject(id, projectDto.getTitle());
    }

    @Override
    public void deleteProject(Long id) {
        // Mock deletion, do nothing
    }

    private List<ProjectDto> paginate(List<ProjectDto> projects, int page, int size) {
        if (size <= 0) {
            return projects;
        }
        int fromIndex = Math.max(0, page * size);
        if (fromIndex >= projects.size()) {
            return List.of();
        }
        int toIndex = Math.min(projects.size(), fromIndex + size);
        return projects.subList(fromIndex, toIndex);
    }
    
    private ProjectDto createMockProject(Long id, String title) {
        ProjectDto projectDto = new ProjectDto();
        projectDto.setId(id);
        projectDto.setTitle(title);
        projectDto.setSlug(title.toLowerCase().replace(" ", "-"));
        projectDto.setDescription("This is a sample project description for " + title);
        projectDto.setContent("Sample content for " + title + ". This project demonstrates various technologies and skills.");
        projectDto.setThumbnail("https://via.placeholder.com/800x600");
        projectDto.setGithubUrl("https://github.com/sample/project");
        projectDto.setLiveUrl("https://sample-project.com");
        projectDto.setFeatured(true);
        projectDto.setPublished(true);
        projectDto.setCreatedAt(ZonedDateTime.now());
        projectDto.setUpdatedAt(ZonedDateTime.now());
        projectDto.setUserId(1L);
        projectDto.setUsername("admin");
        
        // Add mock technologies
        Set<TechnologyDto> technologies = new HashSet<>();
        TechnologyDto tech1 = new TechnologyDto(1L, "Java", "java");
        TechnologyDto tech2 = new TechnologyDto(2L, "Spring Boot", "spring");
        TechnologyDto tech3 = new TechnologyDto(3L, "React", "react");
        TechnologyDto tech4 = new TechnologyDto(4L, "TypeScript", "typescript");
        technologies.add(tech1);
        technologies.add(tech2);
        technologies.add(tech3);
        technologies.add(tech4);
        projectDto.setTechnologies(technologies);
        
        // Add mock tags
        Set<TagDto> tags = new HashSet<>();
        TagDto tag1 = new TagDto(1L, "Web Development");
        TagDto tag2 = new TagDto(2L, "Frontend");
        TagDto tag3 = new TagDto(3L, "Backend");
        tags.add(tag1);
        tags.add(tag2);
        tags.add(tag3);
        projectDto.setTags(tags);
        
        return projectDto;
    }
} 
