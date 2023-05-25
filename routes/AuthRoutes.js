import express from "express"
const router = express.Router()
// AuthRoutes.js
import { register, login, getUserData } from '../controllers/AuthController.js'

router.post('/register', register)
router.post('/login', login)
router.post('/userData', getUserData)

export default router
