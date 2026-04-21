import React, { useState } from 'react'
import { X, User, Mail, Phone, Calendar, MapPin, Activity, Save } from 'lucide-react'

const AddPatientModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    email: '',
    phone: '',
    address: '',
    condition: 'General',
    room: '',
    admissionDate: new Date().toISOString().split('T')[0],
    status: 'Stable'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Patient added:', formData)
    // Here you would typically send to backend
    alert(`Patient ${formData.name} added successfully!`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-healthcare-blue via-purple-500 to-pink-500 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Add New Patient</h2>
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
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age *
              </label>
              <input
                type="number"
                required
                min="0"
                max="150"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all"
                placeholder="45"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Gender *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all"
                  placeholder="patient@email.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all"
                  placeholder="+1-555-1234"
                />
              </div>
            </div>

            {/* Room */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Room Number *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  value={formData.room}
                  onChange={(e) => setFormData({...formData, room: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all"
                  placeholder="Room 101"
                />
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Condition *
              </label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  required
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all"
                >
                  <option value="General">General</option>
                  <option value="Cardiac">Cardiac</option>
                  <option value="Neurological">Neurological</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all"
              >
                <option value="Stable">Stable</option>
                <option value="Critical">Critical</option>
                <option value="Recovering">Recovering</option>
                <option value="Observation">Observation</option>
              </select>
            </div>

            {/* Admission Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admission Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  required
                  value={formData.admissionDate}
                  onChange={(e) => setFormData({...formData, admissionDate: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all resize-none"
              placeholder="Enter patient address"
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-healthcare-blue via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPatientModal
