import { useState, useEffect } from 'react'
import { Search, Filter, Plus } from 'lucide-react'
import { patientsAPI } from '../api'
import AddPatientModal from './AddPatientModal'

export default function Patients() {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [conditionFilter, setConditionFilter] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadPatients()
  }, [search, statusFilter, conditionFilter])

  const loadPatients = async () => {
    try {
      setLoading(true)
      const params = { search, limit: 100 }
      if (statusFilter) params.status = statusFilter
      if (conditionFilter) params.condition = conditionFilter
      
      const res = await patientsAPI.getAll(params)
      setPatients(res.data)
    } catch (error) {
      console.error('Error loading patients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePatient = async (patientId) => {
    if (!confirm('Are you sure you want to delete this patient?')) return
    
    try {
      await patientsAPI.delete(patientId)
      loadPatients()
    } catch (error) {
      console.error('Error deleting patient:', error)
      alert('Failed to delete patient')
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Patient Management</h1>
        <p className="text-white/60">Search, filter, and manage patient records</p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={20} />
            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="Stable">Stable</option>
            <option value="Critical">Critical</option>
            <option value="Recovering">Recovering</option>
            <option value="Observation">Observation</option>
          </select>
          <select
            value={conditionFilter}
            onChange={(e) => setConditionFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none"
          >
            <option value="">All Conditions</option>
            <option value="Cardiac">Cardiac</option>
            <option value="Neurological">Neurological</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="General">General</option>
          </select>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Patient
          </button>
        </div>
      </div>

      {/* Patient List */}
      {loading ? (
        <div className="text-white text-center py-12">Loading patients...</div>
      ) : (
        <div className="glass-card p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-white/60">Name</th>
                  <th className="text-left py-3 px-4 text-white/60">Age</th>
                  <th className="text-left py-3 px-4 text-white/60">Condition</th>
                  <th className="text-left py-3 px-4 text-white/60">Room</th>
                  <th className="text-left py-3 px-4 text-white/60">Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4 text-white font-medium">{patient.name}</td>
                    <td className="py-3 px-4 text-white/80">{patient.age}</td>
                    <td className="py-3 px-4 text-white/80">{patient.condition}</td>
                    <td className="py-3 px-4 text-white/80">{patient.room}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium status-${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeletePatient(patient.id)}
                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AddPatientModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onPatientAdded={loadPatients}
      />
    </div>
  )
}
