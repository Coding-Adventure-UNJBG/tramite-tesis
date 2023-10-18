import { createContext, useContext, useState } from "react";
import { getTesisRequest, saveTesisRequest } from "../api/tesis";
import { uploadRequest } from "../api/auth";

const TesisContext = createContext()

export const useTesis = () => {
  const context = useContext(TesisContext)
  if (!context) {
    throw new Error("useTesis musst be used with TesisContext")
  }
  return context
}

export const TesisProvider = ({ children }) => {

  const [tesis, setTesis] = useState([])

  const getTesis = async () => {
    try {
      const res = await getTesisRequest()
      console.log(res)
      setTesis(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const saveTesis = async (values, idTramite) => {
    try {
      const formData = new FormData()
      formData.append('file', values.file[0])
      const upload = await uploadRequest(formData)
      if (upload.status === 200) {
        const res = await saveTesisRequest({ titulo: values.titulo, idTramite, file: upload.data.filename })
        return res
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <TesisContext.Provider value={{
      //variables
      tesis,
      //metodos
      getTesis,
      saveTesis,
    }}>
      {children}
    </TesisContext.Provider>
  )
}