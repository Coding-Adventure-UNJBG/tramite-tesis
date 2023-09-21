import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function HomePage() {

  const { user, logout, isAuthentificated } = useAuth()
  const navigate = useNavigate()


  return (
    <div>
      <h1 className='font-bold text-3xl'>HomePage</h1>
      {/* {isAuthentificated ? (<>
        <h2 className="font-semibold text-2xl">Bienvenido, {user ? user.nombre : ''} </h2>
        <button
          className="bg-red-500 text-xl px-2 py-2 rounded-sm my-5 mx-10 hover:bg-red-400 font-bold text-white"
          onClick={logout}
        >Cerrar sesión</button>
      </>) : (
        <button
          className="bg-red-500 text-xl px-2 py-2 rounded-sm my-5 mx-10 hover:bg-red-400 font-bold text-white"
          onClick={() => navigate("/login")}
        >Iniciar sesión</button>
      )} */}
    </div>
  )
}

export default HomePage