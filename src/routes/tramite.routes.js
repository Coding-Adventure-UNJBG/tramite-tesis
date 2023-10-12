import { Router } from 'express'
import controller from '../controllers/tramite.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = new Router()

router.post('/', authRequired, controller.saveSolicitud)
router.get('/', authRequired, controller.getTramites)

export default router
