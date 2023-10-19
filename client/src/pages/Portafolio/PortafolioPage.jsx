import { BiSolidCloudUpload, BiSolidPencil } from 'react-icons/bi'
import { IoEyeSharp } from 'react-icons/io5'
import Card from '../../components/Card'
import { useEffect, useState } from 'react'
import Modal from '../../components/Modal'
import NewPortafolio from './NewPortafolio'
import { getPortafolioRequest } from '../../api/auth'

function PortafolioPage() {

  const [showModal, setShowModal] = useState(false)
  const [portafolio, setPortafolio] = useState([])

  useEffect(() => {
    async function loadPortafolio() {
      const res = await getPortafolioRequest()
      console.log("f", res)
      setPortafolio(res.data)
    }
    loadPortafolio()
  }, [])

  return (
    <>
      <Card>
        <h2 className="title">Mi portafolio</h2>
      </Card>

      <Card>
        <div className='p-5'>

          <button className="button-style" onClick={() => setShowModal(true)}>Agregar documento</button>

          <div className="mt-5 overflow-auto rounded-lg shadow">
            <table className="w-full">
              <thead className='bg-gray-50 border-b-2 border-gray-200'>
                <tr className='divide-x divide-gray-200 text-center'>
                  <th className='w-10 p-3 text-sm font-semibold tracking-wide'>N°</th>
                  <th className='p-3 text-sm font-semibold tracking-wide'>Tipo documento</th>
                  <th className='w-44 p-3 text-sm font-semibold tracking-wide'>Nombre Archivo</th>
                  <th className='w-24 p-3 text-sm font-semibold tracking-wide'>Opción</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {portafolio.length === 0 ?
                  <tr>
                    <td colSpan='4' className="text-center py-10 text-slate-500 uppercase">NO HAY REGISTROS DISPONIBLES</td>
                  </tr>
                  :
                  portafolio.map((port, i) => (

                    <tr key={i} className='divide-x divide-gray-200 text-center'>
                      <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{i + 1}</td>
                      <td className='p-2 text-sm text-gray-700 whitespace-nowrap text-left'>{port.tipo_doc}</td>
                      <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{port.nombreArchivo}</td>
                      <td className='p-2 text-sm text-gray-700 whitespace-nowrap flex gap-x-3 justify-center'>
                        {/* <button className='p-1.5 text-xs font-medium uppercase tracking-wider  bg-blue-500 rounded-lg bg-opacity-500'>
                      <BiSolidCloudUpload size={20} className='text-white' />
                    </button>
                    <button className='p-1.5 text-xs font-medium uppercase tracking-wider bg-red-500 rounded-lg bg-opacity-500'>
                      <BiSolidPencil size={20} className='text-white' />
                    </button> */}
                        <button className='p-1.5 text-xs font-medium uppercase tracking-wider bg-green-700 rounded-lg bg-opacity-500' onClick={() => {
                          window.open(`http://localhost:3000/files/${port.nombreArchivo}`, 'CryReport', 'width=700, height=600')
                        }}>
                          <IoEyeSharp size={20} className='text-white' />
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </Card >

      <Modal className="max-w-md" isVisible={showModal} onClose={() => setShowModal(false)}>
        <NewPortafolio onClose={() => setShowModal(false)} />
      </Modal>
    </>
  )
}

export default PortafolioPage