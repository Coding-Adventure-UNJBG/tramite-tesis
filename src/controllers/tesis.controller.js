const controller = {}
import model from '../models/tesis.model.js'

controller.getTesis = async (req, res) => {
  try {
    const { id } = req.user
    const result = await model.getTesis(id)
    if (result) return res.status(200).json(result)
    else return res.status(404).send({ error: "Error al obtener tesis" })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

controller.saveTesis = async (req, res) => {
  try {
    const { id } = req.user
    const result = await model.saveTesis({ ...req.body, idUser: id })

    if (result) return res.sendStatus(200)
    else return res.status(500).send({ error: "Error al guardar tesis" })

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export default controller