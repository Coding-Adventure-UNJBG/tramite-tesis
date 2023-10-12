import { createContext, useContext, useState } from "react";
import { getTramitesRequest, saveSolicitudRequest } from "../api/tramite";

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

  const getTramites = async () => {
    try {
      const res = await getTramitesRequest()
      setSolicitudes(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <TramiteContext.Provider value={{
      // Variables
      solicitudes,
      // Metodos
      saveSolicitdud,
      getTramites
    }}>
      {children}
    </TramiteContext.Provider>
  )
}