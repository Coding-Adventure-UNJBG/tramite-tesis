import { useForm } from "react-hook-form"
import { useTesis } from "../../context/TesisContext"

function SubsanarPage({ id, onClose, tipo }) {

  const { subsanarObservacionAsesor } = useTesis()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit(async values => {
    if (tipo === 1) {
      console.log(values)
      const res = await subsanarObservacionAsesor(values, id)
      if (res.status === 200) window.location.reload()
    }

    if (tipo === 2) {
      console.log(values)
    }
  })

  return (
    <div>
      <h2 className="title border-b border-gray-900/40 pb-5">Subsanar observacion</h2>
      <form className="m-5" onSubmit={onSubmit}>
        <span className="font-medium font-mono text-base">Suba la nueva versión actualizada</span>
        <div className="py-2">
          {errors.file && (
            <p className=" text-red-500 font-medium text-sm p-1.5">{errors.file.message}</p>
          )}
          <input type="file" className="input-style" {...register('file', { required: "El archivo es requerido" })} />
          <p className="mt-0.5 ml-2 text-sm text-gray-500">Archvio en formato PDF (MAX. 10MB).</p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => onClose()}>Cancelar</button>
          <button type="submit" className="button-style">Guardar</button>
        </div>
      </form>
    </div>
  )
}

export default SubsanarPage