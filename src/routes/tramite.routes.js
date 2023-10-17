import { Router } from 'express'
import controller from '../controllers/tramite.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = new Router()

router.post('/', authRequired, controller.saveSolicitud)
router.get('/', authRequired, controller.getTramites)

router.post('/observation', authRequired, controller.saveObservacion)

router.route('/comite')
  .get(controller.listarComites)
  .post(controller.saveComite)

router.get('/profesores', controller.getProfesores)

router.get('/:id', authRequired, controller.getTramite)
router.get('/:id/observation', authRequired, controller.getObservaciones)
export default router
