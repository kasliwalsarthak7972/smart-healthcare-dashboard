import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { appointmentsAPI, patientsAPI, doctorsAPI } from '../api'

export default function ScheduleAppointmentModal({ isOpen, onClose, onAppointmentAdded }) {
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    department: '',
    date: '',
    time: '09:00',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      loadData()
    }
  }, [isOpen])

  const loadData = async () => {
    try {
      const [patientsRes, doctorsRes] = await Promise.all([
        patientsAPI.getAll({ limit: 100 }),
        doctorsAPI.getAll({ limit: 100 })
      ])
      setPatients(patientsRes.data)
      setDoctors(doctorsRes.data)
    } catch (err) {
      console.error('Error loading data:', err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const appointmentData = {
        ...formData,
        patient_id: parseInt(formData.patient_id),
        doctor_id: parseInt(formData.doctor_id),
        date: new Date(formData.date).toISOString()
      }

      await appointmentsAPI.create(appointmentData)
      onAppointmentAdded()
      onClose()
      setFormData({
        patient_id: '',
        doctor_id: '',
        department: '',
        date: '',
        time: '09:00',
        notes: ''
      })
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to schedule appointment')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass-card p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Schedule Appointment</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/80 text-sm mb-1">Patient *</label>
            <select
              required
              value={formData.patient_id}
              onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
            >
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id} className="bg-gray-800">
                  {patient.name} - Room {patient.room}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Doctor *</label>
            <select
              required
              value={formData.doctor_id}
              onChange={(e) => {
                const doctor = doctors.find(d => d.id === parseInt(e.target.value))
                setFormData({ 
                  ...formData, 
                  doctor_id: e.target.value,
                  department: doctor ? doctor.specialization : ''
                })
              }}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id} className="bg-gray-800">
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Department</label>
            <input
              type="text"
              value={formData.department}
              readOnly
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/60"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm mb-1">Date *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-1">Time *</label>
              <select
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
              >
                {['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45',
                  '11:00', '11:15', '11:30', '11:45', '14:00', '14:15', '14:30', '14:45',
                  '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45',
                  '17:00', '17:15', '17:30', '17:45'].map((time) => (
                  <option key={time} value={time} className="bg-gray-800">{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-white/40"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg transition-colors"
            >
              {loading ? 'Scheduling...' : 'Schedule Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
