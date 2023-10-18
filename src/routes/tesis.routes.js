import controller from '../controllers/tesis.controller.js'
import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'

const router = new Router()


router.get('/', authRequired, controller.getTesis)
router.post('/', authRequired, controller.saveTesis)


router.get('/:id', controller.getMyTesis)
router.get('/:id/asesor',  controller.getObservacionAsesor)

export default router