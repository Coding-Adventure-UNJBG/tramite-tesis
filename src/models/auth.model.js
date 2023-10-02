import sequelize from "../config/db.js";
const model = {}

model.findUser = async (arg) => {
  return sequelize.query(`SELECT * FROM usuario WHERE dni = '${arg}'`, { raw: true })
    .then(([result, metadata]) => {
      const data = result.length === 0 ? null : result
      return data
    })
    .catch((error) => {
      throw error
    })
}

model.findEmail = async (arg) => {
  return sequelize.query(`SELECT * FROM usuario WHERE correo = '${arg}'`, { raw: true })
    .then(([result, metadata]) => {
      const data = result.length === 0 ? null : result
      return data
    })
    .catch((error) => {
      throw error
    })
}

model.findUserById = async (arg) => {
  return sequelize.query(`SELECT * FROM usuario WHERE cod_usuario = '${arg}'`, { raw: true })
    .then(([result, metadata]) => {
      const data = result.length === 0 ? null : result
      return data
    })
    .catch((error) => {
      throw error
    })
}

model.saveUser = async (arg) => {
  const { nombre, apellidos, dni, password, fecha_nacimiento, celular, correo, direccion } = arg
  const query = `INSERT INTO usuario (cod_rol, nombre, apellidos, dni, password, fecha_nacimiento, telefono, correo, direccion)
                VALUES (1, '${nombre}', '${apellidos}', '${dni}', '${password}', '${fecha_nacimiento}', '${celular}', '${correo}', '${direccion}');`
  return sequelize.query(query, { raw: true })
    .then(([result, metadata]) => {
      return metadata >= 1 ? true : false
    })
    .catch((error) => {
      throw error
    })
}

export default model