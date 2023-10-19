import { useState } from "react"
import Card from "../components/Card"
import exportFromJSON from 'export-from-json'
import { getUsersRequest } from "../api/auth"

function ReportesPage() {

  const [selectOption, setSelectOption] = useState('')

  const onSubmit = async () => {
    const res = await getUsersRequest()
    const data = res.data
    console.log(data)
    const fileName = 'CryReport'
    const exportType = exportFromJSON.types.xls

    exportFromJSON({ data, fileName, exportType })

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
            <option value="1">REPORTE 1</option>
            <option value="2">REPORTE 2</option>
            <option value="3">REPORTE 3</option>
            <option value="4">REPORTE 4</option>
          </select>


          {selectOption === '1' &&
            <>
              <button className="button-style" onClick={onSubmit}>Exportar</button>
            </>
          }
          {selectOption === '2' &&
            <>
              <button className="button-style" onClick={onSubmit}>Exportar</button>
            </>
          }
          {selectOption === '3' &&
            <>
              <button className="button-style" onClick={onSubmit}>Exportar</button>
            </>
          }
          {selectOption === '4' &&
            <>
              <button className="button-style" onClick={onSubmit}>Exportar</button>
            </>
          }


        </div>
      </Card>
    </>
  )
}

export default ReportesPage