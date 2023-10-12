import Card from "../../components/Card"
import { FaShareFromSquare, FaShare } from 'react-icons/fa6'

function SolicitudPage() {

  const options = [
    { name: 'N°', style: 'w-10' },
    { name: 'Fecha registro', style: 'w-36' },
    { name: 'Estado', style: 'w-36' },
    { name: 'Opción', style: 'w-14' },

  ]

  return (
    <>
      <Card>
        <h2 className="title">Lista de solicitudes</h2>
      </Card>
      <Card>
        {/* Aqui  una tabla con las solicitudes (del tesista) para ver opciones como titulo de tesis, estado de solicitud, otros
         La tabla tendrá una opción para ir hacia una nueva venta en la que se podran ver las observaciones del comite */}

        <div className="m-5">
          <button className="button-style mb-5">Nueva Solicitud</button>

          <div className="overflow-auto rounded-lg shadow max-w-3xl">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr className="divide-x divide-gray-200 text-center">
                  {options.map((option, i) => (
                    <th key={i} className={` ${option?.style} p-3 text-sm font-bold tracking-wide`} > {option.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td colSpan='6' className="text-center py-10 text-slate-500 uppercase">NO HAY REGISTROS DISPONIBLES</td>
                </tr>
                <tr className="divide-x divide-gray-200 text-center">
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>1</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>11/10/2023</td>
                  <td className='p-2 text-sm text-gray-700 whitespace-nowrap'>
                    <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-500'>PENDIENTE</span>
                  </td>
                  <td className="p-2 text-sm text-gray-700 whitespace-nowrap flex gap-x-3 justify-center">
                    <button className="p-1.5 text-xs font-medium uppercase tracking-wider bg-green-700 rounded-lg bg-opacity-500" >
                      <FaShare size={20} className="text-white" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card >
    </>
  )
}

export default SolicitudPage