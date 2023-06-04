import express from 'express'
import auth from '../middleware/auth.js'
import { addExercise, deleteExercise, getExercises, updateExercise } from '../controllers/ExercisesController.js'

const router = express.Router()

router.post('/exercise', auth, addExercise)

router.get('/exercise', auth, getExercises)

router.delete('/exercise/:id', auth, deleteExercise)

router.put('/exercise/:id', auth, updateExercise)

export default router

