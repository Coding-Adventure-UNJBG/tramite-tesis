import controller from '../controllers/tesis.controller.js'
import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'

const router = new Router()


router.get('/', authRequired, controller.getTesis)
router.post('/', authRequired, controller.saveTesis)

router.post('/asesor/obs', authRequired, controller.saveObservacionAsesor)
router.post('/asesor/subsanar', authRequired, controller.subsanarObservacionAsesor)

router.post('/jurado/obs', authRequired, controller.saveObservacionJurado)
router.post('/jurado/subsanar', authRequired, controller.subsanarObservacionJurado)

router.post('/estado', authRequired, controller.updateEstado)

router.get('/:id', controller.getMyTesis)
router.get('/:id/verify', controller.verificar)
router.get('/:id/asesor', controller.getObservacionAsesor)
router.get('/:id/jurado', controller.getObservacionJurado)

export default router