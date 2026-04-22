# Architecture Overview

<cite>
**Referenced Files in This Document**
- [README.md](file://README.md)
- [backend/main.py](file://backend/main.py)
- [backend/database.py](file://backend/database.py)
- [backend/models.py](file://backend/models.py)
- [backend/schemas.py](file://backend/schemas.py)
- [backend/routers/patients.py](file://backend/routers/patients.py)
- [backend/routers/doctors.py](file://backend/routers/doctors.py)
- [backend/routers/appointments.py](file://backend/routers/appointments.py)
- [backend/routers/dashboard.py](file://backend/routers/dashboard.py)
- [frontend/src/App.jsx](file://frontend/src/App.jsx)
- [frontend/src/api.js](file://frontend/src/api.js)
- [frontend/src/components/Dashboard.jsx](file://frontend/src/components/Dashboard.jsx)
- [frontend/src/components/Patients.jsx](file://frontend/src/components/Patients.jsx)
- [frontend/package.json](file://frontend/package.json)
- [backend/requirements.txt](file://backend/requirements.txt)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Component Analysis](#detailed-component-analysis)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)

## Introduction
This document presents the architecture of the Smart Healthcare Dashboard, a full-stack healthcare management system. The system follows an API-first design with:
- React 18 frontend using component-based architecture and routing
- FastAPI backend with modular router organization
- SQLAlchemy ORM models and Pydantic validation schemas
- TailwindCSS for styling and Recharts for visualizations

The backend exposes RESTful endpoints organized by domain (patients, doctors, appointments, vitals, dashboard), while the frontend consumes these APIs via Axios to render interactive dashboards and management views.

## Project Structure
The repository is split into two primary layers:
- Backend: FastAPI application with routers, models, schemas, and database configuration
- Frontend: React application with components, routing, and API service layer

```mermaid
graph TB
subgraph "Backend"
M["backend/main.py"]
DB["backend/database.py"]
MD["backend/models.py"]
SCH["backend/schemas.py"]
PAT["backend/routers/patients.py"]
DOC["backend/routers/doctors.py"]
APP["backend/routers/appointments.py"]
DASH["backend/routers/dashboard.py"]
end
subgraph "Frontend"
APPX["frontend/src/App.jsx"]
API["frontend/src/api.js"]
DCOMP["frontend/src/components/Dashboard.jsx"]
PCOMP["frontend/src/components/Patients.jsx"]
end
APPX --> DCOMP
APPX --> PCOMP
DCOMP --> API
PCOMP --> API
API --> M
M --> DB
M --> PAT
M --> DOC
M --> APP
M --> DASH
PAT --> MD
DOC --> MD
APP --> MD
DASH --> MD
MD --> SCH
```

**Diagram sources**
- [backend/main.py:1-43](file://backend/main.py#L1-L43)
- [backend/database.py:1-20](file://backend/database.py#L1-L20)
- [backend/models.py:1-75](file://backend/models.py#L1-L75)
- [backend/schemas.py:1-134](file://backend/schemas.py#L1-L134)
- [backend/routers/patients.py:1-95](file://backend/routers/patients.py#L1-L95)
- [backend/routers/doctors.py:1-70](file://backend/routers/doctors.py#L1-L70)
- [backend/routers/appointments.py:1-173](file://backend/routers/appointments.py#L1-L173)
- [backend/routers/dashboard.py:1-81](file://backend/routers/dashboard.py#L1-L81)
- [frontend/src/App.jsx:1-74](file://frontend/src/App.jsx#L1-L74)
- [frontend/src/api.js:1-56](file://frontend/src/api.js#L1-L56)
- [frontend/src/components/Dashboard.jsx:1-194](file://frontend/src/components/Dashboard.jsx#L1-L194)
- [frontend/src/components/Patients.jsx:1-119](file://frontend/src/components/Patients.jsx#L1-L119)

**Section sources**
- [README.md:106-136](file://README.md#L106-L136)
- [backend/main.py:1-43](file://backend/main.py#L1-L43)
- [frontend/src/App.jsx:1-74](file://frontend/src/App.jsx#L1-L74)

## Core Components
- Backend FastAPI application initializes CORS, creates database tables, and mounts routers for each domain.
- SQLAlchemy declarative base defines ORM models for Patient, Doctor, Appointment, VitalSign, and Activity.
- Pydantic schemas define validation and serialization for request/response payloads.
- Frontend React components implement controllers for data fetching and rendering, with Axios-based API service module.

Key implementation references:
- Backend entrypoint and CORS: [backend/main.py:1-43](file://backend/main.py#L1-L43)
- Database engine and dependency: [backend/database.py:1-20](file://backend/database.py#L1-L20)
- ORM models: [backend/models.py:1-75](file://backend/models.py#L1-L75)
- Validation schemas: [backend/schemas.py:1-134](file://backend/schemas.py#L1-L134)
- Frontend routing and sidebar: [frontend/src/App.jsx:1-74](file://frontend/src/App.jsx#L1-L74)
- Frontend API service: [frontend/src/api.js:1-56](file://frontend/src/api.js#L1-L56)

**Section sources**
- [backend/main.py:1-43](file://backend/main.py#L1-L43)
- [backend/database.py:1-20](file://backend/database.py#L1-L20)
- [backend/models.py:1-75](file://backend/models.py#L1-L75)
- [backend/schemas.py:1-134](file://backend/schemas.py#L1-L134)
- [frontend/src/App.jsx:1-74](file://frontend/src/App.jsx#L1-L74)
- [frontend/src/api.js:1-56](file://frontend/src/api.js#L1-L56)

## Architecture Overview
The system follows an API-first pattern:
- Frontend components call Axios-based API functions to fetch or mutate data.
- API functions target FastAPI routes grouped by domain.
- Routers handle request validation, query building, and database operations.
- SQLAlchemy models map to SQLite tables; Pydantic schemas enforce data contracts.

```mermaid
graph TB
FE["React Components<br/>frontend/src/components/*"] --> AX["Axios API Module<br/>frontend/src/api.js"]
AX --> FA["FastAPI Routers<br/>backend/routers/*"]
FA --> DB["SQLAlchemy ORM Models<br/>backend/models.py"]
DB --> SQ["SQLite Database<br/>backend/database.py"]
FA --> PY["Pydantic Schemas<br/>backend/schemas.py"]
FA --> APP["FastAPI App<br/>backend/main.py"]
FE --- AX
AX --- FA
FA --- DB
DB --- SQ
FA --- PY
FA --- APP
```

**Diagram sources**
- [frontend/src/components/Dashboard.jsx:1-194](file://frontend/src/components/Dashboard.jsx#L1-L194)
- [frontend/src/components/Patients.jsx:1-119](file://frontend/src/components/Patients.jsx#L1-L119)
- [frontend/src/api.js:1-56](file://frontend/src/api.js#L1-L56)
- [backend/routers/patients.py:1-95](file://backend/routers/patients.py#L1-L95)
- [backend/routers/doctors.py:1-70](file://backend/routers/doctors.py#L1-L70)
- [backend/routers/appointments.py:1-173](file://backend/routers/appointments.py#L1-L173)
- [backend/routers/dashboard.py:1-81](file://backend/routers/dashboard.py#L1-L81)
- [backend/models.py:1-75](file://backend/models.py#L1-L75)
- [backend/schemas.py:1-134](file://backend/schemas.py#L1-L134)
- [backend/database.py:1-20](file://backend/database.py#L1-L20)
- [backend/main.py:1-43](file://backend/main.py#L1-L43)

## Detailed Component Analysis

### Backend MVC Pattern Implementation
- Model: SQLAlchemy ORM classes define entity schemas and relationships.
- View: FastAPI routers expose endpoints returning JSON responses.
- Controller: Routers orchestrate validation (Pydantic), query construction, and persistence.

```mermaid
classDiagram
class Patient {
+int id
+string name
+int age
+string gender
+string condition
+string room
+datetime admission_date
+string status
+string contact
+string email
}
class Doctor {
+int id
+string name
+string specialization
+bool available
+int patients_count
+string contact
+string email
}
class Appointment {
+int id
+int patient_id
+int doctor_id
+string department
+datetime date
+string time
+string status
+string notes
+datetime created_at
}
class VitalSign {
+int id
+int patient_id
+datetime timestamp
+int heart_rate
+int blood_pressure_systolic
+int blood_pressure_diastolic
+float temperature
+int oxygen_level
+int respiratory_rate
}
class Activity {
+int id
+datetime timestamp
+string event
+string type
+int patient_id
}
Patient "1" <-- "many" Appointment : "has"
Doctor "1" <-- "many" Appointment : "has"
Patient "1" <-- "many" VitalSign : "has"
```

**Diagram sources**
- [backend/models.py:1-75](file://backend/models.py#L1-L75)

**Section sources**
- [backend/models.py:1-75](file://backend/models.py#L1-L75)
- [backend/schemas.py:1-134](file://backend/schemas.py#L1-L134)
- [backend/routers/patients.py:1-95](file://backend/routers/patients.py#L1-L95)
- [backend/routers/doctors.py:1-70](file://backend/routers/doctors.py#L1-L70)
- [backend/routers/appointments.py:1-173](file://backend/routers/appointments.py#L1-L173)
- [backend/routers/dashboard.py:1-81](file://backend/routers/dashboard.py#L1-L81)

### Data Flow: Frontend to Backend
The typical request flow from a React component to the backend:

```mermaid
sequenceDiagram
participant Comp as "React Component<br/>Dashboard/Patients"
participant API as "Axios API Module<br/>api.js"
participant Router as "FastAPI Router<br/>patients/doctors/appointments/dashboard"
participant DB as "SQLAlchemy ORM<br/>models.py"
participant Store as "SQLite DB<br/>database.py"
Comp->>API : "Call API function (GET/POST/PUT/DELETE)"
API->>Router : "HTTP request to /api/* endpoint"
Router->>Router : "Validate payload (Pydantic)"
Router->>DB : "Query/Insert/Update/Delete"
DB->>Store : "Execute SQL statements"
Store-->>DB : "Rows/Result"
DB-->>Router : "Domain object(s)"
Router-->>API : "JSON response"
API-->>Comp : "Data for rendering"
```

**Diagram sources**
- [frontend/src/components/Dashboard.jsx:1-194](file://frontend/src/components/Dashboard.jsx#L1-L194)
- [frontend/src/components/Patients.jsx:1-119](file://frontend/src/components/Patients.jsx#L1-L119)
- [frontend/src/api.js:1-56](file://frontend/src/api.js#L1-L56)
- [backend/routers/patients.py:1-95](file://backend/routers/patients.py#L1-L95)
- [backend/routers/doctors.py:1-70](file://backend/routers/doctors.py#L1-L70)
- [backend/routers/appointments.py:1-173](file://backend/routers/appointments.py#L1-L173)
- [backend/routers/dashboard.py:1-81](file://backend/routers/dashboard.py#L1-L81)
- [backend/models.py:1-75](file://backend/models.py#L1-L75)
- [backend/database.py:1-20](file://backend/database.py#L1-L20)

### API-First Design and CORS
- API-first: Frontend components depend on clearly defined endpoints; API responses are consumed directly.
- CORS: Enabled for local development origins to allow cross-origin requests from the React dev server.

References:
- API endpoints and health checks: [backend/main.py:31-38](file://backend/main.py#L31-L38)
- CORS configuration: [backend/main.py:15-22](file://backend/main.py#L15-L22)
- Frontend API base URL: [frontend/src/api.js:3](file://frontend/src/api.js#L3)

**Section sources**
- [backend/main.py:15-22](file://backend/main.py#L15-L22)
- [backend/main.py:31-38](file://backend/main.py#L31-L38)
- [frontend/src/api.js:3](file://frontend/src/api.js#L3)

### Routing and Component Controllers
- Frontend routing: [frontend/src/App.jsx:53-71](file://frontend/src/App.jsx#L53-L71)
- Dashboard controller: [frontend/src/components/Dashboard.jsx:26-62](file://frontend/src/components/Dashboard.jsx#L26-L62)
- Patients controller: [frontend/src/components/Patients.jsx:5-30](file://frontend/src/components/Patients.jsx#L5-L30)
- API service module: [frontend/src/api.js:12-53](file://frontend/src/api.js#L12-L53)

**Section sources**
- [frontend/src/App.jsx:53-71](file://frontend/src/App.jsx#L53-L71)
- [frontend/src/components/Dashboard.jsx:26-62](file://frontend/src/components/Dashboard.jsx#L26-L62)
- [frontend/src/components/Patients.jsx:5-30](file://frontend/src/components/Patients.jsx#L5-L30)
- [frontend/src/api.js:12-53](file://frontend/src/api.js#L12-L53)

## Dependency Analysis
Technology stack and module-level dependencies:
- Frontend: React 18, Vite, TailwindCSS, Recharts, Lucide React, Axios
- Backend: FastAPI, Uvicorn, Pydantic, SQLAlchemy, python-dateutil, faker

```mermaid
graph LR
subgraph "Frontend Dependencies"
R["react@^18.2.0"]
RDOM["react-dom@^18.2.0"]
RRD["react-router-dom@^6.20.0"]
AX["axios@^1.6.2"]
RC["recharts@^2.10.3"]
LR["lucide-react@^0.294.0"]
TW["tailwindcss@^3.3.6"]
end
subgraph "Backend Dependencies"
FA["fastapi>=0.104.0"]
UV["uvicorn>=0.24.0"]
PD["pydantic>=2.0.0"]
MP["python-multipart>=0.0.6"]
SA["sqlalchemy>=2.0.0"]
AL["alembic>=1.12.0"]
DU["python-dateutil>=2.8.2"]
FK["faker>=19.0.0"]
end
R --> AX
RRD --> AX
RC --> R
LR --> R
TW --> R
FA --> PD
FA --> SA
UV --> FA
SA --> AL
```

**Diagram sources**
- [frontend/package.json:12-32](file://frontend/package.json#L12-L32)
- [backend/requirements.txt:1-9](file://backend/requirements.txt#L1-L9)

**Section sources**
- [frontend/package.json:12-32](file://frontend/package.json#L12-L32)
- [backend/requirements.txt:1-9](file://backend/requirements.txt#L1-L9)

## Performance Considerations
- Database queries: Use pagination parameters (skip/limit) and selective filters to avoid large result sets.
- Frontend rendering: Lazy-load heavy charts and limit concurrent API calls where possible.
- CORS: Keep allowed origins minimal during development; restrict in production environments.
- ORM efficiency: Prefer eager loading and filtered queries to reduce N+1 issues.

## Troubleshooting Guide
Common issues and resolutions:
- CORS errors: Verify allowed origins match frontend URLs and credentials are enabled as needed.
  - Reference: [backend/main.py:15-22](file://backend/main.py#L15-L22)
- Health check failures: Confirm the root endpoint returns expected metadata and docs path.
  - Reference: [backend/main.py:31-38](file://backend/main.py#L31-L38)
- Database initialization: Ensure tables are created before serving requests.
  - Reference: [backend/main.py:6-7](file://backend/main.py#L6-L7)
- API connectivity: Validate base URL and endpoint paths align with router prefixes.
  - Reference: [frontend/src/api.js:3](file://frontend/src/api.js#L3)

**Section sources**
- [backend/main.py:6-7](file://backend/main.py#L6-L7)
- [backend/main.py:15-22](file://backend/main.py#L15-L22)
- [backend/main.py:31-38](file://backend/main.py#L31-L38)
- [frontend/src/api.js:3](file://frontend/src/api.js#L3)

## Conclusion
The Smart Healthcare Dashboard employs a clean separation of concerns:
- Frontend components act as controllers, orchestrating data retrieval and rendering.
- Backend routers serve as controllers, validating inputs and delegating to models.
- Models and schemas encapsulate data contracts and persistence logic.
- The API-first approach and CORS configuration enable seamless frontend-backend integration.

This architecture supports scalability, maintainability, and rapid feature iteration while leveraging modern tools for productivity and developer experience.