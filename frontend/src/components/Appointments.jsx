import { useState, useEffect } from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { appointmentsAPI } from '../api'

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    loadAppointments()
  }, [statusFilter])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const params = { limit: 100 }
      if (statusFilter) params.status = statusFilter
      
      const res = await appointmentsAPI.getAll(params)
      setAppointments(res.data)
    } catch (error) {
      console.error('Error loading appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'bg-green-500/20 text-green-400 border-green-500/50',
      'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      'Completed': 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      'Cancelled': 'bg-red-500/20 text-red-400 border-red-500/50'
    }
    return colors[status] || 'bg-white/10 text-white'
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Appointments</h1>
        <p className="text-white/60">Schedule and manage patient appointments</p>
      </div>

      {/* Status Filter */}
      <div className="glass-card p-4 mb-6">
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      {loading ? (
        <div className="text-white text-center py-12">Loading appointments...</div>
      ) : (
        <div className="grid gap-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <CalendarIcon size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {appointment.patient?.name || 'Unknown Patient'}
                    </h3>
                    <p className="text-white/60">
                      {appointment.doctor?.name || 'Unknown Doctor'} • {appointment.department}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">
                    {new Date(appointment.date).toLocaleDateString()}
                  </p>
                  <p className="text-white/60">{appointment.time}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
