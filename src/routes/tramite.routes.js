import { Router } from 'express'
import controller from '../controllers/tramite.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = new Router()

router.post('/', authRequired, controller.saveSolicitud)
router.get('/', authRequired, controller.getTramites)

router.route('/comite')
  .post(controller.saveComite)

router.get('/profesores', controller.getProfesores)

export default router
