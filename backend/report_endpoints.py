# Additional API endpoints for reports
# Add this to the end of main.py before if __name__ == "__main__":

"""
# ==================== REPORTS API ENDPOINTS ====================

@app.get("/api/reports/patient-trend")
async def get_patient_trend(days: int = 7):
    Get patient admission/discharge trend
    data = []
    today = datetime.now()
    
    for i in range(days - 1, -1, -1):
        date = today - timedelta(days=i)
        data.append({
            "date": date.strftime("%a"),
            "patients": random.randint(110, 150),
            "admissions": random.randint(10, 25),
            "discharges": random.randint(8, 20)
        })
    
    return data

@app.get("/api/reports/department-stats")
async def get_department_statistics():
    Get department-wise statistics
    departments = [
        {"name": "Cardiology", "patients": 45, "revenue": 125000, "success_rate": 94},
        {"name": "Neurology", "patients": 32, "revenue": 98000, "success_rate": 89},
        {"name": "Orthopedics", "patients": 28, "revenue": 87000, "success_rate": 92},
        {"name": "General", "patients": 52, "revenue": 76000, "success_rate": 96},
        {"name": "Pediatrics", "patients": 38, "revenue": 92000, "success_rate": 97},
    ]
    return departments

@app.get("/api/reports/revenue-analytics")
async def get_revenue_analytics(months: int = 6):
    Get revenue and expenses data
    data = []
    month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    current_month = datetime.now().month
    
    for i in range(months - 1, -1, -1):
        month_idx = (current_month - i - 1) % 12
        revenue = random.randint(280000, 420000)
        expenses = int(revenue * random.uniform(0.58, 0.65))
        
        data.append({
            "month": month_names[month_idx],
            "revenue": revenue,
            "expenses": expenses,
            "profit": revenue - expenses
        })
    
    return data

@app.get("/api/reports/appointment-analytics")
async def get_appointment_analytics():
    Get weekly appointment statistics
    data = []
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    
    for day in days:
        data.append({
            "day": day,
            "confirmed": random.randint(20, 40),
            "pending": random.randint(5, 15),
            "completed": random.randint(18, 35),
            "cancelled": random.randint(1, 5)
        })
    
    return data

@app.get("/api/reports/bed-occupancy")
async def get_bed_occupancy():
    Get 24-hour bed occupancy pattern
    data = []
    times = ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"]
    
    for time in times:
        data.append({
            "time": time,
            "occupancy": random.randint(70, 92)
        })
    
    return data

@app.get("/api/reports/doctor-performance")
async def get_doctor_performance():
    Get doctor performance metrics
    doctors = [
        {"name": "Dr. Sarah Johnson", "department": "Cardiology", "patients": 156, "success_rate": 96, "avg_rating": 4.8},
        {"name": "Dr. Michael Chen", "department": "Neurology", "patients": 142, "success_rate": 93, "avg_rating": 4.7},
        {"name": "Dr. Emily Rodriguez", "department": "Orthopedics", "patients": 128, "success_rate": 94, "avg_rating": 4.9},
        {"name": "Dr. James Wilson", "department": "General", "patients": 189, "success_rate": 97, "avg_rating": 4.6},
        {"name": "Dr. Lisa Thompson", "department": "Pediatrics", "patients": 134, "success_rate": 98, "avg_rating": 4.9},
    ]
    return doctors

@app.get("/api/reports/forecast")
async def get_revenue_forecast():
    Get 6-month revenue forecast
    data = []
    current_month = datetime.now().month
    month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    base_revenue = 380000
    
    for i in range(6):
        month_idx = (current_month + i) % 12
        growth = 1 + (i * 0.05)
        projected = int(base_revenue * growth)
        
        data.append({
            "month": month_names[month_idx],
            "projected": projected,
            "optimistic": int(projected * 1.1),
            "pessimistic": int(projected * 0.9)
        })
    
    return data

@app.get("/api/reports/treatment-success")
async def get_treatment_success_rates():
    Get treatment success rates by department
    data = [
        {"department": "Cardiology", "success_rate": 94, "total_cases": 450},
        {"department": "Neurology", "success_rate": 89, "total_cases": 320},
        {"department": "Orthopedics", "success_rate": 92, "total_cases": 280},
        {"department": "General", "success_rate": 96, "total_cases": 520},
        {"department": "Pediatrics", "success_rate": 97, "total_cases": 380},
    ]
    return data

@app.get("/api/reports/patient-demographics")
async def get_patient_demographics():
    Get patient age and gender distribution
    return {
        "age_groups": [
            {"group": "0-18", "count": 85},
            {"group": "19-35", "count": 142},
            {"group": "36-50", "count": 198},
            {"group": "51-65", "count": 245},
            {"group": "65+", "count": 156},
        ],
        "gender": [
            {"gender": "Male", "count": 412},
            {"gender": "Female", "count": 389},
            {"gender": "Other", "count": 25},
        ]
    }

@app.get("/api/reports/key-insights")
async def get_key_insights():
    Get AI-powered key insights
    return [
        {
            "type": "positive",
            "title": "Patient Admissions Up",
            "description": "15% increase in admissions compared to last week. Cardiology department showing highest growth.",
            "icon": "trending_up"
        },
        {
            "type": "info",
            "title": "Bed Occupancy Optimal",
            "description": "Current occupancy at 82%, within optimal range. Peak hours between 12PM-6PM.",
            "icon": "activity"
        },
        {
            "type": "success",
            "title": "Revenue Growth",
            "description": "Monthly revenue increased by $24K. Expenses well-controlled at 62% of revenue.",
            "icon": "dollar_sign"
        },
        {
            "type": "warning",
            "title": "Appointment Efficiency",
            "description": "85% completion rate this week. Consider adding more slots for Thursday-Friday peak demand.",
            "icon": "calendar"
        }
    ]

@app.get("/api/patients/{patient_id}/details")
async def get_patient_details(patient_id: int):
    Get detailed patient information with medical history
    patients_data = generate_mock_patients()
    patient = next((p for p in patients_data if p.id == patient_id), None)
    
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    
    # Generate medical history
    medical_history = [
        {
            "date": "2024-01-15",
            "type": "Admission",
            "description": f"Admitted to {patient.condition} department",
            "doctor": "Dr. Sarah Johnson"
        },
        {
            "date": "2024-01-16",
            "type": "Lab Test",
            "description": "Blood work and X-ray completed",
            "doctor": "Dr. Michael Chen"
        },
        {
            "date": "2024-01-18",
            "type": "Treatment",
            "description": "Treatment plan initiated",
            "doctor": "Dr. Sarah Johnson"
        },
        {
            "date": "2024-01-20",
            "type": "Follow-up",
            "description": "Progress review - showing improvement",
            "doctor": "Dr. Emily Rodriguez"
        }
    ]
    
    # Generate vitals history
    vitals_history = []
    for i in range(7):
        date = (datetime.now() - timedelta(days=6-i)).strftime("%Y-%m-%d")
        vitals_history.append({
            "date": date,
            "heart_rate": random.randint(65, 95),
            "blood_pressure": f"{random.randint(115, 135)}/{random.randint(65, 85)}",
            "temperature": round(random.uniform(36.3, 37.5), 1),
            "oxygen_level": random.randint(94, 99),
            "respiratory_rate": random.randint(14, 18)
        })
    
    return {
        "patient": patient.dict(),
        "medical_history": medical_history,
        "vitals_history": vitals_history,
        "upcoming_appointments": [
            {
                "date": "2024-02-01",
                "time": "10:00 AM",
                "doctor": "Dr. Sarah Johnson",
                "type": "Follow-up"
            },
            {
                "date": "2024-02-15",
                "time": "2:00 PM",
                "doctor": "Dr. Michael Chen",
                "type": "Lab Review"
            }
        ]
    }
"""
