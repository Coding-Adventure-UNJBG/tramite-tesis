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

model.subsanarObservacionAsesor = (data) => {
  const { file, idObser } = data
  return sequelize.query(`UPDATE revision_asesor SET corregido = '${file}' WHERE cod_revision_asesor = '${idObser}'`, { raw: true })
    .then(([result, metadata]) => {
      return metadata.affectedRows >= 1 ? true : false
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.listarObservacionesJurado = (id) => {
  return sequelize.query(`SELECT * FROM revision_jurado WHERE cod_tesis = '${id}' ORDER BY cod_revision_jurado DESC`, { raw: true })
    .then(([result, metadata]) => {
      console.log(result)
      return result.length === 0 ? [] : result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.saveObservacionJurado = (data) => {
  const { idJurado, idTesis, observacion } = data
  return sequelize.query(`CALL saveObservacionJurado ('${idJurado}','${idTesis}','${observacion}')`, { raw: true })
    .then(([result, metadata]) => {
      console.log(result)
      return result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.subsanarObservacionJurado = (data) => {
  const { file, idObser } = data
  return sequelize.query(`UPDATE revision_jurado SET corregido = '${file}' WHERE cod_revision_jurado = '${idObser}'`, { raw: true })
    .then(([result, metadata]) => {
      return metadata.affectedRows >= 1 ? true : false
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.updateEstado = (data) => {
  const { idTesis, estado } = data
  return sequelize.query(`UPDATE tesis SET estado = '${estado}' WHERE cod_tesis = '${idTesis}'`, { raw: true })
    .then(([result, metadata]) => {
      return metadata.affectedRows >= 1 ? true : false
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.verify = (id) => {
  return sequelize.query(`SELECT existeTesis('${id}') AS response`, { raw: true })
    .then(([result, metadata]) => {
      return result[0]
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

export default model