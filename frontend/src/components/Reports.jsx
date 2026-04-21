import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { 
  TrendingUp, TrendingDown, Activity, Users, Calendar, DollarSign,
  Heart, Bed, Clock, Download, Filter, BarChart3, PieChart, LineChart
} from 'lucide-react'
import {
  BarChart, Bar, LineChart as ReLineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell
} from 'recharts'

const Reports = () => {
  const [timeRange, setTimeRange] = useState('7days')
  const [stats, setStats] = useState(null)
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [statsRes, patientsRes] = await Promise.all([
        axios.get('/api/dashboard/stats'),
        axios.get('/api/patients')
      ])
      setStats(statsRes.data)
      setPatients(patientsRes.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  // Mock data for reports
  const patientTrendData = [
    { date: 'Mon', patients: 120, admissions: 15, discharges: 12 },
    { date: 'Tue', patients: 125, admissions: 18, discharges: 13 },
    { date: 'Wed', patients: 130, admissions: 20, discharges: 15 },
    { date: 'Thu', patients: 128, admissions: 12, discharges: 14 },
    { date: 'Fri', patients: 135, admissions: 22, discharges: 15 },
    { date: 'Sat', patients: 132, admissions: 10, discharges: 13 },
    { date: 'Sun', patients: 138, admissions: 16, discharges: 10 },
  ]

  const departmentData = [
    { name: 'Cardiology', patients: 45, revenue: 125000 },
    { name: 'Neurology', patients: 32, revenue: 98000 },
    { name: 'Orthopedics', patients: 28, revenue: 87000 },
    { name: 'General', patients: 52, revenue: 76000 },
    { name: 'Pediatrics', patients: 38, revenue: 92000 },
  ]

  const statusDistribution = [
    { name: 'Stable', value: 65, color: '#10b981' },
    { name: 'Critical', value: 15, color: '#ef4444' },
    { name: 'Recovering', value: 12, color: '#3b82f6' },
    { name: 'Observation', value: 8, color: '#f59e0b' },
  ]

  const revenueData = [
    { month: 'Jan', revenue: 285000, expenses: 195000 },
    { month: 'Feb', revenue: 312000, expenses: 210000 },
    { month: 'Mar', revenue: 298000, expenses: 205000 },
    { month: 'Apr', revenue: 345000, expenses: 225000 },
    { month: 'May', revenue: 368000, expenses: 238000 },
    { month: 'Jun', revenue: 392000, expenses: 245000 },
  ]

  const appointmentStats = [
    { day: 'Mon', confirmed: 25, pending: 8, completed: 20 },
    { day: 'Tue', confirmed: 30, pending: 12, completed: 25 },
    { day: 'Wed', confirmed: 28, pending: 10, completed: 22 },
    { day: 'Thu', confirmed: 35, pending: 15, completed: 28 },
    { day: 'Fri', confirmed: 32, pending: 11, completed: 30 },
    { day: 'Sat', confirmed: 18, pending: 6, completed: 15 },
    { day: 'Sun', confirmed: 12, pending: 4, completed: 10 },
  ]

  const occupancyData = [
    { time: '6AM', occupancy: 72 },
    { time: '9AM', occupancy: 78 },
    { time: '12PM', occupancy: 85 },
    { time: '3PM', occupancy: 82 },
    { time: '6PM', occupancy: 88 },
    { time: '9PM', occupancy: 80 },
    { time: '12AM', occupancy: 75 },
  ]

  const metricCards = [
    {
      title: 'Total Patients',
      value: stats?.total_patients || 0,
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      title: 'Bed Occupancy',
      value: `${Math.round((stats?.total_patients || 0) / (stats?.available_beds + stats?.total_patients || 1) * 100)}%`,
      change: '+5%',
      trend: 'up',
      icon: Bed,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Avg Stay Duration',
      value: '4.5 days',
      change: '-8%',
      trend: 'down',
      icon: Clock,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      title: 'Revenue',
      value: '$392K',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
  ]

  const handleExport = (format) => {
    alert(`📊 Exporting report as ${format}...`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-healthcare-blue/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-healthcare-blue rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-semibold gradient-text">Loading Reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
        <div>
          <h1 className="text-3xl font-black gradient-text mb-1">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive healthcare statistics and insights</p>
        </div>
        
        <div className="flex gap-3 flex-wrap">
          {/* Time Range Filter */}
          <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-md border border-gray-200">
            <Filter className="w-4 h-4 text-gray-500 ml-2" />
            {['7days', '30days', '90days'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-healthcare-blue to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {range === '7days' ? '7 Days' : range === '30days' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>

          {/* Export Buttons */}
          <button
            onClick={() => handleExport('PDF')}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={() => handleExport('Excel')}
            className="btn-primary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className={`stat-card bg-gradient-to-br ${metric.bgColor}`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                  metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {metric.change}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
              <p className="text-3xl font-black text-gray-900">{metric.value}</p>
            </div>
          )
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Trend Chart */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <LineChart className="w-5 h-5 text-healthcare-blue" />
                Patient Trend
              </h2>
              <p className="text-sm text-gray-500 mt-1">Daily patient statistics</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <ReLineChart data={patientTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="patients" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: '#0ea5e9' }} />
              <Line type="monotone" dataKey="admissions" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
              <Line type="monotone" dataKey="discharges" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b' }} />
            </ReLineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                Department Statistics
              </h2>
              <p className="text-sm text-gray-500 mt-1">Patients by department</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Bar dataKey="patients" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="revenue" fill="#06b6d4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Patient Status Distribution */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-green-500" />
                Patient Status Distribution
              </h2>
              <p className="text-sm text-gray-500 mt-1">Current patient conditions</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Analytics */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-orange-500" />
                Revenue Analytics
              </h2>
              <p className="text-sm text-gray-500 mt-1">Monthly revenue vs expenses</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Appointment Statistics */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                Appointment Statistics
              </h2>
              <p className="text-sm text-gray-500 mt-1">Weekly appointment breakdown</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Legend />
              <Bar dataKey="confirmed" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="pending" fill="#f59e0b" radius={[8, 8, 0, 0]} />
              <Bar dataKey="completed" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bed Occupancy Rate */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Bed className="w-5 h-5 text-purple-500" />
                Bed Occupancy Rate
              </h2>
              <p className="text-sm text-gray-500 mt-1">24-hour occupancy pattern</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" domain={[0, 100]} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="occupancy" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.4}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Statistics Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-healthcare-blue" />
            Department Performance
          </h2>
          <div className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-healthcare-blue to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{dept.name}</p>
                    <p className="text-sm text-gray-500">{dept.patients} patients</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${(dept.revenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-gray-500">revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Insights */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Key Insights
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Patient Admissions Up</p>
                  <p className="text-sm text-gray-600 mt-1">15% increase in admissions compared to last week. Cardiology department showing highest growth.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Bed Occupancy Optimal</p>
                  <p className="text-sm text-gray-600 mt-1">Current occupancy at 82%, within optimal range. Peak hours between 12PM-6PM.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Revenue Growth</p>
                  <p className="text-sm text-gray-600 mt-1">Monthly revenue increased by $24K. Expenses well-controlled at 62% of revenue.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Appointment Efficiency</p>
                  <p className="text-sm text-gray-600 mt-1">85% completion rate this week. Consider adding more slots for Thursday-Friday peak demand.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
