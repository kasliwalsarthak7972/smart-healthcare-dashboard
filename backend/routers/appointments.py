from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from database import get_db
from models import Appointment, Patient, Doctor
from schemas import AppointmentCreate, AppointmentUpdate, AppointmentResponse
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/appointments", tags=["appointments"])

# Valid time slots (9AM-6PM, 15min intervals)
VALID_TIME_SLOTS = [
    "09:00", "09:15", "09:30", "09:45",
    "10:00", "10:15", "10:30", "10:45",
    "11:00", "11:15", "11:30", "11:45",
    "12:00", "12:15", "12:30", "12:45",
    "13:00", "13:15", "13:30", "13:45",
    "14:00", "14:15", "14:30", "14:45",
    "15:00", "15:15", "15:30", "15:45",
    "16:00", "16:15", "16:30", "16:45",
    "17:00", "17:15", "17:30", "17:45"
]

def update_pending_appointments(db: Session):
    """Auto-update pending appointments based on time rules"""
    now = datetime.utcnow()
    
    # Pending -> Cancelled if older than 48 hours
    forty_eight_hours_ago = now - timedelta(hours=48)
    old_pending = db.query(Appointment).filter(
        Appointment.status == "Pending",
        Appointment.created_at < forty_eight_hours_ago
    ).all()
    
    for appt in old_pending:
        appt.status = "Cancelled"
    
    # Pending -> Confirmed if older than 24 hours but less than 48
    twenty_four_hours_ago = now - timedelta(hours=24)
    medium_pending = db.query(Appointment).filter(
        Appointment.status == "Pending",
        Appointment.created_at < twenty_four_hours_ago,
        Appointment.created_at >= forty_eight_hours_ago
    ).all()
    
    for appt in medium_pending:
        appt.status = "Confirmed"
    
    if old_pending or medium_pending:
        db.commit()

@router.get("/", response_model=List[AppointmentResponse])
def get_appointments(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = Query(None),
    doctor_id: Optional[int] = Query(None),
    patient_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    # Update pending appointments first
    update_pending_appointments(db)
    
    query = db.query(Appointment)
    
    if status:
        query = query.filter(Appointment.status == status)
    if doctor_id:
        query = query.filter(Appointment.doctor_id == doctor_id)
    if patient_id:
        query = query.filter(Appointment.patient_id == patient_id)
    
    appointments = query.offset(skip).limit(limit).all()
    return appointments

@router.get("/{appointment_id}", response_model=AppointmentResponse)
def get_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment

@router.post("/", response_model=AppointmentResponse, status_code=201)
def create_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    # Validate time slot
    if appointment.time not in VALID_TIME_SLOTS:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid time slot. Must be one of: {', '.join(VALID_TIME_SLOTS[:5])}..."
        )
    
    # Check if patient exists
    patient = db.query(Patient).filter(Patient.id == appointment.patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Check if doctor exists
    doctor = db.query(Doctor).filter(Doctor.id == appointment.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    # Check if slot is already booked
    existing = db.query(Appointment).filter(
        Appointment.doctor_id == appointment.doctor_id,
        Appointment.date == appointment.date,
        Appointment.time == appointment.time,
        Appointment.status != "Cancelled"
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=409, 
            detail="This time slot is already booked"
        )
    
    db_appointment = Appointment(**appointment.model_dump())
    db.add(db_appointment)
    
    # Update doctor's patient count
    doctor.patients_count += 1
    
    db.commit()
    db.refresh(db_appointment)
    return db_appointment

@router.put("/{appointment_id}", response_model=AppointmentResponse)
def update_appointment(
    appointment_id: int,
    appointment_update: AppointmentUpdate,
    db: Session = Depends(get_db)
):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    update_data = appointment_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(appointment, key, value)
    
    db.commit()
    db.refresh(appointment)
    return appointment

@router.delete("/{appointment_id}", status_code=204)
def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    db.delete(appointment)
    db.commit()
    return None

@router.get("/revenue/today")
def get_today_revenue(db: Session = Depends(get_db)):
    """Calculate today's revenue: ₹5000 per confirmed appointment"""
    today = datetime.utcnow().date()
    
    confirmed_count = db.query(Appointment).filter(
        Appointment.status == "Confirmed",
        func.date(Appointment.date) == today
    ).count()
    
    revenue = confirmed_count * 5000
    
    return {
        "date": today.isoformat(),
        "confirmed_appointments": confirmed_count,
        "revenue": revenue,
        "currency": "INR"
    }
