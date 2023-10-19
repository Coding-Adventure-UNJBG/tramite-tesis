const controller = {}
import model from '../models/report.model.js'

controller.getUsers = async (req, res) => {
    try {
        console.log("pruebaaa")
      const result = await model.getUsers()
      
      if (result) return res.status(200).json(result)
      else return res.status(404).send({ error: "Error al obtener usuarios" })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

controller.getBachilleres = async (req, res) => {
    try {
      const result = await model.getBachilleres()
      if (result) return res.status(200).json(result)
      else return res.status(404).send({ error: "Error al obtener bachilleres" })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

controller.getComites = async (req, res) => {
    try {
      const result = await model.getComites()
      if (result) return res.status(200).json(result)
      else return res.status(404).send({ error: "Error al obtener comites" })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }

controller.getObservacionesXBachiller = async (req, res) => {
    try {
      const result = await model.getObservacionesXBachiller()
      if (result) return res.status(200).json(result)
      else return res.status(404).send({ error: "Error al obtener observacionesXbachiller" })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  }
  
export default controller