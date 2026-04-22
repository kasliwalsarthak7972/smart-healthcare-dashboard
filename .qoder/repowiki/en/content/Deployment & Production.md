# Deployment & Production

<cite>
**Referenced Files in This Document**
- [README.md](file://README.md)
- [backend/main.py](file://backend/main.py)
- [backend/database.py](file://backend/database.py)
- [backend/requirements.txt](file://backend/requirements.txt)
- [backend/routers/dashboard.py](file://backend/routers/dashboard.py)
- [backend/routers/patients.py](file://backend/routers/patients.py)
- [backend/models.py](file://backend/models.py)
- [backend/schemas.py](file://backend/schemas.py)
- [frontend/package.json](file://frontend/package.json)
- [frontend/vite.config.js](file://frontend/vite.config.js)
- [frontend/src/api.js](file://frontend/src/api.js)
- [.github/workflows/static.yml](file://.github/workflows/static.yml)
- [Procfile](file://Procfile)
</cite>

## Update Summary
**Changes Made**
- Updated environment variable configuration section to document the new `import.meta.env.VITE_API_URL` feature
- Added comprehensive environment variable handling documentation for both development and production
- Enhanced deployment configuration examples with VITE_API_URL usage
- Updated platform-specific deployment instructions to include environment variable setup

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Environment Variable Configuration](#environment-variable-configuration)
7. [Dependency Analysis](#dependency-analysis)
8. [Performance Considerations](#performance-considerations)
9. [Security Considerations](#security-considerations)
10. [Monitoring, Logging, and Error Tracking](#monitoring-logging-and-error-tracking)
11. [Rollback, Backup, and Disaster Recovery](#rollback-backup-and-disaster-recovery)
12. [Conclusion](#conclusion)
13. [Appendices](#appendices)

## Introduction
This document provides production deployment guidance for the Smart Healthcare Dashboard across Render, Railway, and Vercel. It covers platform-specific configuration, environment variables, build and startup commands, CI/CD workflows, performance optimization, security hardening, observability, and operational resilience practices. The system comprises a FastAPI backend and a React/Vite frontend, with SQLite for persistence during development and pathways for production-grade databases.

## Project Structure
The repository follows a monorepo-like layout with a backend and a frontend directory. The backend exposes REST endpoints via FastAPI, while the frontend consumes those endpoints through an Axios client configured for local proxying during development and environment variable-driven configuration in production.

```mermaid
graph TB
subgraph "Backend"
BM["backend/main.py"]
BR["backend/routers/*"]
BD["backend/database.py"]
BReq["backend/requirements.txt"]
BModels["backend/models.py"]
BSchemas["backend/schemas.py"]
end
subgraph "Frontend"
FPkg["frontend/package.json"]
FVite["frontend/vite.config.js"]
FAxios["frontend/src/api.js"]
FEnv["frontend/.env*"]
end
subgraph "CI/CD"
GW["GitHub Workflows<br/>.github/workflows/static.yml"]
end
FPkg --> FVite
FVite --> FAxios
FAxios --> FEnv
BM --> BR
BM --> BD
BM --> BReq
BR --> BModels
BR --> BSchemas
GW --> FPkg
GW --> BM
```

**Diagram sources**
- [backend/main.py:1-56](file://backend/main.py#L1-L56)
- [backend/database.py:1-20](file://backend/database.py#L1-L20)
- [backend/requirements.txt:1-9](file://backend/requirements.txt#L1-L9)
- [backend/routers/dashboard.py:1-81](file://backend/routers/dashboard.py#L1-L81)
- [backend/routers/patients.py:1-95](file://backend/routers/patients.py#L1-L95)
- [backend/models.py:1-75](file://backend/models.py#L1-L75)
- [backend/schemas.py:1-134](file://backend/schemas.py#L1-L134)
- [frontend/package.json:1-34](file://frontend/package.json#L1-L34)
- [frontend/vite.config.js:1-17](file://frontend/vite.config.js#L1-L17)
- [frontend/src/api.js:1-57](file://frontend/src/api.js#L1-L57)
- [.github/workflows/static.yml:1-44](file://.github/workflows/static.yml#L1-L44)

**Section sources**
- [README.md:106-136](file://README.md#L106-L136)
- [backend/main.py:1-56](file://backend/main.py#L1-L56)
- [frontend/package.json:1-34](file://frontend/package.json#L1-L34)
- [.github/workflows/static.yml:1-44](file://.github/workflows/static.yml#L1-L44)

## Core Components
- Backend service
  - Framework: FastAPI
  - ASGI server: Uvicorn
  - ORM: SQLAlchemy with SQLite by default
  - Routers: patients, appointments, doctors, vitals, dashboard
  - Health endpoint: /api/health
- Frontend service
  - Framework: React 18 with Vite
  - HTTP client: Axios with configurable base URL
  - Dev proxy: /api -> http://localhost:5000
  - Environment variable support: VITE_API_URL for production API configuration
- CI/CD
  - GitHub Actions workflow for static content deployment

Key production considerations:
- Environment variables for database URL, CORS origins, and runtime configuration
- Platform-specific build/start commands and environment configuration
- CORS policy adjustments for production domains
- Database migration and seeding strategies
- Configurable API base URL through VITE_API_URL environment variable

**Section sources**
- [backend/main.py:1-56](file://backend/main.py#L1-L56)
- [backend/database.py:1-20](file://backend/database.py#L1-L20)
- [backend/requirements.txt:1-9](file://backend/requirements.txt#L1-L9)
- [backend/routers/dashboard.py:73-81](file://backend/routers/dashboard.py#L73-L81)
- [frontend/vite.config.js:7-16](file://frontend/vite.config.js#L7-L16)
- [frontend/src/api.js:3-4](file://frontend/src/api.js#L3-L4)

## Architecture Overview
The production architecture separates the backend API server and the frontend static site. The frontend is served statically (e.g., Vercel) while the backend is deployed behind a reverse proxy or containerized with an ASGI server. The backend connects to a persistent database (SQLite in development; PostgreSQL recommended for production). The frontend uses a configurable API base URL that can be overridden via environment variables for different deployment environments.

```mermaid
graph TB
Client["Browser / Client Apps"] --> FE["Frontend (Static Site)<br/>VITE_API_URL configurable"]
FE --> APIProxy["Frontend Dev Proxy / API Gateway"]
APIProxy --> BE["Backend API (FastAPI/Uvicorn)"]
BE --> DB["Database (SQLite in repo; PostgreSQL in prod)"]
FE -. "Build artifacts" .-> Vercel["Vercel Deployment"]
BE -. "Container/Service" .-> Render["Render Web Service"]
BE -. "Container/Service" .-> Railway["Railway Project"]
```

**Diagram sources**
- [backend/main.py:15-22](file://backend/main.py#L15-L22)
- [backend/database.py:5](file://backend/database.py#L5)
- [frontend/vite.config.js:9-14](file://frontend/vite.config.js#L9-L14)
- [frontend/src/api.js:3-4](file://frontend/src/api.js#L3-L4)

## Detailed Component Analysis

### Backend API Service
- Startup and routing
  - Application factory initializes CORS middleware and includes routers for patients, appointments, doctors, vitals, and dashboard.
  - Health endpoint returns service metadata.
- Database
  - SQLite URL is defined; tables are created on startup.
- Dependencies
  - FastAPI, Uvicorn, Pydantic, SQLAlchemy, Alembic, python-dateutil, faker.

```mermaid
sequenceDiagram
participant Client as "Client"
participant FE as "Frontend"
participant API as "FastAPI Backend"
participant DB as "Database"
Client->>FE : "Open app"
FE->>API : "GET /api/health"
API->>DB : "Ping/Read"
DB-->>API : "OK"
API-->>FE : "{status : healthy}"
FE-->>Client : "Render dashboard"
```

**Diagram sources**
- [backend/main.py:31-38](file://backend/main.py#L31-L38)
- [backend/routers/dashboard.py:73-81](file://backend/routers/dashboard.py#L73-L81)
- [backend/database.py:7-9](file://backend/database.py#L7-L9)

**Section sources**
- [backend/main.py:1-56](file://backend/main.py#L1-L56)
- [backend/database.py:1-20](file://backend/database.py#L1-L20)
- [backend/requirements.txt:1-9](file://backend/requirements.txt#L1-L9)
- [backend/routers/dashboard.py:12-81](file://backend/routers/dashboard.py#L12-L81)

### Frontend Static Site
- Build and dev scripts
  - Scripts include dev, build, lint, and preview.
- Dev proxy
  - Proxies /api requests to the backend running on localhost:5000.
- API base URL configuration
  - Axios client configured with environment variable support for production deployments.
  - Uses `import.meta.env.VITE_API_URL` with fallback to production Render backend URL.

```mermaid
flowchart TD
Start(["Dev Server"]) --> Proxy["Vite Dev Server<br/>proxy '/api' -> http://localhost:5000"]
Proxy --> Axios["Frontend Axios Client<br/>baseURL: import.meta.env.VITE_API_URL || fallback URL"]
Axios --> Backend["Backend API"]
Backend --> DB["SQLite Database"]
```

**Diagram sources**
- [frontend/vite.config.js:7-16](file://frontend/vite.config.js#L7-L16)
- [frontend/src/api.js:3-4](file://frontend/src/api.js#L3-L4)
- [backend/database.py:5](file://backend/database.py#L5)

**Section sources**
- [frontend/package.json:6-11](file://frontend/package.json#L6-L11)
- [frontend/vite.config.js:1-17](file://frontend/vite.config.js#L1-L17)
- [frontend/src/api.js:1-57](file://frontend/src/api.js#L1-L57)

### CI/CD Pipeline
- Current workflow
  - Deploys static content to GitHub Pages on pushes to main.
- Recommended enhancements
  - Separate workflows for backend and frontend builds.
  - Backend container builds and deployments to Render/Railway.
  - Frontend builds and deployments to Vercel.

```mermaid
sequenceDiagram
participant Dev as "Developer"
participant GH as "GitHub"
participant GA as "GitHub Actions"
participant Pages as "GitHub Pages"
Dev->>GH : "Push to main"
GH->>GA : "Trigger workflow"
GA->>Pages : "Upload artifact and deploy"
Pages-->>Dev : "Site available at Pages URL"
```

**Diagram sources**
- [.github/workflows/static.yml:24-44](file://.github/workflows/static.yml#L24-L44)

**Section sources**
- [.github/workflows/static.yml:1-44](file://.github/workflows/static.yml#L1-L44)

## Environment Variable Configuration

### Frontend Environment Variables
The frontend now supports configurable API base URL through Vite's environment variable system:

- **VITE_API_URL**: Primary environment variable for API base URL
  - Can be set during build or deployment
  - Overrides the hardcoded fallback URL
  - Supports different API endpoints for development, staging, and production

- **Development fallback**: Automatically falls back to production Render backend URL if VITE_API_URL is not set

### Environment Variable Handling Process

```mermaid
flowchart TD
EnvCheck["Check VITE_API_URL"] --> HasVar{"VITE_API_URL set?"}
HasVar --> |Yes| UseVar["Use VITE_API_URL as API base URL"]
HasVar --> |No| UseFallback["Use fallback production URL"]
UseVar --> Axios["Configure Axios with VITE_API_URL"]
UseFallback --> Axios
Axios --> App["Frontend Application"]
```

**Diagram sources**
- [frontend/src/api.js:3-4](file://frontend/src/api.js#L3-L4)

### Platform-Specific Environment Variable Setup

#### Render Platform
- Backend environment variables:
  - `DATABASE_URL`: PostgreSQL connection string (production)
  - `BACKEND_PORT`: Port binding (uses `$PORT` automatically)
- Frontend environment variables (if using separate frontend deployment):
  - `VITE_API_URL`: Set to your Render backend URL

#### Railway Platform
- Automatic environment variable detection
- Supports standard environment variable injection
- `VITE_API_URL` can be configured in Railway's environment settings

#### Vercel Platform
- Frontend-only deployment with environment variables
- `VITE_API_URL` should be set to your Render backend URL
- Environment variables configured in Vercel dashboard

**Section sources**
- [frontend/src/api.js:3-4](file://frontend/src/api.js#L3-L4)
- [Procfile:1](file://Procfile#L1)

## Dependency Analysis
- Backend dependencies include FastAPI, Uvicorn, SQLAlchemy, Alembic, and Faker.
- Frontend dependencies include React, Vite, TailwindCSS, Recharts, Lucide React, and Axios.
- The backend defines a SQLite database URL and creates tables on startup.
- The frontend uses environment variables for flexible API configuration.

```mermaid
graph LR
subgraph "Backend"
A["FastAPI"]
U["Uvicorn"]
S["SQLAlchemy"]
AL["Alembic"]
D1["python-dateutil"]
F["faker"]
end
subgraph "Frontend"
R["React"]
V["Vite"]
T["TailwindCSS"]
RC["Recharts"]
AX["Axios"]
ENV["VITE_API_URL"]
end
A --> S
A --> U
S --> AL
R --> AX
V --> T
R --> RC
AX --> ENV
```

**Diagram sources**
- [backend/requirements.txt:1-9](file://backend/requirements.txt#L1-L9)
- [frontend/package.json:12-19](file://frontend/package.json#L12-L19)
- [frontend/package.json:20-32](file://frontend/package.json#L20-L32)
- [frontend/src/api.js:3-4](file://frontend/src/api.js#L3-L4)

**Section sources**
- [backend/requirements.txt:1-9](file://backend/requirements.txt#L1-L9)
- [frontend/package.json:1-34](file://frontend/package.json#L1-L34)

## Performance Considerations
- Build optimization
  - Use Vite's production build for the frontend.
  - Enable minification and tree-shaking via Vite defaults.
- Caching strategies
  - Frontend: leverage browser caching for static assets; configure cache headers on hosting provider.
  - Backend: implement response caching for read-heavy endpoints (e.g., dashboard stats) with appropriate cache-control headers.
- CDN integration
  - Serve frontend static assets via a CDN (e.g., Vercel Edge Network).
  - Backend: place a CDN or reverse proxy in front of the API for global distribution.
- Database tuning
  - Use connection pooling and optimize queries; avoid N+1 selects.
  - Consider indexing frequently filtered columns (e.g., patient status, admission date).
- Asynchronous tasks
  - Offload heavy computations (e.g., report generation) to background workers.

## Security Considerations
- HTTPS configuration
  - Ensure TLS termination at the platform level (Render/Railway/Vercel provide managed HTTPS).
- CORS policies
  - Update allowed origins to production frontend domain(s) and restrict methods/headers as needed.
- Production database
  - Replace SQLite with a managed PostgreSQL database (e.g., Render Postgres, Railway Postgres, or external managed service).
  - Store database credentials in environment variables and rotate secrets regularly.
- Secrets management
  - Use platform-provided secret stores for API keys, tokens, and database URLs.
- API security
  - Add rate limiting, input validation, and sanitization.
  - Consider authentication/authorization for admin endpoints.
- Environment variable security
  - Never expose sensitive API keys in frontend code.
  - Use platform-specific secret management for production deployments.

**Section sources**
- [backend/main.py:15-22](file://backend/main.py#L15-L22)
- [backend/database.py:5](file://backend/database.py#L5)

## Monitoring, Logging, and Error Tracking
- Health checks
  - Use the /api/health endpoint for uptime and readiness probes.
- Logging
  - Configure structured logs in the backend (e.g., JSON format) and forward to platform logging systems.
- Error tracking
  - Integrate client-side error reporting (e.g., Sentry) in the frontend.
- Observability
  - Add metrics collection (e.g., Prometheus) and dashboards for latency, error rates, and throughput.

**Section sources**
- [backend/routers/dashboard.py:73-81](file://backend/routers/dashboard.py#L73-L81)

## Rollback, Backup, and Disaster Recovery
- Rollback strategies
  - Maintain immutable container images and tagged releases.
  - Use blue/green or canary deployments to minimize downtime.
- Backup procedures
  - Back up the production database regularly and test restoration procedures.
- Disaster recovery
  - Define RTO/RPO targets and automate failover to secondary regions or providers.

## Conclusion
This guide outlines production deployment for the Smart Healthcare Dashboard across Render, Railway, and Vercel. It emphasizes platform-specific configuration, environment variable management, build/start commands, CORS hardening, database migration, performance optimization, security, observability, and operational resilience. The new environment variable configuration feature provides flexible API base URL management for different deployment environments, enhancing the system's adaptability to various production scenarios.

## Appendices

### Platform-Specific Deployment Recipes

#### Render
- Backend
  - Build command: `cd frontend && npm install && npm run build`
  - Start command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
  - Python version: 3.11
  - Environment variables:
    - `DATABASE_URL`: PostgreSQL connection string
    - `BACKEND_PORT`: Uses `$PORT` automatically
- Frontend
  - Root directory: frontend
  - Environment variables:
    - `VITE_API_URL`: Set to your Render backend URL

#### Railway
- Auto-detection applies; ensure requirements.txt and package.json are present.
- Environment variables:
  - `DATABASE_URL`: PostgreSQL connection string
  - `VITE_API_URL`: Set to your backend URL if using separate frontend deployment

#### Vercel
- Import repository and set root to frontend; deploy static site.
- Environment variables:
  - `VITE_API_URL`: Set to your Render backend URL
  - `NEXT_PUBLIC_API_URL`: Alternative for Next.js deployments

### Environment Variable Configuration Examples

#### Development Environment
```bash
# .env.development
VITE_API_URL=http://localhost:5000
```

#### Production Environment (Render)
```bash
# Render environment variables
VITE_API_URL=https://your-app.onrender.com
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

#### Staging Environment (Railway)
```bash
# Railway environment variables
VITE_API_URL=https://staging-api.your-app.onrender.com
DATABASE_URL=postgresql://user:pass@host:5432/staging_db
```

### API Surface and Endpoints
- Health: GET /api/health
- Dashboard stats: GET /api/dashboard/stats
- Recent activity: GET /api/recent-activity
- Patients: GET/POST/PATCH/DELETE /api/patients[/id]
- Appointments: GET/POST/PATCH/DELETE /api/appointments[/id]
- Doctors: GET/POST/PATCH/DELETE /api/doctors[/id]
- Vitals: GET /api/vitals/:patient_id, GET /api/vitals/:patient_id/trends

**Section sources**
- [backend/routers/dashboard.py:12-81](file://backend/routers/dashboard.py#L12-L81)
- [backend/routers/patients.py:11-95](file://backend/routers/patients.py#L11-L95)
- [backend/main.py:24-29](file://backend/main.py#L24-L29)

### Data Model Overview
```mermaid
erDiagram
PATIENT {
int id PK
string name
int age
string gender
string condition
string room
datetime admission_date
string status
string contact
string email
}
DOCTOR {
int id PK
string name
string specialization
boolean available
int patients_count
string contact
string email
}
APPOINTMENT {
int id PK
int patient_id FK
int doctor_id FK
string department
datetime date
string time
string status
text notes
datetime created_at
}
VITAL_SIGN {
int id PK
int patient_id FK
datetime timestamp
int heart_rate
int blood_pressure_systolic
int blood_pressure_diastolic
float temperature
int oxygen_level
int respiratory_rate
}
ACTIVITY {
int id PK
datetime timestamp
string event
string type
int patient_id FK
}
PATIENT ||--o{ APPOINTMENT : "has"
DOCTOR ||--o{ APPOINTMENT : "has"
PATIENT ||--o{ VITAL_SIGN : "has"
PATIENT ||--o{ ACTIVITY : "involved_in"
```

**Diagram sources**
- [backend/models.py:6-75](file://backend/models.py#L6-L75)