import { Router } from 'express'
import controllers from '../controllers/files.controller.js'
import upload from '../libs/multer.js'
import { authRequired } from '../middlewares/validateToken.js'

const router = new Router()
router.post('/upload', upload.single('file'), controllers.uploadFile)

router.post('/portafolio', authRequired, controllers.savePortafolio)

export default router