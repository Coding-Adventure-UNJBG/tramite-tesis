import { useForm } from "react-hook-form"
import Card from "../../components/Card"
import { useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"

function ViewUserPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { register, setValue } = useForm()
  const { getUser } = useAuth()

  useEffect(() => {
    async function loadUser() {
      const res = await getUser(id)
      setValue('dni', res.dni)
      setValue('nombre', res.nombre)
      setValue('apellidos', res.apellidos)
      setValue('correo', res.correo)
      setValue('celular', res.telefono)
      setValue('fecha_nacimiento', res.fecha_nacimiento)
      setValue('direccion', res.direccion)
    }

    loadUser()
  }, [])

  return (
    <>
      <Card>
        <h2 className='title'>Vista de usuario</h2>
      </Card>

      <Card>
        <div className='m-5 md:mx-10 md:my-5 max-w-5xl'>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-y-6 md:grid-cols-6'>
                {/* {errorRegister.map((error, i) => (
                  <p key={i} className='text-red-600 font-medium text-sm px-1 md:col-span-full'>{error}</p>
                ))} */}
                <div className='md:col-span-2'>
                  <label htmlFor="dni" className='label-style'>DNI</label>
                  <input disabled type="number" className='input-style' {...register("dni", { required: true, minLength: 8, maxLength: 8 })} />
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="nombre" className='label-style'>Nombres</label>
                  <input disabled type="text" className='input-style' {...register("nombre", { required: true })} />
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="apellidos" className='label-style'>Apellidos</label>
                  <input disabled type="text" className='input-style' {...register("apellidos", { required: true })} />
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="correo" className='label-style'>Correo</label>
                  <input disabled type="email" className='input-style' {...register("correo", { required: true })} />
                </div>

                <div className='md:col-span-2'>
                  <label htmlFor="celular" className='label-style'>Celular</label>
                  <input disabled type="number" className='input-style' {...register("celular", { required: true, minLength: 9, maxLength: 9 })} />
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="fecha_nacimiento" className='label-style'>Fecha Nacimiento</label>
                  <input disabled type="date" className='input-style' {...register("fecha_nacimiento", { required: true })} />
                </div>
                <div className='md:col-span-4'>
                  <label htmlFor="direccion" className='label-style'>Dirección</label>
                  <input disabled type="text" className='input-style' {...register("direccion", { required: true })} />
                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="rol" className='label-style'>Tipo usuario</label>
                  <select disabled className='input-style'>
                    <option>BACHILLER</option>
                    <option>PROFESOR</option>
                    <option>SECRETARIA</option>
                    <option>DIRECTOR</option>
                  </select>
                </div>
                {/* <div className='md:col-span-2'>
                  <label htmlFor="password" className='label-style'>Contraseña</label>
                  <input type="password" className='input-style' {...register("password", { required: true })} />

                </div>
                <div className='md:col-span-2'>
                  <label htmlFor="confirmPassword" className='label-style'>Repetir Contraseña</label>
                  <input type="password" className='input-style' {...register("confirmPassword", { required: "Contraseña requerida", validate: (value) => value === password || "Contraseña no coincide" })} />
                </div> */}
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => navigate('/usuario')}
            >
              Regresar
            </button>
          </div>
        </div>
      </Card>
    </>
  )
}

export default ViewUserPage