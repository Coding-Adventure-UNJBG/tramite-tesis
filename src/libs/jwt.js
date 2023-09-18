import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TOKEN_SECRET } from "../config/config.js";
dotenv.config()

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}