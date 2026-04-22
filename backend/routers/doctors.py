from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models import Doctor
from schemas import DoctorCreate, DoctorUpdate, DoctorResponse

router = APIRouter(prefix="/api/doctors", tags=["doctors"])

@router.get("/", response_model=List[DoctorResponse])
def get_doctors(
    skip: int = 0,
    limit: int = 100,
    available: Optional[bool] = Query(None),
    specialization: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Doctor)
    
    if available is not None:
        query = query.filter(Doctor.available == available)
    if specialization:
        query = query.filter(Doctor.specialization == specialization)
    
    doctors = query.offset(skip).limit(limit).all()
    return doctors

@router.get("/{doctor_id}", response_model=DoctorResponse)
def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor

@router.post("/", response_model=DoctorResponse, status_code=201)
def create_doctor(doctor: DoctorCreate, db: Session = Depends(get_db)):
    db_doctor = Doctor(**doctor.model_dump())
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor

@router.put("/{doctor_id}", response_model=DoctorResponse)
def update_doctor(
    doctor_id: int,
    doctor_update: DoctorUpdate,
    db: Session = Depends(get_db)
):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    update_data = doctor_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(doctor, key, value)
    
    db.commit()
    db.refresh(doctor)
    return doctor

@router.delete("/{doctor_id}", status_code=204)
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    db.delete(doctor)
    db.commit()
    return None
