const controller = {}
import model from '../models/tesis.model.js'

controller.getTesis = async (req, res) => {
  try {
    const result = await model.getTesis()
    if (result) return res.status(200).json(result)
    else return res.status(404).send({ error: "Error al obtener tesis" })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export default controller