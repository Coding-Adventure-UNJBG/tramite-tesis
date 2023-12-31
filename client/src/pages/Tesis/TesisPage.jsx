import { useEffect } from 'react'
import Card from '../../components/Card'
import { useTesis } from '../../context/TesisContext'
import { FaShare } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function TesisPage() {

  const navigate = useNavigate()
  const { tesis, getTesis } = useTesis()

  const options = [
    { name: 'N°', style: "w-10" },
    { name: 'DNI tesista', style: "w-36" },
    { name: 'Titulo', style: "w-36" },
    { name: 'Fecha Inicio', style: "w-36" },
    { name: 'Estado', style: "w-36" },
    { name: 'Opción', style: "w-14" },
  ]

  useEffect(() => {
    getTesis()
  }, [])

  return (
    <>
      <Card>
        <h2 className="mx-5 my-3 font-bold text-2xl">Lista de tesis</h2>
      </Card>
      <Card>
        <div className='m-5'>

          <span className='font-serif'>Para comenzar con tu tesis, debes de iniciar una solicitud. Una vez aprobado, tendrás acceso a los detalles de tu tesis.</span>
          <div className="mt-5 overflow-auto rounded-lg shadow max-w-3xl">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr className="divide-x divide-gray-200 text-center">
                  {options.map((option, i) => (
                    <th key={i} className={` ${option?.style} p-3 text-sm font-bold tracking-wide`} > {option.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tesis.length === 0 ? //if
                  <tr>
                    <td colSpan='6' className="text-center py-10 text-slate-500 uppercase">NO HAY REGISTROS DISPONIBLES</td>
                  </tr>
                  : //else
                  tesis.map((mytesis, i) => (
                    <tr key={i} className="divide-x divide-gray-200 text-center">
                      <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{i + 1}</td>
                      <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{mytesis.dni}</td>
                      <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{mytesis.titulo}</td>
                      <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>{mytesis.fecha}</td>
                      <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>
                        <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-500'>{mytesis.estado}</span>
                      </td>
                      <td className="p-2 text-sm text-gray-700 whitespace-nowrap flex gap-x-3 justify-center">
                        <button
                          className="p-1.5 text-xs font-medium uppercase tracking-wider bg-green-700 rounded-lg bg-opacity-500"
                          onClick={() => navigate('view', { state: { id: mytesis.cod_tesis } })}
                        >
                          <FaShare size={20} className="text-white" />
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
    </>
  )
}

export default TesisPage