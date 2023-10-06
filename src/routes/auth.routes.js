import { Router } from 'express'
import controllers from '../controllers/auth.controller.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = new Router()

router.post('/login', controllers.login)
router.post('/logout', controllers.logout)
router.post('/verify', controllers.verifyToken)

router.route('/usuario')
  .get(controllers.getUsers)
  .post(controllers.register)

router.route('/usuario/:id')
  .get(controllers.getUser)
  .put(controllers.updateUser)
  .delete(controllers.deleteUser)

//ejemplo de protejer una ruta
// router.get('/miruta', authRequired, controllers.login)

export default router