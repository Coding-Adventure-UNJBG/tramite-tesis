const model = {}
import sequelize from '../config/db.js'

model.getTesis = (id) => {
  return sequelize.query(`CALL getTesis('${id}')`, { raw: true })
    .then((result) => {
      return result
    })
    .catch((error) => {
      throw error
    })
}

model.saveTesis = (data) => {
  const { idUser, idTramite, titulo, file } = data
  return sequelize.query(`INSERT INTO tesis(cod_usuario, cod_tramite, titulo, versionInicial)
                          VALUES ('${idUser}', '${idTramite}', '${titulo}', '${file}')`, { raw: true })
    .then(([result, metadata]) => {
      return metadata
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

export default model