# Bala Subramanyam - Software Engineering Portfolio

This repository contains a dockerized, full-stack portfolio website showcasing software engineering projects and professional experience.

## Project Structure

```
portfolio-app/
├── backend/           # Spring Boot backend API
├── frontend/          # React + TypeScript frontend
├── docker-compose.yml # Docker orchestration
└── README.md          # Detailed project documentation
```

## Quick Start

### Docker (Recommended)
```bash
cd portfolio-app
docker-compose up -d
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api

For non-Docker development, see `portfolio-app/README.md`.

## Documentation

- [Project README](portfolio-app/README.md) - Detailed setup and development guide
- [Render Quick Start](RENDER_QUICK_START.md) - Render deployment checklist
- [Render Deployment Guide](RENDER_DEPLOYMENT_GUIDE.md) - Full Render setup
- [Contact Form Setup](portfolio-app/README-CONTACT.md) - Email configuration

## Deployment

This app is prepared for Render using `render.yaml`. Deployments are planned on Render.

## Technologies

- **Backend**: Spring Boot, Java 17, SQL Server (local Docker), PostgreSQL (Render), Postmark
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Infrastructure**: Docker, Render

## Author

**Bala Subramanyam Duggirala**
- Email: subramanyam.duggirala@outlook.com
