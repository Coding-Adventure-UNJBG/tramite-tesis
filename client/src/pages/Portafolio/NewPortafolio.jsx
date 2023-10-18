import { useForm } from "react-hook-form"
import { saveDocumentRequest, uploadRequest } from "../../api/auth"

function NewPortafolio({ onClose }) {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit(async values => {
    try {
      const formData = new FormData()
      formData.append('file', values.file[0])
      const upload = await uploadRequest(formData)

      if (upload.status === 200) {
        const res = await saveDocumentRequest({ tipo_doc: values.tipo_doc, file: upload.data.filename })
        if (res.status === 200) window.location.reload()
      }

    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div>
      <h2 className="title border-b border-gray-900/40 pb-5">Nuevo documento</h2>

      <form className="m-5" onSubmit={onSubmit}>
        {/* <span className="font-medium font-mono text-base">Ten en cuenta, que si ya existe un archivo</span> */}
        <div className="py-2">
          <label htmlFor="" className="label-style">Elija el tipo de documento</label>
          <select className="input-style py-2.5" {...register('tipo_doc', { min: 1 })} >
            <option value={0}>SELECCIONE UNA OPCIÓN</option>
            <option value={2}>RECIBO POR DERECHO DE TITULACIÓN</option>
            <option value={3}>COPIA DEL GRADO ACADÉMICO DE BACHILLER</option>
            <option value={4}>RECIBO DEL PAGO POR CONCEPTO DE PUBLICACIÓN EN EL REPOSITORIO INSTITUCIONAL</option>
            <option value={6}>CONSTANCIA DE NO ADEUDO DE BIENES A LA UNJBG</option>
            <option value={7}>FOTOGRAFÍA TAMAÑO PASAPORTE</option>
          </select>
          {errors.tipo_doc && (
            <p className=" text-red-500 font-medium text-sm p-1.5">El tipo de documento es requerido</p>
          )}
        </div>
        <div className="py-2">
          <label htmlFor="" className="label-style">Elejir archivo</label>
          <input type="file" className="input-style" {...register('file', { required: "El archivo es requerido" })} />
          {/* <p className="mt-0.5 ml-2 text-sm text-gray-500">Archvio en formato PDF (MAX. 10MB).</p> */}
          {errors.file && (
            <p className=" text-red-500 font-medium text-sm p-1.5">{errors.file.message}</p>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => onClose()}>Cancelar</button>
          <button type="submit" className="button-style">Guardar</button>
        </div>
      </form>
    </div>
  )
}

export default NewPortafolio