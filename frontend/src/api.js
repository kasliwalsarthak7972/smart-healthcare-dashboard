import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Patients API
export const patientsAPI = {
  getAll: (params = {}) => api.get('/api/patients/', { params }),
  getById: (id) => api.get(`/api/patients/${id}`),
  create: (data) => api.post('/api/patients/', data),
  update: (id, data) => api.put(`/api/patients/${id}`, data),
  delete: (id) => api.delete(`/api/patients/${id}`),
}

// Appointments API
export const appointmentsAPI = {
  getAll: (params = {}) => api.get('/api/appointments/', { params }),
  getById: (id) => api.get(`/api/appointments/${id}`),
  create: (data) => api.post('/api/appointments/', data),
  update: (id, data) => api.put(`/api/appointments/${id}`, data),
  delete: (id) => api.delete(`/api/appointments/${id}`),
  getRevenue: () => api.get('/api/appointments/revenue/today'),
}

// Doctors API
export const doctorsAPI = {
  getAll: (params = {}) => api.get('/api/doctors/', { params }),
  getById: (id) => api.get(`/api/doctors/${id}`),
  create: (data) => api.post('/api/doctors/', data),
  update: (id, data) => api.put(`/api/doctors/${id}`, data),
  delete: (id) => api.delete(`/api/doctors/${id}`),
}

// Vitals API
export const vitalsAPI = {
  getByPatient: (patientId, params = {}) => api.get(`/api/vitals/${patientId}`, { params }),
  getTrends: (patientId, hours = 24) => api.get(`/api/vitals/${patientId}/trends`, { params: { hours } }),
  create: (data) => api.post('/api/vitals/', data),
  delete: (id) => api.delete(`/api/vitals/${id}`),
}

// Dashboard API
export const dashboardAPI = {
  getStats: () => api.get('/api/dashboard/stats'),
  getActivity: () => api.get('/api/recent-activity'),
  healthCheck: () => api.get('/api/health'),
}

export default api
