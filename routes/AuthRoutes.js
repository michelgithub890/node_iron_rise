import express from "express"
const router = express.Router()
// AuthRoutes.js
import { register, login, getUserData } from '../controllers/AuthController.js'

router.post('/auth/signup', register)
router.post('/auth/signin', login)
router.post('/auth/userData', getUserData)

export default router
