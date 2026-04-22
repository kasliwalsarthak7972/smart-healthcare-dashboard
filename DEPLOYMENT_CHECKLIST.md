# 🚀 Quick Deployment Checklist

## Pre-Deployment (5 minutes)

- [ ] Test locally: Backend runs on http://localhost:5000
- [ ] Test locally: Frontend runs on http://localhost:3000
- [ ] All pages load with real data
- [ ] API endpoints return correct responses
- [ ] Database seeds automatically on startup

## Deploy to GitHub (5 minutes)

- [ ] Create GitHub repository
- [ ] Initialize git: `git init`
- [ ] Add files: `git add .`
- [ ] Commit: `git commit -m "Ready for deployment"`
- [ ] Add remote: `git remote add origin https://github.com/YOUR_USERNAME/repo.git`
- [ ] Push: `git push -u origin main`

## Deploy Backend to Render (10 minutes)

- [ ] Sign up at [render.com](https://render.com)
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Configure:
  - Name: `healthcare-dashboard-api`
  - Root Directory: `backend`
  - Build Command: `pip install -r requirements.txt`
  - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- [ ] Add environment variables:
  - `DATABASE_URL=sqlite:///./healthcare.db`
  - `PYTHON_VERSION=3.11.0`
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Copy backend URL (e.g., `https://healthcare-dashboard-api.onrender.com`)

## Deploy Frontend to Vercel (5 minutes)

- [ ] Sign up at [vercel.com](https://vercel.com)
- [ ] Click "Add New..." → "Project"
- [ ] Import GitHub repository
- [ ] Configure:
  - Framework Preset: Vite
  - Root Directory: `frontend`
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [ ] Click "Deploy"
- [ ] Copy frontend URL (e.g., `https://smart-healthcare-dashboard.vercel.app`)

## Update Configuration (5 minutes)

- [ ] Update `frontend/src/api.js`:
  ```javascript
  const API_BASE_URL = 'https://YOUR-RENDER-URL.onrender.com'
  ```
- [ ] Update `backend/main.py` CORS:
  ```python
  allow_origins=[
      "http://localhost:3000",
      "https://YOUR-VERCEL-URL.vercel.app",
  ]
  ```
- [ ] Commit and push changes

## Post-Deployment Testing (5 minutes)

- [ ] Test health check: `GET /api/health`
- [ ] Test patients endpoint: `GET /api/patients/`
- [ ] Open frontend URL in browser
- [ ] Navigate to all pages (Dashboard, Patients, Appointments, Vitals, Doctors, Reports)
- [ ] Verify data loads from production API
- [ ] Test search and filter functionality
- [ ] Check browser console for errors (F12)

## Optional Enhancements

- [ ] Add custom domain to Vercel
- [ ] Set up monitoring (Render logs, Vercel analytics)
- [ ] Add rate limiting to backend
- [ ] Implement user authentication
- [ ] Migrate to PostgreSQL for production

---

## Estimated Total Time: **30-35 minutes**

## Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **FastAPI Deployment**: https://fastapi.tiangolo.com/deployment/
- **Full Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## Quick Commands Reference

```bash
# Push to GitHub
git add .
git commit -m "Deployment updates"
git push

# Test backend locally
cd backend
uvicorn main:app --reload

# Test frontend locally
cd frontend
npm run dev

# Build frontend for production
cd frontend
npm run build
```

---

**Congratulations! Your Smart Healthcare Dashboard is now live! 🎉**
