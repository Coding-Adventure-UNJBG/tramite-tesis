import Card from "../../components/Card"
import { useForm } from 'react-hook-form'
import { useTramite } from "../../context/TramiteContext"
import { useEffect, useState } from "react"

function NewSolicitudPage({ onClose }) {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { saveSolicitdud, getProfesores } = useTramite()
  const [profesores, setProfesores] = useState([])

  const onSubmit = handleSubmit(async values => {
    console.log(values)
    const res = await saveSolicitdud(values)
    if (res.data) window.location.reload()
  })

  useEffect(() => {
    async function loadProfe() {
      const res = await getProfesores()
      // console.log(res)
      setProfesores(res)
    }
    loadProfe()
  }, [])


  return (
    <>
      <div>
        <h2 className="title border-b border-gray-900/40 pb-5">Nueva Solicitud</h2>

        <form className="m-5" onSubmit={onSubmit}>
          <span className="font-medium font-mono text-base">Un mensaje indicando que debe contener el archivo</span>
          <div className="py-2">
            {errors.file && (
              <p className=" text-red-500 font-medium text-sm p-1.5">{errors.file.message}</p>
            )}
            <input type="file" className="input-style" {...register('file', { required: "El archivo es requerido" })} />
            <p className="mt-0.5 ml-2 text-sm text-gray-500">Archvio en formato PDF (MAX. 10MB).</p>
          </div>

          <span className="font-medium font-mono text-base">Propuesta de asesor</span>
          <div className="py-2">
            <select className="input-style py-2" {...register('asesor')}>
              {profesores.map((profesor, i) => (
                <option key={i} value={profesor.cod_usuario}>{profesor.nombre}</option>
              ))}
            </select>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => onClose()}>Cancelar</button>
            <button type="submit" className="button-style">Guardar</button>
          </div>
        </form>
      </div>


      {/* <Card>
        <h2 className="title">Nueva solicitud</h2>
      </Card> */}

      <Card>
        {/* Este formulario recopilará: titulo, descripcion, propuesta asesor */}
        {/* <form className="m-5 md:mx-10 md:my-5 max-w-5xl" onSubmit={onSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/40 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-6">
                <span className="col-span-full font-semibold font-mono text-lg">Datos de la tesis</span>
                <div className="col-span-full">
                  <label htmlFor="title" className="label-style">Titulo</label>
                  <input type="text" className="input-style" {...register('titulo_tesis', { required: 'Titulo requerido' })} />
                  {errors.titulo_tesis &&
                    <p className='text-red-600 font-medium text-sm px-1'>{errors.titulo_tesis.message}</p>
                  }
                </div>
                <div className="col-span-full">
                  <label htmlFor="descripcion" className="label-style">Descripción</label>
                  <textarea type="text" className="input-style" {...register('descripcion_tesis', { required: 'Descripcion requerido' })} />
                  {errors.descripcion_tesis &&
                    <p className='text-red-600 font-medium text-sm px-1'>{errors.descripcion_tesis.message}</p>
                  }
                </div>
                <span className="col-span-full font-semibold font-mono text-lg">Propuesta de asesor</span>
                <div className="col-span-full">
                  <label htmlFor="asesor" className="label-style">Elija un asesor</label>
                  <select className="input-style">
                    <option value="A">Docente A</option>
                    <option value="B">Docente B</option>
                    <option value="C">Docente C</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
            <button type="submit" className="button-style">Guardar</button>
          </div>
        </form> */}
      </Card>
    </>
  )
}

export default NewSolicitudPage