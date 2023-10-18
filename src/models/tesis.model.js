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
  // return sequelize.query(`INSERT INTO tesis(cod_usuario, cod_tramite, titulo, versionInicial)
  //                         VALUES ('${idUser}', '${idTramite}', '${titulo}', '${file}')`, { raw: true })
  return sequelize.query(`CALL saveTesis('${idUser}', '${idTramite}', '${titulo}', '${file}')`, { raw: true })
    .then((result) => {
      console.log(result)
      return result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.listarDetalle = (id) => {
  return sequelize.query(`SELECT t.titulo, DATE_FORMAT(t.fecha_inicio, '%d/%m/%Y') AS fecha, t.estado, CONCAT( u.nombre, " ", u.apellidos) AS nombreAsesor, t.versionInicial AS fileName FROM tesis t
INNER JOIN asesor a On a.cod_tesis = t.cod_tesis
INNER JOIN usuario u ON u.cod_usuario = a.cod_usuario
WHERE t.cod_tesis = '${id}'`, { raw: true })
    .then(([result, metadata]) => {
      return result.length === 0 ? null : result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.listarObservacionesAsesor = (id) => {
  return sequelize.query(`SELECT * FROM revision_asesor
WHERE cod_tesis = '${id}'
ORDER BY cod_revision_asesor DESC`, { raw: true })
    .then(([result, metadata]) => {
      console.log(result)
      return result.length === 0 ? [] : result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.saveObservacionAsesor = (data) => {
  const { idAsesor, idTesis, observacion } = data
  return sequelize.query(`CALL saveObservacionAsesor ('${idAsesor}','${idTesis}','${observacion}')`, { raw: true })
    .then(([result, metadata]) => {
      console.log(result)
      return result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

export default model