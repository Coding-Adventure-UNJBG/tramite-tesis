import { Router } from 'express'
import controller from '../controllers/report.controller.js'

const router = new Router()

router.get('/reporte/user', controller.getUsers)
router.get('/reporte/bachilleres', controller.getBachilleres)
router.get('/reporte/comites', controller.getComites)

export default router