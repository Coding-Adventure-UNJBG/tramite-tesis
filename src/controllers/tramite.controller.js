import model from "../models/tramite.model.js"
const controller = {}

controller.saveSolicitud = async (req, res) => {
  try {
    const { id } = req.user

    const result = await model.saveSolicitud({ ...req.body, id: id })
    if (result) return res.status(200).json(result)
    else return res.status(500).send({ error: 'Error al guardar la solicitud' })

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

controller.getTramites = async (req, res) => {
  try {
    const { id } = req.user

    const result = await model.getTramites(id)
    if (result) res.status(200).json(result)
    else res.status(500).send({ error: "Error al obtener tramites" })
    
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export default controller