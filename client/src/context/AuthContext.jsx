import { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { loginRequest, logoutRequest, verifyTokenRequest } from "../api/auth";

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth musst be used with AuthContext")
  }
  return context
}

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthentificated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])

  const signin = async (user) => {
    try {
      const res = await loginRequest(user)
      console.log(res.data)
      setIsAuthenticated(true)
      setUser(res.data)
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data)
      }
      setErrors([error.response.data.message])
    }
  }

  const logout = async () => {
    const res = await logoutRequest()
    setIsAuthenticated(false)
    setUser(null)
  }

  //Mostrar solo 5 segundos los errores
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  //Verificar la sesion
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }

      try {
        const res = await verifyTokenRequest(cookies.token)
        if (!res.data) return setIsAuthenticated(false)
        setIsAuthenticated(true)
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        setIsAuthenticated(false)
        setLoading(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signin,
        logout,
        user,
        isAuthentificated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}