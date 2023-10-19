import express from 'express';
import cors from 'cors';

import authRoutes from './auth.routes.js'
import fileRoutes from './files.routes.js'
import tramiteRoutes from './tramite.routes.js'
import tesisRoutes from './tesis.routes.js'
import ReportRoutes from './reports.routes.js'

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use("/", (req, res, next) => {
  console.log(`Test middleware: method=${req.method} - url=${req.originalUrl}`);
  next();
})

app.get('/', (req, res) => {
  res.send("Bienvenido a mi API de gestión de trámites de tesis.")
})

//import routes from project
app.use("/api/v1", authRoutes)
app.use("/api/v1", fileRoutes)
app.use("/api/v1/tramite", tramiteRoutes)
app.use('/api/v1/tesis', tesisRoutes)
app.use('/api/v1', ReportRoutes)

app.use("*", (req, res) => {
  res.status(404).send("Not Found")
})

export default app