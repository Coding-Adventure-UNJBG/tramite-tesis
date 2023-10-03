import React from 'react'
import Card from '../../components/Card'
import { Outlet, useNavigate } from 'react-router-dom'

function TramitePage() {

  const navigate = useNavigate()

  return (
    <>
      <Outlet />
      <Card>
        <h2 className="mx-5 my-3 font-bold text-2xl">TramitePage</h2>
      </Card>
      <Card>
        <div className='m-5'>
          <button
            onClick={() => navigate('new')}
            className="button-style"
          >Nueva Solicitud</button>
          <Outlet />
          <h2 className='m-5'>Aqui se muestra la lista de tramites pendientes</h2>
        </div>
      </Card>
    </>
  )
}

export default TramitePage