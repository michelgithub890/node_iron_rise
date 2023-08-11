// EXPRESS 
import express from 'express'
// AUTH 
import auth from '../middleware/auth.js'
// ROUTINE CONTROLLER 
import { addRoutine, getRoutines, deleteRoutine, updateRoutine } from '../controllers/RoutineController.js'

// INITIALISE ROUTER WITH EXPRESS 
const router = express.Router()

// ASSOCIATE ROUTE AND FUNCTION 
router.post('/routine', auth, addRoutine)

router.get('/routine', auth, getRoutines)

router.delete('/routine/:id', auth, deleteRoutine)

router.put('/routine/:id', auth, updateRoutine)

export default router
