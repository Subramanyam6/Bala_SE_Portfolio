-- Users Table
CREATE TABLE users (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    username NVARCHAR(50) NOT NULL UNIQUE,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    first_name NVARCHAR(100),
    last_name NVARCHAR(100),
    bio NVARCHAR(MAX),
    profile_image NVARCHAR(255),
    role NVARCHAR(20) NOT NULL,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Projects Table
CREATE TABLE projects (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    slug NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(MAX),
    content NVARCHAR(MAX) NOT NULL,
    thumbnail NVARCHAR(255),
    github_url NVARCHAR(255),
    live_url NVARCHAR(255),
    featured BIT DEFAULT 0,
    published BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE(),
    user_id BIGINT REFERENCES users(id)
);

-- Technologies Table
CREATE TABLE technologies (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL UNIQUE,
    icon NVARCHAR(255)
);

-- Project Technologies (Junction Table)
CREATE TABLE project_technologies (
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    technology_id BIGINT REFERENCES technologies(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, technology_id)
);

-- Videos Table
CREATE TABLE videos (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    title NVARCHAR(255) NOT NULL,
    url NVARCHAR(255) NOT NULL,
    thumbnail NVARCHAR(255),
    description NVARCHAR(MAX),
    order_index INT DEFAULT 0,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- Tags Table
CREATE TABLE tags (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL UNIQUE
);

-- Project Tags (Junction Table)
CREATE TABLE project_tags (
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    tag_id BIGINT REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, tag_id)
);

-- Images Table for Project Gallery
CREATE TABLE project_images (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    url NVARCHAR(255) NOT NULL,
    alt_text NVARCHAR(255),
    order_index INT DEFAULT 0,
    project_id BIGINT REFERENCES projects(id) ON DELETE CASCADE,
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Insert default admin user (password: admin)
INSERT INTO users (username, email, password, role, first_name, last_name)
VALUES ('admin', 'admin@example.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'ROLE_ADMIN', 'Admin', 'User');

-- Insert sample technologies
INSERT INTO technologies (name, icon) VALUES 
('Java', 'java'),
('Spring Boot', 'spring'),
('React', 'react'),
('TypeScript', 'typescript'),
('SQL Server', 'sqlserver'),
('Docker', 'docker'),
('Azure', 'azure'); 