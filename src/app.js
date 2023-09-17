import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import myroutes from './routes/index.routes.js'

dotenv.config()

const app = express()
app.use(morgan("dev"))
app.use(express.json())

app.use( myroutes)

app.set('port', process.env.PORT || 3000)

export default app