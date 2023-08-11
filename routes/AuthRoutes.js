// IMPORT EXPRESS 
import express from "express"
// INITIALISE ROUTEUR 
const router = express.Router()
// IMPORT AUTH CONTROLLER 
import { register, login, getUserData } from '../controllers/AuthController.js'

// ASSOCIATE ROUTE AND FUNCTION 
router.post('/auth/signup', register)
router.post('/auth/signin', login)
router.post('/auth/userData', getUserData)

export default router
