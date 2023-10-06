import { useForm } from "react-hook-form"
import Card from "../../components/Card"
import { useAuth } from "../../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

function UserFormPage() {

  const navigate = useNavigate()
  const params = useParams()

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm()
  const password = watch('password', '')

  const { signup, errors: errorRegister, getUser, updateUser } = useAuth()

  const onSubmit = handleSubmit(async (values) => {
    try {
      if (params.id) { //update
        const res = await updateUser(params.id, values)
        if (res?.data) navigate('/usuario')
      } else { //create
        const res = await signup(values)
        if (res?.data.message) navigate('/usuario')
      }

    } catch (error) {
      console.log(error)
    }
  })

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const res = await getUser(params.id)
        setValue('dni', res.dni)
        setValue('nombre', res.nombre)
        setValue('apellidos', res.apellidos)
        setValue('correo', res.correo)
        setValue('celular', res.telefono)
        setValue('fecha_nacimiento', res.fecha_nacimiento)
        setValue('direccion', res.direccion)
      }
    }
    loadUser()
  }, [])

  return (
    <>
      <Card>
        <h2 className='title'>Registro de usuario</h2>
      </Card>

      <Card>
        <form className='m-5 md:mx-10 md:my-5 max-w-5xl' onSubmit={onSubmit}>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-y-6 md:grid-cols-6'>
                {errorRegister.map((error, i) => (
                  <p key={i} className='text-red-600 font-medium text-sm px-1 md:col-span-full'>{error}</p>
                ))}
                <div className='md:col-span-2'>
                  <label htmlFor="dni" className='label-style'>DNI</label>
                  <input type="number" className='input-style' {...register("dni", { required: true, minLength: 8, maxLength: 8 })} />
                  {errors.dni && (
                    <p className='text-red-600 font-medium text-sm px-1'>DNI requerido</p>
                  )}
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="nombre" className='label-style'>Nombres</label>
                  <input type="text" className='input-style' {...register("nombre", { required: true })} />
                  {errors.nombre && (
                    <p className='text-red-600 font-medium text-sm px-1'>Nombres requerido</p>
                  )}
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="apellidos" className='label-style'>Apellidos</label>
                  <input type="text" className='input-style' {...register("apellidos", { required: true })} />
                  {errors.apellidos && (
                    <p className='text-red-600 font-medium text-sm px-1'>Apellidos requerido</p>
                  )}
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="correo" className='label-style'>Correo</label>
                  <input type="email" className='input-style' {...register("correo", { required: true })} />
                  {errors.correo && (
                    <p className='text-red-600 font-medium text-sm px-1'>Correo requerido</p>
                  )}
                </div>

                <div className='md:col-span-2'>
                  <label htmlFor="celular" className='label-style'>Celular</label>
                  <input type="number" className='input-style' {...register("celular", { required: true, minLength: 9, maxLength: 9 })} />
                  {errors.celular && (
                    <p className='text-red-600 font-medium text-sm px-1'>Celular requerido</p>
                  )}
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="fecha_nacimiento" className='label-style'>Fecha Nacimiento</label>
                  <input type="date" className='input-style' {...register("fecha_nacimiento", { required: true })} />
                  {errors.fecha_nacimiento && (
                    <p className='text-red-600 font-medium text-sm px-1'>Fecha de nacimiento requerido</p>
                  )}
                </div>
                <div className='md:col-span-4'>
                  <label htmlFor="direccion" className='label-style'>Dirección</label>
                  <input type="text" className='input-style' {...register("direccion", { required: true })} />
                  {errors.direccion && (
                    <p className='text-red-600 font-medium text-sm px-1'>Dirección requerido</p>
                  )}
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="rol" className='label-style'>Tipo usuario</label>
                  <select className='input-style'>
                    <option>BACHILLER</option>
                    <option>PROFESOR</option>
                    <option>SECRETARIA</option>
                    <option>DIRECTOR</option>
                  </select>
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="password" className='label-style'>Contraseña</label>
                  <input type="password" autoComplete="password" className='input-style' {...register("password", { required: true })} />
                  {errors.password && (
                    <p className='text-red-600 font-medium text-sm px-1'>Contraseña requerido</p>
                  )}
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="confirmPassword" className='label-style'>Repetir Contraseña</label>
                  <input type="password" autoComplete="password" className='input-style' {...register("confirmPassword", { required: "Contraseña requerida", validate: (value) => value === password || "Contraseña no coincide" })} />
                  {errors.confirmPassword && (
                    <p className='text-red-600 font-medium text-sm px-1'>{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => navigate('/usuario')}>
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </Card>
    </>
  )
}

export default UserFormPage