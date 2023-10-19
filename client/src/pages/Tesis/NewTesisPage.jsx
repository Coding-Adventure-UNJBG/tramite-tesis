import { useForm } from "react-hook-form"
import { useTesis } from "../../context/TesisContext"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { verifyTesisRequest } from "../../api/tesis"

function NewTesisPage({ idTramite, onClose }) {

  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { saveTesis } = useTesis()

  const onSubmit = handleSubmit(async values => {
    const res = await saveTesis(values, idTramite)
    if (res.status === 200) navigate('/tesis')
  })

  useEffect(() => {
    async function verificar() {
      const res = await verifyTesisRequest(idTramite)
      if (res.data.response === 1) navigate('/tesis')
    }
    verificar()
  }, [])

  return (
    <>
      <div>
        <h2 className="title border-b border-gray-900/40 pb-5">Comenzar tesis</h2>

        <form className="m-5" onSubmit={onSubmit}>
          <span className="font-medium font-mono text-base">Por favor, ingresa datos precisos. No se podrán hacer modificaciones</span>

          <div className="py-2">
            <label className="label-style">Titulo de tesis</label>
            <textarea type="text" className="input-style" {...register('titulo', { required: 'Titulo es requerido' })} />
            {errors.titulo && (
              <p className=" text-red-500 font-medium text-sm p-1.5">{errors.titulo.message}</p>
            )}
          </div>

          <div className="py-2">
            {errors.file && (
              <p className=" text-red-500 font-medium text-sm p-1.5">{errors.file.message}</p>
            )}
            <label className="label-style">Version Inicial (Puede ser la última versión de la solicitud)</label>
            <input type="file" className="input-style" {...register('file', { required: "El archivo es requerido" })} />
            <p className="mt-0.5 ml-2 text-sm text-gray-500">Archvio en formato PDF (MAX. 10MB).</p>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => onClose()}>Cancelar</button>
            <button type="submit" className="button-style">Guardar</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default NewTesisPage