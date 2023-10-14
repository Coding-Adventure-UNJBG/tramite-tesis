import React, { useState, useEffect } from "react"
import Card from "../../components/Card"
import { useForm } from "react-hook-form"
import { useTramite } from "../../context/TramiteContext"

function ComitePage() {

  const { getProfesores, registerComite } = useTramite()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  const [profesores, setProfesores] = useState([])
  const [selectProfes, setSelectProfes] = useState([])
  const [profeInfo, setProfeInfo] = useState([])

  useEffect(() => {
    async function loadProfe() {
      const res = await getProfesores()
      setProfesores(res)
    }
    loadProfe()
  }, [])

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
    //Ya se guarda en el BD
    const res = await registerComite(selectProfes)
    if (res.data.message) {
      window.location.reload()
    }
  }
  return (
    <>
      <Card>
        <h2 className="title">Asignar Comite</h2>
      </Card>

      <Card>
        <div className="m-5">

          <span>Un mensaje bonito indicando de que trata</span>
          <form >
            <select className="input-style my-2 py-2 uppercase" {...register('profe')}>
              <option value='0'>Seleccione una opción</option>
              {profesores.map((profesor, i) => (
                <option key={i} value={profesor.cod_usuario}>{profesor.dni} - {profesor.nombre} {profesor.apellidos}</option>
              ))}
            </select>
            <button type="submit" onClick={onSubmit} className="button-style">Agregar</button>
          </form>

          {/* Muestra la lista solo si se seleeciona por lo menos 1 */}
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
      </Card >

      {/* Esto esta por verse todavia (si sobra tiempo) */}
      <Card>
        <div className="m-5">
          <h2>Lista de comite existentes?</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div className="col-span-1 bg-yellow-300 py-2 px-5 rounded-lg">
              <h3 className="font-bold">Comite N° 1</h3>
              <ul className="ml-2 ">
                <li><strong>-</strong> Nombres Completos</li>
                <li><strong>-</strong> Nombres Completos</li>
                <li><strong>-</strong> Nombres Completos</li>
              </ul>
            </div>
            <div className="col-span-1 bg-yellow-300 py-2 px-5 rounded-lg">
              <h3 className="font-bold">Comite N° 2</h3>
              <ul className="ml-2 ">
                <li><strong>-</strong> Nombres Completos</li>
                <li><strong>-</strong> Nombres Completos</li>
                <li><strong>-</strong> Nombres Completos</li>
              </ul>
            </div>
            <div className="col-span-1 bg-yellow-300 py-2 px-5 rounded-lg">
              <h3 className="font-bold">Comite N° n</h3>
              <ul className="ml-2 ">
                <li><strong>-</strong> Nombres Completos</li>
                <li><strong>-</strong> Nombres Completos</li>
                <li><strong>-</strong> Nombres Completos</li>
              </ul>
            </div>
          </div>

        </div>
      </Card>
    </>
  )
}

export default ComitePage