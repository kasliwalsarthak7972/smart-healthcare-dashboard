import { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, DollarSign, Users, Target } from 'lucide-react'
import { dashboardAPI, appointmentsAPI } from '../api'

const COLORS = ['#0ea5e9', '#10b981', '#8b5cf6', '#f97316', '#ef4444', '#ec4899']

export default function Reports() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    try {
      setLoading(true)
      const [statsRes, revenueRes] = await Promise.all([
        dashboardAPI.getStats(),
        appointmentsAPI.getRevenue()
      ])
      setStats(statsRes.data)
    } catch (error) {
      console.error('Error loading reports:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Loading reports...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Reports & Analytics</h1>
        <p className="text-white/60">Comprehensive healthcare analytics and insights</p>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="text-green-400" size={24} />
            <span className="text-white/60">Total Revenue</span>
          </div>
          <p className="text-3xl font-bold text-white">₹{(stats?.revenue_today || 0).toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1 mt-2 text-green-400">
            <TrendingUp size={16} />
            <span className="text-sm">+15.2%</span>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <Users className="text-blue-400" size={24} />
            <span className="text-white/60">Patient Satisfaction</span>
          </div>
          <p className="text-3xl font-bold text-white">94.5%</p>
          <div className="flex items-center gap-1 mt-2 text-green-400">
            <TrendingUp size={16} />
            <span className="text-sm">+3.2%</span>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <Target className="text-purple-400" size={24} />
            <span className="text-white/60">Efficiency Rate</span>
          </div>
          <p className="text-3xl font-bold text-white">87.3%</p>
          <div className="flex items-center gap-1 mt-2 text-green-400">
            <TrendingUp size={16} />
            <span className="text-sm">+5.1%</span>
          </div>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="text-orange-400" size={24} />
            <span className="text-white/60">Avg. Recovery Time</span>
          </div>
          <p className="text-3xl font-bold text-white">5.2 days</p>
          <div className="flex items-center gap-1 mt-2 text-green-400">
            <TrendingUp size={16} />
            <span className="text-sm">-1.3 days</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">Revenue Trend (7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[
              { day: 'Mon', revenue: 45000 },
              { day: 'Tue', revenue: 52000 },
              { day: 'Wed', revenue: 48000 },
              { day: 'Thu', revenue: 61000 },
              { day: 'Fri', revenue: 55000 },
              { day: 'Sat', revenue: 38000 },
              { day: 'Sun', revenue: stats?.revenue_today || 0 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)' 
                }} 
              />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-bold text-white mb-4">Department Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Cardiology', value: 45 },
                  { name: 'Neurology', value: 32 },
                  { name: 'Orthopedics', value: 28 },
                  { name: 'General', value: 52 },
                  { name: 'Emergency', value: 18 }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {[0, 1, 2, 3, 4].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(255,255,255,0.2)' 
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-bold text-white mb-4">Key Insights & Recommendations</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-white">
              <strong className="text-blue-400">Insight:</strong> Cardiology department shows 15% increase in patient admissions this week.
            </p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-white">
              <strong className="text-green-400">Recommendation:</strong> Consider adding 2 more cardiologists to handle increased demand.
            </p>
          </div>
          <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <p className="text-white">
              <strong className="text-purple-400">Trend:</strong> Average patient recovery time has decreased by 1.3 days compared to last month.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
