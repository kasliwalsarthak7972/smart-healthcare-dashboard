# Smart Healthcare Dashboard - Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Render (Recommended - Free Tier)
### Option 2: Railway (Easy Setup)
### Option 3: Vercel + Separate Backend
### Option 4: AWS/DigitalOcean (Advanced)

---

## Option 1: Deploy to Render (Recommended)

### Prerequisites
- GitHub account
- Render account (free at render.com)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
cd "F:\Smart Healthcare Dashboard"
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Smart Healthcare Dashboard v2.0"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/smart-healthcare-dashboard.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend on Render

1. **Go to** [render.com](https://render.com) and sign up/login
2. **Click** "New +" → "Web Service"
3. **Connect** your GitHub repository
4. **Configure**:
   - **Name**: `healthcare-dashboard-api`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

5. **Environment Variables** (Add these):
   ```
   DATABASE_URL=sqlite:///./healthcare.db
   PYTHON_VERSION=3.11.0
   ```

6. **Click** "Create Web Service"
7. **Wait** for deployment (2-3 minutes)
8. **Copy** your backend URL (e.g., `https://healthcare-dashboard-api.onrender.com`)

### Step 3: Update Frontend API URL

Update the API URL in your frontend to point to the Render backend:

```javascript
// frontend/src/api.js
const API_BASE_URL = 'https://YOUR-RENDER-BACKEND-URL.onrender.com'
```

### Step 4: Deploy Frontend to Vercel

1. **Go to** [vercel.com](https://vercel.com) and sign up/login
2. **Click** "Add New..." → "Project"
3. **Import** your GitHub repository
4. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables**:
   ```
   VITE_API_URL=https://YOUR-RENDER-BACKEND-URL.onrender.com
   ```

6. **Click** "Deploy"
7. **Your app is live!** URL: `https://smart-healthcare-dashboard.vercel.app`

### Step 5: Update CORS in Backend

Update `backend/main.py` to allow your Vercel frontend:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://smart-healthcare-dashboard.vercel.app",  # Your Vercel URL
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Option 2: Deploy to Railway (Alternative)

### Step 1: Push to GitHub
(Same as Step 1 above)

### Step 2: Deploy on Railway

1. **Go to** [railway.app](https://railway.app)
2. **Click** "New Project" → "Deploy from GitHub repo"
3. **Select** your repository
4. **Railway auto-detects** Python/FastAPI
5. **Add Environment Variables**:
   ```
   DATABASE_URL=sqlite:///./healthcare.db
   PORT=5000
   ```
6. **Deploy!**

### Step 3: Deploy Frontend
(Same as Step 4 in Render option - use Vercel)

---

## Option 3: Deploy Both on Single Render Service

### Create a unified deployment:

1. **Create `render.yaml`** in root:

```yaml
services:
  - type: web
    name: smart-healthcare-dashboard
    env: python
    buildCommand: |
      pip install -r backend/requirements.txt
      cd frontend && npm install && npm run build
    startCommand: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
```

2. **Update backend/main.py** to serve frontend:

```python
from fastapi.staticfiles import StaticFiles
import os

# Serve frontend build
frontend_path = os.path.join(os.path.dirname(__file__), '..', 'frontend', 'dist')
if os.path.exists(frontend_path):
    app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")
```

3. **Deploy to Render** as single service

---

## Pre-Deployment Checklist

### Backend Preparation

- [ ] Update CORS origins to include production URLs
- [ ] Set up database seeding to run on first deployment
- [ ] Test all API endpoints locally
- [ ] Verify SQLite database is created properly

### Frontend Preparation

- [ ] Update API_BASE_URL to production backend URL
- [ ] Test build: `cd frontend && npm run build`
- [ ] Verify no console errors
- [ ] Test all pages with production API

### Security Considerations

- [ ] Enable HTTPS (automatic on Render/Vercel)
- [ ] Add rate limiting (optional)
- [ ] Set up monitoring (Render has built-in logs)
- [ ] Consider adding authentication for production

---

## Post-Deployment Testing

### 1. Test Health Check
```bash
curl https://YOUR-BACKEND-URL.onrender.com/api/health
```

Expected:
```json
{
  "status": "healthy",
  "service": "Smart Healthcare Dashboard API",
  "version": "2.0.0"
}
```

### 2. Test Key Endpoints
- `GET /api/patients/` - Should return 10 patients
- `GET /api/doctors/` - Should return 5 doctors
- `GET /api/dashboard/stats` - Should return statistics

### 3. Test Frontend
- Open your Vercel URL
- Navigate to all pages
- Verify data loads from production API
- Test search and filters

---

## Troubleshooting

### Issue: Backend not starting
**Solution**: Check Render logs for errors. Common issues:
- Missing dependencies in requirements.txt
- Database path issues (use absolute paths)
- Port binding errors (use `$PORT` environment variable)

### Issue: Frontend can't connect to API
**Solution**: 
- Verify CORS is configured correctly
- Check API_BASE_URL is correct
- Ensure backend is running and accessible

### Issue: Database not seeding
**Solution**: Add seeding to startup:

```python
# backend/main.py
@app.on_event("startup")
def startup_event():
    from seed_data import seed_database
    seed_database()
```

### Issue: Build fails on Vercel
**Solution**: 
- Check Node version compatibility
- Verify package.json has all dependencies
- Clear build cache and redeploy

---

## Monitoring & Maintenance

### Render Dashboard
- View logs: `https://dashboard.render.com`
- Monitor uptime
- Check resource usage

### Vercel Dashboard
- View analytics: `https://vercel.com/dashboard`
- Monitor deployments
- Check edge network performance

### Database Backup
Since you're using SQLite:
- Download the database file from Render dashboard periodically
- Consider migrating to PostgreSQL for production (Render supports it)

---

## Upgrade Path (Future)

### For Production-Grade Deployment:

1. **Migrate to PostgreSQL**:
   ```python
   # Update database.py
   SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")
   ```

2. **Add Authentication**:
   - JWT tokens
   - User roles (Admin, Doctor, Nurse)

3. **Add Monitoring**:
   - Sentry for error tracking
   - New Relic for performance

4. **Add CI/CD**:
   - GitHub Actions for automated testing
   - Automated deployments on push

5. **Add Backups**:
   - Automated database backups
   - File storage for reports

---

## Quick Deploy Commands Summary

```bash
# 1. Initialize and push to GitHub
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/repo.git
git push -u origin main

# 2. Test frontend build locally
cd frontend
npm run build

# 3. Test backend locally
cd backend
uvicorn main:app --host 0.0.0.0 --port 5000

# 4. Deploy to Render (via web interface)
# 5. Deploy to Vercel (via web interface)
```

---

## Need Help?

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- FastAPI Deployment: https://fastapi.tiangolo.com/deployment/

**Your app will be live in under 10 minutes!** 🚀
