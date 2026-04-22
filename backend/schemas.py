from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Patient Schemas
class PatientBase(BaseModel):
    name: str
    age: int
    gender: str
    condition: str
    room: str
    status: str = "Stable"
    contact: Optional[str] = None
    email: Optional[str] = None

class PatientCreate(PatientBase):
    admission_date: Optional[datetime] = None

class PatientUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    condition: Optional[str] = None
    room: Optional[str] = None
    status: Optional[str] = None
    contact: Optional[str] = None
    email: Optional[str] = None

class PatientResponse(PatientBase):
    id: int
    admission_date: datetime
    
    class Config:
        from_attributes = True

# Doctor Schemas
class DoctorBase(BaseModel):
    name: str
    specialization: str
    available: bool = True
    patients_count: int = 0
    contact: Optional[str] = None
    email: Optional[str] = None

class DoctorCreate(DoctorBase):
    pass

class DoctorUpdate(BaseModel):
    name: Optional[str] = None
    specialization: Optional[str] = None
    available: Optional[bool] = None
    patients_count: Optional[int] = None
    contact: Optional[str] = None
    email: Optional[str] = None

class DoctorResponse(DoctorBase):
    id: int
    
    class Config:
        from_attributes = True

# Appointment Schemas
class AppointmentBase(BaseModel):
    patient_id: int
    doctor_id: int
    department: str
    date: datetime
    time: str
    status: str = "Pending"
    notes: Optional[str] = None

class AppointmentCreate(AppointmentBase):
    pass

class AppointmentUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None

class AppointmentResponse(AppointmentBase):
    id: int
    created_at: datetime
    patient: PatientResponse
    doctor: DoctorResponse
    
    class Config:
        from_attributes = True

# Vital Sign Schemas
class VitalSignBase(BaseModel):
    patient_id: int
    heart_rate: Optional[int] = None
    blood_pressure_systolic: Optional[int] = None
    blood_pressure_diastolic: Optional[int] = None
    temperature: Optional[float] = None
    oxygen_level: Optional[int] = None
    respiratory_rate: Optional[int] = None

class VitalSignCreate(VitalSignBase):
    timestamp: Optional[datetime] = None

class VitalSignResponse(VitalSignBase):
    id: int
    timestamp: datetime
    
    class Config:
        from_attributes = True

# Activity Schema
class ActivityBase(BaseModel):
    event: str
    type: str
    patient_id: Optional[int] = None

class ActivityCreate(ActivityBase):
    pass

class ActivityResponse(ActivityBase):
    id: int
    timestamp: datetime
    
    class Config:
        from_attributes = True

# Dashboard Stats Schema
class DashboardStats(BaseModel):
    total_patients: int
    available_beds: int
    critical_cases: int
    appointments_today: int
    doctors_on_duty: int
    revenue_today: int
    admission_rate: float
    discharge_rate: float
