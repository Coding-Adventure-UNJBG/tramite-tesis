const controllers = {}
import { createAccessToken } from "../libs/jwt.js"
import model from "../models/auth.model.js"
import bcrypt from 'bcryptjs'

controllers.register = async (req, res) => {
  const { password } = req.body
  const newPassword = await bcrypt.hash(password, 10)
  res.status(200).send({ password: newPassword })
}

controllers.login = async (req, res) => {
  const { user, password } = req.body
  try {

    const userFound = await model.findUser(user)
    console.log(userFound)
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

    const isMatch = await bcrypt.compare(password, userFound[0].password)
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" })

    const token = await createAccessToken({ id: userFound[0].cod_usuario })

    res.cookie("token", token)
    res.json({
      id: userFound[0].cod_usuario,
      nombre: userFound[0].nombre,
      dni: userFound[0].dni
    })

  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

controllers.logout = async (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export default controllers