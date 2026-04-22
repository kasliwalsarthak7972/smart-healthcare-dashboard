#!/usr/bin/env python3
"""Restore missing function bodies in main.py"""

print("🔧 Restoring missing function bodies...")

with open('main.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix empty function bodies
fixes = [
    ('async def root():\n\n@app.get', 'async def root():\n    return {"message": "Smart Healthcare Dashboard API", "version": "3.0.0"}\n\n@app.get'),
    ('async def get_patients():\n\n@app.get', 'async def get_patients():\n    return generate_mock_patients()\n\n@app.get'),
    ('async def get_appointments():\n\n@app.get', 'async def get_appointments():\n    return generate_mock_appointments()\n\n@app.get'),
    ('async def get_vitals(patient_id: int):\n\n@app.get', 'async def get_vitals(patient_id: int):\n    return generate_mock_vitals()\n\n@app.get'),
    ('async def get_doctors():\n\n@app.get', 'async def get_doctors():\n    return generate_mock_doctors()\n\n@app.get'),
    ('async def get_dashboard_stats():\n    return {', 'async def get_dashboard_stats():\n    return {'),
]

for old, new in fixes:
    if old in content:
        content = content.replace(old, new)
        print(f"  ✅ Fixed: {old.split(':')[0]}")

# Fix the activities list (remove extra quotes)
content = content.replace('"""activities = ["""', 'activities = [')

# Fix the notifications list (remove extra quotes)  
content = content.replace('"""notifications = ["""', 'notifications = [')

# Fix the if statement (remove extra quotes)
content = content.replace('"""if user_id in mock_users:"""', 'if user_id in mock_users:')

# Fix the hashed_password line (remove extra quotes)
content = content.replace('"""hashed_password = hashlib.sha256(user.password.encode()).hexdigest()"""', 
                          'hashed_password = hashlib.sha256(user.password.encode()).hexdigest()')

# Write fixed version
with open('main.py', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ All function bodies restored!")
print("🚀 Ready to test backend\n")
