// routes/routine.js
import express from 'express'
import auth from '../middleware/auth.js'
import { getWorkoutSummary } from '../controllers/StatsController.js'

const router = express.Router()

router.get('/statistics', auth, getWorkoutSummary)

export default router