import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, User } from 'lucide-react'

const Appointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments')
      setAppointments(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching appointments:', error)
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Confirmed': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'Pending': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'Completed': return <CheckCircle className="w-5 h-5 text-blue-500" />
      case 'Cancelled': return <XCircle className="w-5 h-5 text-red-500" />
      default: return null
    }
  }

  const getStatusClass = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
      case 'Pending': return 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-md'
      case 'Completed': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
      case 'Cancelled': return 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const filteredAppointments = filter === 'All' 
    ? appointments 
    : appointments.filter(a => a.status === filter)

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="stat-card bg-gradient-to-br from-blue-50 to-cyan-50">
          <p className="text-sm font-medium text-gray-600 mb-1">Total Appointments</p>
          <p className="text-3xl font-black text-gray-900">{appointments.length}</p>
        </div>
        <div className="stat-card bg-gradient-to-br from-green-50 to-emerald-50">
          <p className="text-sm font-medium text-gray-600 mb-1">Confirmed</p>
          <p className="text-3xl font-black text-green-600">
            {appointments.filter(a => a.status === 'Confirmed').length}
          </p>
        </div>
        <div className="stat-card bg-gradient-to-br from-yellow-50 to-amber-50">
          <p className="text-sm font-medium text-gray-600 mb-1">Pending</p>
          <p className="text-3xl font-black text-yellow-600">
            {appointments.filter(a => a.status === 'Pending').length}
          </p>
        </div>
        <div className="stat-card bg-gradient-to-br from-blue-50 to-indigo-50">
          <p className="text-sm font-medium text-gray-600 mb-1">Completed</p>
          <p className="text-3xl font-black text-blue-600">
            {appointments.filter(a => a.status === 'Completed').length}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="card">
        <div className="flex items-center gap-3 flex-wrap">
          <Calendar className="w-5 h-5 text-healthcare-blue" />
          <h3 className="text-sm font-semibold text-gray-700">Filter by Status:</h3>
          {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                filter === status
                  ? 'bg-gradient-to-r from-healthcare-blue to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-healthcare-blue" />
          All Appointments ({filteredAppointments.length})
        </h2>
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-blue-50 hover:to-cyan-50 transition-all duration-300 border border-gray-100 hover:border-healthcare-blue/30 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-healthcare-blue to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{appointment.patient_name}</p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                    <span className="font-medium">{appointment.doctor}</span>
                    <span>•</span>
                    <span>{appointment.department}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Calendar className="w-4 h-4" />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mt-1">
                    <Clock className="w-4 h-4" />
                    <span>{appointment.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(appointment.status)}
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getStatusClass(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Appointments
