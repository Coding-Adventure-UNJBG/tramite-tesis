import { useForm } from "react-hook-form"
import { useTramite } from "../../context/TramiteContext"

function NewObservacionPage({ idTramite, onClose }) {


  const { newObservacion } = useTramite()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = handleSubmit(async values => {
    console.log(values)
    const res = await newObservacion(values, idTramite)
    if (res.status === 200) {
      window.location.reload()
    }
  })


  return (
    <div>
      <h2 className="title border-b border-gray-900/40 pb-5">Agregar Observación</h2>

      <form className="m-5" onSubmit={onSubmit}>
        <div className="py-2">
          <label htmlFor="observacion" className="label-style">Escriba las observaciones</label>
          {errors.observacion && (
            <p className=" text-red-500 font-medium text-sm p-1.5">{errors.observacion.message}</p>
          )}
          <textarea className="input-style" {...register('observacion', { required: "Observación es requerida" })}></textarea>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => onClose()}>Cancelar</button>
          <button type="submit" className="button-style">Guardar</button>
        </div>
      </form>
    </div>
  )
}

export default NewObservacionPage