# Bala Subramanyam - Software Engineering Portfolio

This repository contains a full-stack portfolio website showcasing software engineering projects and professional experience.

## Project Structure

```
portfolio-app/
├── backend/           # Spring Boot backend API
├── frontend/          # React + TypeScript frontend
├── docker-compose.yml # Docker orchestration
└── README.md          # Detailed project documentation
```

## Quick Start

### Local Development

1. **Backend** (Spring Boot + SQL Server)
   ```bash
   cd portfolio-app/backend
   mvn spring-boot:run
   ```

2. **Frontend** (React + Vite)
   ```bash
   cd portfolio-app/frontend
   npm run dev
   ```

### Docker Deployment
```bash
cd portfolio-app
docker-compose up -d
```

## Documentation

- [Project README](portfolio-app/README.md) - Detailed setup and development guide
- [Azure Deployment Guide](portfolio-app/AZURE_DEPLOYMENT_SETUP.md) - Production deployment instructions
- [Contact Form Setup](portfolio-app/README-CONTACT.md) - Email functionality configuration

## Live Deployments

- **Frontend**: Azure Static Web Apps
- **Backend**: Azure App Service
- **Database**: Azure SQL Database

## Technologies

- **Backend**: Spring Boot, Java 17, SQL Server, SendGrid
- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Infrastructure**: Azure, Docker, GitHub Actions

## Author

**Bala Subramanyam Duggirala**
- Email: subramanyam.duggirala@outlook.com
- Portfolio: [Live Website](https://bala-portfolio.azurewebsites.net) 