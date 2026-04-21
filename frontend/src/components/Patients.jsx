import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Search, Filter, Plus, User } from 'lucide-react'
import AddPatientModal from './AddPatientModal'

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('All')
  const [conditionFilter, setConditionFilter] = useState('All')
  const [showAddPatient, setShowAddPatient] = useState(false)

  useEffect(() => {
    fetchPatients()
  }, [])

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/patients')
      setPatients(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching patients:', error)
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.room.includes(searchTerm)
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter
    const matchesCondition = conditionFilter === 'All' || patient.condition === conditionFilter
    return matchesSearch && matchesStatus && matchesCondition
  })

  const getStatusClass = (status) => {
    return `status-badge status-${status.toLowerCase()}`
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients by name, condition, or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-healthcare-blue focus:ring-2 focus:ring-healthcare-blue/20 transition-all"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowAddPatient(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Patient
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-5 h-5 text-healthcare-blue" />
          <h3 className="text-sm font-semibold text-gray-700">Filters:</h3>
          
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-healthcare-blue text-sm font-medium"
            >
              <option value="All">All Status</option>
              <option value="Stable">Stable</option>
              <option value="Critical">Critical</option>
              <option value="Recovering">Recovering</option>
              <option value="Observation">Observation</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-gray-600">Condition:</label>
            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-healthcare-blue text-sm font-medium"
            >
              <option value="All">All Conditions</option>
              {[...new Set(patients.map(p => p.condition))].map(condition => (
                <option key={condition} value={condition}>{condition}</option>
              ))}
            </select>
          </div>

          <div className="ml-auto text-sm font-semibold text-gray-700">
            Showing: {filteredPatients.length} / {patients.length} patients
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Age/Gender</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Condition</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Room</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Admission Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-healthcare-blue to-purple-500 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-bold">{patient.name.charAt(0)}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">{patient.age} / {patient.gender}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {patient.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">Room {patient.room}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.admission_date}</td>
                  <td className="px-6 py-4">
                    <span className={getStatusClass(patient.status)}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-healthcare-blue hover:text-blue-700 font-semibold text-sm hover:underline">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card bg-gradient-to-br from-blue-50 to-cyan-50">
          <p className="text-sm font-medium text-gray-600 mb-1">Total Patients</p>
          <p className="text-3xl font-black text-gray-900">{patients.length}</p>
        </div>
        <div className="stat-card bg-gradient-to-br from-red-50 to-rose-50">
          <p className="text-sm font-medium text-gray-600 mb-1">Critical Cases</p>
          <p className="text-3xl font-black text-red-600">
            {patients.filter(p => p.status === 'Critical').length}
          </p>
        </div>
        <div className="stat-card bg-gradient-to-br from-green-50 to-emerald-50">
          <p className="text-sm font-medium text-gray-600 mb-1">Stable Patients</p>
          <p className="text-3xl font-black text-green-600">
            {patients.filter(p => p.status === 'Stable').length}
          </p>
        </div>
      </div>

      {/* Add Patient Modal */}
      <AddPatientModal isOpen={showAddPatient} onClose={() => setShowAddPatient(false)} />
    </div>
  )
}

export default Patients
