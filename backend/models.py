from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Patient(Base):
    __tablename__ = "patients"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    condition = Column(String, nullable=False)
    room = Column(String, nullable=False)
    admission_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String, nullable=False, default="Stable")
    contact = Column(String)
    email = Column(String)
    
    appointments = relationship("Appointment", back_populates="patient")
    vitals = relationship("VitalSign", back_populates="patient")

class Doctor(Base):
    __tablename__ = "doctors"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    specialization = Column(String, nullable=False)
    available = Column(Boolean, default=True)
    patients_count = Column(Integer, default=0)
    contact = Column(String)
    email = Column(String)
    
    appointments = relationship("Appointment", back_populates="doctor")

class Appointment(Base):
    __tablename__ = "appointments"
    
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    department = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    time = Column(String, nullable=False)
    status = Column(String, nullable=False, default="Pending")
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    patient = relationship("Patient", back_populates="appointments")
    doctor = relationship("Doctor", back_populates="appointments")

class VitalSign(Base):
    __tablename__ = "vital_signs"
    
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    heart_rate = Column(Integer)
    blood_pressure_systolic = Column(Integer)
    blood_pressure_diastolic = Column(Integer)
    temperature = Column(Float)
    oxygen_level = Column(Integer)
    respiratory_rate = Column(Integer)
    
    patient = relationship("Patient", back_populates="vitals")

class Activity(Base):
    __tablename__ = "activities"
    
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    event = Column(String, nullable=False)
    type = Column(String, nullable=False)
    patient_id = Column(Integer, ForeignKey("patients.id"), nullable=True)
