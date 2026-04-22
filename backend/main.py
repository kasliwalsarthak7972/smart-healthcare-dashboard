from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import patients, appointments, doctors, vitals, dashboard
from contextlib import asynccontextmanager
import os

# Auto-initialize database on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize database and seed data
    from init_db import init_db
    init_db()
    yield
    # Shutdown: Nothing to clean up

app = FastAPI(
    title="Smart Healthcare Dashboard API",
    version="2.0.0",
    description="Production-ready healthcare management system with SQLite database",
    lifespan=lifespan
)

# CORS middleware - Allow frontend on localhost:3000 and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "*",  # Allow all origins for production (update with specific Vercel URL after deployment)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(patients.router)
app.include_router(appointments.router)
app.include_router(doctors.router)
app.include_router(vitals.router)
app.include_router(dashboard.router)

@app.get("/")
async def root():
    return {
        "message": "Smart Healthcare Dashboard API",
        "version": "2.0.0",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
