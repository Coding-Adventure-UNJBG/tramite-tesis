import { Navigate, useLocation } from "react-router-dom"
import Card from "../../components/Card"
import { useForm } from "react-hook-form"
import Modal from "../../components/Modal"
import { useEffect, useState } from "react"
import SubsanarPage from './SubsanarPage'
import NewObservacionPage from './NewObservacionPage'
import { useTesis } from "../../context/TesisContext"

function ObservacionesPage() {

  const { state } = useLocation()
  if (!state) return <Navigate to='/404' />

  const { id } = state
  const { register, handleSubmit } = useForm()
  const { getTesisById } = useTesis()

  const [detalles, setDetalles] = useState([])

  const [showSubsanar, setShowSubsanar] = useState(false)
  const [showObservacion, setShowObservacion] = useState(false)

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

        <div className="m-5">
          <span>No se puede cargar una observación ni actualizar el estado si el tesista no resuelve la observación</span>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-4 mb-5">
              <div className="md:col-auto">
                <button type="button" className="button-style w-full md:w-auto bg-red-500 hover:bg-red-400" onClick={() => setShowObservacion(true)} >Nueva Observación</button>
              </div>
              <div className="md:col-span-1">
                <select className="input-style py-2" {...register('estado')}>
                  <option value="EN PROCESO">EN PROCESO</option>
                  <option value="APROBADO">APROBADO</option>
                  <option value="RECHAZADO">RECHAZADO</option>
                </select>
              </div>
              <div className="md:col-span-1">
                <button type="submit" className="button-style w-full md:w-auto">Actualizar estado</button>
              </div>
            </div>
          </form>


          <div className="bg-blue-100 rounded-lg p-5 grid grid-cols-1 md:grid-cols-5 gap-4 my-5">
            <div className="md:col-span-4">
              OBSERVACION TEXT
            </div>
            <div className="md:col-span-1 flex justify-center">

              <button className="button-style bg-green-700 hover:bg-green-600"
                onClick={() => {
                  setShowSubsanar(true)
                  /* setIdObservation(obs?.cod_revision_comite) */
                }}>Subsanar</button>
              <span className='ml-2 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-500'>PENDIENTE</span>
              <span className='ml-2 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-500'>CORREGIDO</span>
            </div>
          </div>


        </div>
      </Card>

      <Modal className="max-w-md" isVisible={showObservacion} onClose={() => setShowObservacion(false)}>
        <NewObservacionPage onClose={() => setShowObservacion(false)} />
      </Modal>

      <Modal className="max-w-md" isVisible={showSubsanar} onClose={() => setShowSubsanar(false)}>
        <SubsanarPage onClose={() => setShowSubsanar(false)} />
      </Modal>
    </>

  )
}

export default ObservacionesPage