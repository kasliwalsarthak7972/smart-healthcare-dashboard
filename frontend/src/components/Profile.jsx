import React from 'react'
import { User, Mail, Phone, Calendar, Briefcase, Settings, Shield } from 'lucide-react'

const Profile = ({ onLogout }) => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="card bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-lg rounded-full flex items-center justify-center text-4xl font-bold">
            A
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin User</h1>
            <p className="text-blue-100 text-lg">Administrator</p>
            <div className="flex items-center gap-2 mt-2">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">Healthcare Administration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-semibold text-gray-900">Admin User</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-gray-900">admin@healthcare.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">+1-555-1234</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Join Date</p>
                <p className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-900">Account Status</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-900">Role</span>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold capitalize">
                Administrator
              </span>
            </div>
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-900">Preferences</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat-card">
          <p className="text-sm text-gray-600 mb-1">Patients Assigned</p>
          <p className="text-3xl font-bold text-gray-900">24</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-gray-600 mb-1">Appointments Today</p>
          <p className="text-3xl font-bold text-gray-900">8</p>
        </div>
        <div className="stat-card">
          <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
          <p className="text-3xl font-bold text-gray-900">96%</p>
        </div>
      </div>
    </div>
  )
}

export default Profile
