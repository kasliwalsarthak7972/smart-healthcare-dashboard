import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Patients from './components/Patients'
import Appointments from './components/Appointments'
import Doctors from './components/Doctors'
import Vitals from './components/Vitals'
import Notifications from './components/Notifications'
import Profile from './components/Profile'
import Reports from './components/Reports'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />
      case 'patients':
        return <Patients />
      case 'appointments':
        return <Appointments />
      case 'doctors':
        return <Doctors />
      case 'vitals':
        return <Vitals />
      case 'notifications':
        return <Notifications />
      case 'reports':
        return <Reports />
      case 'profile':
        return <Profile onLogout={() => {}} />
      default:
        return <Dashboard onNavigate={setActiveTab} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'patients' && 'Patient Management'}
              {activeTab === 'appointments' && 'Appointments'}
              {activeTab === 'doctors' && 'Medical Staff'}
              {activeTab === 'vitals' && 'Patient Vitals'}
              {activeTab === 'notifications' && 'Notifications'}
              {activeTab === 'profile' && 'My Profile'}
            </h1>
            <p className="text-gray-600 mt-2">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </header>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default App
