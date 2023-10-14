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

controller.getProfesores = async (req, res) => {
  try {
    const result = await model.getProfesores()
    if (result) res.status(200).json(result)
    else res.status(500).send({ error: "Error al obtener profesores" })

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

controller.saveComite = async (req, res) => {
  try {
    const data = req.body
    const numIntegrantes = data.length

    // Guardamos el comite y extraemos el cod_comite
    const result = await model.saveComite(numIntegrantes)

    if (result) {
      //Recorremos el lista de los integrantes para guardarlo
      data.map(async (value, i) => {
        await model.saveIntegrantesComite({ cod_comite: result.cod_comite, cod_usuario: parseInt(value, 10) })
      })
      return res.status(200).send({ message: "Comite guardado" })
    }
    else {
      return res.status(500).send({ error: "Error al guardar comite" })
    }

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export default controller