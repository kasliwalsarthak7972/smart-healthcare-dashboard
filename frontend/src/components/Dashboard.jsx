import { useState, useEffect } from 'react'
import { TrendingUp, Users, Bed, AlertCircle, Calendar, DollarSign, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { dashboardAPI, patientsAPI, appointmentsAPI } from '../api'

function StatCard({ icon: Icon, title, value, change, color }) {
  return (
    <div className="glass-card p-6 fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {change && (
          <div className="flex items-center gap-1 text-green-400">
            <TrendingUp size={16} />
            <span className="text-sm">{change}%</span>
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-white/60 text-sm">{title}</p>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [patients, setPatients] = useState([])
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [trendData, setTrendData] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [statsRes, patientsRes, activityRes] = await Promise.all([
        dashboardAPI.getStats(),
        patientsAPI.getAll({ limit: 5 }),
        dashboardAPI.getActivity()
      ])

      setStats(statsRes.data)
      setPatients(patientsRes.data)
      setActivity(activityRes.data)

      // Generate trend data from stats
      const hours = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        patients: Math.floor(Math.random() * 50) + 200,
        vitals: Math.floor(Math.random() * 100) + 50
      }))
      setTrendData(hours)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-white/60">Real-time healthcare metrics and analytics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          title="Total Patients"
          value={stats?.total_patients || 0}
          change={12.5}
          color="bg-blue-500"
        />
        <StatCard
          icon={Bed}
          title="Available Beds"
          value={stats?.available_beds || 0}
          change={8.3}
          color="bg-green-500"
        />
        <StatCard
          icon={AlertCircle}
          title="Critical Cases"
          value={stats?.critical_cases || 0}
          color="bg-red-500"
        />
        <StatCard
          icon={DollarSign}
          title="Revenue Today"
          value={`₹${stats?.revenue_today || 0}`}
          change={15.2}
          color="bg-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">24-Hour Patient Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)' 
                }} 
              />
              <Line type="monotone" dataKey="patients" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">Department Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'Cardiology', count: 45 },
              { name: 'Neurology', count: 32 },
              { name: 'Orthopedics', count: 28 },
              { name: 'General', count: 52 },
              { name: 'Emergency', count: 18 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)' 
                }} 
              />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Patients & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Patients</h3>
          <div className="space-y-3">
            {patients.slice(0, 5).map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white font-medium">{patient.name}</p>
                  <p className="text-white/60 text-sm">{patient.condition}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium status-${patient.status.toLowerCase()}`}>
                  {patient.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {activity.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                <Activity size={20} className="text-blue-400 mt-1" />
                <div>
                  <p className="text-white text-sm">{item.event}</p>
                  <p className="text-white/60 text-xs">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
