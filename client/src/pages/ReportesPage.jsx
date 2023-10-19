import { useState } from "react"
import Card from "../components/Card"
import exportFromJSON from 'export-from-json'
import {getUsuarioRequest, getBachilleresRequest, getComitesRequest} from '../api/reports'

function ReportesPage() {

  const [selectOption, setSelectOption] = useState('')

  const onSubmitUsers = async () => {
    try {
      const res = await getUsuarioRequest()
      console.log(res)
      const data = res.data
      console.log(data)
      const fileName = 'Reporte Usuarios'
      const exportType = exportFromJSON.types.xls
  
      exportFromJSON({ data, fileName, exportType })
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmitBachilleres = async () => {
    try {
      const res = await getBachilleresRequest()
      console.log(res)
      const data = res.data
      console.log(data)
      const fileName = 'Reporte Bachilleres'
      const exportType = exportFromJSON.types.xls
  
      exportFromJSON({ data, fileName, exportType })
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmitComites = async () => {
    try {
      const res = await getComitesRequest()
      console.log(res)
      const data = res.data
      console.log(data)
      const fileName = 'Reporte Comites'
      const exportType = exportFromJSON.types.xls
  
      exportFromJSON({ data, fileName, exportType })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Card>
        <h2 className="title">Lista de reportes</h2>
      </Card>

      <Card>
        <div className="m-5">

          <select
            className="input-style py-2 5 mb-5"
            onChange={(e) => setSelectOption(e.target.value)}
            value={selectOption}
          >
            <option value="">Selecciona una opción</option>
            <option value="1">REPORTE DE USUARIOS</option>
            <option value="2">REPORTE DE BACHILLERES</option>
            <option value="3">REPORTE DE COMITES</option>
          </select>


          {selectOption === '1' &&
            <>
              <button className="button-style" onClick={onSubmitUsers}>Exportar</button>
            </>
          }
          {selectOption === '2' &&
            <>
              <button className="button-style" onClick={onSubmitBachilleres}>Exportar</button>
            </>
          }
          {selectOption === '3' &&
            <>
              <button className="button-style" onClick={onSubmitComites}>Exportar</button>
            </>
          }
        </div>
      </Card>
    </>
  )
}

export default ReportesPage