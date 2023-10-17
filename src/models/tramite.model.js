const model = {}
import sequelize from '../config/db.js'

model.saveSolicitud = async (data) => {
  const { id, asesor, file } = data
  return sequelize.query(`CALL saveTramite('${id}', '${asesor}', '${file}');`, { raw: true })
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
      throw error
    })
}

model.saveIntegrantesComite = async (data) => {
  const { cod_comite, cod_usuario } = data
  return sequelize.query(`INSERT INTO integrantes_comite (cod_comite, cod_usuario_comite) VALUES ('${cod_comite}', '${cod_usuario}')`, { raw: true })
    .then(([result, metadata]) => {
      return metadata
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.listarComites = () => {
  const query = `SELECT c.cod_comite, c.num_integrantes, ic.cod_usuario_comite, CONCAT(u.nombre, " ", u.apellidos) AS nombre FROM comite c
                  INNER JOIN integrantes_comite ic
                  ON c.cod_comite = ic.cod_comite
                  INNER JOIN usuario u 
                  ON u.cod_usuario = ic.cod_usuario_comite`
  return sequelize.query(query, { raw: true })
    .then(([result, metadata]) => {
      console.log(result)
      console.log(metadata)
      return result.length === 0 ? null : result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.saveFolio = (data) => {
  const { id, tipo_doc = 1, file } = data
  return sequelize.query(`CALL saveFile('${id}', '${tipo_doc}', '${file}')`, { raw: true })
    .then(([result, metadata]) => {
      return result.rowAffected === 1 ? true : false
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.listarDetalleTramite = (id) => {
  return sequelize.query(`SELECT getFileName(t.cod_tramite) AS fileName, t.cod_tramite, t.cod_usuario, t.cod_asesor_propuesto, DATE_FORMAT(t.fecha_registro, "%d/%m/%Y") AS fecha_registro, CONCAT(u.nombre, " ", u.apellidos) AS nombre_asesor, t.estado  FROM tramite t
                        INNER JOIN usuario u ON u.cod_usuario = t.cod_asesor_propuesto
                        WHERE t.cod_tramite = '${id}'`, { raw: true })
    .then(([result, metadata]) => {
      return result.length === 0 ? null : result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.listarObservaciones = (id) => {
  return sequelize.query(`SELECT * FROM revision_comite
                        WHERE cod_tramite = '${id}'
                        ORDER BY cod_revision_comite DESC`)
    .then(([result, metadata]) => {
      return result.length === 0 ? [] : result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.saveObservacion = (data) => {
  console.log("data del model", data)
  const { id: idUser, idTramite, observacion } = data
  return sequelize.query(`CALL saveObservacion('${idUser}', '${idTramite}', '${observacion}')`, { raw: true })
    .then(([result, metadata]) => {
      console.log(result)
      return result
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

model.subsanarObservacion = (data) => {
  const { file, idObser } = data
  return sequelize.query(`UPDATE revision_comite SET corregido = '${file}' WHERE cod_revision_comite = '${idObser}'`, { raw: true })
    .then(([result, metadata]) => {
      return metadata.affectedRows >= 1 ? true : false
    })
    .catch((error) => {
      console.log(error)
      throw error
    })
}

export default model