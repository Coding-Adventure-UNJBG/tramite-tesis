import { createContext, useContext, useState } from "react";
import { getTesisRequest } from "../api/tesis";

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

  return (
    <TesisContext.Provider value={{
      //variables
      tesis,
      //metodos
      getTesis,
    }}>
      {children}
    </TesisContext.Provider>
  )
}