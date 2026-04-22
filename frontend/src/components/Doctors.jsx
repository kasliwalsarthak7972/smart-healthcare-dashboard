import { useState, useEffect } from 'react'
import { Stethoscope, Phone, Mail } from 'lucide-react'
import { doctorsAPI } from '../api'

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDoctors()
  }, [])

  const loadDoctors = async () => {
    try {
      setLoading(true)
      const res = await doctorsAPI.getAll({ limit: 100 })
      setDoctors(res.data)
    } catch (error) {
      console.error('Error loading doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Doctor Directory</h1>
        <p className="text-white/60">View doctor information and availability</p>
      </div>

      {loading ? (
        <div className="text-white text-center py-12">Loading doctors...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Stethoscope size={32} className="text-blue-400" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  doctor.available 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/50'
                }`}>
                  {doctor.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{doctor.name}</h3>
              <p className="text-white/60 mb-4">{doctor.specialization}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-white/80">
                  <Phone size={16} />
                  <span className="text-sm">{doctor.contact || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Mail size={16} />
                  <span className="text-sm">{doctor.email || 'N/A'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-white/60 text-sm">
                  Patients: <span className="text-white font-medium">{doctor.patients_count}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
