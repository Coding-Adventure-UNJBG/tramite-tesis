import { useState } from "react"
import Card from "../../components/Card"
import Modal from "../../components/Modal"
import SubsanarPage from "./SubsanarPage"
import NewObservacionPage from "./NewObservacionPage"



function ObservacionesPage() {

  const [showModal, setShowModal] = useState(false)
  const [showModal1, setShowModal1] = useState(false)

  return (
    <>
      <Card>
        <h2 className="title">Detalles de solicitud</h2>
        <div className="mb-5 space-y-1.5">

          <h3 className="mx-5 font-medium text-base">Fecha Registro:
            <span className="font-normal ml-2">14/10/2023</span>
          </h3>
          <h3 className="mx-5 font-medium text-base">Asesor propuesto:
            <span className="font-normal ml-2">Oscar Alejandro Chpque Surco</span>
          </h3>
          <h3 className="mx-5 font-medium text-base">Estado de solicitud:
            <span className='ml-2 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-500'>EN PROCESO</span>
          </h3>
        </div>
      </Card>

      <Card>
        <button className="button-style mx-5 mt-5 mb-2">Mostrar última versión (PDF)</button>
        <h2 className="title">Observaciones</h2>

        <div className="m-5">

          {/* Vista de profesor (comite) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-4 mb-5">
            <div className="md:col-auto">
              <button className="button-style w-full md:w-auto bg-red-500 hover:bg-red-400" onClick={() => setShowModal1(true)}>Nueva Observación</button>
            </div>
            <div className="md:col-span-1">
              <select className="input-style py-2">
                <option value="">EN PROCESO</option>
                <option value="">ACEPTADO</option>
                <option value="">RECHAZADO</option>
              </select>
            </div>
            <div className="md:col-span-1">
              <button className="button-style w-full md:w-auto">Actualizar estado</button>
            </div>
          </div>
          {/* Vista de profesor (comite) */}

          <Observacion setShowModal={setShowModal} />
          <Observacion setShowModal={setShowModal} />
          <Observacion setShowModal={setShowModal} />
          <Observacion setShowModal={setShowModal} />
          <Observacion setShowModal={setShowModal} />
          <Observacion setShowModal={setShowModal} />

        </div>
      </Card>

      <Modal className="max-w-md" isVisible={showModal} onClose={() => setShowModal(false)}>
        <SubsanarPage />
      </Modal>

      <Modal className="max-w-md" isVisible={showModal1} onClose={() => { setShowModal1(false) }}>
        <NewObservacionPage />
      </Modal >
    </>
  )
}

const Observacion = ({ Observacion, setShowModal }) => {
  return (
    <div className="bg-blue-200 p-5 grid grid-cols-1 md:grid-cols-5 gap-4 my-5">
      <div className="md:col-span-4">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus, odit dicta modi obcaecati aliquid exercitationem architecto dolorum, quis, facilis quo odio consequuntur officiis tempore laborum sit ab impedit quasi doloribus.
      </div>
      <div className="md:col-span-1 flex justify-center">
        <button className="button-style bg-green-700 hover:bg-green-600"
          onClick={() => setShowModal(true)}>Subsanar</button>
      </div>
    </div>
  )
}

export default ObservacionesPage