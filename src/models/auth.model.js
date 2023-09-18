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

export default model