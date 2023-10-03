import React from 'react'
import Card from '../components/Card'

import { BiSolidCloudUpload, BiSolidPencil } from 'react-icons/bi'
import { IoEyeSharp } from 'react-icons/io5'

function PortafolioPage() {

  return (
    <>
      <Card>
        <h2 className="title">PortafolioPage</h2>
      </Card>
      <Card>
        <div className='p-5'>
          <h2>Aqui se subiran los archivos</h2>
          <h3>- Constancia de bachiller</h3>
          <h3>- Tesis</h3>
          <h3>- Evaluación de la tesis (aprobada por ej jurado)</h3>
          <h3>- Idioma extranjero nivel intermedio</h3>
          <h3 className='mb-5'>- Otras que me olvide</h3>

          <h2 className='my-3 font-bold text-xl'>Documentos de pago</h2>
          <div className="overflow-auto rounded-lg shadow">
            <table className="w-full">
              <thead className='bg-gray-50 border-b-2 border-gray-200'>
                <tr className='divide-x divide-gray-200 text-center'>
                  <th className='w-10 p-3 text-sm font-semibold tracking-wide'>N°</th>
                  <th className='w-36 p-3 text-sm font-semibold tracking-wide'>Fecha</th>
                  <th className='w-36 p-3 text-sm font-semibold tracking-wide'>Número</th>
                  <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Código</th>
                  <th className='w-36 p-3 text-sm font-semibold tracking-wide'>Importe</th>
                  <th className='w-36 p-3 text-sm font-semibold tracking-wide'>Archivo</th>
                  <th className='w-36 p-3 text-sm font-semibold tracking-wide'>Estado</th>
                  <th className='w-16 p-3 text-sm font-semibold tracking-wide'>Opción</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                <tr className='divide-x divide-gray-200 text-center'>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>1</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>21/02/2003</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>123456  </td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>42</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>S/. 700.00</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>COD_42_TESIS.png</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>
                    <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-500'>PENDIENTE</span>
                  </td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap flex gap-x-3 justify-center'>
                    <button className='p-1.5 text-xs font-medium uppercase tracking-wider  bg-blue-500 rounded-lg bg-opacity-500'>
                      <BiSolidCloudUpload size={20} className='text-white' />
                    </button>
                    <button className='p-1.5 text-xs font-medium uppercase tracking-wider bg-red-500 rounded-lg bg-opacity-500'>
                      <BiSolidPencil size={20} className='text-white' />
                    </button>
                    <button className='p-1.5 text-xs font-medium uppercase tracking-wider bg-green-700 rounded-lg bg-opacity-500'>
                      <IoEyeSharp size={20} className='text-white' />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </>
  )
}

export default PortafolioPage