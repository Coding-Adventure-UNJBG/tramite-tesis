import controller from '../controllers/tesis.controller.js'
import { Router } from 'express'

const router = new Router()


router.get('/', controller.getTesis)

export default router