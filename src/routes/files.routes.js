import { Router } from 'express'
import controllers from '../controllers/files.controller.js'
import upload from '../libs/multer.js'

const router = new Router()
router.post('/upload', upload.single('file'), controllers.uploadFile)

export default router