import React, { useState } from 'react'
import axios from 'axios'
import { Activity, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react'

const SignIn = ({ onSwitch, onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      })
      onLogin(response.data.user)
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-4">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl mb-4 shadow-2xl">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">HealthCare Pro</h1>
          <p className="text-blue-100 text-lg">Smart Healthcare Dashboard</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to access your dashboard</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="doctor@healthcare.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={onSwitch}
                className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-800 font-semibold mb-3">🔑 Demo Login Credentials:</p>
            <div className="space-y-2 text-xs">
              <div className="bg-white p-2 rounded-lg">
                <p className="font-medium text-blue-900">👨‍⚕️ Doctor:</p>
                <p className="text-blue-700">sarah.johnson@healthcare.com / 12345</p>
              </div>
              <div className="bg-white p-2 rounded-lg">
                <p className="font-medium text-blue-900">👩‍⚕️ Nurse:</p>
                <p className="text-blue-700">emily.davis@healthcare.com / 12345</p>
              </div>
              <div className="bg-white p-2 rounded-lg">
                <p className="font-medium text-blue-900">👤 Patient:</p>
                <p className="text-blue-700">john.smith@healthcare.com / 12345</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
