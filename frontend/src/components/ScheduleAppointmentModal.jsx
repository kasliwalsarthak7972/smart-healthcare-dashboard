import React, { useState } from 'react'
import { X, User, Calendar, Clock, Activity, Save } from 'lucide-react'

const ScheduleAppointmentModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    type: 'Consultation',
    department: 'General',
    notes: ''
  })

  const doctors = [
    'Dr. Sarah Johnson',
    'Dr. Michael Chen',
    'Dr. Emily Rodriguez',
    'Dr. James Wilson',
    'Dr. Lisa Thompson'
  ]

  const departments = [
    'General', 'Cardiology', 'Neurology', 'Orthopedics', 
    'Pediatrics', 'Emergency', 'Surgery', 'Dermatology'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Appointment scheduled:', formData)
    alert(`Appointment scheduled for ${formData.patientName} with ${formData.doctorName}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Schedule Appointment</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Patient Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  placeholder="Patient name"
                />
              </div>
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Doctor *
              </label>
              <select
                required
                value={formData.doctorName}
                onChange={(e) => setFormData({...formData, doctorName: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                <option value="">Select Doctor</option>
                {doctors.map(doc => (
                  <option key={doc} value={doc}>{doc}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Time *
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department *
              </label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Appointment Type *
              </label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Check-up">Check-up</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
              placeholder="Any special instructions or notes..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ScheduleAppointmentModal
