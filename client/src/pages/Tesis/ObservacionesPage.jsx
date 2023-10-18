import { Navigate, useLocation } from "react-router-dom"
import Card from "../../components/Card"
import { useForm } from "react-hook-form"
import Modal from "../../components/Modal"
import { useEffect, useState } from "react"
import SubsanarPage from './SubsanarPage'
import NewObservacionPage from './NewObservacionPage'
import { useTesis } from "../../context/TesisContext"
import ObservacionAsesor from "./ObservacionAsesor"

function ObservacionesPage() {

  const { state } = useLocation()
  if (!state) return <Navigate to='/404' />

  const { id } = state
  const { getTesisById } = useTesis()

  const [detalles, setDetalles] = useState([])

  useEffect(() => {
    async function loadTesis() {
      if (id) {
        const res = await getTesisById(id)
        console.log(res)
        setDetalles(res)
      }
    }

    loadTesis()
  }, [])

  return (
    <>
      <Card>
        <h2 className="title">Detalles de tesis {id}</h2>
        <div className="mb-5 space-y-1.5">
          <h3 className="mx-5 font-medium text-base">Titulo:
            <span className="font-normal ml-2">{detalles?.titulo}</span>
          </h3>
          <h3 className="mx-5 font-medium text-base">Fecha Inicio:
            <span className="font-normal ml-2">{detalles?.fecha}</span>
          </h3>
          <h3 className="mx-5 font-medium text-base">Asesor:
            <span className="font-normal ml-2 uppercase">{detalles?.nombreAsesor}</span>
          </h3>
          <h3 className="mx-5 font-medium text-base">Estado de tesis:
            <span className='ml-2 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-500'>{detalles?.estado}</span>
          </h3>
        </div>
      </Card>

      <Card>
        <button className="button-style mx-5 mt-5 mb-2" onClick={() => {
          window.open(`http://localhost:3000/files/${detalles?.fileName}`, 'CryReport', 'width=700, height=600')
        }}>Mostrar última versión (PDF)</button>

        <ObservacionAsesor idTesis={id} />

      </Card>
    </>

  )
}

export default ObservacionesPage