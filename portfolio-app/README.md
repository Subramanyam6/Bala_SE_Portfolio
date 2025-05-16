# Portfolio Application

A modern, full-stack portfolio application built with Spring Boot and React.

## Features

- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Looks great on all devices
- **Project Showcase**: Display your projects with details, images, and videos
- **Authentication**: Secure login with JWT
- **Admin Dashboard**: Manage your projects, technologies, and content
- **Video Integration**: Embed videos from YouTube or other sources
- **SEO Friendly**: Clean URLs and metadata

## Tech Stack

### Backend
- Java 17 + Spring Boot 3.x
- Spring MVC (RestController)
- Spring Data JPA + Hibernate
- PostgreSQL Database
- Flyway for Database Migrations
- Spring Security with JWT Authentication

### Frontend
- React 19.x with TypeScript
- React Router for Navigation
- Tailwind CSS for Styling
- Formik + Yup for Form Validation
- React Query for Data Fetching
- React Player for Video Playback

### DevOps
- Docker + Docker Compose for Containerization
- Nginx for Serving Frontend
- GitHub Actions for CI/CD (Coming Soon)

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- Docker and Docker Compose (optional)

### Running Locally

#### Without Docker

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

#### With Docker
```bash
docker-compose up
```

## Development

### Backend Development
The backend is a Spring Boot application with a RESTful API. It uses Spring Data JPA for database access and Spring Security for authentication.

### Frontend Development
The frontend is a React application built with TypeScript and Tailwind CSS. It uses React Router for navigation and React Query for data fetching.

## Deployment

### Manual Deployment
1. Build the backend: `cd backend && ./mvnw package`
2. Build the frontend: `cd frontend && npm run build`
3. Deploy the backend JAR file to your server
4. Deploy the frontend build to a static hosting service or web server

### Docker Deployment
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## License
This project is licensed under the MIT License - see the LICENSE file for details. 