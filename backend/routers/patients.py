from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models import Patient
from schemas import PatientCreate, PatientUpdate, PatientResponse
import models

router = APIRouter(prefix="/api/patients", tags=["patients"])

@router.get("/", response_model=List[PatientResponse])
def get_patients(
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    condition: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(Patient)
    
    # Fuzzy search on name or condition
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Patient.name.ilike(search_term)) | 
            (Patient.condition.ilike(search_term))
        )
    
    # Filter by status
    if status:
        query = query.filter(Patient.status == status)
    
    # Filter by condition
    if condition:
        query = query.filter(Patient.condition == condition)
    
    patients = query.offset(skip).limit(limit).all()
    return patients

@router.get("/{patient_id}", response_model=PatientResponse)
def get_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient

@router.post("/", response_model=PatientResponse, status_code=201)
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    # Check for duplicate patient (same name and room)
    existing = db.query(Patient).filter(
        Patient.name == patient.name,
        Patient.room == patient.room
    ).first()
    
    if existing:
        raise HTTPException(
            status_code=409, 
            detail="Patient with this name and room already exists"
        )
    
    db_patient = Patient(**patient.model_dump())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@router.put("/{patient_id}", response_model=PatientResponse)
def update_patient(
    patient_id: int, 
    patient_update: PatientUpdate, 
    db: Session = Depends(get_db)
):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    update_data = patient_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(patient, key, value)
    
    db.commit()
    db.refresh(patient)
    return patient

@router.delete("/{patient_id}", status_code=204)
def delete_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    db.delete(patient)
    db.commit()
    return None
