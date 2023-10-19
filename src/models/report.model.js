const model = {}
import sequelize from '../config/db.js'

model.getUsers = async () => {
    return sequelize.query(`SELECT cod_usuario AS "Id usuario", nombre, apellidos, dni, fecha_nacimiento AS "fecha nacimiento", telefono, correo, direccion, grado_academico AS "grado académico" 
                            FROM usuario;`, { raw: true })
      .then(([result, metadata]) => {
        return result.length === 0 ? null : result
      })
      .catch((error) => {
        throw error
      })
  }

model.getBachilleres = async () => {
    return sequelize.query(`SELECT u.cod_usuario, u.nombre, u.apellidos, u.dni, u.fecha_nacimiento AS "fecha nacimiento", u.telefono, u.correo, u.direccion, u.grado_academico 
                            FROM usuario u
                            INNER JOIN rol r ON u.cod_rol = r.cod_rol
                            WHERE r.nombre = 'TESISTA';`, { raw: true })
      .then(([result, metadata]) => {
        return result.length === 0 ? null : result
      })
      .catch((error) => {
        throw error
      })
  }

model.getComites = async () => {
    return sequelize.query(`SELECT c.cod_comite AS "Comite N°", c.num_integrantes AS "Cantidad de Integrantes", GROUP_CONCAT(u.nombre SEPARATOR ', ') AS "Integrantes"
                            FROM usuario u
                            INNER JOIN integrantes_comite ic ON u.cod_usuario = ic.cod_usuario_comite
                            INNER JOIN comite c ON ic.cod_comite = c.cod_comite
                            GROUP BY c.cod_comite;`, { raw: true })
      .then(([result, metadata]) => {
        return result.length === 0 ? null : result
      })
      .catch((error) => {
        throw error
      })
  }

model.getObservacionesXBachiller = async () => {
    return sequelize.query(``, { raw: true })
      .then(([result]) => {
        console.log(result)
        return result.length === 0 ? null : result
      })
      .catch((error) => {
        console.log(error)
        throw error
      })
  }

export default model