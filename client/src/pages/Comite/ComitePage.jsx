import React, { useState, useEffect } from "react"
import Card from "../../components/Card"
import { useForm } from "react-hook-form"
import { useTramite } from "../../context/TramiteContext"

function ComitePage() {

  const { getProfesores, registerComite, getComites } = useTramite()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  const [profesores, setProfesores] = useState([])
  const [comites, setComites] = useState([])
  const [listComites, setListComites] = useState([])
  const [selectProfes, setSelectProfes] = useState([])
  const [profeInfo, setProfeInfo] = useState([])

  useEffect(() => {
    async function loadProfe() {
      // const res = await getProfesores()
      // setProfesores(res)
      const com = await getComites()
      if (com) setComites(com)
    }
    loadProfe()
  }, [])

  useEffect(() => {
    const listar = comites.reduce((result, comit) => {
      const codComite = comit.cod_comite

      if (!result[codComite]) result[codComite] = []

      result[codComite].push(comit.nombre)
      return result
    }, {})
    setListComites(listar)
  }, [comites])




  const onSubmit = handleSubmit(values => {
    if (values.profe != 0) {
      const selectProfesor = profesores.find((profesor) => profesor.cod_usuario === parseInt(values.profe, 10))

      //Agregamos el codigo del profe
      setSelectProfes((pro) => [...pro, values.profe])

      //Agregamos info del profe
      setProfeInfo((pre) => [...pre, selectProfesor])

      // Restablecemos el formulario
      setValue('profe', '0')
    }
  })

  const onSaved = async () => {
    const res = await registerComite(selectProfes)
    if (res.data.message) {
      window.location.reload()
    }
  }



  return (
    <>
      {/* <Card>
        <div className="m-5">
          <h3 className="font-bold mt-4">Asignar comite</h3>
          <span className="text-sm">Para asignar un nuevo comité, simplemente agrega a los miembros necesarios y guarda los cambios.</span>
          <form >
            <select className="input-style my-2 py-2 uppercase" {...register('profe')}>
              <option value='0'>Seleccione una opción</option>
              {profesores.map((profesor, i) => (
                <option key={i} value={profesor.cod_usuario}>{profesor.dni} - {profesor.nombre} {profesor.apellidos}</option>
              ))}
            </select>
            <button type="submit" onClick={onSubmit} className="button-style">Agregar</button>
          </form>

          Muestra la lista solo si se selecciona por lo menos 1
         
          {selectProfes.length !== 0 &&
            <>
              <div className="mb-5">
                <h3 className="font-semibold text-lg my-3">Profesores seleccionados</h3>
                <ul className="uppercase bg-slate-100 px-2 divide-y">
                  {profeInfo.map((profesor, i) => (
                    <li className="py-1" key={i}>{profesor.dni} - {profesor.nombre} {profesor.apellidos}</li>
                  ))}
                </ul>
              </div>
              <button onClick={onSaved} className="button-style bg-red-400">Registrar integrantes del comite</button>
            </>
          }
        </div>
      </Card > */}

      <Card>
        <h2 className="title">Lista de comites</h2>
      </Card>

      <Card>
        <div className="m-5">
          <h3 className="font-bold my-4">Lista de comites</h3>
          {comites.length === 0 ? (
            <p className="-mt-2"> - No hay datos de comites disponibles</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {
                Object.keys(listComites).map((value, i) => (
                  <div key={i} className="col-span-1 bg-yellow-300 py-2 px-5 rounded-lg">
                    <h3 className="font-bold">Comite N° {i + 1}</h3>
                    <ul className="ml-2 uppercase text-sm">
                      {listComites[value].map((integrante, j) => (
                        <li key={j}><strong>-</strong> {integrante}</li>
                      ))}
                    </ul>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </Card>
    </>
  )
}

export default ComitePage