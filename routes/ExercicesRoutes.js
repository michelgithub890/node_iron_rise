import express from 'express'
import auth from '../middleware/auth.js'
import { addExercice } from '../controllers/ExercicesController.js'

const router = express.Router()

router.post('/exercices', auth, addExercice)

export default router

