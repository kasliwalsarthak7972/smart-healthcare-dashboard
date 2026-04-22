# 🏥 Smart Healthcare Dashboard

A comprehensive full-stack healthcare management system built with **React**, **FastAPI**, and **TailwindCSS**.

![Healthcare Dashboard](https://img.shields.io/badge/Version-2.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38B2AC?logo=tailwind-css)

## ✨ Features

### 📊 Dashboard
- Real-time statistics cards (patients, beds, revenue, appointments)
- 24-hour patient trend visualization
- Department-wise statistics with horizontal bar charts
- Recent patients list with status indicators
- Activity timeline with categorized events
- Quick action buttons with functional modals

### 👥 Patient Management
- Advanced search (by name, condition, or room number)
- Multi-filter system (status and condition)
- Add Patient modal with complete form validation
- Real-time patient count updates
- Color-coded status badges

### 📅 Appointments
- Status-based filtering (Confirmed, Pending, Completed, Cancelled)
- Real patient names displayed
- Department and doctor information
- Clean tabbed interface

### ❤️ Vitals Monitoring
- Patient selection dropdown with real names
- Patient information cards
- Real-time vital signs tracking
- 24-hour trend charts for all metrics
- Color-coded severity indicators

### 📈 Reports & Analytics
- **6 Interactive Charts**: Line, Bar, Pie, Area charts
- **KPI Metrics**: Revenue, patients, efficiency, satisfaction with trends
- **Time Filters**: 7, 30, or 90-day ranges
- **Department Rankings**: Performance table with success rates
- **AI Insights**: Automated key insights and recommendations
- **Export Options**: PDF and Excel export buttons

### 👨‍⚕️ Doctor Directory
- Availability status indicators
- Patient load tracking
- Specialization display
- Contact information

### 🔔 Notifications
- Categorized alerts (critical, warning, info, success)
- Real-time notification system
- Color-coded priority levels

### 🎨 UI/UX Features
- **Glassmorphism Design**: Modern frosted glass effects
- **Gradient Backgrounds**: Beautiful color transitions
- **Smooth Animations**: Floating cards, glowing effects, pulse animations
- **Responsive Design**: Works on all screen sizes
- **Real Patient Names**: No generic "Patient 1, 2, 3"

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.11+

### Backend Setup

```bash
cd backend

# Create virtual environment (recommended)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on: `http://localhost:3000`

## 🌐 Deployment

### Deploy to Render + Vercel (Recommended)

**Full deployment guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

#### Quick Steps:

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/repo.git
   git push -u origin main
   ```

2. **Deploy Backend to Render**:
   - Go to [render.com](https://render.com)
   - Create Web Service from GitHub repo
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Deploy Frontend to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Root Directory: `frontend`
   - Build Command: `npm run build`

4. **Update API URL** in `frontend/src/api.js`:
   ```javascript
   const API_BASE_URL = 'https://YOUR-RENDER-URL.onrender.com'
   ```

**Your app will be live in under 10 minutes!** 🚀

## 📁 Project Structure

```
Smart Healthcare Dashboard/
├── backend/
│   ├── main.py                 # FastAPI server with all endpoints
│   └── requirements.txt        # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx           # Main dashboard with stats
│   │   │   ├── Patients.jsx            # Patient management
│   │   │   ├── Appointments.jsx        # Appointment scheduling
│   │   │   ├── Vitals.jsx              # Vitals monitoring
│   │   │   ├── Doctors.jsx             # Doctor directory
│   │   │   ├── Reports.jsx             # Analytics & reports
│   │   │   ├── Notifications.jsx       # Alert system
│   │   │   ├── AddPatientModal.jsx     # Add patient form
│   │   │   ├── ScheduleAppointmentModal.jsx
│   │   │   └── EmergencyAlertModal.jsx
│   │   ├── App.jsx             # Main app component with routing
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global styles & animations
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── .gitignore
├── README.md
└── Procfile                  # Deployment configuration
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS framework
- **Recharts** - Chart library
- **Lucide React** - Icon library
- **Axios** - HTTP client

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API health check |
| GET | `/api/patients` | Get all patients |
| GET | `/api/patients/{id}` | Get patient by ID |
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/vitals/{patient_id}` | Get patient vitals |
| GET | `/api/doctors` | Get all doctors |
| GET | `/api/dashboard/stats` | Get dashboard statistics |
| GET | `/api/recent-activity` | Get recent activity feed |

## 🚀 Deployment

### Deploy to Render

1. Push code to GitHub ✅ (Done!)
2. Go to [render.com](https://render.com)
3. Create new **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Start Command**: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Python Version**: 3.11
6. Deploy!

### Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway auto-detects the configuration
5. Deploy!

### Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Deploy!

## 🎯 Current Status

✅ **Fully Functional** - All features working
- Real patient names throughout
- All modals operational
- Filters and search working
- Reports page with 6 charts
- Backend API serving data
- Frontend fully responsive

## 📝 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication & authorization
- [ ] Real-time WebSocket updates
- [ ] PDF/Excel export functionality
- [ ] Dark mode theme
- [ ] Mobile app version
- [ ] Advanced analytics with ML predictions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Sarthak Jain**
-Email:kasliwalsarthak7972@gmail.com
- GitHub: [@kasliwalsarthak7972](https://github.com/kasliwalsarthak7972)

---

⭐ **Star this repo if you find it helpful!**
