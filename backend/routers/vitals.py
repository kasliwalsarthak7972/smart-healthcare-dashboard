from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models import VitalSign, Patient
from schemas import VitalSignCreate, VitalSignResponse
from datetime import datetime, timedelta

router = APIRouter(prefix="/api/vitals", tags=["vitals"])

@router.get("/{patient_id}", response_model=List[VitalSignResponse])
def get_vitals(
    patient_id: int,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    # Verify patient exists
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    vitals = db.query(VitalSign).filter(
        VitalSign.patient_id == patient_id
    ).offset(skip).limit(limit).all()
    
    return vitals

@router.get("/{patient_id}/trends", response_model=List[VitalSignResponse])
def get_vitals_trends(
    patient_id: int,
    hours: int = Query(24, description="Number of hours to look back"),
    db: Session = Depends(get_db)
):
    # Verify patient exists
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Get vitals from last N hours
    time_threshold = datetime.utcnow() - timedelta(hours=hours)
    
    vitals = db.query(VitalSign).filter(
        VitalSign.patient_id == patient_id,
        VitalSign.timestamp >= time_threshold
    ).order_by(VitalSign.timestamp).all()
    
    return vitals

@router.post("/", response_model=VitalSignResponse, status_code=201)
def create_vital(vital: VitalSignCreate, db: Session = Depends(get_db)):
    # Verify patient exists
    patient = db.query(Patient).filter(Patient.id == vital.patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    db_vital = VitalSign(**vital.model_dump())
    db.add(db_vital)
    db.commit()
    db.refresh(db_vital)
    return db_vital

@router.delete("/{vital_id}", status_code=204)
def delete_vital(vital_id: int, db: Session = Depends(get_db)):
    vital = db.query(VitalSign).filter(VitalSign.id == vital_id).first()
    if not vital:
        raise HTTPException(status_code=404, detail="Vital sign record not found")
    
    db.delete(vital)
    db.commit()
    return None
