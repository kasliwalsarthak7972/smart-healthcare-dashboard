import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, Users, Calendar, Heart, Stethoscope, FileText, Bell } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Patients from './components/Patients'
import Appointments from './components/Appointments'
import Vitals from './components/Vitals'
import Doctors from './components/Doctors'
import Reports from './components/Reports'

function Sidebar() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/patients', icon: Users, label: 'Patients' },
    { path: '/appointments', icon: Calendar, label: 'Appointments' },
    { path: '/vitals', icon: Heart, label: 'Vitals' },
    { path: '/doctors', icon: Stethoscope, label: 'Doctors' },
    { path: '/reports', icon: FileText, label: 'Reports' },
  ]
  
  return (
    <div className="fixed left-0 top-0 h-full w-64 glass-card m-4 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">🏥 Healthcare</h1>
        <p className="text-white/60 text-sm">Smart Dashboard</p>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="min-h-screen p-4">
        <Sidebar />
        <div className="ml-72">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/vitals" element={<Vitals />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
