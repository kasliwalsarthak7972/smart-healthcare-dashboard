import React, { useState } from 'react'
import { X, AlertTriangle, User, Phone, MessageSquare, Send } from 'lucide-react'

const EmergencyAlertModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    room: '',
    severity: 'High',
    type: 'Medical Emergency',
    description: '',
    contactNumber: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Emergency alert:', formData)
    alert(`🚨 Emergency alert sent for ${formData.patientName} in ${formData.room}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-rose-600 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-white animate-pulse" />
              <h2 className="text-2xl font-bold text-white">Emergency Alert</h2>
            </div>
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
                  className="w-full pl-10 pr-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  placeholder="Patient name"
                />
              </div>
            </div>

            {/* Room */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Room Number *
              </label>
              <input
                type="text"
                required
                value={formData.room}
                onChange={(e) => setFormData({...formData, room: e.target.value})}
                className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                placeholder="Room 101"
              />
            </div>

            {/* Severity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Severity Level *
              </label>
              <select
                required
                value={formData.severity}
                onChange={(e) => setFormData({...formData, severity: e.target.value})}
                className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Emergency Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              >
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Cardiac Arrest">Cardiac Arrest</option>
                <option value="Respiratory Distress">Respiratory Distress</option>
                <option value="Severe Bleeding">Severe Bleeding</option>
                <option value="Fall Injury">Fall Injury</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Contact Number */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Emergency Contact Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  placeholder="+1-555-9999"
                />
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="4"
                  className="w-full pl-10 pr-4 py-3 border-2 border-red-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
                  placeholder="Describe the emergency situation..."
                />
              </div>
            </div>
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2 animate-pulse"
            >
              <Send className="w-5 h-5" />
              Send Emergency Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmergencyAlertModal
