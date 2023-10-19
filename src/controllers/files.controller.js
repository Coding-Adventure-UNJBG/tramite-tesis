import model from "../models/auth.model.js"

const controllers = {}


controllers.uploadFile = async (req, res) => {
  try {
    console.log("Controllers Upload")
    console.log("Datos del archivo: ", req.file)
    res.status(200).json({ filename: req.file.filename })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

controllers.savePortafolio = async (req, res) => {
  try {
    console.log("user", req.user)
    console.log("body", req.body)
    const result = await model.saveFolio({ ...req.body, id: req.user.id })

    if (result) return res.sendStatus(200)
    else return res.status(500).send({ error: "Error al guardar el portafolio" })

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

controllers.getPortafolio = async (req, res) => {
  try {
    const { id } = req.user
    console.log(req.user)
    const result = await model.getPortafolio(id)

    res.status(200).json(result)

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

export default controllers