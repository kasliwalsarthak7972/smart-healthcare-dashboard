import { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, Plus } from 'lucide-react'
import { appointmentsAPI } from '../api'
import ScheduleAppointmentModal from './ScheduleAppointmentModal'

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')
  const [showScheduleModal, setShowScheduleModal] = useState(false)

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

  const handleUpdateStatus = async (appointmentId, newStatus) => {
    try {
      await appointmentsAPI.update(appointmentId, { status: newStatus })
      loadAppointments()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const handleDeleteAppointment = async (appointmentId) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return
    
    try {
      await appointmentsAPI.delete(appointmentId)
      loadAppointments()
    } catch (error) {
      console.error('Error deleting appointment:', error)
      alert('Failed to delete appointment')
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
        <div className="flex gap-4 justify-between">
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
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Schedule Appointment
          </button>
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
                  <div className="mt-2 flex gap-2 justify-end">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    {appointment.status === 'Pending' && (
                      <button
                        onClick={() => handleUpdateStatus(appointment.id, 'Confirmed')}
                        className="px-2 py-1 bg-green-500/20 hover:bg-green-500/40 text-green-400 rounded text-xs transition-colors"
                      >
                        Confirm
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAppointment(appointment.id)}
                      className="px-2 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded text-xs transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ScheduleAppointmentModal 
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onAppointmentAdded={loadAppointments}
      />
    </div>
  )
}
