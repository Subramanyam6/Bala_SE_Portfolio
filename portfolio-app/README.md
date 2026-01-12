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
- SQL Server (local Docker) / PostgreSQL (Render)
- Flyway for Database Migrations
- Spring Security with JWT Authentication
- Postmark for email delivery

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
- Render Blueprint (`render.yaml`)

## Getting Started

### Prerequisites
- **Docker Desktop** (recommended) - OR -
- Java 17+ and Node.js 18+ (for running without Docker)

### Running Locally

#### Option 1: Using Docker (Recommended - Easiest)

1. **Start Docker Desktop** (make sure it's running)

2. **Start the application:**
   ```bash
   cd portfolio-app
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

4. **Useful commands:**
   ```bash
   # Stop the application
   docker-compose down
   
   # View logs
   docker-compose logs -f
   
   # Check status
   docker-compose ps
   
   # Rebuild containers
   docker-compose up -d --build
   ```

#### Option 2: Without Docker

1. **Start only the database:**
   ```bash
   cd portfolio-app
   docker-compose up sqlserver -d
   ```

2. **Run the backend** (in one terminal):
   ```bash
   cd backend
   source set-local-env.sh
   mvn spring-boot:run -Dspring-boot.run.profiles=local
   ```

3. **Run the frontend** (in another terminal):
   ```bash
   cd frontend
   npm install  # Only needed first time
   npm run dev
   ```

4. **Access:**
   - Frontend: http://localhost:5174 (or port shown by Vite)
   - Backend: http://localhost:8080

## Troubleshooting

### Docker Issues
- **Docker not running**: Open Docker Desktop and wait for it to fully start
- **Port already in use**: Stop other services using ports 3000 or 8080, or modify ports in `docker-compose.yml`
- **Containers won't start**: Try `docker-compose down` then `docker-compose up -d --build`

### App Not Accessible
- **Frontend not loading**: Check `docker-compose logs frontend` for errors
- **Backend not responding**: Check `docker-compose logs backend` for errors
- **Database connection issues**: Ensure SQL Server container is running: `docker-compose ps`

### Memory/Storage
- **High memory usage**: SQL Server uses ~1GB, Spring Boot uses ~250MB - this is normal
- **Docker using too much space**: Run `docker system prune -a` to clean unused images (optional)

## Development

### Backend Development
The backend is a Spring Boot application with a RESTful API. It uses Spring Data JPA for database access and Spring Security for authentication.

### Frontend Development
The frontend is a React application built with TypeScript and Tailwind CSS. It uses React Router for navigation and React Query for data fetching.

## Deployment

### Render (Planned)
Use the Render blueprint in `render.yaml` at the repo root.

1. Review `RENDER_QUICK_START.md` and `RENDER_DEPLOYMENT_GUIDE.md`
2. Set `JWT_SECRET` and `POSTMARK_SERVER_TOKEN` in Render
3. Deploy the blueprint from Render

### Manual Deployment (Optional)
1. Build the backend: `cd backend && ./mvnw package`
2. Build the frontend: `cd frontend && npm run build`
3. Deploy the backend JAR file to your server
4. Deploy the frontend build to a static hosting service or web server

## License
This project is licensed under the MIT License - see the LICENSE file for details. 
