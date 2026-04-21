import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { User, Star, Users, CheckCircle } from 'lucide-react'

const Doctors = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/doctors')
      setDoctors(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching doctors:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="text-sm text-gray-600 mb-1">Total Doctors</p>
          <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-gray-600 mb-1">Available Now</p>
          <p className="text-2xl font-bold text-green-600">
            {doctors.filter(d => d.available).length}
          </p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-gray-600 mb-1">Total Patients</p>
          <p className="text-2xl font-bold text-blue-600">
            {doctors.reduce((sum, d) => sum + d.patients_count, 0)}
          </p>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="card hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-healthcare-blue to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.specialization}</p>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-red-500'}`} />
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Status</span>
                <span className={`font-semibold ${doctor.available ? 'text-green-600' : 'text-red-600'}`}>
                  {doctor.available ? 'Available' : 'Busy'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Patients</span>
                <span className="font-semibold text-gray-900">{doctor.patients_count}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-900">4.8</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 btn-primary text-sm">View Profile</button>
              <button className="btn-secondary text-sm">Schedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors
