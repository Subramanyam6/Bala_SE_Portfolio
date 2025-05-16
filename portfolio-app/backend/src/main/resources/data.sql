-- Insert default admin user (password: admin)
INSERT INTO users (username, email, password, role, first_name, last_name, bio, profile_image, created_at, updated_at)
VALUES ('admin', 'admin@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_ADMIN', 'Admin', 'User', 'Admin bio', null, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert sample technologies
INSERT INTO technologies (name, icon) VALUES 
('Java', 'java'),
('Spring Boot', 'spring'),
('React', 'react'),
('TypeScript', 'typescript'),
('PostgreSQL', 'postgresql'),
('Docker', 'docker'),
('AWS', 'aws');

-- Insert sample tags
INSERT INTO tags (name) VALUES 
('Web Development'),
('Mobile'),
('Backend'),
('Frontend'),
('Cloud'),
('DevOps');

-- Insert sample project
INSERT INTO projects (title, slug, description, content, thumbnail, github_url, live_url, featured, published, user_id, created_at, updated_at)
VALUES ('Sample Project', 'sample-project', 'A sample project description', 'This is the detailed content of the sample project.', 'thumbnail.jpg', 'https://github.com/sample/project', 'https://sample-project.com', true, true, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Link project with technologies
INSERT INTO project_technologies (project_id, technology_id) VALUES 
(1, 1), -- Java
(1, 2), -- Spring Boot
(1, 5); -- PostgreSQL

-- Link project with tags
INSERT INTO project_tags (project_id, tag_id) VALUES 
(1, 1), -- Web Development
(1, 3); -- Backend 