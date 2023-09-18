import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import myroutes from './routes/index.routes.js'
import cookieParser from 'cookie-parser';
import { PORT } from './config/config.js';

dotenv.config()

const app = express()
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser())

app.use( myroutes)

app.set('port', PORT)

export default app