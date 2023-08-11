// IMPORT EXPRESS 
import express from 'express'
// IMPORT AUTH 
import auth from '../middleware/auth.js'
// IMPORT CONTROLLER WORKOUT 
import { addWorkout, getWorkout, updateWorkout, deleteWorkout, getWorkoutToday, updateExerciseInWorkout } from '../controllers/WorkoutController.js'

// INITIALISE ROUTER WITH EXPRESS 
const router = express.Router()

// ASSOCIATE ROUTE AND FUNCTION 
router.post('/workout', auth, addWorkout)

router.get('/workout', auth, getWorkout)

router.get('/workout/today', auth, getWorkoutToday)

router.delete('/workout/:id', auth, deleteWorkout)

router.put('/workout/:clientId', auth, updateWorkout)

router.put('/workout/:workoutId/exercise/:exerciseId', auth, updateExerciseInWorkout)

export default router
