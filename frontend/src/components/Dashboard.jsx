import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Users, Bed, AlertCircle, Calendar, TrendingUp, DollarSign, Activity, Clock, Zap, Shield, Heart, ArrowUpRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts'
import AddPatientModal from './AddPatientModal'
import ScheduleAppointmentModal from './ScheduleAppointmentModal'
import EmergencyAlertModal from './EmergencyAlertModal'

const Dashboard = ({ onNavigate }) => {
  const [stats, setStats] = useState(null)
  const [vitalsData, setVitalsData] = useState([])
  const [activities, setActivities] = useState([])
  const [patients, setPatients] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showAddPatient, setShowAddPatient] = useState(false)
  const [showScheduleAppointment, setShowScheduleAppointment] = useState(false)
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false)

  useEffect(() => {
    fetchData()
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const fetchData = async () => {
    try {
      const [statsRes, vitalsRes, activitiesRes, patientsRes] = await Promise.all([
        axios.get('/api/dashboard/stats'),
        axios.get('/api/vitals/1'),
        axios.get('/api/recent-activity'),
        axios.get('/api/patients')
      ])
      setStats(statsRes.data)
      setVitalsData(vitalsRes.data)
      setActivities(activitiesRes.data)
      setPatients(patientsRes.data.slice(0, 5))
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const statCards = [
    { label: 'Total Patients', value: stats?.total_patients, icon: Users, gradient: 'from-cyan-500 via-blue-500 to-indigo-600', change: '+12%', bgGradient: 'from-cyan-50 to-blue-50' },
    { label: 'Available Beds', value: stats?.available_beds, icon: Bed, gradient: 'from-emerald-500 via-green-500 to-teal-600', change: '+5%', bgGradient: 'from-emerald-50 to-green-50' },
    { label: 'Critical Cases', value: stats?.critical_cases, icon: AlertCircle, gradient: 'from-rose-500 via-red-500 to-pink-600', change: '-3%', bgGradient: 'from-rose-50 to-red-50' },
    { label: "Today's Appointments", value: stats?.appointments_today, icon: Calendar, gradient: 'from-purple-500 via-violet-500 to-fuchsia-600', change: '+8%', bgGradient: 'from-purple-50 to-violet-50' },
  ]

  const quickActions = [
    { label: 'Add Patient', icon: Users, color: 'from-blue-500 to-cyan-500' },
    { label: 'Schedule Appointment', icon: Calendar, color: 'from-purple-500 to-pink-500' },
    { label: 'Emergency Alert', icon: AlertCircle, color: 'from-red-500 to-rose-500' },
    { label: 'View Reports', icon: Activity, color: 'from-green-500 to-emerald-500' },
  ]

  const liveTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  const getActivityIcon = (type) => {
    switch(type) {
      case 'admission': return '🏥'
      case 'lab': return '🔬'
      case 'surgery': return '⚕️'
      case 'alert': return '⚠️'
      case 'appointment': return '📅'
      case 'discharge': return '✅'
      default: return '📋'
    }
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-healthcare-blue/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-healthcare-blue rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="gradient-text text-lg font-semibold">Loading Dashboard...</p>
          <p className="text-gray-500 text-sm mt-2">Fetching real-time data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Live Time & Quick Actions Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div className="glass rounded-2xl px-6 py-3 float-animation">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-healthcare-blue animate-pulse" />
            <span className="text-sm font-semibold gradient-text-ocean">Live:</span>
            <span className="text-lg font-bold gradient-text">{liveTime}</span>
          </div>
        </div>
        
        <div className="flex gap-3 flex-wrap">
          {quickActions.map((action, idx) => {
            const Icon = action.icon
            const handleClick = () => {
              if (action.label === 'Add Patient') setShowAddPatient(true)
              else if (action.label === 'Schedule Appointment') setShowScheduleAppointment(true)
              else if (action.label === 'Emergency Alert') setShowEmergencyAlert(true)
              else if (action.label === 'View Reports') {
                if (onNavigate) onNavigate('reports')
              }
            }
            
            return (
              <button
                key={idx}
                onClick={handleClick}
                className={`bg-gradient-to-r ${action.color} text-white px-4 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 active:scale-95`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{action.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={`stat-card bg-gradient-to-br ${stat.bgGradient} group`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">{stat.label}</p>
                  <p className={`text-4xl font-black bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-bold text-green-600">{stat.change}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">vs last week</span>
                  </div>
                </div>
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heart Rate Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Heart Rate Trends</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Activity className="w-4 h-4" />
              <span>Last 24 hours</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={vitalsData}>
              <defs>
                <linearGradient id="colorHeartRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="timestamp" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area type="monotone" dataKey="heart_rate" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorHeartRate)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">{activity.event}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue and Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Card */}
        <div className="card bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-purple-100 mb-2 font-medium">Today's Revenue</p>
                <p className="text-5xl font-black mb-6 bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                  ${stats.revenue_today.toLocaleString()}
                </p>
                <div className="flex items-center gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                    <p className="text-xs text-purple-100 mb-1">Admission Rate</p>
                    <p className="text-2xl font-bold">{stats.admission_rate}%</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                    <p className="text-xs text-purple-100 mb-1">Discharge Rate</p>
                    <p className="text-2xl font-bold">{stats.discharge_rate}%</p>
                  </div>
                </div>
              </div>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <DollarSign className="w-10 h-10" />
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-4 border-t border-white/20">
              <ArrowUpRight className="w-5 h-5 text-green-300" />
              <span className="text-sm font-semibold text-green-300">+15.3% from yesterday</span>
            </div>
          </div>
        </div>

        {/* Patient List */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black gradient-text-ocean">Recent Patients</h2>
            <Shield className="w-6 h-6 text-healthcare-blue" />
          </div>
          <div className="space-y-3">
            {patients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:shadow-md hover:scale-[1.02] border border-gray-100 hover:border-healthcare-blue/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-healthcare-blue to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">{patient.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Bed className="w-3 h-3" />
                      Room {patient.room}
                    </p>
                  </div>
                </div>
                <span className={`status-badge status-${patient.status.toLowerCase()}`}>
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddPatientModal isOpen={showAddPatient} onClose={() => setShowAddPatient(false)} />
      <ScheduleAppointmentModal isOpen={showScheduleAppointment} onClose={() => setShowScheduleAppointment(false)} />
      <EmergencyAlertModal isOpen={showEmergencyAlert} onClose={() => setShowEmergencyAlert(false)} />
    </div>
  )
}

export default Dashboard
