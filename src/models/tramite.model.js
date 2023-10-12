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

export default model