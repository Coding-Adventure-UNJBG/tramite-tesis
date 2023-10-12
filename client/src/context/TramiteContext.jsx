import { createContext, useContext, useState } from "react";
import { saveSolicitudRequest } from "../api/tramite";

const TramiteContext = createContext()

export const useTramite = () => {
  const context = useContext(TramiteContext)
  if (!context) {
    throw new Error("useTramite musst be used with TramiteContext")
  }
  return context
}

export const TramiteProvider = ({ children }) => {

  const [solicitudes, setSolicitudes] = useState([])
  const [errors, setErrors] = useState([])

  const saveSolicitdud = async (values) => {
    try {
      const res = await saveSolicitudRequest(values)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TramiteContext.Provider value={{
      //Lo que van a compartir
      saveSolicitdud
    }}>
      {children}
    </TramiteContext.Provider>
  )
}