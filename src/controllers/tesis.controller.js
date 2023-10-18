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
    // const result = await model.saveTesis({ ...req.body, idUser: id })

    // if (result) return res.sendStatus(200)
    // else return res.status(500).send({ error: "Error al guardar tesis" })

    await model.saveTesis({ ...req.body, idUser: id })
    res.sendStatus(200)

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

controller.getMyTesis = async (req, res) => {
  try {
    const { id } = req.params
    const result = await model.listarDetalle(id)

    if (result) return res.status(200).json(result[0])
    else return res.status(404).send({ error: "Error al obtener el tramite" })

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

controller.getObservacionAsesor = async (req, res) => {
  try {
    const { id } = req.params
    const result = await model.listarObservacionesAsesor(id)
    res.status(200).json(result)

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

controller.saveObservacionAsesor = async (req, res) => {
  try {
    const result = await model.saveObservacionAsesor({ ...req.body, idAsesor: req.user.id })

    if (result) return res.status(200).json(result)
    else return res.status(500).send({ error: "Error al guardar la observacion" })

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

controller.subsanarObservacionAsesor = async (req, res) => {
  try {
    const result = await model.subsanarObservacionAsesor(req.body)

    if (result) return res.sendStatus(200)
    else return res.status(500).send({ error: "Error al guardar la observacion" })

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export default controller