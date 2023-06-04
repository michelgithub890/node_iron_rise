// routes/routine.js
import express from 'express'
import auth from '../middleware/auth.js'
import { addRoutine, getRoutines, deleteRoutine, updateRoutine } from '../controllers/RoutineController.js'

const router = express.Router()

router.post('/routine', auth, addRoutine)

router.get('/routine', auth, getRoutines)

router.delete('/routine/:id', auth, deleteRoutine)

router.put('/routine/:id', auth, updateRoutine)

export default router
