import { Router } from 'express'
import controllers from '../controllers/auth.controller.js'

const router = new Router()

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.post('/logout', controllers.logout)
router.post('/verify', controllers.verify)
// router.post('/logout', logout)
// router.get('/verify', verifyToken)

export default router