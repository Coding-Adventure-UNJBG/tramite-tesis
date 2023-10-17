import { createContext, useContext, useState } from "react";
import { getComitesRequest, getObservacionesRequest, getProfesoresRequest, getTramiteRequest, getTramitesRequest, saveComitesRequest, saveObservacionRequest, saveSolicitudRequest, subsanarObservacionRequest } from "../api/tramite";
import { uploadRequest } from "../api/auth";

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
      console.log("valores al context: ", values)

      const formData = new FormData()
      formData.append('file', values.file[0])
      const upload = await uploadRequest(formData)
      if (upload.status === 200) {
        console.log("respuesta de upload", upload.data)
        const res = await saveSolicitudRequest({ asesor: values.asesor, file: upload.data.filename })
        return res
      }

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

  const getProfesores = async () => {
    try {
      const res = await getProfesoresRequest()
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const registerComite = async (values) => {
    try {
      const res = await saveComitesRequest(values)
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const getComites = async () => {
    try {
      const res = await getComitesRequest()
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const getTramiteById = async (id) => {
    try {
      const res = await getTramiteRequest(id)
      // console.log("response : ", res)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  const getObservationById = async (id) => {
    try {
      const res = await getObservacionesRequest(id)
      return res.data

    } catch (error) {
      console.log(error)
    }
  }

  const newObservacion = async (values, idTramite) => {
    try {
      const res = await saveObservacionRequest({ ...values, idTramite })
      return res
    } catch (error) {
      console.log(error)
    }
  }

  const subsanarObservacion = async (values, idObser) => {
    try {
      const formData = new FormData()
      formData.append('file', values.file[0])
      const upload = await uploadRequest(formData)

      if (upload.status === 200) {
        const res = await subsanarObservacionRequest({ idObser, file: upload.data.filename })
        return res
      }

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
      getTramites,
      getProfesores,
      registerComite,
      getComites,
      getTramiteById,
      getObservationById,
      newObservacion,
      subsanarObservacion
    }}>
      {children}
    </TramiteContext.Provider>
  )
}