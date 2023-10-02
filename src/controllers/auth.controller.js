const controllers = {}
import { TOKEN_SECRET } from "../config/config.js";
import { createAccessToken } from "../libs/jwt.js"
import model from "../models/auth.model.js"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

controllers.register = async (req, res) => {

  try {
    const { dni, correo, password } = req.body
    let userFound
    //Verificamos si ya existe alguien con el mismo dni o correo
    userFound = await model.findUser(dni)
    if (userFound) return res.status(400).json({ message: ["El DNI ya se encuentra en uso"] })

    userFound = await model.findEmail(correo)
    if (userFound) return res.status(400).json({ message: ["El correo ya se encuentra en uso"] })

    const newPassword = await bcrypt.hash(password, 10)
    const userSaved = await model.saveUser({ ...req.body, password: newPassword })

    if (userSaved) res.status(200).send({ message: ["User saved"] })
    else res.status(500).send({ error: ["User no saved"] })

  } catch (error) {
    res.status(500).send({ error: error.message })
  }
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
      apellidos: userFound[0].apellidos,
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

controllers.verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: "No token, autorización denegada" })

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No token, autorización denegada" })
    const userFound = await model.findUserById(user.id)
    if (!userFound) return res.status(401).json({ message: "Token invalido" })
    return res.json({
      id: userFound[0].cod_usuario,
      nombre: userFound[0].nombre,
      apellidos: userFound[0].apellidos,
      dni: userFound[0].dni
    })
  })
}

export default controllers