import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Bell, AlertTriangle, Calendar, FlaskConical, Settings, Check } from 'lucide-react'

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications')
      setNotifications(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching notifications:', error)
      setLoading(false)
    }
  }

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'critical': return <AlertTriangle className="w-6 h-6 text-red-600" />
      case 'appointment': return <Calendar className="w-6 h-6 text-blue-600" />
      case 'lab': return <FlaskConical className="w-6 h-6 text-purple-600" />
      case 'system': return <Settings className="w-6 h-6 text-gray-600" />
      default: return <Bell className="w-6 h-6 text-gray-600" />
    }
  }

  const getNotificationBg = (type) => {
    switch(type) {
      case 'critical': return 'bg-red-50 border-red-200'
      case 'appointment': return 'bg-blue-50 border-blue-200'
      case 'lab': return 'bg-purple-50 border-purple-200'
      case 'system': return 'bg-gray-50 border-gray-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-600 mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Check className="w-4 h-4" />
          Mark All Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`card border-2 ${getNotificationBg(notification.type)} ${
              !notification.read ? 'shadow-md' : 'opacity-75'
            } hover:shadow-lg transition-all duration-200`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </h3>
                    <p className="text-gray-700">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notifications
