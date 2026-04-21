# 🚀 Deployment Guide

Your Smart Healthcare Dashboard is now on GitHub and ready to deploy!

## ✅ What's Done
- [x] Code pushed to: https://github.com/kasliwalsarthak7972/Health_Care
- [x] Deployment files created (Procfile, runtime.txt)
- [x] README with full documentation

## 🌐 Deploy to Cloud Platforms (Choose ONE)

### Option 1: Deploy to Render (RECOMMENDED - FREE)

**Perfect for full-stack apps with backend + frontend**

#### Steps:

1. **Go to Render**: https://render.com
2. **Sign up** with your GitHub account
3. **Click** "New +" → "Web Service"
4. **Connect** your repository: `Health_Care`
5. **Configure**:
   ```
   Name: smart-healthcare-dashboard
   Region: Oregon (closest to you)
   Branch: main
   Root Directory: (leave blank)
   Runtime: Python 3
   ```

6. **Build Command**:
   ```bash
   cd frontend && npm install && npm run build && cd ..
   pip install -r backend/requirements.txt
   ```

7. **Start Command**:
   ```bash
   cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

8. **Add Environment Variable**:
   ```
   FRONTEND_URL = (Render will provide)
   ```

9. **Click** "Create Web Service"
10. **Wait** 3-5 minutes for deployment
11. **Your app will be live at**: `https://smart-healthcare-dashboard.onrender.com`

**Cost**: FREE tier includes 750 hours/month

---

### Option 2: Deploy Frontend to Vercel + Backend to Render

**Best performance - separates frontend and backend**

#### Deploy Frontend to Vercel:

1. **Go to**: https://vercel.com
2. **Sign up** with GitHub
3. **Import** your `Health_Care` repository
4. **Configure**:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

5. **Add Environment Variable**:
   ```
   VITE_API_URL = (your Render backend URL)
   ```

6. **Deploy** - takes 1-2 minutes
7. **Live at**: `https://your-app.vercel.app`

#### Deploy Backend to Render:

1. Follow Option 1 steps but only for backend
2. **Root Directory**: `backend`
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

---

### Option 3: Deploy to Railway (EASIEST)

**Auto-detects everything - least configuration**

1. **Go to**: https://railway.app
2. **Sign up** with GitHub
3. **Click** "New Project" → "Deploy from GitHub repo"
4. **Select** `Health_Care`
5. **Railway auto-detects** Python and Node.js
6. **Add Variables** in Railway dashboard:
   ```
   PORT = 5000
   NODE_ENV = production
   ```

7. **Deploy** - takes 2-3 minutes
8. **Live at**: `https://your-app.railway.app`

**Cost**: $5 credit/month free

---

### Option 4: Deploy to Heroku

1. **Install Heroku CLI**: https://devcenter.heroku.com/articles/heroku-cli
2. **Login**: `heroku login`
3. **Create app**: `heroku create smart-healthcare-dashboard`
4. **Add buildpacks**:
   ```bash
   heroku buildpacks:add heroku/nodejs
   heroku buildpacks:add heroku/python
   ```
5. **Push**: `git push heroku main`
6. **Live at**: `https://smart-healthcare-dashboard.herokuapp.com`

---

## 🔧 Update API URL After Deployment

After deploying, you need to update the frontend to use the deployed backend URL:

### In `frontend/src/components/Dashboard.jsx` (and other files):

Replace:
```javascript
const API_BASE_URL = 'http://localhost:5000'
```

With:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
```

### Create `frontend/.env.production`:
```
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## 📊 Verify Deployment

After deployment, test these endpoints:

1. **Backend API**: `https://your-app.com/` → Should return JSON
2. **Patients**: `https://your-app.com/api/patients` → Should return patient list
3. **Frontend**: `https://your-app.com` → Should show dashboard

---

## 🎯 Recommended: Render Deployment (Step-by-Step)

### 1. Sign up for Render
- Go to https://render.com
- Click "Get Started for Free"
- Sign up with GitHub

### 2. Create Web Service
- Dashboard → "New +" → "Web Service"
- Connect repository: `Health_Care`
- Click "Connect"

### 3. Configure Settings
```
Name: healthcare-dashboard
Region: Oregon
Branch: main
Root Directory: (leave empty)
Runtime: Python 3
```

### 4. Build & Start Commands
**Build Command:**
```bash
cd frontend && npm install && npm run build && cd .. && pip install -r backend/requirements.txt
```

**Start Command:**
```bash
cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

### 5. Environment Variables
Click "Advanced" → "Add Environment Variable":
```
Key: PYTHON_VERSION
Value: 3.11.0
```

### 6. Deploy!
- Click "Create Web Service"
- Wait 3-5 minutes
- Your app is LIVE! 🎉

---

## 🐛 Troubleshooting

### Build Fails?
- Check if all dependencies are in `requirements.txt` and `package.json`
- Make sure Node.js version is 18+

### Frontend Can't Connect to Backend?
- Update API URL in frontend code
- Add CORS headers (already configured in `main.py`)

### Port Error?
- Render sets `$PORT` automatically
- Don't hardcode port 5000 in production

---

## 🎉 After Successful Deployment

Your app will be accessible worldwide at:
- **Frontend**: `https://your-app.onrender.com`
- **Backend API**: `https://your-app.onrender.com/api/...`

Share the link with anyone! 🌍

---

**Need Help?** 
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
