from database import SessionLocal, engine
from models import Base, Patient, Doctor, Appointment, VitalSign, Activity
from datetime import datetime, timedelta
import random

def seed_database():
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(Patient).count() > 0:
            print("Database already seeded. Skipping...")
            return
        
        print("Seeding database...")
        
        # Create patients
        patients_data = [
            {"name": "John Smith", "age": 45, "gender": "Male", "condition": "Cardiac", "room": "205", "status": "Stable", "contact": "555-0101", "email": "john.smith@email.com"},
            {"name": "Sarah Johnson", "age": 32, "gender": "Female", "condition": "Neurological", "room": "312", "status": "Critical", "contact": "555-0102", "email": "sarah.j@email.com"},
            {"name": "Mike Davis", "age": 58, "gender": "Male", "condition": "Orthopedic", "room": "118", "status": "Recovering", "contact": "555-0103", "email": "mike.d@email.com"},
            {"name": "Emma Wilson", "age": 27, "gender": "Female", "condition": "General", "room": "421", "status": "Stable", "contact": "555-0104", "email": "emma.w@email.com"},
            {"name": "James Brown", "age": 65, "gender": "Male", "condition": "Critical", "room": "102", "status": "Critical", "contact": "555-0105", "email": "james.b@email.com"},
            {"name": "Lisa Anderson", "age": 41, "gender": "Female", "condition": "Cardiac", "room": "215", "status": "Observation", "contact": "555-0106", "email": "lisa.a@email.com"},
            {"name": "Robert Taylor", "age": 53, "gender": "Male", "condition": "Neurological", "room": "308", "status": "Stable", "contact": "555-0107", "email": "robert.t@email.com"},
            {"name": "Maria Garcia", "age": 36, "gender": "Female", "condition": "General", "room": "419", "status": "Recovering", "contact": "555-0108", "email": "maria.g@email.com"},
            {"name": "David Martinez", "age": 72, "gender": "Male", "condition": "Cardiac", "room": "107", "status": "Critical", "contact": "555-0109", "email": "david.m@email.com"},
            {"name": "Jennifer Lee", "age": 29, "gender": "Female", "condition": "Orthopedic", "room": "324", "status": "Stable", "contact": "555-0110", "email": "jennifer.l@email.com"},
        ]
        
        patients = []
        for data in patients_data:
            patient = Patient(
                **data,
                admission_date=datetime.utcnow() - timedelta(days=random.randint(1, 30))
            )
            db.add(patient)
            patients.append(patient)
        
        db.commit()
        print(f"Created {len(patients)} patients")
        
        # Create doctors
        doctors_data = [
            {"name": "Dr. Sarah Johnson", "specialization": "Cardiology", "available": True, "patients_count": 25, "contact": "555-0201", "email": "dr.sarah@hospital.com"},
            {"name": "Dr. Michael Chen", "specialization": "Neurology", "available": True, "patients_count": 18, "contact": "555-0202", "email": "dr.chen@hospital.com"},
            {"name": "Dr. Emily Rodriguez", "specialization": "Orthopedics", "available": False, "patients_count": 32, "contact": "555-0203", "email": "dr.emily@hospital.com"},
            {"name": "Dr. James Wilson", "specialization": "General Medicine", "available": True, "patients_count": 40, "contact": "555-0204", "email": "dr.wilson@hospital.com"},
            {"name": "Dr. Lisa Thompson", "specialization": "Emergency", "available": True, "patients_count": 15, "contact": "555-0205", "email": "dr.thompson@hospital.com"},
        ]
        
        doctors = []
        for data in doctors_data:
            doctor = Doctor(**data)
            db.add(doctor)
            doctors.append(doctor)
        
        db.commit()
        print(f"Created {len(doctors)} doctors")
        
        # Create appointments
        statuses = ["Confirmed", "Pending", "Completed", "Cancelled"]
        departments = ["Cardiology", "Neurology", "Orthopedics", "General Medicine", "Emergency"]
        time_slots = ["09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45",
                     "11:00", "11:15", "11:30", "11:45", "14:00", "14:15", "14:30", "14:45",
                     "15:00", "15:15", "15:30", "15:45", "16:00", "16:15"]
        
        appointments = []
        for i in range(20):
            appointment = Appointment(
                patient_id=random.choice(patients).id,
                doctor_id=random.choice(doctors).id,
                department=random.choice(departments),
                date=datetime.utcnow() + timedelta(days=random.randint(-5, 10)),
                time=random.choice(time_slots),
                status=random.choice(statuses),
                notes=f"Appointment notes for patient {i+1}"
            )
            db.add(appointment)
            appointments.append(appointment)
        
        db.commit()
        print(f"Created {len(appointments)} appointments")
        
        # Create vital signs for each patient
        for patient in patients:
            for hour in range(24):
                vital = VitalSign(
                    patient_id=patient.id,
                    timestamp=datetime.utcnow() - timedelta(hours=23-hour),
                    heart_rate=random.randint(60, 100),
                    blood_pressure_systolic=random.randint(110, 140),
                    blood_pressure_diastolic=random.randint(60, 90),
                    temperature=round(random.uniform(36.1, 37.8), 1),
                    oxygen_level=random.randint(92, 100),
                    respiratory_rate=random.randint(12, 20)
                )
                db.add(vital)
        
        db.commit()
        print("Created vital signs for all patients")
        
        # Create activities
        activities_data = [
            {"event": "Patient John Smith admitted to Room 205", "type": "admission", "patient_id": patients[0].id},
            {"event": "Lab results ready for Patient Emma Wilson", "type": "lab", "patient_id": patients[3].id},
            {"event": "Dr. Johnson completed surgery", "type": "surgery"},
            {"event": "Critical alert - Patient James Brown", "type": "alert", "patient_id": patients[4].id},
            {"event": "Patient Lisa Anderson discharged", "type": "discharge", "patient_id": patients[5].id},
            {"event": "Appointment scheduled with Dr. Chen", "type": "appointment"},
            {"event": "Vitals updated for Patient Sarah Johnson", "type": "vitals", "patient_id": patients[1].id},
            {"event": "Medication administered to Patient Mike Davis", "type": "medication", "patient_id": patients[2].id},
        ]
        
        for i, data in enumerate(activities_data):
            activity = Activity(
                **data,
                timestamp=datetime.utcnow() - timedelta(minutes=i*15)
            )
            db.add(activity)
        
        db.commit()
        print("Created recent activities")
        
        print("Database seeding completed successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
