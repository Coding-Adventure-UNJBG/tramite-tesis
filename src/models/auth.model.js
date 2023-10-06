import sequelize from "../config/db.js";
const model = {}

model.validarUser = async (arg) => {
  const { id, dni, correo } = arg
  return sequelize.query(`SELECT validarUser('${id}','${dni}', '${correo}') AS estado`, { raw: true })
    .then(([result, metadata]) => {
      return result[0].estado
    })
    .catch((error) => {
      throw error
    })
}

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
  // const query = `INSERT INTO usuario (cod_rol, nombre, apellidos, dni, password, fecha_nacimiento, telefono, correo, direccion)
  // VALUES (1, '${nombre}', '${apellidos}', '${dni}', '${password}', '${fecha_nacimiento}', '${celular}', '${correo}', '${direccion}');`
  return sequelize.query(`CALL saveUser('1', '${nombre}', '${apellidos}', '${dni}', '${password}', '${fecha_nacimiento}', '${celular}', '${correo}', '${direccion}')`, { raw: true })
    .then(([result, metadata]) => {
      // return metadata >= 1 ? true : false
      return result.length === 0 ? null : result
    })
    .catch((error) => {
      throw error
    })
}

model.updateUser = async (arg) => {
  const { cod_usuario, cod_rol, nombre, apellidos, dni, password, fecha_nacimiento, celular, correo, direccion } = arg
  return sequelize.query(`CALL updateUser('${cod_usuario}', '${cod_rol}', '${nombre}', '${apellidos}', '${dni}', '${password}', '${fecha_nacimiento}', '${celular}', '${correo}', '${direccion}')`, { raw: true })
    .then(([result, metadata]) => {
      // return metadata >= 1 ? true : false
      return result.length === 0 ? null : result
    })
    .catch((error) => {
      throw error
    })
}

model.deleteUser = async (arg) => {
  return sequelize.query(`CALL deleteUser('${arg}')`, { raw: true })
    .then(([result, metadata]) => {
      return result.affectedRows === 1 ? result : null
    })
    .catch((error) => {
      throw error
    })
}

model.getUsers = async () => {
  return sequelize.query('SELECT * FROM usuario ORDER BY cod_usuario DESC', { raw: true })
    .then(([result, metadata]) => {
      return result.length === 0 ? null : result
    })
    .catch((error) => {
      throw error
    })
}

export default model