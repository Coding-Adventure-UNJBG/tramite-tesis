import React from 'react'
import { useForm } from 'react-hook-form'
import { useTesis } from '../../context/TesisContext'


/* Tipo:
  1 -> observacion de asesor
  2 -> observacion de jurado 
*/
function NewObservacionPage({ idTesis, onClose, tipo }) {

  const { saveObservacionAsesor, saveObservacionJurado } = useTesis()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit(async values => {

    if (tipo === 1) { //asesor
      const res = await saveObservacionAsesor(values, idTesis)
      if (res.status === 200) window.location.reload()
    }

    if (tipo == 2) { //jurado
      console.log("observacion jurado", values)
      const res = await saveObservacionJurado(values, idTesis)
      if (res.status === 200) window.location.reload()
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