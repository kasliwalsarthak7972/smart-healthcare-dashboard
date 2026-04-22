import { useState, useEffect } from 'react'
import { Heart, Activity, Thermometer, Wind } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { patientsAPI, vitalsAPI } from '../api'

export default function Vitals() {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [vitals, setVitals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPatients()
  }, [])

  useEffect(() => {
    if (selectedPatient) {
      loadVitals(selectedPatient)
    }
  }, [selectedPatient])

  const loadPatients = async () => {
    try {
      const res = await patientsAPI.getAll({ limit: 100 })
      setPatients(res.data)
      if (res.data.length > 0) {
        setSelectedPatient(res.data[0].id)
      }
    } catch (error) {
      console.error('Error loading patients:', error)
    }
  }

  const loadVitals = async (patientId) => {
    try {
      setLoading(true)
      const res = await vitalsAPI.getTrends(patientId, 24)
      setVitals(res.data)
    } catch (error) {
      console.error('Error loading vitals:', error)
    } finally {
      setLoading(false)
    }
  }

  const patient = patients.find(p => p.id === selectedPatient)

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Vitals Monitoring</h1>
        <p className="text-white/60">Real-time patient vital signs tracking</p>
      </div>

      {/* Patient Selector */}
      <div className="glass-card p-4 mb-6">
        <select
          value={selectedPatient || ''}
          onChange={(e) => setSelectedPatient(parseInt(e.target.value))}
          className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
        >
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id} className="bg-gray-800">
              {patient.name} - Room {patient.room}
            </option>
          ))}
        </select>
      </div>

      {patient && (
        <>
          {/* Patient Info */}
          <div className="glass-card p-6 mb-6">
            <h3 className="text-xl font-bold text-white mb-2">{patient.name}</h3>
            <p className="text-white/60">
              {patient.age} years • {patient.gender} • {patient.condition}
            </p>
          </div>

          {/* Vitals Grid */}
          {loading ? (
            <div className="text-white text-center py-12">Loading vitals...</div>
          ) : vitals.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="text-red-400" size={24} />
                    <span className="text-white/60">Heart Rate</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {vitals[vitals.length - 1]?.heart_rate || '--'} bpm
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Activity className="text-blue-400" size={24} />
                    <span className="text-white/60">Blood Pressure</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {vitals[vitals.length - 1]?.blood_pressure_systolic || '--'}/
                    {vitals[vitals.length - 1]?.blood_pressure_diastolic || '--'}
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Thermometer className="text-orange-400" size={24} />
                    <span className="text-white/60">Temperature</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {vitals[vitals.length - 1]?.temperature || '--'}°C
                  </p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Wind className="text-green-400" size={24} />
                    <span className="text-white/60">Oxygen Level</span>
                  </div>
                  <p className="text-3xl font-bold text-white">
                    {vitals[vitals.length - 1]?.oxygen_level || '--'}%
                  </p>
                </div>
              </div>

              {/* Trends Chart */}
              <div className="glass-card p-6">
                <h3 className="text-xl font-bold text-white mb-4">24-Hour Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={vitals}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="timestamp" 
                      stroke="rgba(255,255,255,0.6)"
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                    />
                    <YAxis stroke="rgba(255,255,255,0.6)" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)' 
                      }}
                      labelFormatter={(value) => new Date(value).toLocaleString()}
                    />
                    <Line type="monotone" dataKey="heart_rate" stroke="#ef4444" strokeWidth={2} name="Heart Rate" />
                    <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} name="Temperature" />
                    <Line type="monotone" dataKey="oxygen_level" stroke="#10b981" strokeWidth={2} name="Oxygen Level" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="text-white text-center py-12">No vital signs data available</div>
          )}
        </>
      )}
    </div>
  )
}
