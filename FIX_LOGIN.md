# 🚀 How to Fix Login Issues & Restart the Dashboard

## ⚠️ **The Problem:**
You're getting "Not Found" error when trying to sign in because the backend server is running old code without authentication endpoints.

---

## ✅ **SOLUTION - Easy 3-Step Fix:**

### **Step 1: Stop the Current Backend**

**Option A - Using Task Manager (Easiest):**
1. Press `Ctrl + Shift + Esc` to open Task Manager
2. Find all "Python" processes
3. Right-click each → "End Task"

**Option B - Using the Batch File:**
1. Double-click `RESTART_BACKEND.bat` in your project folder
2. It will automatically stop and restart the backend

---

### **Step 2: Restart the Backend Server**

Open a **NEW terminal/PowerShell** and run:

```bash
cd "e:\Projects\Smart Healthcare Dashboard\backend"
python main.py
```

**You should see:**
```
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:5000 (Press CTRL+C to quit)
```

✅ **This means the backend is running correctly!**

---

### **Step 3: Test the Login**

1. Open browser to `http://localhost:3000`
2. Try logging in with:
   - **Email**: `sarah.johnson@healthcare.com`
   - **Password**: `12345`
3. Click "Sign In"

**It should work now!** 🎉

---

## 🔐 **Quick Login Credentials:**

| Role | Email | Password |
|------|-------|----------|
| 👨‍⚕️ Doctor | `sarah.johnson@healthcare.com` | `12345` |
| 👩‍⚕️ Nurse | `emily.davis@healthcare.com` | `12345` |
| 👤 Patient | `john.smith@healthcare.com` | `12345` |

---

## 🐛 **Still Having Issues?**

### **Check 1: Backend is Running**
Look for this in your terminal:
```
INFO:     Uvicorn running on http://0.0.0.0:5000
```

### **Check 2: Frontend is Running**
Look for this in another terminal:
```
➜  Local:   http://localhost:3000/
```

### **Check 3: Browser Console**
1. Press `F12` in your browser
2. Go to "Console" tab
3. Look for any red error messages

### **Check 4: API Test**
Open browser and go to: `http://localhost:5000/`
You should see: `{"message":"Smart Healthcare Dashboard API","version":"2.0.0"}`

---

## 📋 **Complete Restart (If Nothing Works):**

### **Terminal 1 - Backend:**
```bash
cd "e:\Projects\Smart Healthcare Dashboard\backend"
python main.py
```

### **Terminal 2 - Frontend:**
```bash
cd "e:\Projects\Smart Healthcare Dashboard\frontend"
npm run dev
```

---

## ✨ **What Was Fixed:**

✅ Added authentication endpoints (`/api/auth/login`, `/api/auth/register`)  
✅ Created 14 pre-configured user accounts  
✅ Added patient role support  
✅ Set up default password system  
✅ Enhanced login page with credentials display  

---

## 🎯 **Expected Behavior After Fix:**

1. Enter email: `sarah.johnson@healthcare.com`
2. Enter password: `12345`
3. Click "Sign In"
4. See loading spinner
5. **Redirect to Dashboard** ✅
6. See welcome message: "Welcome back, Dr. Sarah Johnson!"

---

## 💡 **Pro Tips:**

- **Keep both terminals open** while using the dashboard
- **Backend** = Port 5000 (API server)
- **Frontend** = Port 3000 (Web interface)
- **Frontend auto-reloads** when you make changes
- **Backend needs manual restart** when you change Python code

---

**Need more help? Check the error message and let me know!** 🚀
