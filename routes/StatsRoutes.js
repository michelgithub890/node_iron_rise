// EXPRESS 
import express from 'express'
// MIDDLEWARE AUTH 
import auth from '../middleware/auth.js'
// STATS CONTROLLER 
import { getWorkoutSummary } from '../controllers/StatsController.js'

// INITIALISE ROUTER WITH EXPRESS 
const router = express.Router()

// ASSOCIATE ROUTE AND FUNCTION 
router.get('/statistics', auth, getWorkoutSummary)

export default router