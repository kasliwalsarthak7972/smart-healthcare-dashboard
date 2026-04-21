from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import random
import hashlib

app = FastAPI(title="Smart Healthcare Dashboard API", version="2.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class Patient(BaseModel):
    id: int
    name: str
    age: int
    gender: str
    condition: str
    room: str
    admission_date: str
    status: str
    vitals: dict

class Appointment(BaseModel):
    id: int
    patient_name: str
    doctor: str
    department: str
    date: str
    time: str
    status: str

class VitalsData(BaseModel):
    timestamp: str
    heart_rate: int
    blood_pressure: str
    temperature: float
    oxygen_level: int
    respiratory_rate: int

class Doctor(BaseModel):
    id: int
    name: str
    specialization: str
    available: bool
    patients_count: int

# Mock data generators
def generate_mock_patients():
    conditions = ["Cardiac", "Neurological", "Orthopedic", "General", "Critical"]
    statuses = ["Stable", "Critical", "Recovering", "Observation"]
    patients = []
    names = ["John Smith", "Sarah Johnson", "Mike Davis", "Emma Wilson", "James Brown", 
             "Lisa Anderson", "Robert Taylor", "Maria Garcia", "David Martinez", "Jennifer Lee"]
    
    for i in range(10):
        patients.append(Patient(
            id=i+1,
            name=names[i],
            age=random.randint(25, 85),
            gender=random.choice(["Male", "Female"]),
            condition=random.choice(conditions),
            room=f"{random.randint(100, 500)}",
            admission_date=f"2024-01-{random.randint(1, 28):02d}",
            status=random.choice(statuses),
            vitals={
                "heart_rate": random.randint(60, 100),
                "blood_pressure": f"{random.randint(110, 140)}/{random.randint(60, 90)}",
                "temperature": round(random.uniform(36.1, 37.8), 1),
                "oxygen_level": random.randint(92, 100),
                "respiratory_rate": random.randint(12, 20)
            }
        ))
    return patients

def generate_mock_appointments():
    doctors = ["Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Jones"]
    departments = ["Cardiology", "Neurology", "Orthopedics", "General", "Pediatrics"]
    statuses = ["Confirmed", "Pending", "Completed", "Cancelled"]
    patient_names = ["John Smith", "Sarah Johnson", "Mike Davis", "Emma Wilson", "James Brown", 
                     "Lisa Anderson", "Robert Taylor", "Maria Garcia", "David Martinez", "Jennifer Lee",
                     "Alex Thompson", "Rachel Green", "Michael Chang", "Sophie Miller", "Daniel Kim"]
    appointments = []
    
    for i in range(15):
        appointments.append(Appointment(
            id=i+1,
            patient_name=patient_names[i],
            doctor=random.choice(doctors),
            department=random.choice(departments),
            date=f"2024-01-{random.randint(15, 30):02d}",
            time=f"{random.randint(9, 17):02d}:{random.choice(['00', '15', '30', '45'])}",
            status=random.choice(statuses)
        ))
    return appointments

def generate_mock_vitals():
    vitals_data = []
    for i in range(24):
        vitals_data.append(VitalsData(
            timestamp=f"{i:02d}:00",
            heart_rate=random.randint(60, 100),
            blood_pressure=f"{random.randint(110, 140)}/{random.randint(60, 90)}",
            temperature=round(random.uniform(36.1, 37.8), 1),
            oxygen_level=random.randint(92, 100),
            respiratory_rate=random.randint(12, 20)
        ))
    return vitals_data

def generate_mock_doctors():
    specs = ["Cardiology", "Neurology", "Orthopedics", "General", "Pediatrics", "Emergency"]
    doctors = []
    names = ["Dr. Sarah Johnson", "Dr. Michael Chen", "Dr. Emily Rodriguez", 
             "Dr. James Wilson", "Dr. Lisa Thompson", "Dr. Robert Brown"]
    
    for i, name in enumerate(names):
        doctors.append(Doctor(
            id=i+1,
            name=name,
            specialization=random.choice(specs),
            available=random.choice([True, False]),
            patients_count=random.randint(10, 50)
        ))
    return doctors

# API Endpoints
@app.get("/")
async def root():
    return {"message": "Smart Healthcare Dashboard API", "version": "2.0.0"}

@app.get("/api/patients")
async def get_patients():
    return generate_mock_patients()

@app.get("/api/patients/{patient_id}")
async def get_patient(patient_id: int):
    patients = generate_mock_patients()
    for patient in patients:
        if patient.id == patient_id:
            return patient
    return {"error": "Patient not found"}

@app.get("/api/appointments")
async def get_appointments():
    return generate_mock_appointments()

@app.get("/api/vitals/{patient_id}")
async def get_vitals(patient_id: int):
    return generate_mock_vitals()

@app.get("/api/doctors")
async def get_doctors():
    return generate_mock_doctors()

@app.get("/api/dashboard/stats")
async def get_dashboard_stats():
    return {
        "total_patients": 247,
        "available_beds": 42,
        "critical_cases": 8,
        "appointments_today": 23,
        "doctors_on_duty": 12,
        "revenue_today": 45230,
        "admission_rate": 12.5,
        "discharge_rate": 8.3
    }

@app.get("/api/recent-activity")
async def get_recent_activity():
    activities = [
        {"time": "2 min ago", "event": "Patient John Smith admitted to Room 205", "type": "admission"},
        {"time": "15 min ago", "event": "Lab results ready for Patient Emma Wilson", "type": "lab"},
        {"time": "32 min ago", "event": "Dr. Johnson completed surgery", "type": "surgery"},
        {"time": "1 hour ago", "event": "Critical alert - Patient James Brown", "type": "alert"},
        {"time": "2 hours ago", "event": "Patient Lisa Anderson discharged", "type": "discharge"},
        {"time": "3 hours ago", "event": "Appointment scheduled with Dr. Chen", "type": "appointment"}
    ]
    return activities

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
