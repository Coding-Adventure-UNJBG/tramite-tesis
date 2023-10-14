const model = {}
import sequelize from '../config/db.js'

model.saveSolicitud = async (data) => {
  const { id, titulo_tesis, descripcion_tesis } = data
  return sequelize.query(`CALL saveTramite('${id}', '${titulo_tesis}', '${descripcion_tesis}');`, { raw: true })
    .then(([result, metadata]) => {
      return result.length === 0 ? null : result
    })
    .catch((error) => {
      throw error
    })
}

model.getTramites = async (id) => {
  return sequelize.query(`CALL getTramites('${id}');`, { raw: true })
    .then((result) => {
      // return result.length === 0 ? null : result
      return result
    })
    .catch((error) => {
      throw error
    })
}

model.getProfesores = async () => {
  return sequelize.query(`select cod_usuario, u.cod_rol, u.nombre, u.apellidos, dni, grado_academico from usuario u
                          Inner join rol on rol.cod_rol = u.cod_rol
                          where rol.nombre = 'PROFESOR'`, { raw: true })
    .then(([result]) => {
      console.log(result)
      return result.length === 0 ? null : result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.saveComite = async (arg) => {
  return sequelize.query(`CALL saveComite('${arg}')`, { raw: true })
    .then(([result, metadata]) => {
      console.log("result: ", result)
      return result.length === 0 ? null : result
    })
    .catch((error) => {
      console.log(error)
    })
}

model.saveIntegrantesComite = async (data) => {
  const { cod_comite, cod_usuario } = data
  console.log(data)
  return sequelize.query(`INSERT INTO integrantes_comite (cod_comite, cod_usuario_comite) VALUES ('${cod_comite}', '${cod_usuario}')`, { raw: true })
    .then(([result, metadata]) => {
      return metadata
    })
    .catch((error) => {
      console.log(error)
    })
}
export default model