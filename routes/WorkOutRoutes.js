import express from 'express'
import auth from '../middleware/auth.js'
import { addRoutine } from '../controllers/RoutineController.js'

const router = express.Router()

router.post('/routine', auth, addRoutine)

export default router