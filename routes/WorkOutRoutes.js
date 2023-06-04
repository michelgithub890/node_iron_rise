// routes/routine.js
import express from 'express'
import auth from '../middleware/auth.js'
import { addWorkout, getWorkout, updateWorkout, deleteWorkout, getWorkoutToday, updateExerciseInWorkout } from '../controllers/WorkoutController.js'

const router = express.Router()

router.post('/workout', auth, addWorkout)

router.get('/workout', auth, getWorkout)

router.get('/workout/today', auth, getWorkoutToday)

router.delete('/workout/:id', auth, deleteWorkout)

router.put('/workout/:clientId', auth, updateWorkout)

router.put('/workout/:workoutId/exercise/:exerciseId', auth, updateExerciseInWorkout)

export default router
