const model = {}
import sequelize from '../config/db.js'

model.getTesis = () => {
  return sequelize.query('SELECT * FROM tesis', { raw: true })
    .then(([result, metadata]) => {
      return result.length === 0 ? null : result
    })
    .catch((error) => {
      throw error
    })
}

export default model