package com.portfolio.backend.repository;

import com.portfolio.backend.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findBySlug(String slug);
    
    @Query("SELECT p FROM Project p WHERE p.published = true ORDER BY p.createdAt DESC")
    Page<Project> findAllPublishedProjects(Pageable pageable);
    
    @Query("SELECT p FROM Project p WHERE p.published = true AND p.featured = true ORDER BY p.createdAt DESC")
    List<Project> findFeaturedProjects();
    
    @Query("SELECT p FROM Project p WHERE p.published = true AND p.title LIKE %:keyword% OR p.description LIKE %:keyword% OR p.content LIKE %:keyword%")
    Page<Project> searchProjects(String keyword, Pageable pageable);
    
    Page<Project> findAllByUserId(Long userId, Pageable pageable);
} 