// IMPORT EXPRESS 
import express from 'express'
// IMPORT AUTH MIDDLEWARE 
import auth from '../middleware/auth.js'
// IMPORT EXERCISES CONTROLLER 
import { addExercise, deleteExercise, getExercises, updateExercise } from '../controllers/ExercisesController.js'

// INITIALISE ROUTER WITH EXPRESS 
const router = express.Router()

// ASSOCIATE ROUTE AND FUNCTION 
router.post('/exercise', auth, addExercise)

router.get('/exercise', auth, getExercises)

router.delete('/exercise/:id', auth, deleteExercise)

router.put('/exercise/:id', auth, updateExercise)

export default router

