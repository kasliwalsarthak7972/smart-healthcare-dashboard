from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models import Patient, Doctor, Appointment, Activity
from schemas import DashboardStats, ActivityResponse
from datetime import datetime, timedelta
from typing import List

router = APIRouter(prefix="/api", tags=["dashboard"])

@router.get("/dashboard/stats", response_model=DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    # Total patients
    total_patients = db.query(Patient).count()
    
    # Critical cases
    critical_cases = db.query(Patient).filter(Patient.status == "Critical").count()
    
    # Available beds (assuming 300 total beds)
    total_beds = 300
    occupied_beds = db.query(Patient).filter(
        Patient.status.in_(["Stable", "Critical", "Observation", "Recovering"])
    ).count()
    available_beds = total_beds - occupied_beds
    
    # Appointments today
    today = datetime.utcnow().date()
    appointments_today = db.query(Appointment).filter(
        func.date(Appointment.date) == today
    ).count()
    
    # Doctors on duty (available)
    doctors_on_duty = db.query(Doctor).filter(Doctor.available == True).count()
    
    # Revenue today (₹5000 per confirmed appointment)
    confirmed_today = db.query(Appointment).filter(
        Appointment.status == "Confirmed",
        func.date(Appointment.date) == today
    ).count()
    revenue_today = confirmed_today * 5000
    
    # Admission rate (new patients today)
    admission_today = db.query(Patient).filter(
        func.date(Patient.admission_date) == today
    ).count()
    admission_rate = (admission_today / total_patients * 100) if total_patients > 0 else 0
    
    # Discharge rate (patients with status "Discharged" today - not implemented in current model)
    # For now, we'll estimate based on recovered patients
    discharge_rate = 8.3  # Placeholder
    
    return DashboardStats(
        total_patients=total_patients,
        available_beds=available_beds,
        critical_cases=critical_cases,
        appointments_today=appointments_today,
        doctors_on_duty=doctors_on_duty,
        revenue_today=revenue_today,
        admission_rate=round(admission_rate, 2),
        discharge_rate=discharge_rate
    )

@router.get("/recent-activity", response_model=List[ActivityResponse])
def get_recent_activity(db: Session = Depends(get_db)):
    # Get last 20 activities, ordered by timestamp
    activities = db.query(Activity).order_by(
        Activity.timestamp.desc()
    ).limit(20).all()
    
    return activities

@router.get("/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "Smart Healthcare Dashboard API",
        "version": "2.0.0"
    }
