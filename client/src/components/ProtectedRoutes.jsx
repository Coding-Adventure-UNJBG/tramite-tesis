import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navigation from './Navigation'

function ProtectedRoutes() {
  const { isAuthentificated, loading } = useAuth()
  if (loading) return <></>
  if (!isAuthentificated && !loading) return <Navigate to="/login" replace />
  return <Navigation />
}

export default ProtectedRoutes