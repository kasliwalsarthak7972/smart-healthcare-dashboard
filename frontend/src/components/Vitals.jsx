import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Heart, Thermometer, Wind, Activity, Droplets, User } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

const Vitals = () => {
  const [vitalsData, setVitalsData] = useState([])
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPatient, setSelectedPatient] = useState(1)

  useEffect(() => {
    fetchPatients()
  }, [])

  useEffect(() => {
    if (patients.length > 0) {
      fetchVitals()
    }
  }, [selectedPatient, patients])

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/patients')
      setPatients(response.data)
    } catch (error) {
      console.error('Error fetching patients:', error)
    }
  }

  const fetchVitals = async () => {
    try {
      const response = await axios.get(`/api/vitals/${selectedPatient}`)
      setVitalsData(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching vitals:', error)
      setLoading(false)
    }
  }

  const selectedPatientData = patients.find(p => p.id === selectedPatient)

  const latestVitals = vitalsData.length > 0 ? vitalsData[vitalsData.length - 1] : null

  const vitalCards = [
    {
      label: 'Heart Rate',
      value: latestVitals?.heart_rate || '--',
      unit: 'bpm',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      normal: '60-100'
    },
    {
      label: 'Blood Pressure',
      value: latestVitals?.blood_pressure || '--',
      unit: 'mmHg',
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      normal: '120/80'
    },
    {
      label: 'Temperature',
      value: latestVitals?.temperature || '--',
      unit: '°C',
      icon: Thermometer,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      normal: '36.1-37.2'
    },
    {
      label: 'Oxygen Level',
      value: latestVitals?.oxygen_level || '--',
      unit: '%',
      icon: Droplets,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-50',
      normal: '95-100'
    },
    {
      label: 'Respiratory Rate',
      value: latestVitals?.respiratory_rate || '--',
      unit: 'breaths/min',
      icon: Wind,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      normal: '12-20'
    }
  ]

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Patient Selector */}
      <div className="card">
        <div className="flex items-center gap-3 mb-3">
          <User className="w-5 h-5 text-healthcare-blue" />
          <label className="block text-sm font-semibold text-gray-700">Select Patient</label>
        </div>
        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(Number(e.target.value))}
          className="w-full md:w-80 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all font-medium"
        >
          {patients.map(patient => (
            <option key={patient.id} value={patient.id}>
              {patient.name} - Room {patient.room} ({patient.status})
            </option>
          ))}
        </select>
        {selectedPatientData && (
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
            <p className="text-sm font-semibold text-gray-900">
              👤 {selectedPatientData.name} | Age: {selectedPatientData.age} | Gender: {selectedPatientData.gender}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Condition: {selectedPatientData.condition} | Room: {selectedPatientData.room}
            </p>
          </div>
        )}
      </div>

      {/* Vitals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {vitalCards.map((vital, index) => {
          const Icon = vital.icon
          return (
            <div key={index} className="stat-card">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 ${vital.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${vital.color}`} />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{vital.label}</p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-bold text-gray-900">{vital.value}</p>
                <span className="text-sm text-gray-500">{vital.unit}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Normal: {vital.normal}</p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heart Rate Chart */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Heart Rate (24h)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vitalsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="timestamp" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="heart_rate" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Oxygen Level Chart */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Oxygen Level (24h)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vitalsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="timestamp" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="oxygen_level" stroke="#06b6d4" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Temperature Chart */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Temperature (24h)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={vitalsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="timestamp" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line type="monotone" dataKey="temperature" stroke="#f97316" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Vitals Overview Radar */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Vitals Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={vitalsData.slice(-1)}>
              <PolarGrid />
              <PolarAngleAxis dataKey="timestamp" />
              <PolarRadiusAxis />
              <Radar name="Heart Rate" dataKey="heart_rate" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
              <Radar name="Oxygen" dataKey="oxygen_level" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Vitals
