import { useForm } from "react-hook-form"



function SubsanarPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = handleSubmit(values => {
    console.log(values)
  })

  return (
    <div>
      <h2 className="title border-b border-gray-900/40 pb-5">Subsanar observacion</h2>

      <form className="m-5" onSubmit={onSubmit}>
        <span className="font-medium font-mono text-base">Un mensaje indicando que debe contener el archivo</span>
        <div className="py-2">
          {errors.file && (
            <p className=" text-red-500 font-medium text-sm p-1.5">{errors.file.message}</p>
          )}
          <input type="file" className="input-style" {...register('file', { required: "El archivo es requerido" })} />
          <p className="mt-0.5 ml-2 text-sm text-gray-500">Archvio en formato PDF (MAX. 10MB).</p>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
          <button type="submit" className="button-style">Guardar</button>
        </div>
      </form>
    </div>
  )
}

export default SubsanarPage