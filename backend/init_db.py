from database import SessionLocal, engine
from models import Base

def init_db():
    """Initialize database and seed data on startup"""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    # Check if database needs seeding
    db = SessionLocal()
    try:
        from models import Patient
        patient_count = db.query(Patient).count()
        
        if patient_count == 0:
            print("Database is empty. Seeding initial data...")
            from seed_data import seed_database
            seed_database()
        else:
            print(f"Database already has {patient_count} patients. Skipping seed.")
    except Exception as e:
        print(f"Error during database initialization: {e}")
    finally:
        db.close()
