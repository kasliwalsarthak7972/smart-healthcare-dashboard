import React from 'react'
import { Activity, Users, Calendar, Stethoscope, Heart, LayoutDashboard, Bell, UserCircle, BarChart3 } from 'lucide-react'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'patients', label: 'Patients', icon: Users },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'vitals', label: 'Vitals', icon: Heart },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: UserCircle },
  ]

  return (
    <aside className="w-64 bg-white/95 backdrop-blur-xl border-r-2 border-healthcare-blue/10 flex flex-col shadow-2xl">
      <div className="p-6 border-b-2 border-healthcare-blue/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-healthcare-blue via-purple-500 to-healthcare-pink rounded-2xl flex items-center justify-center shadow-lg animate-pulse-slow float-animation">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black gradient-text">HealthCare</h1>
            <p className="text-xs text-gray-500 font-medium">Smart Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-medium group ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-healthcare-blue via-purple-500 to-healthcare-pink text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-healthcare-blue/10 hover:to-purple-500/10 hover:text-healthcare-blue hover:scale-105'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span>{item.label}</span>
                  {activeTab === item.id && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t-2 border-healthcare-blue/10">
        <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-healthcare-blue/20 shadow-inner">
          <p className="text-sm font-bold text-gray-900 mb-1">Need Help?</p>
          <p className="text-xs text-gray-600 mb-3">Contact support team</p>
          <button className="w-full bg-gradient-to-r from-healthcare-blue to-purple-500 text-white text-sm py-2.5 rounded-xl hover:from-healthcare-blue/90 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg font-semibold">
            Support
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
