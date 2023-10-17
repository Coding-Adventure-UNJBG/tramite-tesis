import { useEffect, useState } from "react"
import Card from "../../components/Card"
import Modal from "../../components/Modal"
import SubsanarPage from "./SubsanarPage"
import NewObservacionPage from "./NewObservacionPage"
import { Navigate, useLocation } from "react-router-dom"
import { useTramite } from "../../context/TramiteContext"
import { useAuth } from '../../context/AuthContext'
import { useForm } from "react-hook-form"

function ObservacionesPage() {

  const { state } = useLocation()
  if (!state) return <Navigate to="/404" />

  const { id } = state

  const { register, handleSubmit, setValue } = useForm()
  const { getTramiteById, getObservationById, updateEstadoTramite } = useTramite()
  const { user } = useAuth()

  const [showModal, setShowModal] = useState(false)
  const [showModal1, setShowModal1] = useState(false)

  const [detalles, setDetalles] = useState([])
  const [observation, setObservation] = useState([])
  const [idObservation, setIdObservation] = useState('')

  const onEstado = handleSubmit(async (values) => {
    const res = await updateEstadoTramite(id, values.estado);
    if (res.status === 200) setDetalles({ ...detalles, estado: values.estado })
  })

  useEffect(() => {
    async function loadTramite() {
      if (id) {
        const res = await getTramiteById(id)
        setDetalles(res)
        const obser = await getObservationById(id)
        setObservation(obser)
        setValue('estado', res.estado)
      }
    }

    loadTramite()
  }, [])

  return (
    <>
      <Card>
        <h2 className="title">Detalles de solicitud</h2>
        <div className="mb-5 space-y-1.5">

          <h3 className="mx-5 font-medium text-base">Fecha Registro:
            <span className="font-normal ml-2">{detalles.fecha_registro}</span>
          </h3>
          <h3 className="mx-5 font-medium text-base">Asesor propuesto:
            <span className="font-normal ml-2 uppercase">{detalles.nombre_asesor}</span>
          </h3>
          <h3 className="mx-5 font-medium text-base">Estado de solicitud:
            <span className='ml-2 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-500'>{detalles.estado}</span>
          </h3>
        </div>
      </Card>

      <Card>
        <button className="button-style mx-5 mt-5 mb-2" onClick={() => {
          window.open(`http://localhost:3000/files/${detalles.fileName}`, 'CryReport', 'width=700, height=600')
        }}>
          Mostrar última versión (PDF)</button>
        <h2 className="title">Observaciones</h2>
        {observation.length === 0 &&
          <span className="font-medium ml-5">Sin observaciones por el momento</span>
        }

        <div className="m-5">

          {/* Solo muestra esta parte si el usuario no es tesista */}
          {user?.rol !== 'TESISTA' ?
            /* No se permite hacer nada hasta que el tesista resuelva la observacion */
            (observation[0]?.corregido === '' ?
              <span>No se puede cargar una observación ni actualizar el estado si el tesista no resuelve la observacion</span>
              : 
              /* Solo muestta si es estado esta aun en proceso */
              (detalles?.estado === 'EN PROCESO' ?
                <form onSubmit={onEstado}>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-4 mb-5">
                    <div className="md:col-auto">
                      <button type="button" className="button-style w-full md:w-auto bg-red-500 hover:bg-red-400" onClick={() => setShowModal1(true)}>Nueva Observación</button>
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
                : /* Si el estado cambia a APROBADO o RECHAZADO el tramite culminó */
                <span>El tramite ha concluido</span>
              )
            )
            : /* Si el usuario es tesista no hace muestra nada de esto */
            null
          }

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
                        setShowModal(true)
                        setIdObservation(obs?.cod_revision_comite)
                      }}>Subsanar</button>
                    :
                    <span className='ml-2 p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-500'>PENDIENTE</span>
                  ) : <span className='ml-2 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-500'>CORREGIDO</span>
                }
                {/* {obs?.corregido === '' ?
                  <button className="button-style bg-green-700 hover:bg-green-600"
                    onClick={() => {
                      setShowModal(true)
                      setIdObservation(obs?.cod_revision_comite)
                    }}>Subsanar</button>
                  :
                  <span className='ml-2 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-500'>CORREGIDO</span>
                } */}
              </div>
            </div>
          ))}

        </div>
      </Card>


      <Modal className="max-w-md" isVisible={showModal} onClose={() => setShowModal(false)}>
        <SubsanarPage id={idObservation} onClose={() => setShowModal(false)} />
      </Modal>

      <Modal className="max-w-md" isVisible={showModal1} onClose={() => { setShowModal1(false) }}>
        <NewObservacionPage idTramite={id} onClose={() => { setShowModal1(false) }} />
      </Modal >
    </>
  )
}

const Observacion = ({ data, setShowModal }) => {
  return (
    <div className="bg-blue-200 p-5 grid grid-cols-1 md:grid-cols-5 gap-4 my-5">
      <div className="md:col-span-4">
        {data?.observacion}
      </div>
      <div className="md:col-span-1 flex justify-center">
        <button className="button-style bg-green-700 hover:bg-green-600"
          onClick={() => setShowModal(true)}>Subsanar</button>
      </div>
    </div>

  )
}

export default ObservacionesPage