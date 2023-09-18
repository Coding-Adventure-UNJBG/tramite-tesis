import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, isAuthentificated, errors: loginErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(data => {
    console.log(data)
    signin(data)
  })

  //Verificar si ya esta logeado
  useEffect(() => {
    if (isAuthentificated) navigate("/")
  }, [isAuthentificated])

  return (
    <div className="relative w-full h-screen bg-zinc-700/100">
      <img className="absolute w-full h-full object-cover mix-blend-overlay" src="/fondo.jpg" alt="" />
      <div className="flex justify-center items-center h-full">
        <form
          className="max-w-sm w-full mx-auto bg-white px-8 pb-8"
          onSubmit={onSubmit}
        >
          <div className="flex justify-center items-center pt-2">
            <img className="relative py-4 h-[100px]" src="/logo.png" alt="Logo-fain" />
          </div>
          
          {loginErrors.map((error, i) => (
            <div key={i} className='bg-red-500 p-2 mb-2 text-center text-white'>
              {error}
            </div>
          ))}

          <div className="flex flex-col mb-4">
            <label>Usuario</label>
            <input className="border relative bg-gray-100 p-2" type="text" {
              ...register("user", { required: true })
            } />
            {errors.user && (
              <p className='flex items-center text-sm text-red-500'>Usuario requerido</p>
            )}
          </div>
          <div className="flex flex-col mb-4">
            <label>Contraseña</label>
            <input className="border relative bg-gray-100 p-2" type="password" {
              ...register("password", { required: true })
            } />
            {errors.password && (
              <p className='flex items-center text-sm text-red-500'>Contraseña requerida</p>
            )}
          </div>
          <button type='submit' className="w-full py-3 mt-4 bg-[#AC1734] hover:bg-[#DD3045] relative text-white font-semibold">Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage