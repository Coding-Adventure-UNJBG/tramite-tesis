import { IoEyeSharp } from "react-icons/io5"
import Card from "../../components/Card"
import { BiSolidCloudUpload, BiSolidPencil, BiTrash } from "react-icons/bi"
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



function UsersPage() {
  const navigate = useNavigate()
  const { getUsers, users, deleteUser } = useAuth()

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <Card>
        <h2 className="title">Lista de usuarios</h2>
      </Card>

      <Card>
        <div className="m-5">
          <button className="button-style mb-5" onClick={() => navigate('new')}>Nuevo Usuario</button>
          <div className="overflow-auto rounded-lg shadow">
            <table className="w-full">
              <thead className='bg-gray-50 border-b-2 border-gray-200'>
                <tr className='divide-x divide-gray-200 text-center'>
                  <th className='w-10 p-3 text-sm font-semibold tracking-wide'>N°</th>
                  <th className='w-36 p-3 text-sm font-semibold tracking-wide'>Nombres</th>
                  <th className='w-36 p-3 text-sm font-semibold tracking-wide'>Apellidos</th>
                  <th className='w-24 p-3 text-sm font-semibold tracking-wide'>DNI</th>
                  <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Celular</th>
                  <th className='w-16 p-3 text-sm font-semibold tracking-wide'>Opción</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {!users ? (
                  <tr>
                    <td colSpan='6' className="text-center py-10 text-slate-500 uppercase">NO HAY REGISTROS DISPONIBLES</td>
                  </tr>
                ) : (users.map((user, i) => (
                  <tr key={i} className='divide-x divide-gray-200 text-center'>
                    <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{i + 1}</td>
                    <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{user.nombre}</td>
                    <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{user.apellidos}</td>
                    <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{user.dni}</td>
                    <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{user.telefono}
                    </td>
                    <td className='p-2 text-sm text-gray-700 whitespace-nowrap flex gap-x-3 justify-center'>
                      <button className='p-1.5 text-xs font-medium uppercase tracking-wider bg-green-700 rounded-lg bg-opacity-500'
                        onClick={() => navigate(`view/${user.cod_usuario}`)}>
                        <IoEyeSharp size={15} className='text-white' />
                      </button>
                      <button className='p-1.5 text-xs font-medium uppercase tracking-wider  bg-blue-500 rounded-lg bg-opacity-500'
                        onClick={() => navigate(`edit/${user.cod_usuario}`)}>
                        <BiSolidPencil size={15} className='text-white' />
                      </button>
                      <button className='p-1.5 text-xs font-medium uppercase tracking-wider bg-red-500 rounded-lg bg-opacity-500'
                        onClick={() => deleteUser(user.cod_usuario)}>
                        <BiTrash size={15} className='text-white' />
                      </button>
                    </td>
                  </tr>
                ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </>
  )
}

export default UsersPage