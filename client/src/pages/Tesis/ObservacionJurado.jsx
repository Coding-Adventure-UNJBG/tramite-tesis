import { useForm } from "react-hook-form"
import NewObservacionPage from "./NewObservacionPage"
import SubsanarPage from "./SubsanarPage"
import { useEffect, useState } from "react"
import { useTesis } from "../../context/TesisContext"
import { useAuth } from "../../context/AuthContext"
import Modal from "../../components/Modal"

function ObservacionAsesor({ idTesis, detalles, setDetalles }) {

  const { register, handleSubmit, setValue } = useForm()
  const { getObservationJurado, updateEstadoTesis } = useTesis()
  const { user } = useAuth()

  const [showObservacion, setShowObservacion] = useState(false)
  const [showSubsanar, setShowSubsanar] = useState(false)

  const [observation, setObservation] = useState([])
  const [idObservation, setIdObservation] = useState('')

  const onEstado = handleSubmit(async (values) => {
    const res = await updateEstadoTesis(idTesis, values.estado)
    if (res.status === 200) setDetalles({ ...detalles, estado: values.estado })
  })

  useEffect(() => {
    async function loadObservacionAsesor() {
      if (idTesis) {
        const res = await getObservationJurado(idTesis)
        setObservation(res)
      }
    }

    loadObservacionAsesor()
  }, [])

  return (
    <>

      <h2 className="title">Observaciones jurado</h2>
      {observation.length === 0 &&
        <span className="font-medium ml-5">Sin observaciones por el momento</span>}

      <div className="m-5">
        {user?.rol !== 'TESISTA' ? (

          observation[0]?.corregido === '' ?
            <span className="font-serif">No se puede cargar una observación ni actualizar el estado si el tesista no resuelve la observación</span>
            :
            (detalles?.estado === 'APROBADO ASESOR' ?

              <form onSubmit={onEstado}>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-4 mb-5">
                  <div className="md:col-auto">
                    <button type="button" className="button-style w-full md:w-auto bg-red-500 hover:bg-red-400" onClick={() => setShowObservacion(true)} >Nueva Observación</button>
                  </div>
                  <div className="md:col-span-1">
                    <select className="input-style py-2" {...register('estado')}>
                      <option value="APROBADO ASESOR">APROBADO ASESOR</option>
                      <option value="PARA SUSTENTACION">PARA SUSTENTACION</option>
                      <option value="APROBADO">APROBADO</option>
                      <option value="RECHAZADO">RECHAZADO</option>
                    </select>
                  </div>
                  <div className="md:col-span-1">
                    <button type="submit" className="button-style w-full md:w-auto">Actualizar estado</button>
                  </div>
                </div>
              </form>
              :
              <span>
                Tesis aprobada para sustenctación
              </span>
            )
        ) : null}

        {/* Listar observaciones */}
        {observation.map((obs, i) => (
          <div key={i} className="bg-blue-100 rounded-lg p-5 grid grid-cols-1 md:grid-cols-5 gap-4 my-5">
            <div className="md:col-span-4">
              {obs?.observacion}
            </div>
            <div className="md:col-span-1 flex justify-center">
              {
                obs?.corregido === '' ? (user?.rol === 'TESISTA' ?
                  <button className="button-style bg-green-700 hover:bg-green-600"
                    onClick={() => {
                      setShowSubsanar(true)
                      setIdObservation(obs?.cod_revision_jurado)
                    }}>Subsanar</button>
                  :
                  <span className='ml-2 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-500'>PENDIENTE</span>
                ) :
                  <span className='ml-2 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-500'>CORREGIDO</span>
              }
            </div>
          </div>
        ))}

      </div>

      <Modal className="max-w-md" isVisible={showObservacion} onClose={() => setShowObservacion(false)}>
        <NewObservacionPage idTesis={idTesis} tipo={2} onClose={() => setShowObservacion(false)} />
      </Modal>

      <Modal className="max-w-md" isVisible={showSubsanar} onClose={() => setShowSubsanar(false)}>
        <SubsanarPage id={idObservation} tipo={2} onClose={() => setShowSubsanar(false)} />
      </Modal>
    </>
  )
}

export default ObservacionAsesor