import React from 'react'

function LoginPage() {
  return (
    <div className="relative w-full h-screen bg-zinc-700/100">
      <img className="absolute w-full h-full object-cover mix-blend-overlay" src="/fondo.jpg" alt="" />
      <div className="flex justify-center items-center h-full">
        <form className="max-w-sm w-full mx-auto bg-white px-8 pb-8">
          <div className="flex justify-center items-center pt-2">
            <img className="relative py-4 h-[100px]" src="/logo.png" alt="Logo-fain" />
          </div>
          <div className="flex flex-col mb-4">
            <label for="">Usuario</label>
            <input className="border relative bg-gray-100 p-2" type="text" />
          </div>
          <div className="flex flex-col mb-4">
            <label for="">Contraseña</label>
            <input className="border relative bg-gray-100 p-2" type="password" />
          </div>
          <button className="w-full py-3 mt-4 bg-[#AC1734] hover:bg-[#DD3045] relative text-white font-semibold">Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage